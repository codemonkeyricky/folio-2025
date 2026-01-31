import { uniform } from 'three/tsl'
import { Game } from "./Game.js"

export class Water
{
    game: Game
    surfaceElevation: number
    depthElevation: number
    surfaceElevationUniform: ReturnType<typeof uniform>
    surfaceThicknessUniform: ReturnType<typeof uniform>

    constructor()
    {
        this.game = Game.getInstance()

        this.surfaceElevation = -0.3
        this.depthElevation = -1.5

        this.surfaceElevationUniform = uniform(this.surfaceElevation)
        this.surfaceThicknessUniform = uniform(0.013)

        // Debug - Pane doesn't have addFolder method
    }
}
