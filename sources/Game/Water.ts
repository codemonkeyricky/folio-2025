import { uniform } from 'three/tsl'
import { Game } from "./Game.js"
import { Pane } from 'tweakpane'

export class Water
{
    game: Game
    surfaceElevation: number
    depthElevation: number
    surfaceElevationUniform: ReturnType<typeof uniform>
    surfaceThicknessUniform: ReturnType<typeof uniform>
    debugPanel: Pane | undefined

    constructor()
    {
        this.game = Game.getInstance()

        this.surfaceElevation = -0.3
        this.depthElevation = -1.5

        this.surfaceElevationUniform = uniform(this.surfaceElevation)
        this.surfaceThicknessUniform = uniform(0.013)

        // Debug
        if(this.game.debug.active)
        {
            const debugPanel = this.game.debug.panel.addFolder({
                title: '💧 Water',
                expanded: false,
            })
            debugPanel.addBinding(this.surfaceElevationUniform, 'value', { label: 'surfaceElevation', min: -1, max: 0, step: 0.001 })
            debugPanel.addBinding(this.surfaceThicknessUniform, 'value', { label: 'amplitude', min: 0, max: 0.5, step: 0.001 })
        }
    }
}