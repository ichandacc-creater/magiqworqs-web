from pathlib import Path
from PyPDF2 import PdfReader

pdfs = [
    Path('Magiq Worqs Brand Identity Guide.pdf'),
    Path('About.pdf'),
    Path('patterns.pdf'),
]

for pdf in pdfs:
    print('\n==== ' + pdf.name + ' ====')
    try:
        reader = PdfReader(str(pdf))
        text = ''
        for page in reader.pages:
            page_text = page.extract_text() or ''
            text += page_text + '\n'
        print(text[:6000])
    except Exception as e:
        print('ERROR:', e)
