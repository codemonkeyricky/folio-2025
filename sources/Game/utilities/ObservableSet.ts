export interface SetEvent<T> {
    type: 'add' | 'delete' | 'clear'
    value?: T
    previousValues?: T[]
}

export default class ObservableSet<T> extends Set<T>
{
    private callback: (event: SetEvent<T>) => void

    constructor(callback: (event: SetEvent<T>) => void, entries?: T[] | null)
    {
        super(entries)
        this.callback = callback
    }

    add(value: T): this
    {
        const existed = this.has(value)
        const result = super.add(value)
        if (!existed)
        {
            this.callback({ type: 'add', value })
        }
        return result
    }

    delete(value: T): boolean
    {
        const existed = this.has(value)
        const result = super.delete(value)
        if (existed)
        {
            this.callback({ type: 'delete', value })
        }
        return result
    }

    clear(): void
    {
        const hadItems = this.size > 0
        const previousValues = [...this]
        super.clear()
        if (hadItems)
        {
            this.callback({ type: 'clear', previousValues })
        }
    }
}
