import { Inputs } from './Inputs/Inputs.js'
import * as Debug from './Debug.js'

declare class GameInstance {
    static getInstance(): GameInstance
    world: World
    inputs: Inputs
    audio: typeof Audio
    debug: typeof Debug
}

export class World {
    areas?: Areas
    constructor(game: GameInstance)
    step(step: number): void
    intro?: any
    visualVehicle?: any
    floor?: any
    waterSurface?: any
    grass?: any
    windLines?: any
    confetti?: any
    leaves?: any
    rain?: any
    lightnings?: any
    fireballs?: any
    snow?: any
    visualTornado?: any
    bushes?: any
    birchTrees?: any
    oakTrees?: any
    cherryTrees?: any
    flowers?: any
    bricks?: any
    whispers?: any
}

export class Areas {
    game: GameInstance
    achievements?: any
    altar?: any
    behindTheScene?: any
    bowling?: any
    career?: any
    circuit?: CircuitArea
    cookie?: any
    lab?: any
    landing?: any
    projects?: any
    social?: any
    toilet?: any
    timeMachine?: any
    constructor()
}

export class CircuitArea {
    STATE_RUNNING: number
    STATE_STARTING: number
    STATE_ENDING: number
}
