declare module '../Materials/MeshDefaultMaterial.js' {
    import * as THREE from 'three/webgpu'
    export class MeshDefaultMaterial extends THREE.MeshLambertNodeMaterial {
        static revealDiscardNodeBuilder: (game: any, outputColor: any) => any
        vertexNode?: any
        outputNode: any
        constructor(parameters?: any)
    }
}

export {}