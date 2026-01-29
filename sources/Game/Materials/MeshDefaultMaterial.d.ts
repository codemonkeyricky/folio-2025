declare module '../Materials/MeshDefaultMaterial.js' {
    import * as THREE from 'three/webgpu'
    export class MeshDefaultMaterial extends THREE.MeshLambertNodeMaterial {
        static revealDiscardNodeBuilder: (game: any, outputColor: any) => any
        constructor(parameters?: any)
    }
}

export {}