import os
import shutil

base = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design'
web_public = os.path.join(base, 'web', 'public')

os.makedirs(web_public, exist_ok=True)
os.makedirs(os.path.join(web_public, 'figures'), exist_ok=True)
os.makedirs(os.path.join(web_public, 'docs'), exist_ok=True)

# 1. Copy extracted figures
fig_src = os.path.join(base, 'extracted_figures')
fig_dst = os.path.join(web_public, 'figures')
if os.path.exists(fig_src):
    for f in os.listdir(fig_src):
        if f.lower().endswith(('.png', '.jpg', '.svg')):
            shutil.copy2(os.path.join(fig_src, f), os.path.join(fig_dst, f))
            print(f"Copied figure: {f}")

# Also copy Ashby chart from MT_selection
ashby_src = os.path.join(base, 'MT_selection', 'Ashby_Chart_Fatigue_PREN.png')
if os.path.exists(ashby_src):
    shutil.copy2(ashby_src, os.path.join(fig_dst, 'ashby_chart_fatigue_pren_raw.png'))

# 2. Copy allowed PDF documents (NO speech, NO ppt)
doc_mappings = [
    (os.path.join(base, 'docs', 'Final_Report_CDP.pdf'), 'Marine_Propeller_Shaft_Final_Report_Group01.pdf'),
    (os.path.join(base, 'CAD', '2D_drawing.pdf'), '2D_Manufacturing_Drawing_Propeller_Shaft.pdf'),
    (os.path.join(base, 'MT_selection', 'MT_Selection_Final_Report.pdf'), 'Material_Selection_Ashby_Report.pdf'),
    (os.path.join(base, 'MT_selection', 'MT_Selection_Report_Ansys.pdf'), 'ANSYS_Granta_EduPack_Report.pdf'),
]

for src, dst_name in doc_mappings:
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(web_public, 'docs', dst_name))
        print(f"Copied doc: {dst_name}")

print("Assets successfully staged to web/public!")
