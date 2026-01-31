/**
 * @typedef {import('./Game.js').Game} Game
 */

export class ResourcesLoader {
    game: Game
    loaders: Map<string, any>
    cache: Map<string, any>

    constructor()
    getLoader(_type: string): any
    load(_files: any[], _progressCallback?: any): Promise<any>
}
