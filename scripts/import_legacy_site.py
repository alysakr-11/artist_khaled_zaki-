"""Import content from the legacy khaled-zaki.com static site.

One-off migration script. It reads a local mirror of the old site
(HTML pages + images) and writes:

  public/art/**            re-encoded artwork images
  src/content/generated/*  JSON consumed by the Next.js app

Usage:
  python3 scripts/import_legacy_site.py <mirror-dir>

<mirror-dir> must contain the legacy pages (stone.html, bronze.html, ...),
newspages/*.html and the original image tree (pictures/, images/).
Requires: beautifulsoup4, Pillow.
"""

import base64
import io
import json
import re
import sys
import unicodedata
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = ROOT / "src" / "content" / "generated"
MAX_EDGE = 2000


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("​", "")).strip()


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def soup(path: Path) -> BeautifulSoup:
    return BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")


def export_image(src: Path, dest_rel: str) -> dict:
    """Re-encode an image into public/, returning its size and a blur placeholder."""
    dest = PUBLIC / dest_rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    im = im.convert("RGB")
    if max(im.size) > MAX_EDGE:
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    im.save(dest, "JPEG", quality=86, optimize=True, progressive=True)

    tiny = im.copy()
    tiny.thumbnail((16, 16))
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=40)
    blur = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
    return {"src": "/" + dest_rel, "width": im.width, "height": im.height, "blur": blur}


# ---------------------------------------------------------------- sculptures

DIMENSION_RE = re.compile(r"\d\s*[xX×]\s*\d|height|meter", re.I)
YEAR_RE = re.compile(r"\b(19|20)\d{2}\b")


SMALL_WORDS = {"a", "an", "and", "at", "by", "for", "from", "in", "of", "on", "the", "to", "with"}

# Obvious spelling slips in the legacy markup.
TYPOS = {"Magitian": "Magician", "GreenPorphyry": "Green Porphyry"}


def fix_typos(text: str) -> str:
    for wrong, right in TYPOS.items():
        text = text.replace(wrong, right)
    return text


def title_case(text: str) -> str:
    words = text.split(" ")
    out = []
    for i, word in enumerate(words):
        lower = word.lower()
        if i and lower in SMALL_WORDS:
            out.append(lower)
        elif word.startswith("("):
            out.append("(" + word[1:2].upper() + word[2:].lower())
        else:
            out.append(word[:1].upper() + word[1:].lower())
    return " ".join(out)


def normalise_dimensions(text: str) -> str:
    text = re.sub(r"\s*[xX×]\s*", " × ", text)
    text = re.sub(r"(\d)(cm)\b", r"\1 \2", text)
    text = re.sub(r"\bMeter\b", "meter", text)
    return clean(text)


def parse_sculpture(li: Tag, page: BeautifulSoup) -> dict:
    content_id = li["data-content"].lstrip("#")
    block = page.find(id=content_id)  # first match, as the legacy plugin did
    title = clean(li.h4.get_text())
    title = re.sub(r",?\s*(19|20)\d{2}$", "", title)
    title = title_case(fix_typos(title))
    summary = clean(li.p.get_text()) if li.p else ""

    lines = []
    images = []
    if block is not None:
        para = block.select_one(".main p")
        if para:
            lines = [clean(x) for x in para.get_text("\n").split("\n") if clean(x)]
        images = [a["href"] for a in block.select("a.fancybox")]
    cover = li.img["src"]
    if cover in images:
        images.remove(cover)
    images.insert(0, cover)

    year_match = YEAR_RE.search(summary) or YEAR_RE.search(" ".join(lines))
    year = year_match.group(0) if year_match else None

    dimensions = next((normalise_dimensions(l) for l in lines if DIMENSION_RE.search(l)), None)
    note = next((l for l in lines if "Biennale" in l), None)

    medium = fix_typos(re.sub(r"\s*-\s*(19|20)\d{2}$", "", summary).strip())
    location = None
    if note:
        # Venice Biennale works: the summary line holds the medium, the note the venue.
        year = "2013"
        note = "55th Venice Biennale, Egyptian Pavilion"
    if medium.startswith("Gate of"):
        # "The Sad Woman – Granite": the summary line is its site, not its medium.
        location = medium
        medium = "Granite"
        title = "The Sad Woman"

    return {
        "title": title,
        "year": year,
        "medium": medium or None,
        "dimensions": dimensions,
        "note": note,
        "location": location,
        "images": images,
    }


def import_sculptures(mirror: Path) -> list:
    collections = [
        ("stone", "stone.html"),
        ("bronze", "bronze.html"),
        ("old-works", "oldworks.html"),
    ]
    result = []
    for key, filename in collections:
        page = soup(mirror / filename)
        works = []
        used = set()
        for li in page.select("ul.list > li"):
            work = parse_sculpture(li, page)
            slug = slugify(work["title"])
            base, n = slug, 2
            while slug in used:
                slug = f"{base}-{n}"
                n += 1
            used.add(slug)
            exported = []
            for i, rel in enumerate(work.pop("images"), start=1):
                exported.append(export_image(mirror / rel, f"art/sculptures/{key}/{slug}-{i}.jpg"))
            works.append({"slug": slug, **work, "images": exported})
        result.append({"key": key, "works": works})
        print(f"{key}: {len(works)} works")
    return result


# ------------------------------------------------------------------ drawings

def import_drawings(mirror: Path) -> list:
    series = [
        ("figures", "figures.html"),
        ("profiles", "profiles.html"),
        ("sitting-people", "sitting_people.html"),
        ("sufis", "sufis.html"),
        ("time-to-return", "time_to_return_exhibition.html"),
    ]
    result = []
    for key, filename in series:
        page = soup(mirror / filename)
        sheets = []
        for i, a in enumerate(page.select("ul.gallery a"), start=1):
            sheets.append(export_image(mirror / a["href"], f"art/drawings/{key}/{i}.jpg"))
        result.append({"key": key, "sheets": sheets})
        print(f"{key}: {len(sheets)} drawings")
    return result


# ---------------------------------------------------------------------- news

def paragraph_lines(p: Tag) -> list:
    """Split a <p> into lines at <br>, keeping bold speaker labels and questions."""
    lines, current = [], []

    def flush():
        parts = [seg for seg in current if seg["text"].strip()]
        if parts:
            parts[0]["text"] = parts[0]["text"].lstrip()
            parts[-1]["text"] = parts[-1]["text"].rstrip()
            lines.append(parts)
        current.clear()

    for node in p.children:
        if isinstance(node, NavigableString):
            text = re.sub(r"[ \t\r\n]+", " ", str(node).replace("​", ""))
            current.append({"text": text})
        elif node.name == "br":
            flush()
        elif node.name == "b":
            current.append({"text": clean(node.get_text()) + " ", "kind": "label"})
        elif node.name == "span":
            current.append({"text": re.sub(r"\s+", " ", node.get_text()), "kind": "question"})
        else:
            current.append({"text": re.sub(r"\s+", " ", node.get_text())})
    flush()
    return lines


def import_news_bodies(mirror: Path) -> dict:
    bodies = {}
    for page in sorted((mirror / "newspages").glob("*.html")):
        s = soup(page)
        container = s.select_one(".newscontent") or s.body
        paragraphs = [paragraph_lines(p) for p in container.find_all("p")]
        paragraphs = [p for p in paragraphs if p]
        images = []
        for img in container.find_all("img"):
            rel = img["src"].replace("../", "")
            name = Path(rel).stem
            images.append(export_image(mirror / rel, f"art/news/{slugify(name)}.jpg"))
        bodies[page.stem] = {"paragraphs": paragraphs, "images": images}
        print(f"news/{page.stem}: {len(paragraphs)} paragraphs, {len(images)} images")
    return bodies


# ---------------------------------------------------------------------- misc

def import_site_images(mirror: Path) -> dict:
    home = [export_image(mirror / f"images/portfolio/{n:02d}.jpg", f"art/home/{n:02d}.jpg") for n in range(1, 11)]
    portrait = export_image(mirror / "images/bio.jpg", "art/site/portrait.jpg")
    heist = export_image(mirror / "images/news/sum_9.jpg", "art/news/heist-the-pregnant.jpg")
    return {"home": home, "portrait": portrait, "heist": heist}


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    mirror = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    data = {
        "sculptures": import_sculptures(mirror),
        "drawings": import_drawings(mirror),
    }
    (OUT / "collections.json").write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
    (OUT / "news-bodies.json").write_text(
        json.dumps(import_news_bodies(mirror), ensure_ascii=False, indent=1) + "\n"
    )
    (OUT / "site-images.json").write_text(
        json.dumps(import_site_images(mirror), ensure_ascii=False, indent=1) + "\n"
    )


if __name__ == "__main__":
    main()
