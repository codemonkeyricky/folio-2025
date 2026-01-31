import { Game } from './Game.js'
import { Menu } from './Menu.js'
import { Modals } from './Modals.js'

export class ClosingManager
{
    private game: Game

    constructor()
    {
        this.game = Game.getInstance()

        // Pause input => Close menu or open menu intro
        this.game.inputs.events.on('pause', (action: any) =>
        {
            if(action.active)
            {
                if(this.game.menu.state === Menu.OPEN || this.game.menu.state === Menu.OPENING)
                {
                    this.game.menu.close()
                }
                else
                {
                    this.game.menu.open()
                }
            }
        })

        // On modal open => Close menu
        this.game.modals.events.on('open', () =>
        {
            if(this.game.menu.state === Menu.OPEN || this.game.menu.state === Menu.OPENING)
                this.game.menu.close()
        })

        // On menu open => Close modal
        this.game.menu.events.on('open', () =>
        {
            if(this.game.modals.state === Modals.OPEN || this.game.modals.state === Modals.OPENING)
                this.game.modals.close()
        })
    }
}