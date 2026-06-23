"""Optimize the blog PDF for web delivery (v2 — uses get_images() to find nested ones)."""
import pikepdf
from PIL import Image
import io, os, sys

src = '/Users/andilemushwana/Downloads/Blog 2.pdf'
dst = '/Users/andilemushwana/Desktop/bubbly/public/blog/meet-the-team-playlist.pdf'

MAX_DIM = 1600
JPEG_QUALITY = 70
MIN_PIXELS = 200_000  # skip tiny icons/masks


def reencode_image(pdf, xobj, name="?"):
    """Re-encode a single image XObject in place. Returns bytes saved (0 if skipped)."""
    try:
        raw = xobj.read_raw_bytes()
    except Exception as e:
        print(f"  {name}: read_raw_bytes failed: {e}")
        return 0
    try:
        # Try direct decode first (handles JPEG, PNG, etc.)
        pil = Image.open(io.BytesIO(raw))
        pil.load()
    except Exception:
        # Fall back: raw pixel data (FlateDecode / no Filter on an Image XObject)
        try:
            w = int(xobj.Width)
            h = int(xobj.Height)
            # read_bytes() fully decodes (un-Flates); read_raw_bytes() leaves the stream compressed
            try:
                decoded = xobj.read_bytes()
            except Exception:
                decoded = raw
            cs = str(xobj.ColorSpace)
            if 'ICCBased' in cs or 'RGB' in cs or 'DeviceRGB' in cs:
                pil = Image.frombytes("RGB", (w, h), decoded)
            elif 'CMYK' in cs or 'DeviceCMYK' in cs:
                pil = Image.frombytes("CMYK", (w, h), decoded).convert("RGB")
            elif 'Gray' in cs or 'DeviceGray' in cs:
                pil = Image.frombytes("L", (w, h), decoded)
            else:
                print(f"  {name}: unknown ColorSpace {cs}, skipping")
                return 0
            print(f"  {name}: raw {w}x{h} {pil.mode} ({len(raw):,}B)")
        except Exception as e:
            print(f"  {name}: PIL decode + raw fallback failed ({len(raw):,}B): {e}")
            return 0
    w, h = pil.size
    if w < 0 or h < 0 or w * h < MIN_PIXELS:
        print(f"  {name}: skip (too small: {w}x{h} = {w*h} px)")
        return 0
    scale = min(1.0, MAX_DIM / max(w, h))
    if scale < 1.0:
        pil = pil.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        print(f"  {name}: {w}x{h} -> {pil.size[0]}x{pil.size[1]}")
    if pil.mode in ("RGBA", "LA", "P"):
        pil = pil.convert("RGB")
    buf = io.BytesIO()
    pil.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    new_bytes = buf.getvalue()
    if len(new_bytes) < len(raw):
        xobj.write(new_bytes, filter=pikepdf.Name("/DCTDecode"))
        print(f"  {name}: {len(raw):,}B -> {len(new_bytes):,}B  saved {len(raw)-len(new_bytes):,}B")
        return len(raw) - len(new_bytes)
    print(f"  {name}: re-encode didn't shrink ({len(raw):,}B -> {len(new_bytes):,}B), keeping original")
    return 0


with pikepdf.open(src, allow_overwriting_input=True) as pdf:
    saved = 0
    count = 0
    for page in pdf.pages:
        for img_name in page.get_images():
            try:
                # img_name includes the leading slash
                xobj = page.Resources.XObject[img_name]
            except (KeyError, AttributeError) as e:
                print(f"  {img_name}: lookup failed: {e}")
                continue
            s = reencode_image(pdf, xobj, name=img_name)
            if s > 0:
                saved += s
                count += 1

    pdf.save(dst, linearize=True, compress_streams=True,
             normalize_content=False,
             object_stream_mode=pikepdf.ObjectStreamMode.generate)

orig = os.path.getsize(src)
new = os.path.getsize(dst)
pct = (orig - new) * 100 // orig
print(f"\nOriginal:  {orig:>10,} ({orig/1024/1024:.2f} MB)")
print(f"Optimized: {new:>10,} ({new/1024/1024:.2f} MB)  saved {pct}%")
print(f"Re-encoded {count} image(s), saved {saved:,} bytes in streams")
