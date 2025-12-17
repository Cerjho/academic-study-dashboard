import PyPDF2
import json
import sys

pdf_path = r'c:\Data Analysis\academic-study-dashboard\The Impact of Enrollment Status on Academic Achievement_ A Comparative Study of Regular and Irregular Students in the Mabini College Computer Science Program.pdf'

try:
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        full_text = ''
        for page in reader.pages:
            full_text += page.extract_text()
        
        # Extract sections
        insights = {}
        
        # Find Abstract
        if 'Abstract' in full_text:
            start = full_text.find('Abstract')
            end = full_text.find('Introduction', start)
            if end == -1:
                end = start + 800
            insights['abstract'] = full_text[start:end].strip()[:500]
        
        # Find Key Findings
        if 'Key Findings' in full_text:
            start = full_text.find('Key Findings')
            end = full_text.find('Implications', start)
            if end == -1:
                end = full_text.find('Discussion', start)
            if end == -1:
                end = start + 1000
            insights['keyFindings'] = full_text[start:end].strip()[:800]
        
        # Find Methodology
        if 'Methodology' in full_text or 'Method' in full_text:
            start = full_text.find('Methodology')
            if start == -1:
                start = full_text.find('Method')
            end = full_text.find('Results', start)
            if end == -1:
                end = full_text.find('Findings', start)
            if end == -1:
                end = start + 800
            insights['methodology'] = full_text[start:end].strip()[:600]
        
        # Find statistical significance
        if 'significant' in full_text.lower() or 'p-value' in full_text.lower():
            p_idx = full_text.lower().find('p-value')
            if p_idx > 0:
                insights['statSig'] = full_text[max(0, p_idx-100):p_idx+200].strip()
        
        print(json.dumps(insights, indent=2))
        
except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)
