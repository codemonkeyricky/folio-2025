import * as THREE from 'three/webgpu'

import { Debug } from './Debug.js'
import { Inputs } from './Inputs/Inputs.js'
import { Physics } from './Physics/Physics.js'
import { Rendering } from './Rendering.js'
import { ResourcesLoader } from './ResourcesLoader'
import { Ticker } from './Ticker.js'
import { Time } from './Time.js'
import { Player } from './Player'
import { View } from './View'
import { Viewport } from './Viewport.ts'
import { World } from './World/World.js'
import { Tracks } from './Tracks'
import { Lighting } from './Lighting'
import { Materials } from './Materials'
import { Objects } from './Objects.ts'
import { Fog } from './Fog.ts'
import { DayCycles } from './Cycles/DayCycles.js'
import { Weather } from './Weather'
import { Noises } from './Noises'
import { Wind } from './Wind.ts'
import { Terrain } from './Terrain.ts'
import { Explosions } from './Explosions.js'
import { YearCycles } from './Cycles/YearCycles.ts'
import { Server } from './Server'
import { Modals } from './Modals.js'
import { PhysicsVehicle } from './Physics/PhysicsVehicle.js'
import { PhysicsWireframe } from './Physics/PhysicsWireframe.ts'
import { Zones } from './Zones.js'
import { Overlay } from './Overlay'
import { Tornado } from './Tornado'
import { InteractivePoints } from './InteractivePoints'
import { Respawns } from './Respawns.ts'
import { Audio } from './Audio'
import { ClosingManager } from './ClosingManager.js'
import { RayCursor } from './RayCursor'
import { Water } from './Water.ts'
import { Reveal } from './Reveal.js'
import { KonamiCode } from './KonamiCode.js'
import { Achievements } from './Achievements'
import { Notifications } from './Notifications'
import { Quality } from './Quality.js'
import { Menu } from './Menu.js'
import { Title } from './Title.js'
import { PreRenderer } from './PreRenderer.ts'
import { Options } from './Options'
import { Map } from './Map'

export class Game
{
    static getInstance()
    {
        return Game.instance
    }

    private static instance: Game

    domElement: HTMLElement | null
    canvasElement: HTMLElement | null
    scene: THREE.Scene
    debug: Debug
    resourcesLoader: ResourcesLoader
    quality: Quality
    server: Server
    ticker: Ticker
    time: Time
    dayCycles: DayCycles
    yearCycles: YearCycles
    inputs: Inputs
    audio: Audio
    notifications: Notifications
    rayCursor: RayCursor
    viewport: Viewport
    modals: Modals
    menu: Menu
    rendering: Rendering
    resources: any
    options: Options
    respawns: Respawns
    view: View
    reveal: Reveal
    noises: Noises
    weather: Weather
    wind: Wind
    tracks: Tracks
    lighting: Lighting
    fog: Fog
    water: Water
    materials: Materials
    objects: Objects
    explosions: Explosions
    world: World
    RAPIER: any
    terrain: Terrain
    physics: Physics
    wireframe: PhysicsWireframe
    physicalVehicle: PhysicsVehicle
    zones: Zones
    player: Player
    closingManager: ClosingManager
    interactivePoints: InteractivePoints
    overlay: Overlay
    konamiCode: KonamiCode
    achievements: Achievements
    tornado: Tornado
    map: Map
    title: Title

    constructor()
    {
        this.instance = this

        this.init()
    }

    async init()
    {
        this.domElement = document.querySelector('.game')
        this.canvasElement = this.domElement?.querySelector('.js-canvas')
        document.documentElement.classList.add('is-started')

        this.scene = new THREE.Scene()
        this.debug = new Debug()
        this.resourcesLoader = new ResourcesLoader()
        this.quality = new Quality()
        this.server = new Server()
        this.ticker = new Ticker()
        this.time = new Time()
        this.dayCycles = new DayCycles()
        this.yearCycles = new YearCycles()
        this.inputs = new Inputs([], [ 'intro' ])
        this.audio = new Audio()
        this.notifications = new Notifications()
        this.rayCursor = new RayCursor()
        this.viewport = new Viewport(this.domElement)
        this.modals = new Modals()
        this.menu = new Menu()
        this.rendering = new Rendering()
        await this.rendering.setRenderer()
        this.resources = await this.resourcesLoader.load([
            [ 'respawnsReferencesModel',    'respawns/respawnsReferences-compressed.glb', 'gltf' ],
            [ 'behindTheSceneStarsTexture', 'behindTheScene/stars.ktx',                   'textureKtx', (resource: any) => { resource.colorSpace = THREE.SRGBColorSpace; resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; resource.wrapS = THREE.RepeatWrapping; resource.wrapT = THREE.RepeatWrapping; } ],
            [ 'soundTexture',               'intro/sound.ktx',                            'textureKtx', (resource: any) => { resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.repeat.x = 0.5; } ],
            [ 'paletteTexture',             'palette.ktx',                                'textureKtx', (resource: any) => { resource.colorSpace = THREE.SRGBColorSpace; resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; } ],
        ])
        this.options = new Options()
        this.respawns = new Respawns(import.meta.env.VITE_PLAYER_SPAWN || 'landing')
        this.view = new View()
        this.rendering.setPostprocessing()
        this.rendering.start()
        this.reveal = new Reveal()
        this.noises = new Noises()
        this.weather = new Weather()
        this.wind = new Wind()
        this.tracks = new Tracks()
        this.lighting = new Lighting()
        this.fog = new Fog()
        this.water = new Water()
        this.materials = new Materials()
        this.objects = new Objects()
        this.explosions = new Explosions()
        this.world = new World()

        const rapierPromise = import('@dimforge/rapier3d')
        const resourcesPromise = this.resourcesLoader.load(
            [
                [ 'foliageTexture',                        'foliage/foliageSDF.ktx',                                     'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; } ],
                [ 'bushesReferences',                      'bushes/bushesReferences-compressed.glb',                     'gltf' ],
                [ 'vehicle',                               'vehicle/default-compressed.glb',                             'gltf' ],
                [ 'playgroundVisual',                      'playground/playgroundVisual-compressed.glb',                 'gltf' ],
                [ 'playgroundPhysical',                    'playground/playgroundPhysical-compressed.glb',               'gltf' ],
                [ 'flowersReferencesModel',                'flowers/flowersReferences-compressed.glb',                   'gltf' ],
                [ 'bricksModel',                           'bricks/bricks-compressed.glb',                               'gltf' ],
                [ 'fencesModel',                           'fences/fences-compressed.glb',                               'gltf' ],
                [ 'benchesModel',                          'benches/benches-compressed.glb',                             'gltf' ],
                [ 'explosiveCratesModel',                  'explosiveCrates/explosiveCrates-compressed.glb',             'gltf' ],
                [ 'lanternsModel',                         'lanterns/lanterns-compressed.glb',                           'gltf' ],
                [ 'terrainTexture',                        'terrain/terrain.ktx',                                        'textureKtx', (resource: any) => { resource.flipY = false; } ],
                [ 'terrainModel',                          'terrain/terrain-compressed.glb',                             'gltf' ],
                [ 'floorSlabsTexture',                     'floor/slabs.ktx',                                            'textureKtx', (resource: any) => { resource.wrapS = THREE.RepeatWrapping; resource.wrapT = THREE.RepeatWrapping; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false } ],
                [ 'birchTreesVisualModel',                 'birchTrees/birchTreesVisual-compressed.glb',                 'gltf' ],
                [ 'birchTreesReferencesModel',             'birchTrees/birchTreesReferences-compressed.glb',             'gltf' ],
                [ 'oakTreesVisualModel',                   'oakTrees/oakTreesVisual-compressed.glb',                     'gltf' ],
                [ 'oakTreesReferencesModel',               'oakTrees/oakTreesReferences.glb',                            'gltf' ],
                [ 'cherryTreesVisualModel',                'cherryTrees/cherryTreesVisual-compressed.glb',               'gltf' ],
                [ 'cherryTreesReferencesModel',            'cherryTrees/cherryTreesReferences-compressed.glb',           'gltf' ],
                [ 'sceneryModel',                          'scenery/scenery-compressed.glb',                             'gltf' ],
                [ 'areasModel',                            'areas/areas-compressed.glb',                                 'gltf' ],
                [ 'poleLightsModel',                       'poleLights/poleLights-compressed.glb',                       'gltf' ],
                [ 'whisperFlameTexture',                   'whispers/whisperFlame.ktx',                                  'textureKtx', (resource: any) => { resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; } ],
                [ 'satanStarTexture',                      'areas/satanStar.ktx',                                        'textureKtx', (resource: any) => { resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; } ],
                [ 'tornadoPathReferencesModel',            'tornado/tornadoPathReferences-compressed.glb',               'gltf' ],
                [ 'overlayPatternTexture',                 'overlay/overlayPattern.ktx',                                 'textureKtx', (resource: any) => { resource.wrapS = THREE.RepeatWrapping; resource.wrapT = THREE.RepeatWrapping; resource.magFilter = THREE.NearestFilter; resource.minFilter = THREE.NearestFilter; resource.generateMipmaps = false } ],
                [ 'interactivePointsKeyIconCrossTexture',  'interactivePoints/interactivePointsKeyIconCross.ktx',        'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; } ],
                [ 'interactivePointsKeyIconEnterTexture',  'interactivePoints/interactivePointsKeyEnter.ktx',        'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; } ],
                [ 'interactivePointsKeyIconATexture',      'interactivePoints/interactivePointsKeyIconA.ktx',            'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; } ],
                [ 'jukeboxMusicNotes',                     'jukebox/jukeboxMusicNotes.ktx',                              'textureKtx', (resource: any) => { resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; } ],
                [ 'achievementsGlyphsTexture',             'achievements/glyphs.ktx',                                    'textureKtx', (resource: any) => { resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.RepeatWrapping; } ],
                [ 'careerFreelancerTexture',               'career/careerFreelancer.ktx',                                'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'careerHeticTexture',                    'career/careerHetic.ktx',                                     'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'careerImmersiveGardenTexture',          'career/careerImmersiveGarden.ktx',                           'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'careerIRLTeacherTexture',               'career/careerIRLTeacher.ktx',                                'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'careerOnlineTeacherTexture',            'career/careerOnlineTeacher.ktx',                             'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'careerUzikTexture',                     'career/careerUzik.ktx',                                      'textureKtx', (resource: any) => { resource.flipY = false; resource.minFilter = THREE.LinearFilter; resource.magFilter = THREE.LinearFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; } ],
                [ 'timeMachineScreenMGSTexture',           'timeMachine/timeMachineScreenMGS.ktx',                       'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; resource.colorSpace = THREE.SRGBColorSpace; } ],
                [ 'timeMachineScreenFolioTexture',         'timeMachine/timeMachineScreenFolio.ktx',                     'textureKtx', (resource: any) => { resource.minFilter = THREE.NearestFilter; resource.magFilter = THREE.NearestFilter; resource.generateMipmaps = false; resource.wrapS = THREE.ClampToEdgeWrapping; resource.wrapT = THREE.ClampToEdgeWrapping; resource.colorSpace = THREE.SRGBColorSpace; } ],
            ],
            (toLoad: number, total: number) =>
            {
                this.world.intro.updateProgress(1 - toLoad / total)
            }
        )

        const [ newResources, RAPIER ] = await Promise.all([ resourcesPromise, rapierPromise ])
        this.RAPIER = RAPIER
        this.resources = { ...newResources, ...this.resources }

        this.terrain = new Terrain()
        this.physics = new Physics()
        this.wireframe = new PhysicsWireframe()
        this.physicalVehicle = new PhysicsVehicle()
        this.zones = new Zones()
        this.player = new Player()
        this.closingManager = new ClosingManager()
        this.interactivePoints = new InteractivePoints()
        this.overlay = new Overlay()
        this.konamiCode = new KonamiCode()
        this.achievements = new Achievements()
        this.tornado = new Tornado()
        this.map = new Map()
        this.title = new Title()
        this.world.step(1)

        if(this.quality.level === 0 && this.rendering.renderer.backend.isWebGPUBackend)
            PreRenderer.render()

        this.reveal.updateStep(0)

        if(this.debug.active)
        {
            this.achievements.setProgress('debug', 1)
        }
    }
}
