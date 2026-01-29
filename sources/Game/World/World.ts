import * as THREE from 'three/webgpu'
import { Game } from '../Game.js'
import { Floor } from './Floor.js'
import { Grass } from './Grass.js'
import { WaterSurface } from './WaterSurface.js'
import { WindLines } from './WindLines.js'
import { Leaves } from './Leaves.js'
import { Lightnings } from './Lightnings.js'
import { Snow } from './Snow.js'
import { Whispers } from './Whispers.js'
import { VisualVehicle } from './VisualVehicle.js'
import { VisualTornado } from './VisualTornado.js'
import { Flowers } from './Flowers.js'
import { Bricks } from './Bricks.js'
import { Trees } from './Trees.js'
import { Bushes } from './Bushes.js'
import { Fireballs } from './Fireballs.js'
import { RainLines } from './RainLines.js'
import { Confetti } from './Confetti.js'
import { Intro } from './Intro.js'


export class World {
    game!: Game
    intro!: Intro
    visualVehicle!: VisualVehicle
    floor!: Floor
    waterSurface!: WaterSurface
    grass!: Grass
    windLines!: WindLines
    confetti!: Confetti
    leaves!: Leaves
    rain!: RainLines
    lightnings!: Lightnings
    fireballs!: Fireballs
    snow!: Snow
    visualTornado!: VisualTornado
    bushes!: Bushes
    birchTrees!: Trees
    oakTrees!: Trees
    cherryTrees!: Trees
    flowers!: Flowers
    bricks!: Bricks
    whispers!: Whispers

    constructor() {
        this.game = Game.getInstance()
        this.step(0)
    }

    step(step: number): void {
        if (step === 0) {
            // this.grid = new Grid()
            this.intro = new Intro(this.game)
        }
        else if (step === 1) {
            this.visualVehicle = new VisualVehicle(this.game.resources.vehicle.scene)
            this.floor = new Floor(this.game)
            this.waterSurface = new WaterSurface(this.game)
            this.grass = new Grass(this.game)
            this.windLines = new WindLines(this.game)
            this.confetti = new Confetti(this.game)
            this.leaves = new Leaves(this.game)
            this.rain = new RainLines(this.game)
            this.lightnings = new Lightnings(this.game)
            this.fireballs = new Fireballs(this.game)
            this.snow = new Snow(this.game)
            this.visualTornado = new VisualTornado(this.game)
            this.bushes = new Bushes(this.game)
            this.birchTrees = new Trees('Birch Tree', this.game.resources.birchTreesVisualModel.scene, this.game.resources.birchTreesReferencesModel.scene.children, new THREE.Color('#ff4f2b'), new THREE.Color('#ff903f'))
            this.oakTrees = new Trees('Oak Tree', this.game.resources.oakTreesVisualModel.scene, this.game.resources.oakTreesReferencesModel.scene.children, new THREE.Color('#b4b536'), new THREE.Color('#d8cf3b'))
            this.cherryTrees = new Trees('Cherry Tree', this.game.resources.cherryTreesVisualModel.scene, this.game.resources.cherryTreesReferencesModel.scene.children, new THREE.Color('#ff6d6d'), new THREE.Color('#ff9990'))
            this.flowers = new Flowers(this.game)
            // this.bricks = new Bricks()
            // this.fences = new Fences()
            // this.benches = new Benches()
            // this.explosiveCrates = new ExplosiveCrates()
            // this.poleLights = new PoleLights()
            // this.lanterns = new Lanterns()
            // this.scenery = new Scenery()
            // this.areas = new Areas()
        }
        else if (step === 2) {
            this.whispers = new Whispers(this.game)
        }
    }
}
