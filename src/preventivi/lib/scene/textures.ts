import * as THREE from "three";
import { SITE } from "./palette";

function hex(n: number): string {
  return `#${n.toString(16).padStart(6, "0")}`;
}

function seedRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function canvasTex(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);
  draw(ctx);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export function makeBrickTexture(): THREE.CanvasTexture {
  return canvasTex(512, 256, (ctx) => {
    ctx.fillStyle = hex(SITE.brickMortar);
    ctx.fillRect(0, 0, 512, 256);
    const rand = seedRand(42);
    const bw = 118;
    const bh = 52;
    const gap = 8;
    const colors = [SITE.brick, SITE.brickAlt, SITE.brickDark, 0x743628, 0x652e22];
    for (let row = 0; row < 4; row++) {
      const ox = row % 2 === 0 ? 0 : -(bw + gap) / 2;
      for (let col = -1; col < 6; col++) {
        const x = ox + col * (bw + gap) + gap;
        const y = row * (bh + gap) + gap;
        ctx.fillStyle = hex(colors[Math.floor(rand() * colors.length)]!);
        ctx.fillRect(x, y, bw, bh);
        ctx.fillStyle = "rgba(255,230,200,0.08)";
        ctx.fillRect(x, y, bw, 6);
        ctx.fillStyle = "rgba(20,8,4,0.12)";
        ctx.fillRect(x, y + bh - 5, bw, 5);
      }
    }
  });
}

export function makeTileTexture(): THREE.CanvasTexture {
  return canvasTex(256, 384, (ctx) => {
    ctx.fillStyle = hex(SITE.tileEdge);
    ctx.fillRect(0, 0, 256, 384);
    const rand = seedRand(9);
    for (let row = 0; row < 4; row++) {
      const y = row * 92 + 8;
      for (let col = 0; col < 2; col++) {
        const x = col * 128 + 8;
        const shade = rand() * 18 - 8;
        ctx.fillStyle = `rgb(${122 + shade},${58 + shade * 0.4},${44 + shade * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(x + 56, y);
        ctx.lineTo(x + 112, y + 36);
        ctx.lineTo(x + 112, y + 78);
        ctx.lineTo(x + 56, y + 108);
        ctx.lineTo(x, y + 78);
        ctx.lineTo(x, y + 36);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = hex(SITE.tileEdge);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = "rgba(255,210,180,0.12)";
        ctx.beginPath();
        ctx.moveTo(x + 56, y + 4);
        ctx.lineTo(x + 100, y + 34);
        ctx.lineTo(x + 56, y + 50);
        ctx.lineTo(x + 12, y + 34);
        ctx.closePath();
        ctx.fill();
      }
    }
  });
}

export function makeCoppoTexture(): THREE.CanvasTexture {
  return canvasTex(256, 256, (ctx) => {
    ctx.fillStyle = hex(SITE.coppoDark);
    ctx.fillRect(0, 0, 256, 256);
    const rand = seedRand(21);
    for (let col = 0; col < 4; col++) {
      const x = col * 64 + 32;
      for (let row = 0; row < 3; row++) {
        const y = row * 88 + 16 + (col % 2) * 20;
        const g = ctx.createLinearGradient(x - 26, y, x + 26, y);
        const s = rand() * 10;
        g.addColorStop(0, hex(SITE.coppoDark));
        g.addColorStop(0.45, `rgb(${138 + s},${64},${48})`);
        g.addColorStop(1, hex(SITE.coppoDark));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(x, y + 40, 26, 44, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

export function makeWoodTexture(): THREE.CanvasTexture {
  return canvasTex(64, 256, (ctx) => {
    ctx.fillStyle = hex(SITE.wood);
    ctx.fillRect(0, 0, 64, 256);
    ctx.strokeStyle = hex(SITE.woodDark);
    ctx.lineWidth = 2;
    const rand = seedRand(7);
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(8 + i * 7, 0);
      ctx.quadraticCurveTo(12 + rand() * 20, 128, 8 + i * 7, 256);
      ctx.stroke();
    }
  });
}

export function makePlasterTexture(): THREE.CanvasTexture {
  return canvasTex(128, 128, (ctx) => {
    ctx.fillStyle = hex(SITE.plaster);
    ctx.fillRect(0, 0, 128, 128);
    const img = ctx.getImageData(0, 0, 128, 128);
    const rand = seedRand(3);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (rand() - 0.5) * 18;
      img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
      img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
      img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
    }
    ctx.putImageData(img, 0, 0);
  });
}

export function makeDirtTexture(): THREE.CanvasTexture {
  return canvasTex(256, 256, (ctx) => {
    ctx.fillStyle = hex(SITE.dirt);
    ctx.fillRect(0, 0, 256, 256);
    const img = ctx.getImageData(0, 0, 256, 256);
    const rand = seedRand(11);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (rand() - 0.5) * 28;
      img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
      img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n * 0.85));
      img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n * 0.6));
    }
    ctx.putImageData(img, 0, 0);
  });
}

export function makeConcreteTexture(): THREE.CanvasTexture {
  return canvasTex(128, 128, (ctx) => {
    ctx.fillStyle = hex(SITE.concrete);
    ctx.fillRect(0, 0, 128, 128);
    const img = ctx.getImageData(0, 0, 128, 128);
    const rand = seedRand(5);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (rand() - 0.5) * 14;
      img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
      img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
      img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
    }
    ctx.putImageData(img, 0, 0);
  });
}

export interface SiteTextures {
  brick: THREE.CanvasTexture;
  tile: THREE.CanvasTexture;
  coppo: THREE.CanvasTexture;
  wood: THREE.CanvasTexture;
  plaster: THREE.CanvasTexture;
  dirt: THREE.CanvasTexture;
  concrete: THREE.CanvasTexture;
  dispose: () => void;
}

export function createSiteTextures(): SiteTextures {
  const brick = makeBrickTexture();
  const tile = makeTileTexture();
  const coppo = makeCoppoTexture();
  const wood = makeWoodTexture();
  const plaster = makePlasterTexture();
  const dirt = makeDirtTexture();
  const concrete = makeConcreteTexture();
  return {
    brick,
    tile,
    coppo,
    wood,
    plaster,
    dirt,
    concrete,
    dispose() {
      brick.dispose();
      tile.dispose();
      coppo.dispose();
      wood.dispose();
      plaster.dispose();
      dirt.dispose();
      concrete.dispose();
    },
  };
}
