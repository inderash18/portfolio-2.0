// Type declarations for Three.js ecosystem extras used by the Lanyard component

export {};

declare module 'meshline' {
  import * as THREE from 'three';
  export class MeshLineGeometry extends THREE.BufferGeometry {
    setPoints(points: THREE.Vector3[]): void;
  }
  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: {
      color?: THREE.ColorRepresentation;
      lineWidth?: number;
      depthTest?: boolean;
      resolution?: [number, number];
      useMap?: boolean;
      map?: THREE.Texture;
      repeat?: [number, number];
      [key: string]: unknown;
    });
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<unknown>;
        [key: string]: unknown;
      };
      meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: unknown;
        repeat?: [number, number];
        lineWidth?: number;
        ref?: React.Ref<unknown>;
        [key: string]: unknown;
      };
    }
  }
}
