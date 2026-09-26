const MAX_EDGE = 480;
const MAX_CHARS = 220_000;

export async function readLogoFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("image");
  const bitmap = await loadImage(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height, 1));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, w, h);
  const png = canvas.toDataURL("image/png");
  if (png.length <= MAX_CHARS) return png;
  const jpg = canvas.toDataURL("image/jpeg", 0.86);
  if (jpg.length <= MAX_CHARS) return jpg;
  return canvas.toDataURL("image/jpeg", 0.7);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}
