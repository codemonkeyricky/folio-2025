import * as THREE from 'three/webgpu'
import { Events } from './Events.js'
import { Game } from './Game.js'

export class Zones
{
    game: Game
    items: any[]
    previewGroup: THREE.Group
    debugPanel: any

    constructor()
    {
        this.game = Game.getInstance()

        this.items = []

        this.game.ticker.events.on('tick', () =>
        {
            this.update()
        }, 8)

        this.previewGroup = new THREE.Group()
        this.previewGroup.visible = false
        this.previewGroup.userData.preventPreRender = true
        this.game.scene.add(this.previewGroup)

        if(this.game.debug.active)
        {
            this.debugPanel = this.game.debug.panel.addFolder({
                title: '🌐 Zones',
                expanded: false,
            })
            this.debugPanel.addBinding(this.previewGroup, 'visible', { label: 'previewVisible' })
        }
    }

    create(type: string = 'sphere', position: THREE.Vector3, radius: number)
    {
        const zone = { type, position, radius, isIn: false } as any
        zone.events = new Events()
        this.items.push(zone)

        // Preview
        zone.preview = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 16, 16),
            new THREE.MeshBasicNodeMaterial({ color: '#ffffff', wireframe: true })
        )
        zone.preview.position.copy(position)
        this.previewGroup.add(zone.preview)

        return zone
    }

    update()
    {
        for(const zone of this.items)
        {
            let playerPosition = this.game.player.position
            let zonePosition = zone.position

            if(zone.type === 'cylinder')
            {
                playerPosition = new THREE.Vector2(playerPosition.x, playerPosition.z)
                zonePosition = new THREE.Vector2(zonePosition.x, zonePosition.z)
            }
            const distance = playerPosition.distanceTo(zonePosition)

            if(distance < zone.radius)
            {
                if(!zone.isIn)
                {
                    zone.isIn = true
                    zone.events.trigger('enter', [ zone ])
                }
            }
            else
            {
                if(zone.isIn)
                {
                    zone.isIn = false
                    zone.events.trigger('leave', [ zone ])
                }
            }
        }
    }
}