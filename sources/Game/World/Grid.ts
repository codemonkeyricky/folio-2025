import * as THREE from 'three/webgpu'
import { Game } from '../Game.js'
import MeshGridMaterial, { MeshGridMaterialLine as MeshGridLine } from '../Materials/MeshGridMaterial.js'
import { Fn } from 'three/tsl'

export class Grid
{
    game: Game
    mesh: THREE.Mesh | null = null
    debugPanel: any

    constructor()
    {
        this.game = Game.getInstance()

        if(this.game.debug.active)
        {
            this.debugPanel = this.game.debug.panel.addFolder({
                title: '🌐 Grid',
                expanded: false,
            })
        }

        this.setVisual()
    }

    setVisual()
    {
        const lines: MeshGridLine[] = [
            // new MeshGridLine(0x705df2, 1, 0.03, 0.2),
            // new MeshGridLine(0xffffff, 10, 0.003, 1),
            new MeshGridLine('#8d55ff', 10, 0.02, 0.2),
            new MeshGridLine('#675369', 100, 0.002, 1),
        ]

        const uvGridMaterial = new MeshGridMaterial({
            color: 0x1b191f,
            scale: 0.001,
            antialiased: true,
            reference: 'uv', // uv | world
            side: THREE.DoubleSide,
            lines
        })

        uvGridMaterial.outputNode = Fn(() =>
        {
            // const distanceToCenter = positionWorld.xz.sub(this.game.reveal.position2Uniform).length()
            // distanceToCenter.lessThan(this.game.reveal.distance).discard()

            return uvGridMaterial.outputNode
        })()

        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            uvGridMaterial
        )
        this.mesh.position.y = 0
        this.mesh.rotation.x = - Math.PI * 0.5

        const defaultRespawn = this.game.respawns.getDefault()
        this.mesh.position.x = defaultRespawn.position.x
        this.mesh.position.z = defaultRespawn.position.z

        this.game.scene.add(this.mesh)

        // Debug
        if(this.game.debug.active)
        {
            this.debugPanel.addBinding(uvGridMaterial, 'scale', { min: 0, max: 0.002, step: 0.0001 })

            for(const line of lines)
            {
                const lineDebugPanel = this.debugPanel.addFolder({
                    title: 'Line',
                    expanded: false,
                })
                lineDebugPanel.addBinding(line.scale.value, 'value', { label: 'scale', min: 0, max: 1, step: 0.001 })
                lineDebugPanel.addBinding(line.thickness.value, 'value', { label: 'thickness', min: 0, max: 1, step: 0.001 })
                lineDebugPanel.addBinding(line.offset.value, 'value', { label: 'offset', min: 0, max: 1, step: 0.001 })
                lineDebugPanel.addBinding(line.cross.value, 'value', { label: 'cross', min: 0, max: 1, step: 0.001 })
                lineDebugPanel.addBinding({ color: '#' + line.color.value.getHexString(THREE.SRGBColorSpace) }, 'color').on('change', (tweak: any) => line.color.value.set(tweak.value))
            }
        }
    }

    show()
    {
        this.game.scene.add(this.mesh)
    }

    destroy()
    {
        const material = this.mesh.material as THREE.Material
        material.dispose()
        this.mesh.geometry.dispose()
        this.mesh.removeFromParent()
    }
}
