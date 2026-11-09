"""Copy ads/copy.json into ads/preview.html (the page must also open straight from disk, where fetch() is not allowed).
Usage: python3 -I ads/src/build-preview.py
"""
import json, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((root / "copy.json").read_text(encoding="utf-8"))
blob = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
page = root / "preview.html"
html, n = re.subn(r'(<script type="application/json" id="copy">).*?(</script>)', lambda m: m.group(1) + blob + m.group(2),
                  page.read_text(encoding="utf-8"), flags=re.S)
assert n == 1, "marker not found"
page.write_text(html, encoding="utf-8")
print("ok", page)
