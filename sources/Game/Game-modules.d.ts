declare module './Game.js' {
    const Game: any
    export default Game
}

declare module './Achievements.js' {
    const module: any
    export default module
}
declare module './Audio.js' {
    const module: any
    export default module
}
declare module './BlackFriday/BlackFriday.js' {
    const module: any
    export default module
}
declare module './BlackFriday/FragmentObject.js' {
    const module: any
    export default module
}
declare module './ClosingManager.js' {
    const module: any
    export default module
}
declare module './Cycles/Cycles.ts' {
    const module: any
    export default module
}
declare module './Cycles/DayCycles.ts' {
    const module: any
    export default module
}
declare module './Cycles/YearCycles.ts' {
    const module: any
    export default module
}

declare module './Cycles/Cycles.js' {
    const module: any
    export default module
}
declare module './Cycles/DayCycles.js' {
    const module: any
    export default module
}
declare module './Debug.js' {
    const module: any
    export default module
}
declare module './Easter.js' {
    const module: any
    export default module
}
declare module './Events.ts' {
    const module: any
    export default module
}
declare module './Explosions.js' {
    const module: any
    export default module
}
declare module './Game.js' {
    const module: any
    export default module
}
declare module './Geometries/LineGeometry.ts' {
    const module: any
    export default module
}
declare module './Geometries/PortalSlabsGeometry.js' {
    const module: any
    export default module
}
declare module './Geometries/PortalSlabsGeometry.ts' {
    const module: any
    export default module
}
declare module './Geometries/WindLineGeometry.js' {
    const module: any
    export default module
}
declare module './InputFlag.js' {
    const module: any
    export default module
}
declare module './Inputs/Gamepad.js' {
    const module: any
    export default module
}
declare module './Inputs/Inputs.js' {
    const module: any
    export default module
}
declare module './Inputs/InteractiveButtons.js' {
    class InteractiveButtons {
        events: any
        active: boolean
        element: HTMLElement | null
        overlay: HTMLElement | null
        list: Set<string>
        items: Map<string, { name: string, visible: boolean, element: HTMLElement }>
        activate(): void
        deactivate(): void
        addItems(list: string[]): void
        removeItems(list: string[]): void
        clearItems(): void
        updateItems(): void
    }
    export { InteractiveButtons }
    export default InteractiveButtons
}
declare module './Inputs/Pointer.js' {
    const module: any
    export default module
}
declare module './Inputs/Wheel.js' {
    const module: any
    export default module
}
declare module './InstancedGroup.js' {
    const module: any
    export default module
}
declare module './InteractivePoints.js' {
    const module: any
    export default module
}
declare module './KonamiCode.js' {
    const module: any
    export default module
}
declare module './Ligthing.js' {
    const module: any
    export default module
}
declare module './Map.js' {
    const module: any
    export default module
}
declare module './Materials.js' {
    const module: any
    export default module
}
declare module './Materials/MeshDefaultMaterial.js' {
    const module: any
    export default module
}
declare module './Materials/MeshGridMaterial.ts' {
    const module: any
    export default module
}
declare module './Menu.js' {
    const module: any
    export default module
}
declare module './Modals.js' {
    const module: any
    export default module
}
declare module './Monitoring.ts' {
    const module: any
    export default module
}
declare module './Noises.js' {
    const module: any
    export default module
}
declare module './Notifications.js' {
    const module: any
    export default module
}
declare module './Objects.js' {
    const module: any
    export default module
}
declare module './Options.js' {
    const module: any
    export default module
}
declare module './Overlay.js' {
    const module: any
    export default module
}
declare module './Passes/cheapDOF.ts' {
    const cheapDOF: any
    export default cheapDOF
}
declare module './Physics/Physics.js' {
    const module: any
    export default module
}
declare module './Physics/PhysicsVehicle.js' {
    const module: any
    export default module
}
declare module './Physics/PhysicsWireframe.js' {
    const module: any
    export default module
}
declare module './Player.js' {
    const module: any
    export default module
}
declare module './PreRenderer.ts' {
    const module: any
    export default module
}
declare module './Quality.ts' {
    const module: any
    export default module
}
declare module './RayCursor.js' {
    const module: any
    export default module
}
declare module './References.js' {
    const module: any
    export default module
}
declare module './Passes/cheapDOF.ts' {
    const cheapDOF: any
    export default cheapDOF
}
declare module './Rendering.js' {
    const module: any
    export default module
}
declare module './ResourcesLoader.js' {
    const module: any
    export default module
}
declare module './Respawns.js' {
    const module: any
    export default module
}
declare module './Server.js' {
    const module: any
    export default module
}
declare module './Tabs.js' {
    const module: any
    export default module
}
declare module './Terrain.ts' {
    const module: any
    export default module
}
declare module './TextCanvas.js' {
    const module: any
    export default module
}

declare module './TextCanvas.ts' {
    class TextCanvas {
        constructor(fontFamily?: string, fontWeight?: string, fontSize?: number, width?: number | null, height?: number | null, density?: number, horizontalAlign?: string, lineHeight?: number)
        updateText(text: string | string[]): void
        getMeasure(): any
        texture: any
    }
    export default TextCanvas
}
declare module './Ticker.js' {
    const module: any
    export default module
}
declare module './Time.js' {
    const module: any
    export default module
}
declare module './Title.js' {
    const module: any
    export default module
}
declare module './Tornado.js' {
    const module: any
    export default module
}
declare module './Tracks.js' {
    const module: any
    export default module
}
declare module './Trails.js' {
    const module: any
    export default module
}
declare module './View.js' {
    export const View: any
    export default View
}

declare module './Tracks.js' {
    export const Tracks: any
    export default Tracks
}

declare module './Lighting.js' {
    export const Lighting: any
    export default Lighting
}

declare module './Materials.js' {
    export const Materials: any
    export default Materials
}

declare module './Weather.js' {
    export const Weather: any
    export default Weather
}

declare module './Noises.js' {
    export const Noises: any
    export default Noises
}

declare module './Server.js' {
    export const Server: any
    export default Server
}

declare module './Overlay.js' {
    export const Overlay: any
    export default Overlay
}

declare module './Tornado.js' {
    export const Tornado: any
    export default Tornado
}

declare module './InteractivePoints.js' {
    export const InteractivePoints: any
    export default InteractivePoints
}

declare module './Audio.js' {
    export const Audio: any
    export default Audio
}

declare module './RayCursor.js' {
    export const RayCursor: any
    export default RayCursor
}

declare module './Achievements.js' {
    export const Achievements: any
    export default Achievements
}

declare module './Notifications.js' {
    export const Notifications: any
    export default Notifications
}

declare module './Options.js' {
    export const Options: any
    export default Options
}

declare module './Map.js' {
    export const Map: any
    export default Map
}

declare module './Gamepad.js' {
    export const Gamepad: any
    export default Gamepad
}

declare module './Pointer.js' {
    export const Pointer: any
    export default Pointer
}

declare module './InteractiveButtons.js' {
    export const InteractiveButtons: any
    export default InteractiveButtons
}

declare module './InteractiveButtons.ts' {
    export const InteractiveButtons: any
    export default InteractiveButtons
}

declare module './Nipple.js' {
    export const Nipple: any
    export default Nipple
}
declare module './Viewport.ts' {
    const module: any
    export default module
}
declare module './Water.js' {
    const module: any
    export default module
}
declare module './Weather.js' {
    const module: any
    export default module
}
declare module './Fog.ts' {
    const module: any
    export default module
}
declare module './Inputs/Keyboard.js' {
    const module: any
    export default module
}
declare module './World/Areas/AchievementsArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/AltarArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/Area.js' {
    const module: any
    export default module
}
declare module './World/Areas/Areas.js' {
    const module: any
    export default module
}
declare module './World/Areas/BehindTheSceneArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/BowlingArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/CareerArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/CircuitArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/CookieArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/LabArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/LandingArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/ProjectsArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/SocialArea.js' {
    const module: any
    export default module
}
declare module './World/Areas/TimeMachine.js' {
    const module: any
    export default module
}
declare module './World/Areas/ToiletArea.js' {
    const module: any
    export default module
}
declare module './World/Benches.js' {
    const module: any
    export default module
}
declare module './World/Bricks.js' {
    const module: any
    export default module
}
declare module './World/Bubble.js' {
    const module: any
    export default module
}
declare module './World/Bushes.ts' {
    const module: any
    export default module
}
declare module './World/Confetti.js' {
    const module: any
    export default module
}
declare module './World/ExplosiveCrates.js' {
    const module: any
    export default module
}
declare module './World/Fences.js' {
    const module: any
    export default module
}
declare module './World/Fireballs.js' {
    const module: any
    export default module
}
declare module './World/Floor.js' {
    const module: any
    export default module
}
declare module './World/Flowers.js' {
    const module: any
    export default module
}
declare module './World/Foliage.js' {
    const module: any
    export default module
}
declare module './World/Grass.js' {
    const module: any
    export default module
}
declare module './World/Grid.js' {
    const module: any
    export default module
}
declare module './World/Grid.ts' {
    const module: any
    export default module
}
declare module './World/Intro.js' {
    const module: any
    export default module
}
declare module './World/Lanterns.js' {
    const module: any
    export default module
}
declare module './World/Leaves.js' {
    const module: any
    export default module
}
declare module './World/Snow.js' {
    const module: any
    export default module
}
declare module './World/Whispers.js' {
    const module: any
    export default module
}
declare module './World/WindLines.js' {
    const module: any
    export default module
}
declare module './World/Lightnings.js' {
    const module: any
    export default module
}
declare module './World/PoleLights.js' {
    const module: any
    export default module
}
declare module './World/RainLines.js' {
    const module: any
    export default module
}
declare module './World/Scenery.js' {
    const module: any
    export default module
}
declare module './World/Snow.js' {
    const module: any
    export default module
}
declare module './World/Trees.js' {
    const module: any
    export default module
}
declare module './World/VisualTornado.js' {
    const module: any
    export default module
}
declare module './World/VisualVehicle.js' {
    const module: any
    export default module
}
declare module './World/WaterSurface.js' {
    const module: any
    export default module
}
declare module './World/Whispers.js' {
    const module: any
    export default module
}
declare module './World/WindLines.js' {
    const module: any
    export default module
}
declare module './World/Floor.js' {
    const module: any
    export default module
}
declare module './World/Grass.js' {
    const module: any
    export default module
}
declare module './World/WaterSurface.js' {
    const module: any
    export default module
}
declare module './World/Intro.js' {
    const module: any
    export default module
}
declare module './World/VisualVehicle.js' {
    const module: any
    export default module
}
declare module './World/VisualTornado.js' {
    const module: any
    export default module
}
declare module './World/Flowers.js' {
    const module: any
    export default module
}
declare module './World/Bricks.js' {
    const module: any
    export default module
}
declare module './World/Trees.js' {
    const module: any
    export default module
}
declare module './World/Bushes.ts' {
    const module: any
    export default module
}
declare module './World/Fireballs.js' {
    const module: any
    export default module
}
declare module './World/RainLines.js' {
    const module: any
    export default module
}
declare module './World/Confetti.js' {
    const module: any
    export default module
}
declare module './World/PoleLights.js' {
    const module: any
    export default module
}
declare module './World/Lanterns.js' {
    const module: any
    export default module
}
declare module './World/Fences.js' {
    const module: any
    export default module
}
declare module './World/Benches.js' {
    const module: any
    export default module
}
declare module './World/Scenery.js' {
    const module: any
    export default module
}
declare module './Zones.js' {
    const module: any
    export default module
}
declare module './utilities/ObservableMap.js' {
    const module: any
    export default module
}
declare module './utilities/ObservableSet.js' {
    const module: any
    export default module
}
declare module './utilities/maths.js' {
    const module: any
    export default module
}
declare module './utilities/time.js' {
    const module: any
    export default module
}
declare module "./Reveal.js" {
    export const module: any
    export default module
}

declare module './Lighting.js' {
    export const module: any
    export default module
}

declare module './Weather.js' {
    export const module: any
    export default module
}

declare module './Noises.js' {
    export const module: any
    export default module
}

declare module './Server.js' {
    export const module: any
    export default module
}

declare module './Overlay.js' {
    export const module: any
    export default module
}

declare module './Tornado.js' {
    export const module: any
    export default module
}

declare module './InteractivePoints.js' {
    export const module: any
    export default module
}

declare module './Audio.js' {
    export const module: any
    export default module
}

declare module './RayCursor.js' {
    export const module: any
    export default module
}

declare module './Achievements.js' {
    export const module: any
    export default module
}

declare module './Notifications.js' {
    export const module: any
    export default module
}

declare module './Options.js' {
    export const module: any
    export default module
}

declare module './Map.js' {
    export const module: any
    export default module
}

declare module './Lighting.js' {
    const module: any
    export default module
}

declare module './Weather.js' {
    const module: any
    export default module
}

declare module './Noises.js' {
    const module: any
    export default module
}

declare module './Server.js' {
    const module: any
    export default module
}

declare module './Overlay.js' {
    const module: any
    export default module
}

declare module './Tornado.js' {
    const module: any
    export default module
}

declare module './InteractivePoints.js' {
    const module: any
    export default module
}

declare module './Audio.js' {
    const module: any
    export default module
}

declare module './RayCursor.js' {
    const module: any
    export default module
}

declare module './Achievements.js' {
    const module: any
    export default module
}

declare module './Notifications.js' {
    const module: any
    export default module
}

declare module './Options.js' {
    const module: any
    export default module
}

declare module './Map.js' {
    const module: any
    export default module
}
