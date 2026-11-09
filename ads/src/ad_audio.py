"""Original sound for the ad videos (no voice, readable without sound): soft pad, split-flap clicks synced to the
picture, the swallow's air (concept 2), a whoosh and a bell on the end card.
Usage: python3 -I ad_audio.py <concept> <duration> <flips.json> <out.wav>
"""
import json, subprocess, sys, wave
import numpy as np
from scipy.signal import butter, sosfilt

C, DUR, FLIPS, OUT = int(sys.argv[1]), float(sys.argv[2]), json.load(open(sys.argv[3])), sys.argv[4]
SR = 48000
N = int(SR * DUR)
rng = np.random.default_rng(3 + C)
mix = np.zeros((2, N))
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
def f(x, kind, *fr): return sosfilt(butter(2, fr if len(fr) > 1 else fr[0], kind, fs=SR, output="sos"), x)
def put(sig, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N: return
    s = sig[: N - i]
    mix[0, i:i + len(s)] += s * g * np.sqrt(0.5 * (1 - pan)); mix[1, i:i + len(s)] += s * g * np.sqrt(0.5 * (1 + pan))

# pad: A minor add9, slow fade in, held under the whole spot
t = np.arange(N) / SR
pad = sum(np.sin(2 * np.pi * hz(m) * 2 ** (d / 12) * t + rng.uniform(0, 6)) for m in (57, 60, 64, 71) for d in (-0.08, 0, 0.08))
pad = f(pad, "low", 1500) * np.minimum(1, t / 1.2) * np.minimum(1, (DUR - t) / 0.8) / 12
mix += np.stack([pad, pad]) * 0.35
# split-flap clicks
def click():
    n = int(0.011 * SR); return f(rng.standard_normal(n), "high", 2300) * np.exp(-np.arange(n) / SR * 430)
for k, (at, n) in enumerate(FLIPS):
    for st in range(int(n) + 1):
        put(click(), at + st * 0.055 + rng.uniform(0, 0.006), g=0.09 if st == n else 0.05, pan=-0.6 + (k % 9) * 0.15)
# swallow (concept 2): air from left to right, a small chime when it lands
if C == 2:
    n = int(2.0 * SR); air = f(rng.standard_normal(n), "band", 500, 2600) * np.sin(np.linspace(0, np.pi, n)) ** 2
    pan = np.linspace(-0.9, 0.9, n); i = int(0.15 * SR)
    mix[0, i:i + n] += air * 0.12 * np.sqrt(0.5 * (1 - pan)); mix[1, i:i + n] += air * 0.12 * np.sqrt(0.5 * (1 + pan))
# end card: whoosh + bell
def whoosh(L=0.5):
    n = int(L * SR); x = rng.standard_normal(n); o = np.zeros(n); seg = n // 10
    for i in range(10):
        lo = 400 + 4000 * (i / 10) ** 1.5; a = i * seg; b = min(n, (i + 2) * seg)
        o[a:b] += f(x[a:b], "band", lo, lo * 2.2)[: b - a] * np.hanning(b - a)
    return o * np.linspace(0.2, 1, n) ** 2
def bell(m, L=2.2):
    n = int(L * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * hz(m) * tt) + 0.3 * np.sin(2 * np.pi * 2.76 * hz(m) * tt) * np.exp(-tt * 6)) * np.exp(-tt * 2.3)
put(whoosh(), 5.45, g=0.2)
put(bell(81), 5.95, g=0.14); put(bell(88), 6.1, g=0.07, pan=0.3)
if C == 2:
    put(bell(88), 2.15, g=0.06, pan=0.5)
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= 0.9 / np.max(np.abs(mix))
with wave.open("/tmp/_ad_raw.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix.T * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", "/tmp/_ad_raw.wav", "-af", "loudnorm=I=-16:TP=-1.5:LRA=9", "-ar", "48000", OUT], check=True)
print("ok", OUT)
