import * as THREE from 'three/webgpu'
import { Game } from './Game.js'
import { VisualVehicle } from './World/VisualVehicle.js'

export class KonamiCode
{
    game: Game
    activationCount: number

    constructor(once = false)
    {
        this.game = Game.getInstance()

        let index = 0
        this.activationCount = 0
        const sequence = [
            [ 'ArrowUp', 'KeyW' ],
            [ 'ArrowUp', 'KeyW' ],
            [ 'ArrowDown', 'KeyS' ],
            [ 'ArrowDown', 'KeyS' ],
            [ 'ArrowLeft', 'KeyA' ],
            [ 'ArrowRight', 'KeyD' ],
            [ 'ArrowLeft', 'KeyA' ],
            [ 'ArrowRight', 'KeyD' ],
            [ 'KeyB' ],
            [ 'KeyQ', 'KeyA' ],
        ]

        const callback = (event: KeyboardEvent) =>
        {
            const sequenceItem = sequence[index]

            if(sequenceItem.indexOf(event.code) !== -1)
            {
                index++

                if(index === sequence.length)
                {
                    this.activate()

                    if(once)
                        document.removeEventListener('keydown', callback)

                    index = 0
                }
            }
            else
            {
                index = 0
            }
        }
        document.addEventListener('keydown', callback)
    }

    async activate()
    {
        const files: [string, string] = [
            'vehicle/oldSchool.glb',
            'vehicle/default.glb'
        ]
        
        const game = this.game
        if(!game)
        {
            return
        }

        const resourcesLoader = game.resourcesLoader
        if(!resourcesLoader)
        {
            return
        }

        const resourcesResult: any = await resourcesLoader.load([
            [ 'vehicle', files[this.activationCount % 2], 'gltf' ],
        ])

        if(!resourcesResult)
        {
            return
        }

        const vehicleEntry: any = resourcesResult.vehicle
        if(!vehicleEntry)
        {
            return
        }

        const resources = vehicleEntry
            
        const vehicleResources = resources.vehicle
        const world = this.game.world
        const visualVehicle = world?.visualVehicle
        const confetti = world?.confetti

        if(vehicleResources && vehicleResources.scene && visualVehicle)
        {
            visualVehicle.destroy()
            world.visualVehicle = new VisualVehicle(vehicleResources.scene)
        }

        if(confetti)
        {
            const player = this.game.player
            if(player)
            {
                const playerPos = player.position
                const confettiFunc: any = confetti.pop
                if(confettiFunc)
                {
                    const availableConfetti = confettiFunc()
                    if(availableConfetti)
                    {
                        const availableConfettiPop: any = availableConfetti.pop
                        if(availableConfettiPop)
                        {
                            availableConfettiPop(playerPos.clone())
                            availableConfettiPop(playerPos.clone().add(new THREE.Vector3(1, -1, 1.5)))
                            availableConfettiPop(playerPos.clone().add(new THREE.Vector3(1, -1, -1.5)))
                        }
                    }
                }
            }
        }

        this.activationCount++

        // Achievement
        this.game.achievements.setProgress('konami', 1)
    }
}