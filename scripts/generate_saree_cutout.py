import bpy
import math
import os

print("=== Generating 3D Saree Model Cutout in Blender 5.2 ===")

# Reset scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# Configure transparent render settings
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.resolution_x = 1000
scene.render.resolution_y = 1500
scene.render.resolution_percentage = 100

# Set camera
cam_data = bpy.data.cameras.new("HeroCamera")
cam_obj = bpy.data.objects.new("HeroCamera", cam_data)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj
cam_obj.location = (0, -4.2, 1.45)
cam_obj.rotation_euler = (math.radians(82), 0, 0)

# Materials
def make_mat(name, color, metallic=0.0, roughness=0.4):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = color
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Roughness'].default_value = roughness
    return mat

mat_skin = make_mat("PorcelainMannequin", (0.92, 0.85, 0.78, 1.0), metallic=0.05, roughness=0.25)
mat_silk = make_mat("RoyalRaniPinkSilk", (0.82, 0.08, 0.32, 1.0), metallic=0.2, roughness=0.35)
mat_zari = make_mat("HeavyGoldZari", (0.98, 0.82, 0.28, 1.0), metallic=0.95, roughness=0.18)
mat_blouse = make_mat("EmeraldBlouse", (0.05, 0.42, 0.25, 1.0), metallic=0.3, roughness=0.3)
mat_hair = make_mat("EbonyHair", (0.04, 0.03, 0.03, 1.0), metallic=0.1, roughness=0.4)

# 1. Stylized Female Silhouette / Mannequin
# Head
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.22, location=(0, 0, 2.45))
head = bpy.context.active_object
head.scale = (0.85, 1.0, 1.15)
head.data.materials.append(mat_skin)

# Elegant Bun Hair
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.18, location=(0, 0.18, 2.52))
bun = bpy.context.active_object
bun.data.materials.append(mat_hair)

# Gold Maang Tikka & Jhumkas (Earrings)
bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=0.08, location=(0, -0.19, 2.58))
tikka = bpy.context.active_object
tikka.data.materials.append(mat_zari)

for x_side in [-0.22, 0.22]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.04, depth=0.08, location=(x_side, 0, 2.38))
    jhumka = bpy.context.active_object
    jhumka.data.materials.append(mat_zari)

# Slender Neck
bpy.ops.mesh.primitive_cylinder_add(radius=0.11, depth=0.32, location=(0, 0, 2.18))
neck = bpy.context.active_object
neck.data.materials.append(mat_skin)

# Heavy Temple Gold Choker Necklace
bpy.ops.mesh.primitive_torus_add(major_radius=0.14, minor_radius=0.025, location=(0, 0, 2.08))
choker = bpy.context.active_object
choker.rotation_euler = (math.radians(15), 0, 0)
choker.data.materials.append(mat_zari)

# Torso / Blouse
bpy.ops.mesh.primitive_cylinder_add(radius=0.28, depth=0.65, location=(0, 0, 1.75))
torso = bpy.context.active_object
torso.scale = (1.15, 0.75, 1.0)
torso.data.materials.append(mat_blouse)

# Arms in graceful pose
for x_side, rot in [(-0.38, 12), (0.38, -12)]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.075, depth=0.9, location=(x_side, 0, 1.5))
    arm = bpy.context.active_object
    arm.rotation_euler = (0, math.radians(rot), 0)
    arm.data.materials.append(mat_skin)
    # Gold bangles
    bpy.ops.mesh.primitive_torus_add(major_radius=0.085, minor_radius=0.015, location=(x_side*1.1, 0, 1.15))
    bangle = bpy.context.active_object
    bangle.data.materials.append(mat_zari)

# 2. Draped Saree (Skirt / Pleats)
bpy.ops.mesh.primitive_cylinder_add(radius=0.34, depth=1.5, location=(0, 0, 0.75))
skirt = bpy.context.active_object
skirt.scale = (1.2, 0.85, 1.0)
skirt.data.materials.append(mat_silk)

# Zari Gold Border Hem
bpy.ops.mesh.primitive_torus_add(major_radius=0.42, minor_radius=0.035, location=(0, 0, 0.05))
hem = bpy.context.active_object
hem.scale = (1.18, 0.85, 1.0)
hem.data.materials.append(mat_zari)

# Waist Chain (Kamarbandh)
bpy.ops.mesh.primitive_torus_add(major_radius=0.35, minor_radius=0.02, location=(0, 0, 1.48))
kamarbandh = bpy.context.active_object
kamarbandh.data.materials.append(mat_zari)

# Diagonal Saree Pallu sweeping across chest and shoulder
for i in range(12):
    t = i / 11.0
    px = -0.32 + t * 0.65
    py = -0.15 + t * 0.28
    pz = 1.35 + t * 0.65
    bpy.ops.mesh.primitive_cube_add(size=0.18, location=(px, py, pz))
    pleat = bpy.context.active_object
    pleat.scale = (0.9, 0.15, 0.4)
    pleat.rotation_euler = (math.radians(25), math.radians(15), math.radians(-35))
    pleat.data.materials.append(mat_silk)

# Large Flowing Pallu hanging behind left shoulder
bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=1.2, location=(-0.35, 0.25, 1.4))
flowing_pallu = bpy.context.active_object
flowing_pallu.scale = (0.4, 0.9, 1.0)
flowing_pallu.rotation_euler = (math.radians(10), math.radians(-5), 0)
flowing_pallu.data.materials.append(mat_zari)

# Lighting setup
# Key Light (Warm Sun)
light_key = bpy.data.lights.new(name="KeyLight", type='SUN')
light_key.energy = 4.0
light_key.color = (1.0, 0.95, 0.9)
obj_key = bpy.data.objects.new("KeyLight", light_key)
scene.collection.objects.link(obj_key)
obj_key.rotation_euler = (math.radians(45), math.radians(-25), 0)

# Fill Light (Cool Soft Sky)
light_fill = bpy.data.lights.new(name="FillLight", type='POINT')
light_fill.energy = 250.0
light_fill.color = (0.9, 0.95, 1.0)
obj_fill = bpy.data.objects.new("FillLight", light_fill)
scene.collection.objects.link(obj_fill)
obj_fill.location = (-2.0, -2.5, 2.0)

# Rim Light (Bright Gold Rim on Shoulders & Hair)
light_rim = bpy.data.lights.new(name="RimLight", type='POINT')
light_rim.energy = 400.0
light_rim.color = (1.0, 0.85, 0.5)
obj_rim = bpy.data.objects.new("RimLight", light_rim)
scene.collection.objects.link(obj_rim)
obj_rim.location = (0, 2.5, 3.0)

# Smooth shading for all meshes
for obj in scene.objects:
    if obj.type == 'MESH':
        for poly in obj.data.polygons:
            poly.use_smooth = True

out_dir = r"C:\Users\chira\OneDrive\Documents\VA Website\storefront\public\images"
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "hero_saree_model_cutout.png")
scene.render.filepath = out_path

print(f"Rendering transparent 3D saree model cutout to: {out_path}...")
bpy.ops.render.render(write_still=True)
print("=== Render Complete! Cutout PNG saved. ===")
