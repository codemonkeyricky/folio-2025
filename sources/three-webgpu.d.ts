declare module 'three/tsl' {
    export function color(value?: string | any): any
    export function uniform(value: any): any
    export function vec2(x: number, y: number): any
    export function texture(value: any, uv?: any): any
    export function Fn(fn: () => void): any
    export function Fn(fn: (node: any) => any): any
}

export {}
