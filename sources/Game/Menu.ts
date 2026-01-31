import { Events } from './Events.js'
import { Inputs } from './Inputs/Inputs.js'
import { Tabs } from './Tabs.js'
import { CircuitArea } from './World/Areas/CircuitArea.js'
import { Debug } from './Debug.js'

declare class Game {
    world: any
    inputs: Inputs
    audio: any
    debug: Debug
    static getInstance(): Game
}

export class Menu
{
    static OPEN = 1
    static OPENING = 2
    static CLOSED = 3
    static CLOSING = 4

    private game: Game | null = null
    public state: number = Menu.CLOSED
    private element: HTMLElement | null = null
    private current: any = null
    private default: any = null
    public events!: Events
    private items!: Map<string, any>
    public navigationElement: HTMLElement | null = null
    public previewElement: HTMLElement | null = null
    public contentElement: HTMLElement | null = null
    public mainFocus: HTMLElement | null = null
    public tabs: any = null

    constructor()
    {
        const game = Game.getInstance()
        if(!game) return

        this.game = game
        this.state = Menu.CLOSED
        this.element = document.querySelector('.js-menu')
        this.current = null
        this.default = null
        this.events = new Events()
        this.items = new Map()

        this.setTrigger()
        this.setClose()
        this.setItems()
        this.setGamepad()
        this.preopen()

        if(this.element)
            this.element.addEventListener('transitionend', () =>
            {
                this.onTransitionEnded()
            })
    }

    onTransitionEnded()
    {
        if(this.state === Menu.OPENING)
        {
            this.state = Menu.OPEN
            this.events.trigger('opened')
            this.current.events.trigger('opened')
        }
        else if(this.state === Menu.CLOSING && this.element)
        {
            this.state = Menu.CLOSED
            this.events.trigger('closed')
            this.current.events.trigger('closed')

            this.element.classList.remove('is-displayed')
        }
    }

    setTrigger()
    {
        const element = document.querySelector('.js-menu-trigger')

        if(!element) return

        element.addEventListener('click', (event: Event) =>
        {
            event.preventDefault()

            if(this.game && this.game.world)
            {
                const areas = this.game.world.areas
                if(areas?.circuit?.state === CircuitArea.STATE_RUNNING || areas?.circuit?.state === CircuitArea.STATE_STARTING)
                    this.open('circuit')
                else
                    this.open()
            }
        })
        element.addEventListener('keydown', (event: Event) =>
        {
            event.preventDefault()
        })
    }

    setClose()
    {
        if(!this.element) return

        const closeElements = this.element.querySelectorAll('.js-close')

        for(const element of closeElements)
        {
            element.addEventListener('click', () =>
            {
                this.close()
            })
        }

        this.element.addEventListener('click', (event: MouseEvent) =>
        {
            if(event.target === this.element)
                this.close()
        })
    }

    setItems()
    {
        const navigationElement = this.element?.querySelector('.js-navigation')
        const previewElement = this.element?.querySelector('.js-previews')
        const contentElement = this.element?.querySelector('.js-contents')
        this.items = new Map()

        if(!navigationElement || !previewElement || !contentElement) return

        const navigationElements = navigationElement.querySelectorAll('.js-navigation-item')
        const previewElements = [...previewElement.querySelectorAll('.js-preview')]
        const contentElements = [...contentElement.querySelectorAll('.js-content')]

        for(const navElement of navigationElements)
        {
            const item: any = {}
            item.navigationElement = navElement as HTMLElement
            item.name = (navElement as HTMLElement).dataset.name || ''
            item.previewElement = previewElements.find(element => element.classList.contains(`${item.name}-preview`))
            item.contentElement = contentElements.find(element => element.classList.contains(`${item.name}-content`))
            item.mainFocus = item.contentElement?.querySelector('.js-main-focus')
            item.isOpen = false
            item.events = new Events()

            // Tabs
            const tabsElement = item.contentElement?.querySelector('.js-tabs')

            if(tabsElement)
                item.tabs = new Tabs(tabsElement)

            navElement.addEventListener('click', (event: Event) =>
            {
                event.preventDefault()

                this.open(item.name)
            })

            this.items.set(item.name, item)

            if(this.default === null)
                this.default = item
        }

        const keys = [...this.items.keys()]

        for(let i = 0; i < keys.length; i++)
        {
            const prevName = keys[i - 1 < 0 ? keys.length - 1 : i - 1]
            const nextName = keys[(i + 1) % keys.length]
            const item = this.items.get(keys[i])

            item.prevName = prevName
            item.nextName = nextName
        }
    }

    setGamepad()
    {
        if(this.game && this.game.inputs)
        {
            this.game.inputs.addActions([
                { name: 'next', categories: [ 'menu' ], keys: [ 'Gamepad.r1' ] },
                { name: 'prev', categories: [ 'menu' ], keys: [ 'Gamepad.l1' ] }
            ])

            // Respawn
            this.game.inputs.events.on('next', (action: any) =>
            {
                if(action.active && this.current)
                {
                    this.open(this.current.nextName)
                }
            })
            this.game.inputs.events.on('prev', (action: any) =>
            {
                if(action.active && this.current)
                {
                    this.open(this.current.prevName)
                }
            })
        }
    }

    open(name: string | null = null)
    {
        let _name: string = name || ''

        if(_name === null || _name === '')
        {
            if(this.current)
                _name = this.current.name
            else
                _name = this.default.name
        }

        const item = this.items.get(_name)

        // Not found
        if(!item)
            return

        // Same
        if(
            (this.state === Menu.OPEN || this.state === Menu.OPENING) &&
            item === this.current
        )
            return

        // Sound
        const sound = this.game?.audio?.groups.get('click')
        if(sound)
            sound.play(true)

        // Leaving item
        if(this.current)
        {
            this.current.navigationElement.classList.remove('is-active')
            this.current.previewElement.classList.remove('is-visible')
            this.current.contentElement.classList.remove('is-visible')

            this.current.isOpen = false
        }

        // Entering item
        item.navigationElement.classList.add('is-active')
        item.previewElement.classList.add('is-visible')
        item.contentElement.classList.add('is-visible')

        item.isOpen = true

        this.current = item

        // // Tabs resize
        // if(item.tabs)
        //     item.tabs.resize()

        if(item.mainFocus && this.game?.inputs?.mode !== Inputs.MODE_TOUCH)
        {
            requestAnimationFrame(() =>
            {
                item.mainFocus.focus()
            })
        }

        // Input filters
        if(this.game?.inputs)
        {
            this.game.inputs.filters.clear()
            this.game.inputs.filters.add('menu')
        }

        // Events
        this.events.trigger('open')
        this.current.events.trigger('open')

        // Need open
        if(this.state === Menu.CLOSED || this.state === Menu.CLOSING)
        {
            this.state = Menu.OPENING

            if(this.element)
            {
                this.element.classList.add('is-displayed')
                requestAnimationFrame(() =>
                {
                    if(this.element)
                    {
                        requestAnimationFrame(() =>
                        {
                            if(this.element)
                            {
                                this.element.classList.add('is-visible')
                            }
                        })
                    }
                })
            }
        }
    }

    close()
    {
        if(this.state === Menu.CLOSING || this.state === Menu.CLOSED)
            return

        // Sound
        const sound = this.game?.audio?.groups.get('click')
        if(sound)
            sound.play(false)

        this.element?.classList.remove('is-visible')

        this.state = Menu.CLOSING
        this.events.trigger('close')
        this.current.isOpen = false
        this.current.events.trigger('close')
    }

    preopen()
    {
        if(this.game?.debug && this.game.debug.active)
            return

        this.items.forEach((item) =>
        {
            // Is preopened
            if(typeof item.navigationElement.dataset.preopen !== 'undefined')
            {
                this.open(item.name)
            }
        })
    }
}
