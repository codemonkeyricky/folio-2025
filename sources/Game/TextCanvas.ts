import * as THREE from 'three/webgpu'

interface MeasureResult {
    width: number
}

interface TextCanvasOptions {
    fontFamily?: string
    fontWeight?: string
    fontSize?: number
    width?: number | null
    height?: number | null
    density?: number
    horizontalAlign?: 'center' | 'left' | 'right'
    lineHeight?: number
}

let top = 0

export class TextCanvas {
    private lines: string[]
    private font: string
    private width: number
    private height: number
    private horizontalAlign: 'center' | 'left' | 'right'
    private lineHeight: number
    private canvas!: HTMLCanvasElement
    private context!: CanvasRenderingContext2D
    public texture!: THREE.Texture

    constructor(options: TextCanvasOptions = {})
    {
        const {
            fontFamily = 'Comic Sans',
            fontWeight = '400',
            fontSize = 10,
            width = null,
            height = null,
            density = 1,
            horizontalAlign = 'center',
            lineHeight = 1
        } = options

        this.lines = []
        this.font = `${fontWeight} ${fontSize * density}px "${fontFamily}"`
        this.width = Math.ceil((width ?? 0) * density)
        this.height = Math.ceil((height ?? 0) * density)
        this.horizontalAlign = horizontalAlign
        this.lineHeight = lineHeight * density

        this.setCanvas()
        this.setTexture()
    }

    private setCanvas()
    {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.position = 'fixed'
        this.canvas.style.zIndex = '999'
        this.canvas.style.top = `${top}px`
        this.canvas.style.left = '0'
        top += this.height + 10
        // document.body.append(this.canvas)

        this.context = this.canvas.getContext('2d')!
        this.context.font = this.font
    }

    private setTexture()
    {
        this.texture = new THREE.Texture(this.canvas)
        this.texture.colorSpace = THREE.SRGBColorSpace
        this.texture.minFilter = THREE.NearestFilter
        this.texture.magFilter = THREE.NearestFilter
        this.texture.flipY = false
        this.texture.generateMipmaps = false
    }

    public updateText(text: string | string[]): void
    {
        this.lines = []

        if(typeof text === 'string')
            this.lines.push(text)
        else if(Array.isArray(text))
            this.lines = text

        this.draw()
    }

    public getMeasure(): MeasureResult
    {
        const output: MeasureResult = {
            width: 0
        }

        for(const line of this.lines)
        {
            const measure = this.context.measureText(line)

            if(measure.width > output.width)
                output.width = measure.width
        }

        return output
    }

    private draw(): void
    {
        // Clear
        this.context.fillStyle = '#000000'
        this.context.fillRect(0, 0, this.width, this.height)

        this.context.textAlign = this.horizontalAlign
        this.context.textBaseline = 'middle'
        this.context.fillStyle = '#ffffff'

        let i = 0
        for(const line of this.lines)
        {
            // const y = this.height / (this.lines.length + 1) * (i + 1)
            const y = this.height / 2 + (i - (this.lines.length - 1) / 2) * this.lineHeight

            let x: number | null = null
            if(this.horizontalAlign === 'center')
                x = this.width / 2
            else if(this.horizontalAlign === 'left')
                x = 0
            else if(this.horizontalAlign === 'right')
                x = this.width

            if(x !== null)
                this.context.fillText(line, x, y)

            i++
        }

        this.texture.needsUpdate = true
    }
}
