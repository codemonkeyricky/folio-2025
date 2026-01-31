import * as THREE from 'three/webgpu'
import { Game } from "./Game.js"
import { color, Fn, mix, texture, uniform, vec2 } from 'three/tsl'

interface ColorInfo {
    stop: number;
    value: string;
}

export class Terrain {
    private readonly game: Game;
    private readonly subdivision: number;
    readonly size: number;
    private colors!: ColorInfo[];
    private gradientTexture!: THREE.Texture;
    private grassColorUniform: any;
    private tracksDelta: any;
    terrainNode!: any;
    colorNode!: any;

    constructor() {
        this.game = Game.getInstance();

        this.subdivision = 128;
        this.size = 192;

        // Debug - Pane doesn't have addFolder method

        this.setGradient();
        this.setNodes();

        this.game.ticker?.events.on('tick', () => {
            this.update();
        }, 10);
    }

    private setGradient() {
        const height = 16;

        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = height;

        this.gradientTexture = new THREE.Texture(canvas);
        this.gradientTexture.colorSpace = THREE.SRGBColorSpace;

        const context = canvas.getContext('2d');
        if (!context) return;

        this.colors = [
            { stop: 0.1, value: '#ffa94e' },
            { stop: 0.3, value: '#5bc2b9' },
            { stop: 0.9, value: '#13375f' },
        ];

        const update = () => {
            const gradient = context.createLinearGradient(0, 0, 0, height);
            for (const color of this.colors)
                gradient.addColorStop(color.stop, color.value);

            context.fillStyle = gradient;
            context.fillRect(0, 0, 1, height);
            this.gradientTexture.needsUpdate = true;
        };

        update();

        // Debug - Pane doesn't have addFolder method
    }

    private setNodes() {
        this.grassColorUniform = uniform(color('#b8b62e'));
        this.tracksDelta = uniform(vec2(0));

        const worldPositionToUvNode = Fn(([position]) => {
            return position.div(this.subdivision).div(1.5).add(0.5);
        });

        this.terrainNode = Fn(([position]) => {
            const textureUv = worldPositionToUvNode(position);
            const data = texture(this.game.resources.terrainTexture, textureUv);

            const groundDataColor = texture(
                this.game.tracks.renderTarget.texture,
                position.sub(- this.game.tracks.halfSize).sub(this.tracksDelta).div(this.game.tracks.size)
            );
            data.g.mulAssign(groundDataColor.r.oneMinus());

            return data;
        });

        this.colorNode = Fn(([terrainData]) => {
            const baseColor = texture(this.gradientTexture, vec2(0, terrainData.b.oneMinus()));

            baseColor.assign(mix(baseColor, this.grassColorUniform, terrainData.g));

            return baseColor.rgb;
        });

        // Debug - Pane doesn't have addFolder method
    }

    private update() {
        this.tracksDelta.value.set(
            this.game.tracks.focusPoint.x,
            this.game.tracks.focusPoint.y
        );
    }
}
