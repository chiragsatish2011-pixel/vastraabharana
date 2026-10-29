import bpy
import math
import os

print("=== Starting Blender 3D Model Generation for Vastraabharana ===")

# Reset scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# Create collection
collection = bpy.data.collections.new("VastraHeritageCollection")
scene.collection.children.link(collection)

# Helper function to assign material
def create_pbr_material(name, base_color, metallic=0.0, roughness=0.5, transmission=0.0, emission_color=(0,0,0,1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = base_color
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Roughness'].default_value = roughness
        if 'Transmission Weight' in bsdf.inputs:
            bsdf.inputs['Transmission Weight'].default_value = transmission
        elif 'Transmission' in bsdf.inputs:
            bsdf.inputs['Transmission'].default_value = transmission
        if emission_strength > 0 and 'Emission Color' in bsdf.inputs:
            bsdf.inputs['Emission Color'].default_value = emission_color
            if 'Emission Strength' in bsdf.inputs:
                bsdf.inputs['Emission Strength'].default_value = emission_strength
    return mat

# Materials:
# 1. Royal Dark Marble / Terracotta Base
mat_marble = create_pbr_material("RoyalMarble", (0.12, 0.06, 0.03, 1.0), metallic=0.1, roughness=0.25)

# 2. Brushed Temple Gold
mat_gold = create_pbr_material("TempleGold", (0.95, 0.76, 0.25, 1.0), metallic=0.95, roughness=0.18)

# 3. Mysore Silk (Rich Terracotta Magenta with Sheen)
mat_silk = create_pbr_material("MysoreSilk", (0.63, 0.12, 0.18, 1.0), metallic=0.15, roughness=0.35)

# 4. Zari Border (Golden embroidery)
mat_zari = create_pbr_material("GoldZari", (0.98, 0.82, 0.35, 1.0), metallic=0.9, roughness=0.2)

# 5. Ruby Gemstone (Deep Red Translucent)
mat_ruby = create_pbr_material("RubyGem", (0.85, 0.04, 0.12, 1.0), metallic=0.0, roughness=0.1, transmission=0.85)

# 6. Pearl Beads
mat_pearl = create_pbr_material("PearlBead", (0.96, 0.94, 0.90, 1.0), metallic=0.2, roughness=0.15)


# --- 1. BUILD PEDESTAL ---
# Base Tier
bpy.ops.mesh.primitive_cylinder_add(radius=1.6, depth=0.15, vertices=64, location=(0, 0, -0.65))
pedestal_base = bpy.context.active_object
pedestal_base.name = "Pedestal_Base"
pedestal_base.data.materials.append(mat_marble)

# Gold Trim Ring 1
bpy.ops.mesh.primitive_torus_add(major_radius=1.6, minor_radius=0.04, major_segments=64, minor_segments=16, location=(0, 0, -0.58))
gold_ring1 = bpy.context.active_object
gold_ring1.name = "GoldRing_Base"
gold_ring1.data.materials.append(mat_gold)

# Middle Tier Column
bpy.ops.mesh.primitive_cylinder_add(radius=1.35, depth=0.5, vertices=64, location=(0, 0, -0.35))
pedestal_mid = bpy.context.active_object
pedestal_mid.name = "Pedestal_Column"
pedestal_mid.data.materials.append(mat_marble)

# Gold Trim Ring 2
bpy.ops.mesh.primitive_torus_add(major_radius=1.35, minor_radius=0.035, major_segments=64, minor_segments=16, location=(0, 0, -0.1))
gold_ring2 = bpy.context.active_object
gold_ring2.name = "GoldRing_Mid"
gold_ring2.data.materials.append(mat_gold)

# Top Display Plinth
bpy.ops.mesh.primitive_cylinder_add(radius=1.45, depth=0.12, vertices=64, location=(0, 0, -0.04))
pedestal_top = bpy.context.active_object
pedestal_top.name = "Pedestal_Plinth"
pedestal_top.data.materials.append(mat_marble)

# Inlaid Gold Medallion on Top Plinth
bpy.ops.mesh.primitive_cylinder_add(radius=1.3, depth=0.01, vertices=64, location=(0, 0, 0.025))
plinth_gold_plate = bpy.context.active_object
plinth_gold_plate.name = "Plinth_GoldMedallion"
plinth_gold_plate.data.materials.append(mat_gold)


# --- 2. BUILD DRAPED LUXURY SILK FABRIC ---
# Create an elegant flowing silk ribbon/dupatta cascading across the pedestal
bpy.ops.mesh.primitive_grid_add(x_subdivisions=48, y_subdivisions=48, size=2.2, location=(0, 0, 0.25))
silk_cloth = bpy.context.active_object
silk_cloth.name = "Flowing_Silk_Saree"

# Shape the grid into organic sweeping folds using vertex displacement
mesh = silk_cloth.data
for v in mesh.vertices:
    x = v.co.x
    y = v.co.y
    # S-curve wave flow
    wave1 = math.sin(x * 3.5 + y * 2.0) * 0.18
    wave2 = math.cos(y * 4.0) * 0.12
    # Drape down on the sides
    dist_from_center = math.sqrt(x*x + y*y)
    droop = -0.35 * (dist_from_center ** 1.8) if dist_from_center > 0.6 else 0
    v.co.z = wave1 + wave2 + droop

# Add thickness with solidify modifier
mod_solid = silk_cloth.modifiers.new(name="Solidify", type='SOLIDIFY')
mod_solid.thickness = 0.015

# Smooth shading
bpy.ops.object.shade_smooth()
silk_cloth.data.materials.append(mat_silk)

# Silk Gold Zari Border Ribbon
bpy.ops.mesh.primitive_torus_add(major_radius=1.1, minor_radius=0.025, major_segments=48, minor_segments=12, location=(0, 0, 0.28))
silk_border = bpy.context.active_object
silk_border.name = "Silk_Zari_Border"
silk_border.scale = (1.0, 0.65, 0.4)
silk_border.rotation_euler = (math.radians(12), math.radians(8), math.radians(45))
silk_border.data.materials.append(mat_zari)


# --- 3. BUILD FLOATING TEMPLE JEWELRY ARTIFACT ---
# Central Royal Pendant floating majestically above the pedestal
pendant_z = 0.85

# Center Gold Medallion
bpy.ops.mesh.primitive_cylinder_add(radius=0.42, depth=0.06, vertices=48, location=(0, 0, pendant_z))
pendant_base = bpy.context.active_object
pendant_base.name = "Pendant_Base"
pendant_base.rotation_euler = (math.radians(90), 0, 0)
pendant_base.data.materials.append(mat_gold)

# Intricate Filigree Outer Rings
for r_scale in [0.46, 0.50]:
    bpy.ops.mesh.primitive_torus_add(major_radius=r_scale, minor_radius=0.015, major_segments=48, minor_segments=12, location=(0, 0, pendant_z))
    filigree = bpy.context.active_object
    filigree.name = f"Filigree_Ring_{r_scale}"
    filigree.rotation_euler = (math.radians(90), 0, 0)
    filigree.data.materials.append(mat_gold)

# Sunburst rays / Temple Petals around the pendant
num_petals = 16
for i in range(num_petals):
    angle = (2 * math.pi / num_petals) * i
    px = math.cos(angle) * 0.54
    pz = pendant_z + math.sin(angle) * 0.54
    bpy.ops.mesh.primitive_cone_add(radius1=0.035, radius2=0.005, depth=0.12, vertices=12, location=(px, 0, pz))
    petal = bpy.context.active_object
    petal.name = f"Temple_Petal_{i}"
    petal.rotation_euler = (math.radians(90), 0, angle - math.pi/2)
    petal.data.materials.append(mat_gold)

# Central Ruby Gemstone
bpy.ops.mesh.primitive_ico_sphere_add(radius=0.22, subdivisions=3, location=(0, -0.04, pendant_z))
ruby = bpy.context.active_object
ruby.name = "Ruby_Center_Gemstone"
ruby.scale = (1.0, 0.45, 1.0)
ruby.data.materials.append(mat_ruby)

# Small Ruby accent stones (compass points)
for angle_deg in [0, 90, 180, 270]:
    ang = math.radians(angle_deg)
    rx = math.cos(ang) * 0.32
    rz = pendant_z + math.sin(ang) * 0.32
    bpy.ops.mesh.primitive_ico_sphere_add(radius=0.06, subdivisions=2, location=(rx, -0.035, rz))
    accent_ruby = bpy.context.active_object
    accent_ruby.name = f"Accent_Ruby_{angle_deg}"
    accent_ruby.data.materials.append(mat_ruby)

# Hanging Pearl Drops at the bottom of the pendant
for offset_x in [-0.22, -0.11, 0.0, 0.11, 0.22]:
    drop_y = 0.0
    # parabolic drape curve
    drop_z = pendant_z - 0.62 - (0.08 * (1.0 - abs(offset_x)*2.5))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.045, segments=24, ring_count=16, location=(offset_x, drop_y, drop_z))
    pearl = bpy.context.active_object
    pearl.name = f"Pearl_Drop_{offset_x}"
    pearl.scale = (1.0, 1.0, 1.35) # teardrop pearl
    pearl.data.materials.append(mat_pearl)

    # Link pin to pendant
    pin_len = (pendant_z - 0.54) - drop_z
    pin_z = drop_z + pin_len/2
    bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=pin_len, vertices=12, location=(offset_x, 0, pin_z))
    pin = bpy.context.active_object
    pin.name = f"Gold_Pin_{offset_x}"
    pin.data.materials.append(mat_gold)


# --- 4. EXPORT TO GLB ---
out_dir = r"C:\Users\chira\OneDrive\Documents\VA Website\public\models"
os.makedirs(out_dir, exist_ok=True)
glb_path = os.path.join(out_dir, "vastra_heritage_3d.glb")

print(f"Exporting 3D scene to GLB: {glb_path}...")
bpy.ops.export_scene.gltf(
    filepath=glb_path,
    export_format='GLB',
    use_selection=False,
    export_apply=True,
    export_yup=True
)

file_size = os.path.getsize(glb_path)
print(f"GLB export successful! Size: {file_size / 1024:.2f} KB ({file_size / (1024*1024):.2f} MB)")
print("=== Blender 3D Model Generation Complete ===")
