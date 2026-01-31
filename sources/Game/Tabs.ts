import { Game } from './Game.js'

export class Tabs
{
    game!: Game
    element!: HTMLElement
    items!: {
        navigationContainer: HTMLElement | null
        navigationItems: HTMLElement[]
        contentContainer: HTMLElement | null
        contentItems: HTMLElement[]
        list: Map<string, any>
        current: any
    }

    constructor(element: HTMLElement)
    {
        this.game = Game.getInstance()
        this.element = element
        this.items = {} as any

        this.setItems()
        // this.setResize()
    }

    setItems()
    {
        this.items = {} as any

        this.items.navigationContainer = this.element.querySelector('.js-tabs-navigation')
        this.items.navigationItems = Array.from(this.items.navigationContainer?.querySelectorAll('.js-tabs-navigation-item') || []) as any
        this.items.contentContainer = this.element.querySelector('.js-tabs-content')
        this.items.contentItems = Array.from(this.items.contentContainer?.querySelectorAll('.js-tabs-content-item') || []) as any

        this.items.list = new Map()
        this.items.current = null

        let defaultItem = null

        for(const navigationElement of this.items.navigationItems)
        {
            const item: any = {}
            item.name = navigationElement.dataset.tabsName
            item.navigationElement = navigationElement
            item.contentElement = this.items.contentItems.find((element: Element) => element.classList.contains(item.name))
            item.innerElement = item.contentElement?.querySelector('.js-tabs-content-inner')

            item.navigationElement.addEventListener('click', () =>
            {
                this.goTo(item.name)
            })

            if(typeof item.contentElement.dataset.tabsDefault !== 'undefined')
                defaultItem = item

            this.items.list.set(
                item.name,
                item
            )
        }

        // Default
        if(defaultItem)
            this.goTo(defaultItem.name)
    }

    // setResize()
    // {
    //     this.game.viewport.events.on('throttleChange', () =>
    //     {
    //         this.resize()
    //     })

    //     this.resize()
    // }

    // resize()
    // {
    //     let height = 0

    //     this.items.list.forEach((item) =>
    //     {
    //         const bounding = item.innerElement.getBoundingClientRect()
            
    //         if(bounding.height > height)
    //             height = bounding.height
    //     })

    //     if(height > 0)
    //     {
    //         this.items.contentContainer.style.height = `${height}px`
    //     }
    // }

    goTo(itemName: string)
    {
        // Same
        if(itemName === this.items.current?.name)
            return

        // Couldn't find content
        const contentItem = this.items.list.get(itemName)
        if(!contentItem)
            return

        // Old content
        if(this.items.current)
        {
            this.items.current.contentElement?.classList.remove('is-active')
            this.items.current.navigationElement?.classList.remove('is-active')
        }

        // New content
        this.items.current = contentItem
        this.items.current.contentElement?.classList.add('is-active')
        this.items.current.navigationElement?.classList.add('is-active')
    }
}