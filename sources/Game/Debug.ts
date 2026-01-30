import * as THREE from 'three/webgpu'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as CamerakitPlugin from '@tweakpane/plugin-camerakit'

interface ManualBinding {
    manual: boolean
    manualValue: any
    update: () => void
    instance?: any
}

export class Debug
{
    active: boolean
    panel: any

    constructor()
    {

        this.active = !!location.hash.match(/debug/i)

        if(this.active)
        {
            this.panel = new Pane()
            this.panel.registerPlugin(EssentialsPlugin)
            this.panel.registerPlugin(CamerakitPlugin)

            addEventListener('keydown', (event: KeyboardEvent) =>
            {
                if(event.code === 'KeyH')
                    this.panel.hidden = !this.panel.hidden
            })
        }
    }

    addManualBinding(panel: any, object: any, property: string, settings: any, update: () => any, manual: boolean = false): ManualBinding
    {
        const binding: ManualBinding = {
            manual,
            manualValue: object[property],
            update: () =>
            {
                object[property] = binding.manual ? binding.manualValue : update()
            }
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

    addThreeColorBinding(panel: any, object: any, label: string): any
    {
        return panel.addBinding({ color: (object as any).getHex(THREE.SRGBColorSpace) }, 'color', { label: label, view: 'color' })
                    .on('change', (tweak: any) => { (object as any).set(tweak.value) })
    }

    addButtons(panel: any, buttons: any, title: string = '')
    {
        const buttonKeys = Object.keys(buttons) as string[]

        (panel as any)
            .addBlade({
                view: 'buttongrid',
                size: [ buttonKeys.length, 1 ],
                cells: (x: number, y: number) => ({
                    title: buttonKeys[y][x]
                }),
                label: title,
            })
            .on('click', (event: any) => {
                const title = event.cell.title
                const buttonFunc = buttons[title]
                if (buttonFunc) {
                    buttonFunc(title)
                }
            })
    }
}