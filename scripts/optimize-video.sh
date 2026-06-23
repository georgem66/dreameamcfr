#!/bin/bash
# Transcode episode-1.mp4 into HLS adaptive streaming (360p/720p/1080p) + poster.
# Output: public/podcast/episode-1/{master.m3u8, <rendition>/index.m3u8, <rendition>/seg_*.ts, poster.jpg}
# Original MP4 stays in place as a fallback for browsers/crawlers that don't speak HLS.
set -euo pipefail

ROOT="/Users/andilemushwana/Desktop/bubbly"
SRC="$ROOT/public/podcast/episode-1.mp4"
OUT="$ROOT/public/podcast/episode-1"

if [ ! -f "$SRC" ]; then
  echo "Source not found: $SRC" >&2
  exit 1
fi

rm -rf "$OUT"

# Probe source dimensions
SRC_W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$SRC")
SRC_H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$SRC")
SRC_DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
echo "Source: ${SRC_W}x${SRC_H}  duration ${SRC_DUR}s"
echo ""

# Encode a single rendition. $1 = output dir suffix, $2 = target height, $3 = video bitrate,
# $4 = max rate, $5 = bufsize, $6 = audio bitrate.
encode_rendition() {
  local SUFFIX=$1 H=$2 VBIT=$3 MAX=$4 BUF=$5 ABIT=$6
  local DIR="$OUT/$SUFFIX"
  mkdir -p "$DIR"
  echo "→ encoding $SUFFIX (${VBIT}k video, ${ABIT}k audio)..."
  ffmpeg -hide_banner -loglevel warning -y -i "$SRC" \
    -c:v h264 -preset slow -profile:v main -crf 22 -pix_fmt yuv420p \
    -vf "scale=-2:$H" \
    -b:v "${VBIT}k" -maxrate "${MAX}k" -bufsize "${BUF}k" \
    -c:a aac -ac 2 -ar 48000 -b:a "${ABIT}k" \
    -hls_time 6 -hls_list_size 0 -hls_segment_type mpegts \
    -hls_segment_filename "$DIR/seg_%03d.ts" \
    "$DIR/index.m3u8"
}

# Choose renditions based on source resolution.
# Target widths:  640x360  (360p),  1280x720 (720p),  1920x1080 (1080p)
# We never upscale: only emit a rendition if source height >= target height.
RENDITIONS=()

if [ "$SRC_H" -ge 360 ]; then
  encode_rendition 360p 360 500 550 1100 64
  RENDITIONS+=("360p:640x360:564000")
fi
if [ "$SRC_H" -ge 720 ]; then
  encode_rendition 720p 720 1200 1300 2400 96
  RENDITIONS+=("720p:1280x720:1296000")
fi
if [ "$SRC_H" -ge 1080 ]; then
  encode_rendition 1080p 1080 2400 2600 4800 128
  RENDITIONS+=("1080p:1920x1080:2624000")
fi

# If source is 576p (our case), generate 540p as our "high" rendition for desktops.
# This stays close to source resolution, preserving quality without waste.
# 540p at ~700k video is the right size: visually identical to source for VBR sources
# of this size, and keeps the per-rendition download to ~15 MB.
if [ "$SRC_H" -lt 720 ] && [ "$SRC_H" -ge 540 ]; then
  encode_rendition 540p 540 700 800 1400 96
  RENDITIONS+=("540p:960x540:796000")
fi

# Poster (frame at 1s, 1280px wide, JPEG q=80)
echo "→ generating poster..."
ffmpeg -hide_banner -loglevel warning -y -ss 1 -i "$SRC" \
  -frames:v 1 -update 1 -vf "scale=1280:-2" -q:v 3 "$OUT/poster.jpg"

# Build master playlist
M="$OUT/master.m3u8"
{
  echo "#EXTM3U"
  echo "#EXT-X-VERSION:3"
  echo "#EXT-X-INDEPENDENT-SEGMENTS"
  for r in "${RENDITIONS[@]}"; do
    name=$(echo "$r" | cut -d: -f1)
    res=$(echo "$r"  | cut -d: -f2)
    bw=$(echo "$r"   | cut -d: -f3)
    echo "#EXT-X-STREAM-INF:BANDWIDTH=$bw,RESOLUTION=$res,CODECS=\"avc1.4d401f,mp4a.40.2\""
    echo "$name/index.m3u8"
  done
} > "$M"

echo ""
echo "✓ Master playlist:"
cat "$M"
echo ""
SIZE=$(du -sh "$OUT" | cut -f1)
ORIG=$(du -h "$SRC" | cut -f1)
echo "✓ Video optimized: $ORIG → $SIZE (across $(echo "${#RENDITIONS[@]}") rendition(s) + poster)"
