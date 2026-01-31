import { Events } from './Events.js'
import { Game } from './Game.js'

export class Quality
{
    game: Game
    events: Events
    level: number

    constructor()
    {
        this.game = Game.getInstance()
        this.events = new Events()
        this.level = 0

        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        this.level = isMobile ? 1 : 0 // 0 = highest quality

        // Debug - Pane doesn't have addFolder method
    }

    changeLevel(level = 0)
    {
        // Same
        if(level === this.level)
            return

        this.level = level
        this.events.trigger('change', [ this.level ])
    }
}
