import os, sys, zipfile

EXCLUDE_DIRS = {
'.git','.github','node_modules','dist','docs','test','scripts','__pycache__','.DS_Store','.claude'
}

EXCLUDE_EXTENSIONS = {'.py', '.pyc', '.zip'}

REQUIRED = ['manifest.json', os.path.join('public','icons','icon16.png')]

def should_skip(path):
    parts = os.path.normpath(path).split(os.sep)
    if any(part in EXCLUDE_DIRS for part in parts):
        return True
    _, ext = os.path.splitext(path)
    return ext in EXCLUDE_EXTENSIONS

if not os.path.exists('manifest.json'):
    print('ERROR: manifest.json not found. Run this script from the project root.')
    sys.exit(1)

with zipfile.ZipFile("extension.zip","w") as z:
    for root,dirs,files in os.walk("."):
        if should_skip(root):
            continue
        for f in files:
            path=os.path.join(root,f)
            if should_skip(path):
                continue
            z.write(path)

    names = z.namelist()
    for req in REQUIRED:
        normalized = os.path.normpath(req)
        if not any(os.path.normpath(n) == normalized for n in names):
            print(f'ERROR: Required file missing from ZIP: {req}')
            sys.exit(1)

print("extension.zip created")
