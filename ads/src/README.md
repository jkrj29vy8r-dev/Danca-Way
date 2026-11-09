# Creativele reclamelor

`ad.html` este un singur șablon pentru toate reclamele: `ad.html?c=<1-4>&f=<4x5|1x1|9x16>`.
Textele și orele sunt în cod, la fiecare concept (`buildN`). Dacă schimbi o oră sau un preț, schimbă-l și în `../copy.json`
și în `../CAMPAIGN.md`.

```bash
cd ads/src && python3 -m http.server 3400        # într-un terminal separat
node render.js stills                             # 12 imagini în ../export
```

Clipurile (conceptele 1 și 2):
```bash
node render.js video 1 9x16 /tmp/f-1-9x16         # cadre PNG la 30 fps
python3 ad_audio.py 1 8 flips-1.json /tmp/audio-1.wav
ffmpeg -framerate 30 -i /tmp/f-1-9x16/%04d.png -i /tmp/audio-1.wav -c:v libx264 -preset slow -crf 18 \
  -pix_fmt yuv420p -profile:v high -c:a aac -b:a 160k -shortest -movflags +faststart ../export/01-tabela-plecari_9x16.mp4
```
`flips-1.json` se obține din pagină: `JSON.stringify(window.__flips)` (momentul și numărul de pași ai fiecărei plăcuțe),
ca sunetul plăcuțelor să cadă exact pe imagine.
