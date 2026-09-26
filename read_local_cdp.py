import os
import fitz
import docx

local_dir = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design'
out_file = r'd:\1.Antigravity Projects\12_Marine_Propeller_Shaft_Design\extracted_summary.txt'

with open(out_file, 'w', encoding='utf-8') as out:
    out.write("=== LOCAL CDP PROJECT EXTRACTION ===\n\n")

    # 1. Final Report PDF
    fr_pdf = os.path.join(local_dir, 'docs', 'Final_Report_CDP.pdf')
    if os.path.exists(fr_pdf):
        doc = fitz.open(fr_pdf)
        out.write(f"--- Final_Report_CDP.pdf (Total Pages: {len(doc)}) ---\n")
        # Extract title and table of contents and first 15 pages
        for i in range(min(20, len(doc))):
            text = doc[i].get_text()
            out.write(f"\n[Page {i+1}]\n{text}\n")

    # 2. Desided_Design_Parameters.docx
    des_doc = os.path.join(local_dir, 'docs', 'Desided_Design_Parameters.docx')
    if os.path.exists(des_doc):
        d = docx.Document(des_doc)
        out.write("\n--- Desided_Design_Parameters.docx ---\n")
        for p in d.paragraphs:
            if p.text.strip():
                out.write(p.text + "\n")
        for table in d.tables:
            out.write("\n[TABLE]\n")
            for row in table.rows:
                out.write(" | ".join([c.text.strip() for c in row.cells]) + "\n")

    # 3. CAD 2D drawing
    cad_pdf = os.path.join(local_dir, 'CAD', '2D_drawing.pdf')
    if os.path.exists(cad_pdf):
        doc = fitz.open(cad_pdf)
        out.write(f"\n--- 2D_drawing.pdf (Total Pages: {len(doc)}) ---\n")
        for i in range(len(doc)):
            out.write(f"\n[Page {i+1}]\n{doc[i].get_text()}\n")

print("Done extracting local docs! Summary written to", out_file)
