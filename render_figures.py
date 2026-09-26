import fitz
import os

pdf_path = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design\docs\Final_Report_CDP.pdf'
out_dir = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design\extracted_figures'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Pages of critical figures:
# Page 1: Cover
# Page 120-135: CAD & FEA
# Page 40-47: Ashby Charts
# Page 50, 118, 119: Shaft Geometry
# Page 135-138: 3D CAD models
pages_to_render = [
    (1, "cover_page.png"),
    (40, "ashby_yield_density.png"),
    (42, "ashby_fatigue_pren.png"),
    (45, "ashby_cost_strength.png"),
    (50, "shaft_geometry_overview.png"),
    (118, "shaft_length_cad.png"),
    (119, "shaft_final_render.png"),
    (124, "fea_load_vectors.png"),
    (125, "fea_mesh_coarse.png"),
    (126, "fea_7zone_partition.png"),
    (127, "fea_mesh_refinement.png"),
    (128, "fea_stress_optimized.png"),
    (129, "fea_stress_hotspot_year0.png"),
    (131, "fea_stress_corroded_year10.png"),
    (135, "cad_3d_model_isometric.png"),
    (136, "cad_flange_and_thread.png"),
    (137, "cad_2d_draft_elevation.png"),
]

for p_num, out_name in pages_to_render:
    if p_num <= len(doc):
        page = doc[p_num - 1]
        pix = page.get_pixmap(dpi=180)
        pix.save(os.path.join(out_dir, out_name))
        print(f"Rendered page {p_num} -> {out_name}")

# Also render 2D_drawing.pdf
cad_2d_path = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design\CAD\2D_drawing.pdf'
if os.path.exists(cad_2d_path):
    cad_doc = fitz.open(cad_2d_path)
    for i in range(len(cad_doc)):
        pix = cad_doc[i].get_pixmap(dpi=200)
        pix.save(os.path.join(out_dir, f"engineering_drawing_sheet_{i+1}.png"))
        print(f"Rendered 2D drawing sheet {i+1}")

print("Rendering complete!")
