#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  npm run video:convert -- "<input.mov>" "<output/base/path>" [width] [fps]

Examples:
  npm run video:convert -- "public/videos/raw/iam-flow.mov" "public/videos/showcase/iam-flow"
  npm run video:convert -- "public/videos/raw/iam-flow.mov" "public/videos/showcase/iam-flow" 1600 30

Outputs:
  <output/base/path>.mp4
  <output/base/path>.webm
  <output/base/path>.poster.webp
USAGE
}

if [[ $# -lt 2 ]]; then
  usage
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install it first (macOS: brew install ffmpeg)."
  exit 1
fi

INPUT_FILE="$1"
OUTPUT_BASE="$2"
TARGET_WIDTH="${3:-1600}"
TARGET_FPS="${4:-30}"

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Input not found: $INPUT_FILE"
  exit 1
fi

OUTPUT_DIR="$(dirname "$OUTPUT_BASE")"
mkdir -p "$OUTPUT_DIR"

SCALE_FILTER="scale=${TARGET_WIDTH}:-2:flags=lanczos,fps=${TARGET_FPS}"

echo "Converting video -> MP4"
ffmpeg -y -i "$INPUT_FILE" \
  -vf "$SCALE_FILTER" \
  -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p \
  -movflags +faststart -an \
  "${OUTPUT_BASE}.mp4"

echo "Converting video -> WebM"
ffmpeg -y -i "$INPUT_FILE" \
  -vf "$SCALE_FILTER" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -an \
  "${OUTPUT_BASE}.webm"

POSTER_FILTER="scale=${TARGET_WIDTH}:-2:flags=lanczos"
if ffmpeg -hide_banner -encoders 2>/dev/null | grep -qE 'libwebp|webp'; then
  echo "Generating poster -> WebP"
  ffmpeg -y -i "$INPUT_FILE" \
    -vf "$POSTER_FILTER" \
    -frames:v 1 -c:v libwebp -q:v 75 \
    "${OUTPUT_BASE}.poster.webp"
  POSTER_OUTPUT="${OUTPUT_BASE}.poster.webp"
else
  echo "WebP encoder not found in ffmpeg. Generating poster -> JPG"
  ffmpeg -y -i "$INPUT_FILE" \
    -vf "$POSTER_FILTER" \
    -frames:v 1 -c:v mjpeg -q:v 2 \
    "${OUTPUT_BASE}.poster.jpg"
  POSTER_OUTPUT="${OUTPUT_BASE}.poster.jpg"
fi

echo "Done:"
echo "  ${OUTPUT_BASE}.mp4"
echo "  ${OUTPUT_BASE}.webm"
echo "  ${POSTER_OUTPUT}"
