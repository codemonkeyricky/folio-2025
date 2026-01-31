/**
 * @typedef {import('./Game.js').Game} Game
 */

export class Player {
    game: Game
    state: number
    accelerating: number
    steering: number
    boosting: number
    braking: number
    suspensions: string[]
    position: THREE.Vector3
    basePosition: THREE.Vector3
    position2: THREE.Vector2
    rotationY: number
    sounds: any
    distanceDriven: any
    unstuck: any
    timePlayed: any

    static STATE_DEFAULT: number
    static STATE_LOCKED: number

    constructor()
    setSounds(): void
    setInputs(): void
    setDistanceDriven(): void
    setUnstuck(): void
    setFlip(): void
    setTimePlayed(): void
    respawn(respawnName?: any, callback?: any): void
    die(): void
    honk(): void
    updatePrePhysics(): void
    updatePostPhysics(): void
}
