# Producing the hero turnaround sequence

The hero needs ~48 frames of you rotating 360° (or 180°, mirrored), evenly
spaced, with a locked camera and consistent lighting. Three ways to get them.

---

## Option A — Film it yourself (recommended)

Highest quality, costs nothing, ~30 minutes. It's genuinely you, which is the
whole point of a portfolio.

**Setup**
- Phone on a tripod, horizontal, chest height, ~2m away
- Lock exposure and focus (long-press on your face on iPhone/Android)
- Shoot 4K/60 if available, plain wall behind you
- One soft key light slightly off-centre; avoid overhead ceiling light

**Performance**
- Stand on a marked spot so you don't drift out of frame
- Rotate *slowly and evenly* over ~20 seconds — a rotating stool or lazy-Susan
  gives a much smoother result than stepping around
- Keep your head level and expression steady; the rotation should be the only
  thing changing

**Extract frames**

ffmpeg isn't installed on this machine yet:

```bash
brew install ffmpeg
```

Then, for 48 evenly spaced frames from a 20s clip:

```bash
ffmpeg -i turnaround.mov -vf "fps=48/20,scale=1200:-1" -q:v 2 frames/frame_%03d.png
```

Convert to WebP and renumber from 000:

```bash
cd frames
for f in *.png; do cwebp -q 82 "$f" -o "${f%.png}.webp"; done
```

Target 40–60KB per frame — 48 frames ≈ 2–3MB total, which is the whole budget
for the effect.

**Cleanup (optional but worth it)**
Remove.bg or Photoshop's subject-select can knock out the background so the
figure floats on the dark gradient, exactly like the reference.

---

## Option B — AI video generation

You asked specifically about this. Honest assessment: **it works, with caveats.**

**Tools that can do it (as of early 2026)**
| Tool | Approach | Notes |
|---|---|---|
| Runway Gen-4 | Image → video, camera-orbit prompt | Best identity retention of the video tools |
| Kling 2.x | Image → video | Strong on human motion; generous free tier |
| Luma Dream Machine | Image → video, "orbit" camera | Fast, cheap, slightly softer output |
| Pika | Image → video | Good for short clips |
| Hedra / HeyGen | Avatar from one photo | Purpose-built for talking heads, less so for orbits |

**Prompt shape that works**

> Camera slowly orbits 360 degrees around a person standing still, centered,
> studio lighting, plain dark background, photorealistic, subject remains
> perfectly still, no facial expression change, smooth continuous motion

Start from **one very good photo of you** (image-to-video, not text-to-video) —
that's what keeps it recognisably you.

**The caveats, plainly**
1. **Identity drift.** Faces morph during rotation. At 5–8 second clips it's
   usually acceptable; longer and it degrades. This is the big one.
2. **Backs of heads are invented.** The model has never seen your hair from
   behind, so it guesses. Often plausible, occasionally wrong.
3. **Temporal flicker.** Clothing details and hair shift frame to frame, which
   the scrub *exaggerates* because the viewer controls the speed and can stop
   on any frame.
4. **Cost.** Roughly $0.05–0.50/second depending on tool and tier.

**Mitigation:** generate a **180° orbit instead of 360°** (front → profile),
then mirror the sequence for the return. You never show the back of the head,
which removes the worst failure mode. This is what I'd actually do.

**A better hybrid:** shoot real photos at 8–12 angles yourself, then use an AI
frame-interpolation tool (RIFE, Topaz Video AI, or FILM) to generate the
in-between frames up to 48. You get real likeness at every key angle and AI
only fills smooth transitions — far more robust than generating the whole
rotation.

---

## Option C — 3D scan

iPhone with LiDAR + Polycam or KIRI Engine produces a 3D model you can render
from any angle, perfectly consistent. Highest effort, most control, and the
result can look slightly uncanny without cleanup. Worth it only if you want to
reuse the model elsewhere.

---

## Recommendation

1. **Try Option A first.** A tripod and a rotating stool beats every AI tool for
   this specific shot, and you control it completely.
2. **If you want it done in ten minutes**, use Option B with a 180° orbit and
   mirror it.
3. **If Option A's rotation comes out jerky**, rescue it with the hybrid — real
   angles plus AI interpolation.

Meanwhile the site runs on placeholder frames, so nothing is blocked.
