import * as THREE from 'three/webgpu'

declare module 'three/webgpu' {
    class NodeMaterial {
        normals: boolean
        lights: boolean
        isMeshGridMaterial?: boolean
        testNode?: any
        scaleNode?: any
        reference?: string
        antialiased?: boolean
        color?: THREE.Color
        lines?: MeshGridMaterialLine[]
        outputNode?: THREE.Node
        get scale(): number
        set scale(value: number)
    }

    interface MeshGridMaterialLine {
        color: THREE.Uniform
        scale: THREE.Uniform
        thickness: THREE.Uniform
        cross: THREE.Uniform
        offset: THREE.Uniform
    }

    function vec2(x: number, y?: number): THREE.Vector2
    function uv(): THREE.UV
    function positionWorld(): THREE.Node
    function normalWorld(): THREE.Node
    function positionLocal(): THREE.Node
}

export {}

declare module 'three/tsl' {
    function clamp(a: any, b: any, c: any): any
    function smoothstep(edge0: any, edge1: any, x: any): any
    function If(condition: any, then: () => void): any
    function color(value: any): any
    function Fn(args: any[]): any
    function uniform(value: any): any
    function vec3(x: number, y: number, z: number): any
    function vec4(x: number, y: number, z: number, w: number): any
    function mix(a: any, b: any, t: any): any
    function step(edge: any, x: any): any
    function abs(x: any): any
    function greaterThan(a: any, b: any): any
    function and(a: any, b: any): any
    function assign(target: any, value: any): any
    function length(x: any): any
    function oneMinus(x: any): any
    function div(a: any, b: any): any
    function add(a: any, b: any): any
    function fract(x: any): any
    function mul(x: any, y: any): any
    function sub(x: any, y: any): any
    function fwidth(x: any): any
    function dot(v: any): any
    function clamp(x: any, min: any, max: any): any
}

export {}
