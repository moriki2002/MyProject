
import * as PIXI from 'pixi.js'

window.PIXI = PIXI

/* import { Live2DModel } from 'pixi-live2d-display' */
// 如果只需要 Cubism 2.1
import { Live2DModel,Cubism2ModelSettings } from 'pixi-live2d-display';

import api from '/src/assets/model/haru.model.json'

export async function main() {
	const app = new PIXI.Application({
		view: document.getElementById('canvas_view'),
		autoStart:true,
		width: 600,
		height: 600,
		transparent: true,
		backgroundColor: 'black'
	})
	
	let url = '/@/assets/model/haru.model.json';
	const model = await Live2DModel.from('/src/assets/model/haru.model.json')
	
	app.stage.addChild(model)
	
	
	
	model.scale.set(0.15)
	model.anchor.set(0.15, 0)
	
	model.addEventListener('hit', (hitAreas) => {

	})
	
	
}