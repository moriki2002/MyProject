<template>
	<div class="live2d">
		<canvas id="canvas_view"></canvas>
	</div>
</template>

<script>
	import * as PIXI from 'pixi.js'
	
let app = new PIXI.Application({width:640,height:640})
	  document.body.appendChild(app.view)
	  
	  const container = new PIXI.Container();
	  container.x = app.screen.width / 2;
	  container.y = app.screen.height / 2;
	  app.stage.addChild(container);
	  
	  const sprites = []
	  let parent = container
	  for (let i = 0; i < 3; i++){
		  let sprite = PIXI.Sprite.from('/src/assets/test1.png');
		  sprite.anchor.set(0.5)
		  parent.addChild(sprite)
		  sprites.push(sprite)
		  parent = sprite
	  }
	  
	  let elapsed = 0.0
	  app.ticker.add((delta) => {
			elapsed += delta / 60
			const amount = Math.sin(elapsed)
			const scale = 1.0 + 0.25 * amount
			const alpha = 0.75 + 0.25 * amount;
			const angle = 40 * amount;
		    const x = 75 * amount;
		    for (let i = 0; i < sprites.length; i++) {
		      const sprite = sprites[i];
		      sprite.scale.set(scale);
		      sprite.alpha = alpha;
		      sprite.angle = angle;
		      sprite.x = x;
		    }
})

</script>

<style>
.live2d{
	position: fixed;
	right: 0px;
	bottom: 0px;
}
</style>