export function clamp(input: number, min: number, max: number): number
export function remap(input: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number
export function remapClamp(input: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number
export function lerp(start: number, end: number, ratio: number): number
export function smoothstep(value: number, min: number, max: number): number
export function safeMod(n: number, m: number): number
export function signedModDelta(a: number, b: number, mod: number): number
export function segmentCircleIntersection(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, r: number): Array<{ x: number; y: number }>
export const TAU: number
export function mod(a: number, n: number): number
export function equivalent(a: number): number
export function smallestAngle(current: number, target: number): number
export function dist(a: { x: number; y: number }, b: { x: number; y: number }): number
export function lineIntersectsCircle(p1: { x: number; y: number }, p2: { x: number; y: number }, center: { x: number; y: number }, radius: number): boolean
export function pointInPolygon(point: { x: number; y: number }, poly: Array<{ x: number; y: number }>): boolean
export function circleIntersectsPolygon(center: { x: number; y: number }, radius: number, poly: Array<{ x: number; y: number }>): boolean
