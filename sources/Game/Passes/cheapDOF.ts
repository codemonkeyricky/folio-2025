import { TempNode } from 'three/webgpu'
import { nodeObject, Fn, uv, uniform, convertToTexture, mix } from 'three/tsl'
import { boxBlur } from 'three/examples/jsm/tsl/display/boxBlur.js'

class CheapDOFNode extends TempNode
{
    textureNode: any
    strength: any

	static get type()
	{
		return 'CheapDOFNode'
	}

	constructor(textureNode: any)
	{
		super('vec4')

		this.textureNode = textureNode
		this.strength = uniform(2)
	}

	setup()
	{
		const outputNode = Fn( () =>
		{
			const strength = uv().y.sub(0.5).abs().mul(this.strength).pow(2)

			// const strength = uv().sub(0.5).length().sub(0.3).max(0).mul(this.strength).pow(2)

			// return vec4(vec3(strength), 1)

			// return gaussianBlur(this.textureNode, 2, 3)

			// return hashBlur(this.textureNode, 0.01, {
			// 	repeats: 46,
			// 	premultipliedAlpha: true
			// })

			const blurOutput = boxBlur(this.textureNode, {
				size: uniform(1),
				separation: uniform(2)
			})

			return mix(this.textureNode, blurOutput, strength)
		} )()

		return outputNode
	}
}

export default CheapDOFNode

export const cheapDOF = (node: any) => nodeObject(new CheapDOFNode(convertToTexture(node)))
