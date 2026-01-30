export interface MapEvent<T> {
    type: 'set' | 'delete' | 'clear'
    key?: T
    value?: unknown
}

export default class ObservableMap<T, V> extends Map<T, V>
{
    private callback: (event: MapEvent<T>) => void

    constructor(callback: (event: MapEvent<T>) => void, entries?: [T, V][] | null)
    {
        super(entries)
        this.callback = callback
    }

    set(key: T, value: V): this
    {
        const result = super.set(key, value)
        this.callback({ type: 'set', key, value })
        return result
    }

    delete(key: T): boolean
    {
        const result = super.delete(key)
        this.callback({ type: 'delete', key })
        return result
    }

    clear(): void
    {
        super.clear()
        this.callback({ type: 'clear' })
    }
}
