"""
Gradarea comună a fotografiilor site-ului: aceeași „culoare Danca Way” pe toate.

Originalele stau în assets/foto-originale/ și nu se modifică. Scriptul scrie în public/images/ fișierele gradate,
cu același nume și aceleași dimensiuni (deci src/data/images.ts rămâne valabil). Rulează-l după ce adaugi o fotografie:

    python3 scripts/grade.py            # toate
    python3 scripts/grade.py nume.jpg   # doar una

Pașii, în ordine (toți discreți, ca să nu pară „filtru”):
  1. balansul de alb tras 35% spre neutru (pozele de la amiază, de la apus și din studio ajung în aceeași familie);
  2. saturația la 82%;
  3. curbă de film: negrul ridicat la ~8/255, luminile comprimate la ~243/255 (cerul nu mai „arde”);
  4. umbrele trase spre albastrul-noapte al site-ului (#0B1426), luminile foarte puțin calde.
"""

import pathlib
import sys

import cv2
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "foto-originale"
DST = ROOT / "public" / "images"

NIGHT = np.array([38, 20, 11], np.float32) / 255  # #0B1426 în ordinea BGR a OpenCV
CURVE_X = np.array([0.0, 0.10, 0.25, 0.50, 0.75, 0.90, 1.0], np.float32)
CURVE_Y = np.array([0.03, 0.10, 0.235, 0.50, 0.765, 0.88, 0.955], np.float32)


def luma(x: np.ndarray) -> np.ndarray:
    return 0.0722 * x[..., 0] + 0.7152 * x[..., 1] + 0.2126 * x[..., 2]


def grade(bgr: np.ndarray) -> np.ndarray:
    x = bgr.astype(np.float32) / 255

    # 1. Balansul de alb: media tonurilor medii, trasă 35% spre gri
    l = luma(x)
    mid = (l > 0.15) & (l < 0.85)
    means = x[mid].mean(axis=0) if mid.any() else x.reshape(-1, 3).mean(axis=0)
    x = np.clip(x * (1 + 0.35 * (means.mean() / means - 1)), 0, 1)

    # 2. Saturația
    l = luma(x)[..., None]
    x = np.clip(l + 0.82 * (x - l), 0, 1)

    # 3. Curba de film, pe fiecare canal
    x = np.interp(x, CURVE_X, CURVE_Y).astype(np.float32)

    # 4. Umbre spre albastrul-noapte, lumini ușor calde
    l = luma(x)[..., None]
    shadows = (1 - l) ** 2
    highlights = l**2
    tint = NIGHT - NIGHT.mean()
    warm = np.array([-1, 0, 1], np.float32)  # BGR: mai puțin albastru, mai mult roșu
    x = x + shadows * tint * 0.45 + highlights * warm * 0.012
    return (np.clip(x, 0, 1) * 255 + 0.5).astype(np.uint8)


def main(names: list[str]) -> None:
    files = [SRC / n for n in names] if names else sorted(SRC.glob("*.jpg"))
    for f in files:
        img = cv2.imread(str(f), cv2.IMREAD_COLOR)
        if img is None:
            sys.exit(f"Nu pot citi {f}")
        out = DST / f.name
        cv2.imwrite(str(out), grade(img), [cv2.IMWRITE_JPEG_QUALITY, 90, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
        print(f"{f.name}: {img.shape[1]}×{img.shape[0]} → {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1:])
