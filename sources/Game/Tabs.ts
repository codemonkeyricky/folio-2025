import { Game } from './Game.js'

interface TabItem {
    name: string
    navigationElement: HTMLElement
    contentElement: HTMLElement
    innerElement: HTMLElement
}

interface TabsItems {
    navigationContainer: HTMLElement
    navigationItems: HTMLElement[]
    contentContainer: HTMLElement
    contentItems: HTMLElement[]
    list: Map<string, TabItem>
    current: TabItem | null
}

export class Tabs {
    game: Game
    element: HTMLElement
    items!: TabsItems

    constructor(element: HTMLElement) {
        this.game = Game.getInstance()
        this.element = element

        this.setItems()
        // this.setResize()
    }

    setItems(): void {
        this.items = {
            navigationContainer: this.element.querySelector('.js-tabs-navigation') as HTMLElement,
            navigationItems: [ ...this.items.navigationContainer.querySelectorAll('.js-tabs-navigation-item') ] as HTMLElement[],
            contentContainer: this.element.querySelector('.js-tabs-content') as HTMLElement,
            contentItems: [ ...this.items.contentContainer.querySelectorAll('.js-tabs-content-item') ] as HTMLElement[],
            list: new Map<string, TabItem>(),
            current: null
        }

        let defaultItem: TabItem | null = null

        for(const navigationElement of this.items.navigationItems) {
            const name = navigationElement.dataset.tabsName as string
            const contentElement = this.items.contentItems.find(element => element.classList.contains(name)) as HTMLElement
            const innerElement = contentElement.querySelector('.js-tabs-content-inner') as HTMLElement

            const item: TabItem = {
                name,
                navigationElement: navigationElement as HTMLElement,
                contentElement,
                innerElement
            }

            item.navigationElement.addEventListener('click', () => {
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

    goTo(itemName: string): void {
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
            this.items.current.contentElement.classList.remove('is-active')
            this.items.current.navigationElement.classList.remove('is-active')
        }

        // New content
        this.items.current = contentItem
        this.items.current.contentElement.classList.add('is-active')
        this.items.current.navigationElement.classList.add('is-active')
    }
}