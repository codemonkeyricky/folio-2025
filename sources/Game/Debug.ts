import * as THREE from 'three/webgpu'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as CamerakitPlugin from '@tweakpane/plugin-camerakit'

export class Debug
{
    active!: boolean
    panel!: Pane

    constructor()
    {

        this.active = location.hash.match(/debug/i) !== null

        if(this.active)
        {
            this.panel = new Pane()
            this.panel.registerPlugin(EssentialsPlugin)
            this.panel.registerPlugin(CamerakitPlugin)
        }
    }

    addManualBinding(panel: any, object: any, property: any, settings: any, update: any, manual = false)
    {
        const binding: any = {}
        binding.manual = manual
        binding.manualValue = object[property]
        binding.update = () =>
        {
            object[property] = binding.manual ? binding.manualValue : update()
        }

        if(this.active)
        {
            binding.instance = panel.addBinding(binding, 'manualValue', settings)
            binding.instance.on('change', () => { binding.manual = true })

            this.addButtons(
                panel,
                {
                    manual: () =>
                    {
                        binding.manual = true
                        binding.manualValue = object[property]
                        binding.instance.refresh()
                    },
                    auto: () =>
                    {
                        binding.manual = false
                        binding.update()
                        binding.manualValue = object[property]
                    }
                },
                ''
            )
        }

        return binding
    }

    addThreeColorBinding(panel: any, object: any, label: any)
    {
        return panel.addBinding({ color: object.getHex(THREE.SRGBColorSpace) }, 'color', { label: label, view: 'color' })
                    .on('change', (tweak: any) => { object.set(tweak.value) })
    }

    addButtons(panel: any, buttons: any, title = '')
    {
        const buttonKeys = Object.keys(buttons)

        panel
            .addBlade({
                view: 'buttongrid',
                size: [ buttonKeys.length, 1 ],
                cells: (x: any, y: any) => ({
                    title: [
                        buttonKeys,
                    ][y][x],
                }),
                label: title,
            })
            .on('click', (event: any) =>
            {
                buttons[event.cell.title](event.cell.title)
            })
    }
}