import * as THREE from 'three/webgpu'
import { LineGeometry } from './LineGeometry.ts'

export class WindLineGeometry extends LineGeometry {
    type: 'LineGeometry';
    parameters: { points: THREE.Vector3[] };

    constructor(length: number = 10, handlesCount: number = 4, amplitude: number = 1, divisions: number = 30) {
        const halfExtent: number = length / 2;
        const handleSpan: number = length / (handlesCount - 1);
        const handles: THREE.Vector3[] = [];

        for (let i: number = 0; i < handlesCount; i++) {
            handles.push(new THREE.Vector3(
                0,
                i % 2 - 0.5 * amplitude,
                - halfExtent + i * handleSpan
            ))
        }

        const curve: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3(handles);
        const points: THREE.Vector3[] = curve.getPoints(divisions);

        super(points);

        this.type = 'LineGeometry';

        this.parameters = {
            points
        }
    }
}
