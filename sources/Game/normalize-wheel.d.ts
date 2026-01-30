declare module 'normalize-wheel' {
    interface NormalizeWheelOptions {
        target?: any
        delay?: number
        smoothness?: number
    }
    interface NormalizeWheelResult {
        pixelX: number
        pixelY: number
        deltaX: number
        deltaY: number
        spinX: number
        spinY: number
        percentX: number
        percentY: number
        customSpeed: number
    }
    function normalizeWheel(event: any, options?: NormalizeWheelOptions): NormalizeWheelResult
    export default normalizeWheel
}
