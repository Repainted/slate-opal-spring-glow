import * as THREE from "three";
import { stitchBbox } from "./tiles";
import type { Carta } from "./view";
import { cartaLayer } from "./view";

export function loadCarta() {
  const loader = new THREE.TextureLoader();
  const sat = loader.load("/lab/sat.jpg");
  const osm = loader.load("/lab/osm.jpg");
  for (const t of [sat, osm]) {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
  }
  const upgrade = (tex: THREE.Texture, kind: "sat" | "osm") => {
    stitchBbox(kind, undefined, 11).then((canvas) => {
      tex.image = canvas;
      tex.needsUpdate = true;
    }).catch(() => {
      /* restano le tessere cotte */
    });
  };
  if (typeof window !== "undefined") {
    upgrade(sat, "sat");
    upgrade(osm, "osm");
  }
  return {
    sat,
    osm,
    apply(mat: THREE.ShaderMaterial, carta: Carta) {
      mat.uniforms.uLayer!.value = cartaLayer(carta);
    },
    dispose() {
      sat.dispose();
      osm.dispose();
    },
  };
}

export const CARTA_NOTE: Record<Carta, string> = {
  rilievo: "EU-DEM · quote vere, cella ~360 m",
  sat: "Esri World Imagery · tessere vive sul DEM",
  osm: "© OpenStreetMap · CARTO · tessere vive sul DEM",
};
