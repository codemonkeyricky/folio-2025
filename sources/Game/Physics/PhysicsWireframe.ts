import { Game } from '../Game.js'
import * as THREE from 'three/webgpu'

export class PhysicsWireframe
{
    game: Game
    active: boolean
    geometry: THREE.BufferGeometry
    material: any
    lineSegments: THREE.LineSegments

    constructor()
    {
        this.game = Game.getInstance()
        this.active = false

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute([], 4))

        this.material = new THREE.LineBasicNodeMaterial({ vertexColors: true })

        this.lineSegments = new THREE.LineSegments(this.geometry, this.material)

        if(this.active && this.game.scene)
            this.game.scene.add(this.lineSegments)

        if(this.game.ticker?.events)
        {
            this.game.ticker.events.on('tick', () =>
            {
                this.update()
            }, 4)
        }

        // Debug - Pane doesn't have addFolder method
    }

    update()
    {
        if(!this.active)
            return

        const debugRender = this.game.physics?.world?.debugRender()
        if(!debugRender) return

        const { vertices, colors } = debugRender

        ;(this.geometry.attributes.position as any).array = vertices
        this.geometry.attributes.position.needsUpdate = true

        ;(this.geometry.attributes.color as any).array = colors
        this.geometry.attributes.color.needsUpdate = true
    }
}
