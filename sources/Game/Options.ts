import { Game } from './Game.js'

export class Options
{
    private game: Game
    private element: HTMLElement | null = null

    constructor(game?: Game, element?: HTMLElement)
    {
        if (game && element) {
            this.game = game
            this.element = element
        } else {
            this.game = Game.getInstance()

            const menu = this.game.menu
            if (menu && (menu as any).items) {
                const optionsItem = (menu as any).items.get('options')
                if (optionsItem && (optionsItem as any).contentElement) {
                    this.element = (optionsItem as any).contentElement as HTMLElement
                }
            }
        }

        if (this.element) {
            this.setSound()
            this.setQuality()
            this.setRespawn()
            this.setReset()
            this.setRenderer()
            this.setServer()
        }
    }

    private setSound(): void
    {
        if (!this.element) return

        const element = this.element.querySelector('.js-audio-toggle') as HTMLElement
        if (!element) return

        const audio = this.game.audio
        if (audio && audio.mute && audio.mute.toggle) {
            element.addEventListener('click', audio.mute.toggle)
        }
    }

    private setQuality(): void
    {
        if (!this.element) return

        const element = this.element.querySelector('.js-quality-toggle') as HTMLElement
        if (!element) return

        const text = element.querySelector('span') as HTMLElement
        if (!text) return

        const quality = this.game.quality
        if (!quality) return

        text.textContent = quality.level === 0 ? 'High' : 'Low'

        element.addEventListener('click', () =>
        {
            quality.changeLevel(quality.level === 0 ? 1 : 0)
        })

        if (quality.events) {
            quality.events.on('change', () =>
            {
                text.textContent = quality.level === 0 ? 'High' : 'Low'
            })
        }
    }

    private setRespawn(): void
    {
        if (!this.element) return

        const element = this.element.querySelector('.js-respawn') as HTMLElement
        if (!element) return

        const player = this.game.player
        const menu = this.game.menu

        if (player && menu) {
            element.addEventListener('click', () =>
            {
                player.respawn()
                const closeFn = (menu as any).close
                if (closeFn && typeof closeFn === 'function') {
                    closeFn()
                }
            })
        }
    }

    private setReset(): void
    {
        if (!this.element) return

        const element = this.element.querySelector('.js-reset') as HTMLElement
        if (!element) return

        const game = this.game
        if (!game) return

        element.addEventListener('click', () =>
        {
            game.reset()
            const menu = game.menu
            if (menu) {
                const closeFn = (menu as any).close
                if (closeFn && typeof closeFn === 'function') {
                    closeFn()
                }
            }
        })
    }

    private setRenderer(): void
    {
        if (!this.element) return

        const renderer = this.game.rendering?.renderer
        if (renderer && renderer.backend) {
            const isWebGPU = (renderer.backend as any).isWebGPUBackend
            if (isWebGPU) {
                const element = this.element.querySelector('.js-renderer') as HTMLElement
                if (!element) return

                element.classList.remove('is-success')
                element.classList.add('is-danger')

                const text = element.querySelector('span') as HTMLElement
                if (!text) return

                text.textContent = 'WebGPU'

                const tooltip = element.querySelector('.js-tooltip') as HTMLElement
                if (!tooltip) return

                tooltip.innerHTML = /* html */`Your browser is <strong>not compatible</strong> with WebGPU resulting in performance loss`
            }
        }
    }

    private setServer(): void
    {
        if (!this.element) return

        const element = this.element.querySelector('.js-server') as HTMLElement
        if (!element) return

        const text = element.querySelector('span') as HTMLElement
        if (!text) return

        const tooltip = element.querySelector('.js-tooltip') as HTMLElement
        if (!tooltip) return

        const server = this.game.server
        if (!server) return

        const update = (connected: boolean) =>
        {
            if (connected) {
                element.classList.add('is-success')
                element.classList.remove('is-danger')

                text.textContent = 'Online'

                tooltip.innerHTML = /* html */`Enjoy the <strong>multiplayer</strong> features`
            }
            else {
                element.classList.remove('is-success')
                element.classList.add('is-danger')
                text.textContent = 'Offline'

                tooltip.innerHTML = /* html */`Should be back soon`
            }
        }

        update(server.connected)

        if (server.events) {
            server.events.on('connected', () =>
            {
                update(true)
            })
            server.events.on('disconnected', () =>
            {
                update(false)
            })
        }
    }
}
