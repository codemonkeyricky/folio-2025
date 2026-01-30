import * as THREE from 'three/webgpu'
import { Area } from './Area.ts'

export class ToiletArea extends Area
{
    cabin: {
        body: any
        down: boolean
    } = {
        body: null as any,
        down: false
    }

    constructor(model: any)
    {
        super(model)

        this.setCabin()
        this.setCandleFlames()
        this.setAchievement()
    }

    setCabin()
    {
        this.cabin = {
            body: this.references.items.get('cabin')[0].userData.object.physical.body,
            down: false
        }
    }

    setCandleFlames()
    {
        const mesh = this.references.items.get('moon')[0]
        mesh.visible = this.game.dayCycles.intervalEvents.get('night').inInterval

        this.game.dayCycles.events.on('night', (inInterval: boolean) =>
        {
            mesh.visible = inInterval
        })
    }

    setAchievement()
    {
        this.events.on('boundingIn', () =>
        {
            this.game.achievements.setProgress('areas', 'toilet')
        })
    }

    update()
    {
        if(!this.cabin.down && !this.cabin.body.isSleeping())
        {
            const cabinUp = new THREE.Vector3(0, 1, 0)
            cabinUp.applyQuaternion(this.cabin.body.rotation())
            if(cabinUp.y < 0.4)
            {
                this.cabin.down = true
                this.game.achievements.setProgress('toiletDown', 1)
            }
        }
    }
}