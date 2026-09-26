import os
import fitz

local_dir = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design'
fr_pdf = os.path.join(local_dir, 'docs', 'Final_Report_CDP.pdf')
doc = fitz.open(fr_pdf)

out_path = os.path.join(local_dir, 'key_design_parameters.txt')

with open(out_path, 'w', encoding='utf-8') as out:
    out.write("=== EXTRACTED KEY DESIGN PARAMETERS FROM 208-PAGE FINAL REPORT ===\n\n")

    # Search for shaft parameters, engine power, RPM, torque, dimensions
    # Section 06.1 is around page 82-120
    # Material selection is around page 36-50
    # FEA is around page 120-135
    
    sections_to_extract = [
        ("EXECUTIVE SUMMARY", [9]),
        ("ENVIRONMENTAL ANALYSIS (Task 01 - Premakumara)", [12, 13, 14, 15, 20, 21, 28, 35]),
        ("MATERIAL SELECTION (Task 02 - Premakumara)", [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]),
        ("CORROSION PROTECTION", [50, 51, 60, 61, 70, 71, 80]),
        ("MECHANICAL DESIGN (Geometry, Torque, Power)", [82, 83, 88, 89, 90, 91, 92, 93, 94, 100, 101, 110, 111, 117, 118, 119]),
        ("FEA SIMULATION (Task 06 - Premakumara)", [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134]),
        ("CAD & DRAWINGS (Task 04 - Premakumara)", [135, 136, 137, 138]),
        ("PROCESS & QA", [139, 145, 157, 164, 174])
    ]

    for title, pages in sections_to_extract:
        out.write(f"\n{'='*30}\n{title}\n{'='*30}\n")
        for p in pages:
            if p <= len(doc):
                out.write(f"\n--- Page {p} ---\n")
                out.write(doc[p-1].get_text())

print("Key design parameters extracted to", out_path)
