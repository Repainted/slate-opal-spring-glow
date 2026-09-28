#!/usr/bin/env python3
"""Compose Instagram Stories 1080×1920 for Lepini Digital / Lab."""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1080, 1920
OUT = Path("/workspace/public/storie-ig")
OUT.mkdir(parents=True, exist_ok=True)

NAVY = (23, 22, 26, 255)
NAVY2 = (35, 33, 30, 255)
CREAM = (237, 224, 200, 255)
CREAM_SOFT = (245, 238, 221, 255)
COPPER = (181, 113, 58, 255)
COPPER_L = (206, 139, 78, 255)
INK = (22, 20, 16, 255)
INK_SOFT = (92, 86, 76, 255)
PAPER = (243, 239, 230, 255)
OLIVE = (108, 122, 75, 255)

FONT_REG = "/tmp/igfonts/EBGaramond-Regular.ttf"
FONT_ITA = "/tmp/igfonts/EBGaramond-Italic.ttf"
SANS = "/tmp/igfonts/sans.ttf"
SANS_B = "/tmp/igfonts/sans-bold.ttf"

LOGO_D = "/workspace/public/images/brand/digital-lockup.png"
LOGO_L = "/workspace/public/images/brand/lab-lockup.png"
MARK_D = "/workspace/public/images/brand/digital-mark.png"
MARK_L = "/workspace/public/images/brand/lab-mark.png"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def cover(src: str | Path, w: int = W, h: int = H) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    im = im.resize((max(1, int(iw * scale)), max(1, int(ih * scale))), Image.Resampling.LANCZOS)
    x = (im.width - w) // 2
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def contain(src: str | Path, max_w: int, max_h: int) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    iw, ih = im.size
    scale = min(max_w / iw, max_h / ih)
    return im.resize((max(1, int(iw * scale)), max(1, int(ih * scale))), Image.Resampling.LANCZOS)


def round_img(im: Image.Image, r: int) -> Image.Image:
    im = im.convert("RGBA")
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, im.width, im.height), r, fill=255)
    im.putalpha(mask)
    return im


def paper_bg() -> Image.Image:
    img = Image.new("RGBA", (W, H), PAPER)
    px = img.load()
    rng = random.Random(7)
    for i in range(18000):
        x, y = rng.randrange(W), rng.randrange(H)
        v = rng.randint(-18, 12)
        r, g, b, a = px[x, y]
        px[x, y] = (max(0, min(255, r + v)), max(0, min(255, g + v - 1)), max(0, min(255, b + v - 2)), 255)
    # warm radial
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(14, 0, -1):
        a = 10
        rad = 220 + i * 90
        od.ellipse((W // 2 - rad, 420 - rad, W // 2 + rad, 420 + rad), fill=(255, 236, 200, a))
    img = Image.alpha_composite(img, overlay)
    d = ImageDraw.Draw(img)
    d.line((120, 150, W - 120, 150), fill=(22, 20, 16, 30), width=1)
    return img


def navy_bg() -> Image.Image:
    img = Image.new("RGBA", (W, H), NAVY)
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    d.ellipse((-200, 900, 900, 2100), fill=(181, 113, 58, 28))
    d.ellipse((400, -400, 1600, 700), fill=(206, 139, 78, 18))
    return Image.alpha_composite(img, ov)


def veil(img: Image.Image, top: int = 260, bot: int = 420) -> Image.Image:
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for i in range(top):
        a = int(210 * (1 - i / top))
        d.line((0, i, W, i), fill=(17, 16, 20, a))
    for i in range(bot):
        a = int(230 * (i / bot))
        y = H - bot + i
        d.line((0, y, W, y), fill=(17, 16, 20, a))
    return Image.alpha_composite(img, ov)


def paste(base: Image.Image, im: Image.Image, xy: tuple[int, int]) -> None:
    base.alpha_composite(im, xy)


def logo(path: str, width: int) -> Image.Image:
    im = Image.open(path).convert("RGBA")
    h = int(im.height * (width / im.width))
    return im.resize((width, h), Image.Resampling.LANCZOS)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, max_w: int) -> list[str]:
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text_block(draw, text, fnt, xy, fill, max_w, line_h, align="left"):
    x, y = xy
    lines = wrap(draw, text, fnt, max_w)
    for line in lines:
        tw = draw.textlength(line, font=fnt)
        lx = x if align != "center" else x + (max_w - tw) / 2
        draw.text((lx, y), line, font=fnt, fill=fill)
        y += line_h
    return y


def kicker(draw, text, y, fill=COPPER_L, center=True):
    f = font(SANS_B, 22)
    tw = draw.textlength(text, font=f)
    x = (W - tw) / 2 if center else 80
    draw.text((x, y), text, font=f, fill=fill)
    return y + 36


def save(img: Image.Image, name: str) -> Path:
    rgb = img.convert("RGB")
    p = OUT / name
    rgb.save(p, "JPEG", quality=92, optimize=True)
    print("wrote", p.name, p.stat().st_size)
    return p


# ── 01 cover ──────────────────────────────────────────────
def story_01():
    img = paper_bg()
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_D, 720), (180, 220))
    y = 720
    kicker(d, "MONTELANICO  ·  MONTI LEPINI", y, COPPER, True)
    y = 790
    f = font(FONT_ITA, 92)
    y = text_block(d, "Strumenti digitali per chi lavora davvero.", f, (90, y), INK, 900, 102, "center")
    f2 = font(FONT_REG, 36)
    text_block(
        d,
        "Gestionali snelli, identità, passaggio generazionale. Non una vetrina da chiudere dopo tre mesi.",
        f2,
        (110, y + 40),
        INK_SOFT,
        860,
        48,
        "center",
    )
    d.text((W / 2, 1760), "lepinidigital.com", font=font(SANS_B, 28), fill=COPPER, anchor="mm")
    save(img, "01-cover.jpg")


# ── 02 banco ──────────────────────────────────────────────
def story_02():
    img = veil(cover("/workspace/public/images/digitale/close-morsa.jpg"), 200, 500)
    d = ImageDraw.Draw(img)
    paste(img, logo(MARK_D, 160), (460, 200))
    kicker(d, "IL PROBLEMA", 400)
    f = font(FONT_ITA, 78)
    text_block(d, "Excel. Carta. WhatsApp.", f, (80, 460), CREAM, 920, 90, "center")
    f2 = font(FONT_REG, 40)
    text_block(
        d,
        "Lo storico se ne va con chi va in pensione. I preventivi si fanno a mano. Il magazzino non parla col banco.",
        f2,
        (100, 780),
        CREAM_SOFT,
        880,
        52,
        "center",
    )
    d.text((W / 2, 1740), "Lepini Digital  ·  Montelanico", font=font(SANS, 24), fill=COPPER_L, anchor="mm")
    save(img, "02-banco.jpg")


# ── 03 cosa facciamo ──────────────────────────────────────
def story_03():
    img = paper_bg()
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_D, 520), (280, 180))
    kicker(d, "COSA FACCIAMO", 430, COPPER, True)
    items = [
        ("01", "Continuità dei dati", "Recuperiamo Excel, carta, vecchi archivi. Non si ricomincia da zero."),
        ("02", "Gestionali snelli", "Giacenze, ordini, DDT, preventivi. Dal PC del banco o dal telefono in cantiere."),
        ("03", "Automazione vera", "Margini, sconti, PDF. Calcoli precisi — non stime dell’intelligenza artificiale."),
        ("04", "Presenza web", "Siti veloci, senza cookie. Assistenti ancorati al catalogo reale."),
    ]
    y = 500
    for code, t, b in items:
        d.text((90, y), code, font=font(SANS_B, 22), fill=COPPER)
        d.text((180, y - 8), t, font=font(FONT_REG, 44), fill=INK)
        text_block(d, b, font(FONT_REG, 28), (180, y + 48), INK_SOFT, 780, 36)
        y += 230
    save(img, "03-offerta.jpg")


# ── 04 portale ────────────────────────────────────────────
def story_04():
    img = veil(cover("/workspace/screenshots/ig/natura.png"), 300, 520)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_D, 480), (300, 180))
    kicker(d, "IL PORTALE", 430)
    f = font(FONT_ITA, 78)
    text_block(d, "26 comuni. Enciclopedia del crinale.", f, (80, 490), CREAM, 920, 88, "center")
    f2 = font(FONT_REG, 36)
    text_block(
        d,
        "Flora, fauna, sentieri, schede. L’abbiamo costruito noi — per mostrare alle imprese cosa si può fare.",
        f2,
        (100, 720),
        CREAM_SOFT,
        880,
        48,
        "center",
    )
    d.text((W / 2, 1740), "lepinidigital.com", font=font(SANS_B, 26), fill=COPPER_L, anchor="mm")
    save(img, "04-portale.jpg")


# ── 05 lab ────────────────────────────────────────────────
def story_05():
    img = veil(cover("/workspace/screenshots/lab-home.png"), 280, 480)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_L, 560), (260, 160))
    kicker(d, "LEPINI LAB", 360)
    f = font(FONT_ITA, 72)
    text_block(d, "Il crinale, in tre dimensioni.", f, (70, 420), CREAM, 940, 82, "center")
    f2 = font(FONT_REG, 34)
    text_block(
        d,
        "Atlante, Volo, Drone, Biosfera, Faggeta, Sentieri. Stesse schede del Portale.",
        f2,
        (100, 640),
        CREAM_SOFT,
        880,
        46,
        "center",
    )
    d.text((W / 2, 1760), "lepinidigital.com/lab", font=font(SANS_B, 24), fill=COPPER_L, anchor="mm")
    save(img, "05-lab.jpg")


# ── 06 drone (full-bleed screen) ──────────────────────────
def story_06():
    img = veil(cover("/workspace/screenshots/drone-lepini-airborne.png"), 240, 400)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_L, 420), (330, 160))
    kicker(d, "SIMULATORE DRONE", 340)
    f = font(FONT_ITA, 70)
    text_block(d, "Rilievo reale. Satellite. Strade.", f, (70, 390), CREAM, 940, 80, "center")
    d.text((W / 2, 1720), "Lepini Lab  ·  07 Drone", font=font(SANS_B, 24), fill=COPPER_L, anchor="mm")
    d.text((W / 2, 1770), "lepinidigital.com/lab", font=font(SANS, 22), fill=CREAM_SOFT, anchor="mm")
    save(img, "06-drone.jpg")


# ── 07 faggeta ────────────────────────────────────────────
def story_07():
    img = veil(cover("/workspace/screenshots/ig/faggeta.png"), 260, 420)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_L, 400), (340, 170))
    kicker(d, "FAGGETA  ·  SENTIERI  ·  BIOSFERA", 340)
    f = font(FONT_ITA, 74)
    text_block(d, "Cammini nel modello. Si apre la scheda.", f, (70, 400), CREAM, 940, 84, "center")
    f2 = font(FONT_REG, 34)
    text_block(
        d,
        "Picchio nero, faggi, 701 e 736: gli stessi numeri del Portale, in tre dimensioni.",
        f2,
        (100, 620),
        CREAM_SOFT,
        880,
        46,
        "center",
    )
    save(img, "07-faggeta.jpg")


# ── 08 sentieri ───────────────────────────────────────────
def story_08():
    img = veil(cover("/workspace/screenshots/ig/sentieri.png"), 250, 400)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_L, 400), (340, 170))
    kicker(d, "CARTOGRAFIA REALE", 340)
    f = font(FONT_ITA, 72)
    text_block(d, "Sentieri sul DEM. Satellite o stradale.", f, (70, 400), CREAM, 940, 82, "center")
    save(img, "08-sentieri.jpg")


# ── 09 atlante mockup ─────────────────────────────────────
def story_09():
    src = "/workspace/screenshots/atlante-sat.png"
    if not Path(src).exists():
        src = "/workspace/screenshots/lab-atlante.png"
    img = veil(cover(src), 260, 440)
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_L, 480), (300, 160))
    kicker(d, "ATLANTE 3D", 340)
    f = font(FONT_ITA, 70)
    text_block(d, "I 26 comuni sul rilievo vero.", f, (70, 400), CREAM, 940, 80, "center")
    d.text((W / 2, 1740), "Tocca un nodo: si apre la scheda.", font=font(FONT_REG, 32), fill=CREAM_SOFT, anchor="mm")
    save(img, "09-atlante.jpg")


# ── 10 CTA ────────────────────────────────────────────────
def story_10():
    img = paper_bg()
    d = ImageDraw.Draw(img)
    paste(img, logo(LOGO_D, 680), (200, 220))
    kicker(d, "UN DISCORSO, DAL BANCONE", 640, COPPER, True)
    f = font(FONT_ITA, 70)
    text_block(d, "Partiamo da come lavorate. Poi gli strumenti.", f, (80, 700), INK, 920, 80, "center")
    f2 = font(FONT_REG, 34)
    text_block(
        d,
        "Ferramenta, magazzini, frantoi, artigiani dei 26 comuni. Coscienza digitale, identità, mercati, passaggio.",
        f2,
        (100, 920),
        INK_SOFT,
        880,
        46,
        "center",
    )
    # url plate
    d.rounded_rectangle((140, 1280, 940, 1480), 18, fill=(255, 252, 247, 230), outline=COPPER, width=2)
    d.text((W / 2, 1345), "lepinidigital.com", font=font(SANS_B, 40), fill=INK, anchor="mm")
    d.text((W / 2, 1410), "lepinilab@lepinidigital.com", font=font(SANS, 26), fill=INK_SOFT, anchor="mm")
    paste(img, logo(LOGO_L, 360), (360, 1580))
    save(img, "10-cta.jpg")


if __name__ == "__main__":
    story_01()
    story_02()
    story_03()
    story_04()
    story_05()
    story_06()
    story_07()
    story_08()
    story_09()
    story_10()
    print("done")
