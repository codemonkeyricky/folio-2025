import { color, mix, rangeFogFactor, uniform, vec2, viewportUV } from 'three/tsl'
import { Game } from './Game.js'

export class Fog
{
    game!: Game
    colorA: any
    colorB: any
    radialCenter: any
    radialStart: any
    radialEnd: any
    color: any
    near: any
    far: any
    strength: any

    constructor()
    {
        this.game = Game.getInstance()

        this.colorA = uniform(color('#ff0000'))
        this.colorB = uniform(color('#0000ff'))
        this.radialCenter = uniform(vec2(0, 0))
        this.radialStart = uniform(0)
        this.radialEnd = uniform(1)

        const colorMix = vec2(viewportUV.xy).sub(this.radialCenter).length().smoothstep(this.radialStart, this.radialEnd)
        this.color = mix(this.colorA, this.colorB, colorMix)
        if(this.game.scene)
        {
            this.game.scene.backgroundNode = this.color
        }

        this.near = uniform(this.game.view?.optimalArea?.nearDistance ?? 0)
        this.far = uniform(this.game.view?.optimalArea?.farDistance ?? 1)
        this.strength = rangeFogFactor(this.near, this.far)
        // this.strength = float(1)

        if(this.game.ticker?.events)
        {
            this.game.ticker.events.on('tick', () =>
            {
                this.update()
            }, 10)
        }

        // Debug
        if(this.game.debug?.active)
        {
            const debugPanel = this.game.debug.panel?.addFolder?.({
                title: '☁️ Fog',
                expanded: false,
            })
            if(debugPanel)
            {
                debugPanel.addBinding(this.radialCenter, 'value', { value: 'offset', min: 0, max: 1 })
            }
        }
    }

    update()
    {
        // Apply day cycles values
        const amplitude = (this.game.view?.optimalArea?.farDistance ?? 0) - (this.game.view?.optimalArea?.nearDistance ?? 0)
        this.colorA.value.copy(this.game.dayCycles?.properties.fogColorA.value)
        this.colorB.value.copy(this.game.dayCycles?.properties.fogColorB.value)
        this.near.value = (this.game.view?.optimalArea?.nearDistance ?? 0) + this.game.dayCycles?.properties.fogNearRatio.value * amplitude
        this.far.value = (this.game.view?.optimalArea?.nearDistance ?? 0) + this.game.dayCycles?.properties.fogFarRatio.value * amplitude
    }
}