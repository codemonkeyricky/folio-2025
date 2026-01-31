import { Events } from '../Events.js'

export class InteractiveButtons
{
    events!: Events
    active!: boolean
    element!: HTMLElement | null
    overlay!: HTMLElement | null
    list!: Set<string>
    items!: Map<string, { name: string, visible: boolean, element: HTMLElement }>

    constructor()
    {
        this.events = new Events()
        this.active = false
        this.element = document.querySelector('.js-touch-buttons')
        this.overlay = this.element?.querySelector('.js-overlay') ?? null
        this.list = new Set()

        this.setItems()
    }

    private setItems(): void
    {
        this.items = new Map()
        const buttons = this.element?.querySelectorAll('.js-button') ?? []

        for(const button of buttons)
        {
            const item = {
                name: (button as HTMLElement).dataset.name ?? '',
                visible: false,
                element: button as HTMLElement
            }
            
            this.items.set(item.name, item)

            item.element.addEventListener('click', () =>
            {
                this.events.trigger('click', [ item.name ])
                this.events.trigger(item.name)
            })
        }
    }

    updateItems()
    {
        let visibleCount = 0

        this.items.forEach((item) =>
        {
            if(this.list.has(item.name))
            {
                if(!item.visible)
                {
                    item.visible = true 
                    item.element.classList.add('is-visible')
                }

                visibleCount++
            }
            else
            {
                if(item.visible)
                {
                    item.visible = false 
                    item.element.classList.remove('is-visible')
                }
            }
        })

        if(visibleCount && this.overlay)
        {
            this.overlay.classList.add('is-visible')
        }
        else
        {
            this.overlay?.classList.remove('is-visible')
        }
    }

    addItems(list = [])
    {
        for(const itemName of list)
            this.list.add(itemName)

        this.updateItems()
    }

    removeItems(list = [])
    {
        for(const itemName of list)
            this.list.delete(itemName)

        this.updateItems()
    }

    clearItems()
    {
        this.list.clear()

        this.updateItems()
    }

    activate()
    {
        if(this.active)
            return

        this.active = true
        this.element?.classList.add('is-active')
    }

    deactivate()
    {
        if(!this.active)
            return

        this.active = false
        this.element?.classList.remove('is-active')
    }
}