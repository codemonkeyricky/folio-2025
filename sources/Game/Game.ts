import * as THREE from 'three/webgpu'

import { Debug } from './Debug.js'
import { Inputs } from './Inputs/Inputs.js'
import { Physics } from './Physics/Physics.js'
import { Rendering } from './Rendering.js'
import { ResourcesLoader } from './ResourcesLoader.js'
import { Ticker } from './Ticker.js'
import { Time } from './Time.js'
import { Player } from './Player.js'
import View from './View.js'
import { Viewport } from './Viewport.js'
import { World } from './World/World.js'
import Tracks from './Tracks.js'
import Lighting from './Lighting.js'
import Materials from './Materials.js'
import { Objects } from './Objects.js'
import { Fog } from './Fog.js'
import { DayCycles } from './Cycles/DayCycles.js'
import Weather from './Weather.js'
import Noises from './Noises.js'
import { Wind } from './Wind.js'
import { Terrain } from './Terrain.js'
import { Explosions } from './Explosions.js'
import { YearCycles } from './Cycles/YearCycles.js'
import Server from './Server.js'
import { Modals } from './Modals.js'
import { PhysicsVehicle } from './Physics/PhysicsVehicle.js'
import { PhysicsWireframe } from './Physics/PhysicsWireframe.js'
import { Zones } from './Zones.js'
import Overlay from './Overlay.js'
import Tornado from './Tornado.js'
import InteractivePoints from './InteractivePoints.js'
import { Respawns } from './Respawns.js'
import Audio from './Audio.js'
import { ClosingManager } from './ClosingManager.js'
import RayCursor from './RayCursor.js'
import { Water } from './Water.js'
import { Reveal } from './Reveal.js'
import { KonamiCode } from './KonamiCode.js'
import Achievements from './Achievements.js'
import Notifications from './Notifications.js'
import { Quality } from './Quality.js'
import { Menu } from './Menu.js'
import { Title } from './Title.js'
import { PreRenderer } from './PreRenderer.js'
import { Options } from './Options.js'
import Map from './Map.js'



export class Game
{
    static getInstance()
    {
        return Game.instance
    }

    private static instance: Game

    domElement: HTMLElement | null = null
    canvasElement: HTMLElement | null = null
    scene: THREE.Scene | undefined
    debug: Debug | undefined
    resourcesLoader: ResourcesLoader | undefined
    quality: Quality | undefined
    server: typeof Server | undefined
    ticker: Ticker | undefined
    time: Time | undefined
    dayCycles: DayCycles | undefined
    yearCycles: YearCycles | undefined
    inputs: Inputs | undefined
    audio: typeof Audio | undefined
    notifications: typeof Notifications | undefined
    rayCursor: typeof RayCursor | undefined
    viewport: Viewport | undefined
    modals: Modals | undefined
    menu: Menu | undefined
    rendering: Rendering | undefined
    resources: any
    options: Options | undefined
    respawns: Respawns | undefined
    view: typeof View | undefined
    reveal: Reveal | undefined
    noises: typeof Noises | undefined
    weather: typeof Weather | undefined
    wind: Wind | undefined
    tracks: typeof Tracks | undefined
    lighting: typeof Lighting | undefined
    fog: Fog | undefined
    water: Water | undefined
    materials: typeof Materials | undefined
    objects: Objects | undefined
    explosions: Explosions | undefined
    world: World | undefined
    RAPIER: any
    terrain: Terrain | undefined
    physics: Physics | undefined
    wireframe: PhysicsWireframe | undefined
    physicalVehicle: PhysicsVehicle | undefined
    zones: Zones | undefined
    player: Player | undefined
    closingManager: ClosingManager | undefined
    interactivePoints: typeof InteractivePoints | undefined
    overlay: typeof Overlay | undefined
    konamiCode: KonamiCode | undefined
    achievements: typeof Achievements | undefined
    tornado: typeof Tornado | undefined
    map: Map<any, any> | undefined
    title: Title | undefined

    constructor()
    {
        Game.instance = this

        this.init()
    }

    async init()
    {
        const domElement = document.querySelector('.game')
        if (!domElement) {
            throw new Error('Game DOM element not found')
        }
        this.domElement = domElement as HTMLElement
        const canvasElement = domElement.querySelector('.js-canvas')
        if (!canvasElement) {
            throw new Error('Game canvas element not found')
        }
        this.canvasElement = canvasElement as HTMLElement
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
        this.viewport = new Viewport(this.domElement as HTMLElement)
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
        this.respawns = new Respawns(import.meta.env.VITE_PLAYER_SPAWN || 'landing' as string)
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
                if (this.world && this.world.intro && (this.world.intro as any).updateProgress) {
                    (this.world.intro as any).updateProgress(1 - toLoad / total)
                }
            }
        )

        const [ newResources, RAPIER ] = await Promise.all([ resourcesPromise, rapierPromise ])
        this.RAPIER = RAPIER
        this.resources = { ...newResources, ...this.resources }

        this.terrain = new Terrain()
        this.physics = new Physics(this)
        this.wireframe = new PhysicsWireframe()
        this.physicalVehicle = new PhysicsVehicle(this)
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

        if(this.quality.level === 0 && (this.rendering.renderer as any).backend?.isWebGPUBackend)
            PreRenderer.render()

        this.reveal.updateStep(0)

        if(this.debug.active)
        {
            this.achievements.setProgress('debug', 1)
        }
    }

    reset()
    {
        const interactiveButtons = (this.inputs as any).interactiveButtons
        if (interactiveButtons) {
            interactiveButtons.clearItems()
        }

        const player = this.player
        if (!player) return

        player.respawn(null, () =>
        {
            const objects = this.objects
            if (!objects) return

            objects.resetAll()

            const world = this.world
            if (world) {
                if ((world as any).explosiveCrates) {
                    (world as any).explosiveCrates.reset()
                }

                const areas = (world as any).areas
                if (areas) {
                    const bowling = areas.bowling
                    if (bowling) {
                        bowling.restart()
                    }

                    const cookie = areas.cookie
                    if (cookie && cookie.cookies) {
                        cookie.cookies.instancedGroup.needsUpdate = true
                    }

                    const toilet = areas.toilet
                    if (toilet && toilet.cabin) {
                        toilet.cabin.down = false
                    }

                    const social = areas.social
                    if (social) {
                        social.statue.down = false
                        if (social.fans) {
                            social.fans.instancedGroup.needsUpdate = true
                        }
                    }
                }

                const benches = (world as any).benches
                if (benches && benches.instancedGroup) {
                    benches.instancedGroup.needsUpdate = true
                }

                const fences = (world as any).fences
                if (fences && fences.instancedGroup) {
                    fences.instancedGroup.needsUpdate = true
                }

                const bricks = (world as any).bricks
                if (bricks && bricks.instancedGroup) {
                    bricks.instancedGroup.needsUpdate = true
                }

                const lanterns = (world as any).lanterns
                if (lanterns && lanterns.instancedGroup) {
                    lanterns.instancedGroup.needsUpdate = true
                }
            }

            gsap.delayedCall(2, () =>
            {
                this.achievements.setProgress('reset', 1)
            })
        })
    }
}
