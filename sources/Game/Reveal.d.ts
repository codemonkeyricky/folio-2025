declare class Reveal {
    game: any
    step: number
    position: THREE.Vector3
    position2Uniform: THREE.Uniform
    distance: THREE.Uniform
    thickness: THREE.Uniform
    color: THREE.Uniform
    intensity: THREE.Uniform
    intensityMultiplier: number
    sound: any
    debugPanel: any
    update: () => void

    constructor()
    updateStep(step: number): void
}

export { Reveal }
