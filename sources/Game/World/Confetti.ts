 import * as THREE from 'three/webgpu'

 export class Confetti {
    game: any

    constructor(game: any)
    {
        this.game = game
    }

    init(): void
    {
        // Initialization logic here
    }

    destroy(): void
    {
        // Cleanup logic here
    }

    pop(_position?: THREE.Vector3, _radius?: number, _elevation?: number): any
    {
        // Pop logic here
        return null
    }
 }
