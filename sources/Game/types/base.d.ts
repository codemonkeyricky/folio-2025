export class Physics {
    constructor(game: Game)
    start(): void
    update(time: number): void
}

export class ResourcesLoader {
    load(resources: any[], callback?: (toLoad: number, total: number) => void): Promise<any>
}

export class Player {
    constructor(game: Game)
}

export class View {
    constructor()
}

export class Tracks {
    constructor()
}

export class Lighting {
    constructor(game: Game)
}

export class Materials {
    constructor(game: Game)
}

export class Weather {
    constructor(game: Game)
}

export class Noises {
    constructor(game: Game)
}

export class Server {
    constructor(game: Game)
}

export class PhysicsVehicle {
    constructor(game: Game)
}

export class Overlay {
    constructor(game: Game)
}

export class Tornado {
    constructor(game: Game)
}

export class InteractivePoints {
    constructor(game: Game)
}

export class Bricks {
    constructor(game: Game)
}

export class Audio {
    constructor(game: Game)
}

export class RayCursor {
    constructor(game: Game)
}

export class Achievements {
    constructor(game: Game)
    setProgress: (id: string, progress: number) => void
}

export class Notifications {
    constructor(game: Game)
}

export class Options {
    constructor(game: Game)
}

export class Map {
    constructor(game: Game)
}

export class Gamepad {
    constructor(game: Game)
}

export class Pointer {
    constructor(game: Game)
}

export class InteractiveButtons {
    constructor(game: Game)
}

export class Nipple {
    constructor(game: Game)
}

export class Keyboard {
    constructor(game: Game)
    events: any
    down: (key: string, code: string) => void
    up: (key: string, code: string) => void
}

export class Events {
    on: (event: string, callback: (...args: any[]) => void) => void
    trigger: (event: string, ...args: any[]) => void
}

export class Tabs {
    constructor(element: HTMLElement)
    resize(): void
}