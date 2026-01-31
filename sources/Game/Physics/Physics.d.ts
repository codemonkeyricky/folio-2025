class Physics {
    constructor(game: Game)
    start(): void
    update(time: number): void
    getPhysical(_physicalDescription: any): any
    addFolder(_options: any): any
    debugPanel?: any
    world?: any
}

export { Physics }