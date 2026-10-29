import bpy
import numpy as np
from collections import deque

img_path = r"c:\Users\chira\OneDrive\Documents\VA Website\storefront\public\images\models\hero_model_red.jpg"
out_path = r"c:\Users\chira\OneDrive\Documents\VA Website\storefront\public\images\models\hero_model_cutout_clean.png"

img = bpy.data.images.load(img_path)
w, h = img.size[0], img.size[1]
print(f"Dimensions: {w}x{h}")

# In Blender, img.pixels is RGBA, floats [0..1]
raw = np.array(img.pixels[:], dtype=np.float32).reshape((h, w, 4))

# Convert to 8-bit RGB for fast processing
rgb = (raw[:, :, :3] * 255.0).astype(np.uint8)

# In Blender, row 0 is bottom, row h-1 is top
# Background is off-white cyc: R, G, B all > 215, and color difference (max - min) < 28
r = rgb[:, :, 0].astype(int)
g = rgb[:, :, 1].astype(int)
b = rgb[:, :, 2].astype(int)

max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
diff_c = max_c - min_c

# Floor shadow has slight darkening (up to 190 near floor), background walls are > 215
is_likely_bg = (min_c > 200) & (diff_c < 30)

# Also for the floor near bottom:
# rows 0 to 150 (bottom of image)
is_likely_bg[:150, :] = (min_c[:150, :] > 185) & (diff_c[:150, :] < 25)

# Connected flood-fill from edges (corners and perimeter)
is_bg = np.zeros((h, w), dtype=bool)
queue = deque()

# Seed from perimeter
for x in range(w):
    if is_likely_bg[h - 1, x]: # top row in Blender
        queue.append((h - 1, x))
        is_bg[h - 1, x] = True
    if is_likely_bg[0, x]: # bottom row
        queue.append((0, x))
        is_bg[0, x] = True

for y in range(h):
    if is_likely_bg[y, 0]: # left col
        queue.append((y, 0))
        is_bg[y, 0] = True
    if is_likely_bg[y, w - 1]: # right col
        queue.append((y, w - 1))
        is_bg[y, w - 1] = True

print("Running flood fill...")
while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w:
            if not is_bg[ny, nx] and is_likely_bg[ny, nx]:
                is_bg[ny, nx] = True
                queue.append((ny, nx))

# Now construct smooth alpha channel
alpha = np.ones((h, w), dtype=np.float32)
alpha[is_bg] = 0.0

# Slight anti-aliasing on transition boundary
# Dilate background mask by 1 pixel with 0.5 alpha
boundary = np.zeros((h, w), dtype=bool)
for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
    shifted_bg = np.roll(np.roll(is_bg, dy, axis=0), dx, axis=1)
    boundary |= (shifted_bg & ~is_bg)

alpha[boundary] = 0.5

# Put alpha into RGBA
output_pixels = raw.copy()
output_pixels[:, :, 3] = alpha

out_img = bpy.data.images.new("clean_cutout", width=w, height=h, alpha=True)
out_img.pixels = output_pixels.flatten().tolist()
out_img.filepath_raw = out_path
out_img.file_format = 'PNG'
out_img.save()

print(f"Saved clean cutout to {out_path}")
