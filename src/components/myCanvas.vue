<template>
	<div id="divBox" class="#divBox">
		<div id="div1" class="#div1"><canvas id="canv" width="540" height="540" style="display: block; margin: 0 auto; border: 2px green solid;background-color: white;"></canvas></div>
		<div id="div4" class="#div4"><canvas id="canv4" width="540" height="540"></canvas></div>
		<div id="div2" class="#div2"><canvas id="canv2" width="540" height="540"></canvas></div>
		<div id="div3" class="#div3"><canvas id="canv3" width="60" height="540" style="border: 2px green solid;"></canvas></div>
	</div>
	<div style="position: absolute; left: 50%; top: 570px; transform: translate(-50%);"><span>错误次数：<span id="errSum">0</span>&nbsp;&nbsp;&nbsp;</span><span>时间：<span id="time">0</span>秒</span></div>
	<div id="landlord">
		<div class="message" style="opacity:0"></div>
		<canvas id="live2d" height="320"></canvas>
		<div id="tipButton" class="hide-button">提示</div>
		<div id="change" class="change-button">替换</div>
	</div>
	<div id="box">
		<a href="#">测试</a>
	</div>
</template>

<script>
import { ref } from 'vue';
import haru_normal_01_mp3 from '../assets/model/sounds/haru_normal_01.mp3'
const h_m_01 = ref(haru_normal_01_mp3);
import haru_normal_02_mp3 from '../assets/model/sounds/haru_normal_02.mp3'
const h_m_02 = ref(haru_normal_02_mp3);
import haru_normal_03_mp3 from '../assets/model/sounds/haru_normal_03.mp3'
const h_m_03 = ref(haru_normal_03_mp3);
import haru_normal_04_mp3 from '../assets/model/sounds/haru_normal_04.mp3'
const h_m_04 = ref(haru_normal_04_mp3);
import haru_normal_05_mp3 from '../assets/model/sounds/haru_normal_05.mp3'
const h_m_05 = ref(haru_normal_05_mp3);
import haru_normal_06_mp3 from '../assets/model/sounds/haru_normal_06.mp3'
const h_m_06 = ref(haru_normal_06_mp3);
import haru_normal_07_mp3 from '../assets/model/sounds/haru_normal_07.mp3'
const h_m_07 = ref(haru_normal_07_mp3);
import haru_normal_08_mp3 from '../assets/model/sounds/haru_normal_08.mp3'
const h_m_08 = ref(haru_normal_08_mp3);
import haru_normal_09_mp3 from '../assets/model/sounds/haru_normal_09.mp3'
const h_m_09 = ref(haru_normal_09_mp3);
import haru_normal_10_mp3 from '../assets/model/sounds/haru_normal_10.mp3'
const h_m_10 = ref(haru_normal_10_mp3);


	export default{
		mounted() {
			var canv = document.getElementById("canv");
			var ctx = canv.getContext("2d");
			ctx.lineWidth = 4;
			ctx.strokeStyle = "rgba(65, 105, 255, 0.7)";
			drawLineA(ctx, canv.width, canv.height);
			
			ctx.lineWidth = 2;
			ctx.strokeStyle = "rgba(65, 105, 255, 0.3)";
			drawLineB(ctx, canv.width, canv.height);
			
			Array.prototype.remove = function(value){
				var index = this.indexOf(value);
				if (index > -1){
					this.splice(index, 1);
				}
			};
			
			var arr = newGame();
			
			var bArr = backups(arr);
			
			var sum = 0;
			while(sum < 40){
				var x = Math.floor(Math.random() * 9);
				var y = Math.floor(Math.random() * 9);
				if (arr[x][y] != 0){
					arr[x][y] = 0;
					sum ++;
				}
			}
			
			var userArr = backups(arr);
			
			drawblock(ctx, canv.width, canv.height, arr);
			
			var tipButton = document.getElementById("tipButton");
			var tipHide = true;
			var tipText = [];
			tipButton.onclick = function(){
				if (tipButton.innerText == "提示"){
					tipHide = false;
					tipButton.innerText = "关闭";
				}else {
					tipHide = true;
					tipButton.innerText = "提示"
				}
			}
			
			var canv2 = document.getElementById("canv2");
			var ctx2 = canv2.getContext("2d");
			var lastBlock = [];
			var uFlag = false;
			canv2.onclick = function(e){
				if (lastBlock.length != 0){
					ctx2.clearRect(canv2.width/9*lastBlock[0], canv2.height/9*lastBlock[1],
									canv2.width/9, canv2.height/9);
				}
				e = event || window.event;
				var blockX = Math.floor(e.offsetX/(canv2.width/9));
				var blockY = Math.floor(e.offsetY/(canv2.height/9));
				lastBlock = [blockX, blockY];
				ctx2.fillStyle = "rgba(255, 93, 0, 0.1)";
				ctx2.fillRect(canv2.width/9*blockX, canv2.height/9*blockY,
								canv2.width/9, canv2.height/9);
								
				if (arr[blockY][blockX] == 0 && uFlag == false){
					canv3.style.display = "block";
					uFlag = true;
				}
				else if (arr[blockY][blockX] != 0){
					canv3.style.display = "none";
					uFlag = false;
				}
				
				if (tipHide){
					tipText = ["需要提示吗？", "这里填多少好呢？"]
				}
				else {
					var temp = "横向还剩";
					for (var i = 0; i < 9; i++){
						if (userArr[blockY][i] == 0){
							if (i == 8){
								temp += bArr[blockY][i] + ""
							}else {
								temp += bArr[blockY][i] + ","
							}
						}else {
							if (userArr[blockY][i] != bArr[blockY][i]){
								if (i == 8){
									temp += bArr[blockY][i] + ""
								}else {
									temp += bArr[blockY][i] + ","
								}
							}
						}
					}
					temp += "可填，纵向还剩";
					for (var i = 0; i < 9; i++){
						if (userArr[i][blockX] == 0){
							if (i == 8){
								temp += bArr[i][blockX] + "。"
							}else {
								temp += bArr[i][blockX] + ","
							}
						}
						else {
							if (userArr[i][blockX] != bArr[i][blockX]){
								if (i == 8){
									temp += bArr[i][blockX] + ""
								}else {
									temp += bArr[i][blockX] + ","
								}
							}
						}
					}
					tipText = [temp];
				}
				showMessage(tipText[Math.floor(Math.random() * tipText.length + 1) - 1], 3000);
			}
			
			var canv3 = document.getElementById("canv3");
			var ctx3 = canv3.getContext("2d");
			drawAllNumber(ctx3, canv3.width, canv3.height, getAllNumberToArr(1, 9));
			
			var startFlag = false;
			var errInt = 0;
			var errSum = document.getElementById("errSum");
			
			var canv4 = document.getElementById("canv4");
			var ctx4 = canv4.getContext("2d");
			canv3.onclick = function(e){
				if (lastBlock.length != 0){
					var blockI = lastBlock[0];
					var blockJ = lastBlock[1];
					
					if (arr[blockJ][blockI] == 0){
						e = event || window.event;
						var blockX = Math.floor(e.offsetX/canv3.width);
						var blockY = Math.floor(e.offsetY/(canv2.height/9));
						ctx4.clearRect(canv4.width/9*blockI, canv4.height/9*blockJ, canv4.width/9, canv4.height/9);
						ctx4.font = "30px sans-serif";
						ctx4.textAlign = "center";
						if (blockY + 1 == bArr[blockJ][blockI]){
							ctx4.fillStyle = "rgba(0, 255, 17, 0.8)";
						}
						else{
							ctx4.fillStyle = "rgba(0, 170, 255, 1.0)";
							tipText = ["不对哦，再想想看填多少。"]
							showMessage(tipText, 2000);
							errInt++;
						}
						ctx4.fillText(blockY + 1, canv4.width/9*blockI + canv4.width/9/2, canv4.height/9*blockJ + canv4.height/9/3*2);
						userArr[blockJ][blockI] = blockY + 1;
						errSum.innerText = errInt;
					}
				}
				startFlag = true;
			}
			
			var t = 0;
			function start(){
				if (startFlag){
					var time = document.getElementById("time");
					time.innerText = t+"";
					t++;
					var fullFlag = true;
					for (var i = 0; i < 9; i++){
						if (userArr[i].includes(0)){
							fullFlag = false;
							break;
						}
					}
					
					if (fullFlag){
						for (var i = 0; i < 9; i++) {
							if (bArr[i].every((v, j) => v === userArr[i][j])){
								startFlag = false;
								
							}else{
								startFlag = true;
								break;
							}
						}
						if (startFlag == false){
							alert("解算完成！花费时间：" + t + "秒");
							canv2.classList.add("notClick");
						}
					}
					
				}
			}
			
			window.addEventListener("keypress", function(e){
				e = event || window.event;
				console.log(e.keyCode);
				if (e.keyCode == 114){
					for (var i = 0; i < bArr.length; i++) {
						for (var j = 0; j < bArr[i].length; j++) {
							if (arr[i][j] == 0){
								var blockX = Math.floor(e.offsetX/canv3.width);
								var blockY = Math.floor(e.offsetY/(canv2.height/9));
								ctx4.clearRect(canv4.width/9*j, canv4.height/9*i, canv4.width/9, canv4.height/9);
								ctx4.font = "30px sans-serif";
								ctx4.textAlign = "center";
								ctx4.fillStyle = "rgba(0, 170, 255, 1.0)";
								ctx4.fillText(bArr[i][j], canv4.width/9*j + canv4.width/9/2, canv4.height/9*i + canv4.height/9/3*2);
								userArr[i][j] = bArr[i][j];
							}
						}
					}
					
					
				}
			})
			
			setInterval(start, 1000);
			
			Live2dChange(LAppDefine.MODELS[0][0]);
			
			var changButton = document.getElementById("change");
			var modelIndex = 1;
			changButton.onclick = function(){
				modelIndex++;
				if (modelIndex > LAppDefine.MODELS.length){
					modelIndex = 1;
				}
				Live2dChange(LAppDefine.MODELS[modelIndex - 1][0]);
			}
		}
	}
</script>

<style>
	#divBox{
		position: relative;
	}
	
	#div1,#div2,#div4{
		position: absolute;
		left: 50%;
		transform: translate3d(-50%, 0, 0);
	}
	
	#div3{
		position: absolute;
		left: 50%;
		margin: 0 300px;
	}
</style>