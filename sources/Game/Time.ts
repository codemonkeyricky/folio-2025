
import { Game } from './Game.js'
import gsap from 'gsap'
import { clamp, remap } from './utilities/maths.js'

interface BulletTime {
    active: boolean
    endTime: number | null
    scale: number
    progress: number
    inSpeed: number
    outSpeed: number
    activate: (duration?: number) => void
}

export class Time
{
    game: Game
    defaultScale: number
    _scale: number
    bulletTime: BulletTime
    debugPanel: any

    constructor()
    {
        this.game = Game.getInstance()

        this.defaultScale = 2
        this._scale = this.defaultScale
        this.bulletTime = {} as BulletTime
        this.game.ticker.scale = this.scale
        gsap.globalTimeline.timeScale(this.scale)

        this.setBulletTime()

        this.game.ticker.events.on('tick', () =>
        {
            this.update()
        }, 0)

        // Debug
        if(this.game.debug.active)
        {
            this.debugPanel = this.game.debug.panel.addFolder({
                title: '⏱️ Time',
                expanded: false,
            })
            this.debugPanel.addBinding(this, 'defaultScale', { min: 0, max: 5, step: 0.01 })
            this.debugPanel.addButton({ title: 'bullet time' }).on('click', () => { this.bulletTime.activate() })
        }
    }

    setBulletTime()
    {
        this.bulletTime = {} as BulletTime
        this.bulletTime.active = false
        this.bulletTime.endTime = 0
        this.bulletTime.scale = 0.5
        this.bulletTime.progress = 0
        this.bulletTime.inSpeed = 3
        this.bulletTime.outSpeed = 0.3
        this.bulletTime.activate = (duration: number = 1.5) =>
        {
            if(this.bulletTime.active)
            {
                const newEndTime = Date.now() + duration * 1000
                this.bulletTime.endTime = Math.max(this.bulletTime.endTime ?? 0, newEndTime)
            }
            else
            {
                this.bulletTime.endTime = Date.now() + duration * 1000
            }

            this.bulletTime.active = true
        }
    }

    update()
    {
        if(Date.now() > (this.bulletTime.endTime ?? 0))
            this.bulletTime.active = false

        const speed = this.bulletTime.active ? this.bulletTime.inSpeed : this.bulletTime.outSpeed
        this.bulletTime.progress += (this.bulletTime.active ? 1 : - 1) * this.game.ticker.delta * speed
        this.bulletTime.progress = clamp(this.bulletTime.progress, 0, 1)

        this.scale = remap(this.bulletTime.progress, 0, 1, this.defaultScale, this.bulletTime.scale)
        // console.log(this.bulletTime.progress)
    }

    set scale(value)
    {
        this._scale = value
        this.game.ticker.scale = this.scale
        gsap.globalTimeline.timeScale(value)
    }

    get scale()
    {
        return this._scale
    }
}