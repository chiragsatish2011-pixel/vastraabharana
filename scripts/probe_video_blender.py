import bpy
import os

video_path = r"C:\Users\chira\OneDrive\Documents\VA Website\Best Shopify Theme for Clothing Brands ???? #shopifythemes #shopifytemplate #ecommerce - Materia Themes (1080p, h264).mp4"
if not os.path.exists(video_path):
    video_path = r"C:\Users\chira\.gemini\antigravity\brain\7d258d2e-307f-4236-ac6d-fc116759d5b2\.user_uploaded\media_1793187465322_07e7f702.mp4"

print("Video exists:", os.path.exists(video_path))
print("Video path:", video_path)

scene = bpy.context.scene
scene.sequence_editor_create()
strip = scene.sequence_editor.sequences.new_movie(name="vid", filepath=video_path, channel=1, frame_start=1)

fps = scene.render.fps / scene.render.fps_base
total_frames = strip.frame_duration
duration_sec = total_frames / fps
res_x = strip.elements[0].orig_width
res_y = strip.elements[0].orig_height

print(f"FPS: {fps}")
print(f"Total Frames: {total_frames}")
print(f"Duration: {duration_sec:.2f} seconds ({duration_sec/60:.2f} minutes)")
print(f"Resolution: {res_x}x{res_y}")
