#!/usr/bin/env bash
# Cadrele pentru vederea 360° din clipul filmat în jurul autocarului.
#   bash scripts/360-frames.sh <clip.mp4> <id-vehicul>        ex.: bash scripts/360-frames.sh ocolire.mp4 setra-s517hd
# 1. stabilizează clipul (vidstab, două treceri), 2. extrage 72 de cadre egal distanțate (o tură completă),
# 3. le exportă WebP la 1600 și 800 px în public/360/<id>/{1600,800}/000.webp … 071.webp, 4. scrie manifest.json.
# Fundalul de studio identic pe toate cadrele se pune separat (Higgsfield), înainte de pasul 3.
# Verifică apoi pozițiile punctelor din src/config/fleet.ts (view360.hotspots).
set -euo pipefail
CLIP="$1"; ID="$2"; N=72
OUT="public/360/$ID"; TMP="$(mktemp -d)"
ffmpeg -loglevel error -y -i "$CLIP" -vf vidstabdetect=shakiness=6:accuracy=15:result="$TMP/t.trf" -f null -
ffmpeg -loglevel error -y -i "$CLIP" -vf "vidstabtransform=input=$TMP/t.trf:zoom=4:smoothing=20,unsharp=5:5:0.6" -an "$TMP/stab.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/stab.mp4")
mkdir -p "$OUT/1600" "$OUT/800"
for i in $(seq 0 $((N - 1))); do
  T=$(python3 -c "print($DUR * $i / $N)")
  F=$(printf "%03d" "$i")
  ffmpeg -loglevel error -y -ss "$T" -i "$TMP/stab.mp4" -frames:v 1 -vf "scale=1600:-2" -c:v libwebp -quality 78 "$OUT/1600/$F.webp"
  ffmpeg -loglevel error -y -i "$OUT/1600/$F.webp" -vf "scale=800:-2" -c:v libwebp -quality 76 "$OUT/800/$F.webp"
done
read W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=' ' "$OUT/1600/000.webp")
printf '{ "count": %d, "width": %d, "height": %d }\n' "$N" "$W" "$H" > "$OUT/manifest.json"
rm -rf "$TMP"
echo "gata: $OUT ($N cadre, ${W}x${H})"
