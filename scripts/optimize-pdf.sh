#!/bin/bash
# Compress + linearize the blog PDF for web delivery.
# Usage: ./optimize-pdf.sh input.pdf output.pdf
set -euo pipefail

INPUT="$1"
OUTPUT="$2"

if [ ! -f "$INPUT" ]; then
  echo "Input not found: $INPUT" >&2
  exit 1
fi

# Ghostscript: recompress images at /screen (72dpi), color JPEG q=70, monochrome CCITT.
# Drops file size dramatically while keeping on-screen quality.
TMP=$(mktemp -t bubbly-pdf).pdf
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/screen \
   -dNOPAUSE -dBATCH -dQUIET \
   -sColorImageResolution=150 \
   -sGrayImageResolution=150 \
   -sMonoImageResolution=300 \
   -dColorImageFilter=/DCTDecode \
   -dGrayImageFilter=/DCTDecode \
   -dJPEGQ=75 \
   -sOutputFile="$TMP" \
   "$INPUT"

# Linearize so the first page streams before the full download completes.
qpdf --linearize "$TMP" "$OUTPUT"
rm -f "$TMP"

ORIG=$(stat -f%z "$INPUT")
NEW=$(stat -f%z "$OUTPUT")
SAVED=$(( (ORIG - NEW) * 100 / ORIG ))
echo "✓ PDF optimized: $(numfmt --to=iec "$ORIG") → $(numfmt --to=iec "$NEW") (-${SAVED}%)"
