import * as THREE from 'three/webgpu'
import { Events } from './Events.js'
import { Game } from './Game.js'
import { remapClamp } from './utilities/maths.js'

export class Explosions
{
    game!: Game
    events!: Events

    constructor()
    {
        this.game = new Game()

        this.events = new Events()
    }

    explode(coordinates: THREE.Vector3, radius = 7, strength = 4, vehicleOnly = false, bulletTimeStrengthThreshold = 3)
    {
        // View roll
        const distance = this.game.view.focusPoint.position.distanceTo(coordinates)
        const rollKickStrength = remapClamp(distance, 2, 15, 1, 0)
        this.game.view.roll.kick(rollKickStrength)

        // Leaves
        const world = this.game.world as any
        if(world && 'leaves' in world)
        {
            const leaves = world.leaves as any
            if(leaves && 'explode' in leaves)
            {
                leaves.explode(coordinates, radius)
            }
        }

        // Objects physics
        const applyPhysicsExplosion = (physicalObject: any) =>
        {
            const position = new THREE.Vector3()
            position.copy(physicalObject.body.translation())
            const direction = position.clone().sub(coordinates)
            direction.y = 0
            const distance = Math.hypot(direction.x, direction.z) as number

            const fadedStrength = remapClamp(distance, 1, radius, 1, 0)
            const impulse = direction.clone().setLength(0.5)
            impulse.y = 1
            // impulse.x = 0.25
            // impulse.z = 0.25
            impulse.normalize()

            const finalStrength = fadedStrength * strength

            impulse.setLength(finalStrength * physicalObject.body.mass())

            if(fadedStrength > 0)
            {
                // const point = direction.negate().setLength(0).add(position)
                const point = position
                const ticker = this.game.ticker as any
                if(ticker && 'wait' in ticker)
                {
                    ticker.wait(1, () =>
                    {
                        physicalObject.body.applyImpulseAtPoint(impulse, point, true)
                    })
                }

                // Is vehicle
                const vehicle = this.game.physicalVehicle as any
                if(vehicle && 'chassis' in vehicle && 'physical' in vehicle.chassis)
                {
                    if(physicalObject === vehicle.chassis.physical)
                    {
                        if(finalStrength > bulletTimeStrengthThreshold)
                        {
                            const time = this.game.time as any
                            if(time && 'bulletTime' in time && 'activate' in time.bulletTime)
                            {
                                time.bulletTime.activate()
                            }

                            return true
                        }
                    }
                }
            }

            return false
        }

        let vehicleHit = false
        if(vehicleOnly)
        {
            const vehicle = this.game.physicalVehicle as any
            if(vehicle && 'chassis' in vehicle && 'physical' in vehicle.chassis)
            {
                vehicleHit = applyPhysicsExplosion(vehicle.chassis.physical)
            }
        }
        else
        {
            const objects = this.game.objects as any
            if(objects && 'list' in objects && objects.list)
            {
                objects.list.forEach((object: any) =>
                {
                    if(object.physical && object.physical.type === 'dynamic' && object.physical.body.isEnabled())
                        vehicleHit = vehicleHit || applyPhysicsExplosion(object.physical)
                })
            }
        }
        // console.log('vehicleHit', vehicleHit)

        return vehicleHit
    }
}