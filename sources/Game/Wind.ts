import { vec2, Fn, texture, uniform } from 'three/tsl'
import { Game } from "./Game.js"

export class Wind {
    game: Game
    angle: number
    direction: ReturnType<typeof uniform>
    positionFrequency: ReturnType<typeof uniform>
    strength: ReturnType<typeof uniform>
    localTime: ReturnType<typeof uniform>
    timeFrequency: number
    offsetNode: ReturnType<typeof Fn>
    strengthBinding: any

    constructor() {
        this.game = Game.getInstance()

        // Debug - Pane doesn't have addFolder method

        this.angle = Math.PI * 0.6
        this.direction = uniform(vec2(
            Math.sin(this.angle),
            Math.cos(this.angle),
        ))
        this.positionFrequency = uniform(0.5)
        this.strength = uniform(0.5)
        this.localTime = uniform(0)
        this.timeFrequency = 0.1

        this.offsetNode = Fn(([position]: any) => {
            const remapedPosition = position.mul(this.positionFrequency)

            const noiseUv1 = remapedPosition.xy.mul(0.2).add(this.direction.mul(this.localTime)).xy
            const noise1 = texture(this.game.noises.perlin, noiseUv1).r.sub(0.5)

            const noiseUv2 = remapedPosition.xy.mul(0.1).add(this.direction.mul(this.localTime.mul(0.2))).xy
            const noise2 = texture(this.game.noises.perlin, noiseUv2).r.sub(0.5)

            const intensity = noise2.add(noise1)

            return vec2(this.direction.mul(intensity).mul(this.strength), 0)
        })

        this.game.ticker?.events?.on('tick', () => {
            this.update()
        }, 9)

        // Debug - Pane doesn't have addFolder method
    }

    update() {
        // Apply weather
        if(this.strengthBinding)
            this.strengthBinding.update()
        this.localTime.value += this.game.ticker!.deltaScaled * this.timeFrequency * this.strength.value
    }
}
