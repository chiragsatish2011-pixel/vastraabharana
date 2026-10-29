import bpy
import numpy as np

# Load image
img_path = r"c:\Users\chira\OneDrive\Documents\VA Website\storefront\public\images\models\hero_model_red.jpg"
out_path = r"c:\Users\chira\OneDrive\Documents\VA Website\storefront\public\images\models\hero_model_red_cutout.png"

img = bpy.data.images.load(img_path)
width = img.size[0]
height = img.size[1]
print(f"Loaded image: {width}x{height}")

# Blender image pixels are floats [0..1] in RGBA order, bottom-to-top
pixels = np.array(img.pixels[:], dtype=np.float32).reshape((height, width, 4))

# Compute brightness and color saturation
# Background is bright neutral studio white/light-grey:
# R > 0.90, G > 0.90, B > 0.90 and low saturation (difference between max and min channel < 0.08)
r = pixels[:, :, 0]
g = pixels[:, :, 1]
b = pixels[:, :, 2]

max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
diff_c = max_c - min_c

# Threshold for studio white background:
# Notice the floor has slight shadow at the very bottom, but the upper background is pure clean light
is_bg = (min_c > 0.88) & (diff_c < 0.09)

# Soft alpha feathering
alpha = np.ones((height, width), dtype=np.float32)

# Gradual fade for pixels between 0.82 and 0.92
bg_strength = np.clip((min_c - 0.84) / 0.08, 0.0, 1.0) * (diff_c < 0.09).astype(np.float32)
alpha = 1.0 - bg_strength

# Clean up top corners (definitely background)
alpha[:int(height * 0.15), :int(width * 0.25)] = np.minimum(alpha[:int(height * 0.15), :int(width * 0.25)], 1.0 - (min_c[:int(height * 0.15), :int(width * 0.25)] > 0.82).astype(np.float32))

pixels[:, :, 3] = alpha

# Save back to a new Blender image
out_img = bpy.data.images.new("cutout", width=width, height=height, alpha=True)
out_img.pixels = pixels.flatten().tolist()
out_img.filepath_raw = out_path
out_img.file_format = 'PNG'
out_img.save()

print(f"Successfully saved cutout to {out_path}")
