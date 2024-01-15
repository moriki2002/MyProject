
function drawLineA(ctx, width, height) {
	var wLine = ctx.lineWidth;

	ctx.strokeRect(wLine / 2, wLine / 2, width - wLine, height - wLine);
	ctx.beginPath();
	ctx.moveTo(wLine / 2, height / 3);
	ctx.lineTo(width - wLine, height / 3);
	ctx.moveTo(wLine / 2, height / 3 * 2);
	ctx.lineTo(width - wLine, height / 3 * 2);
	ctx.closePath();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(width / 3, wLine / 2);
	ctx.lineTo(width / 3, height - wLine);
	ctx.moveTo(width / 3 * 2, wLine / 2);
	ctx.lineTo(width / 3 * 2, height - wLine);
	ctx.closePath();
	ctx.stroke();
}

function drawLineB(ctx, width, height) {
	var wLine = ctx.lineWidth;

	ctx.beginPath();
	for (var i = 1; i < 9; i++) {
		if (i % 3 != 0) {
			ctx.moveTo(wLine / 2, height / 9 * i);
			ctx.lineTo(width - wLine, height / 9 * i);
			ctx.moveTo(width / 9 * i, wLine / 2);
			ctx.lineTo(width / 9 * i, height - wLine);
		}
	}
	ctx.closePath();
	ctx.stroke();
}

function drawblock(ctx, width, height, arr) {
	ctx.font = "30px sans-serif";
	ctx.textAlign = "center";
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] != 0) {
				ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
				ctx.fillRect(width / 9 * j, height / 9 * i, height / 9, height / 9);
				ctx.fillStyle = "black";
				ctx.fillText(arr[i][j] + "", width / 9 * j + width / 9 / 2, height / 9 * i + height / 9 / 3 * 2);
			}
		}
	}
}

function getAllNumberToArr(min, max) {
	var arr = [];
	for (var i = min; i <= max; i++) {
		arr[i-1] = i;
	}
	return arr;
}

function drawAllNumber(ctx, width, height, arr) {
	ctx.font = "30px sans-serif";
	ctx.textAlign = "center";
	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			ctx.fillStyle = "rgba(255, 200, 0, 0.5)";
		} else {
			ctx.fillStyle = "rgba(255, 229, 229, 1)";
		}
		ctx.fillRect(0, height / 9 * i, width, height / 9);
		ctx.fillStyle = "black";
		ctx.fillText(arr[i],  width/2, height / 9 * i + height / 9 / 3 * 2, width, height / 9);
	}
}

function initArr(paramA , paramB){
	var arr = [];
	for (var i = 0; i < paramA; i++){
		arr[i] = [];
		for (var j = 0; j < paramB; j++) {
			arr[i][j] = 0;
		}
	}
	
	return arr;
}

function arrSort(min, max){
	var arr = getAllNumberToArr(min, max);
	arr.sort(function(a, b){ return 0.5 - Math.random()});
	return arr;
}

function setNineCell(arr){
	var index = 0;
	for (var i = 0; i < 3; i++) {
		var tempArr = arrSort(1, 9);
		for (var j = i * 3; j < i * 3 + 3; j++) {
			for (var n = i * 3; n < i * 3 + 3; n++) {
				arr[j][n] = tempArr[index];
				index++;
			}
		}
		index = 0;
	}
	return arr;
}

function newGame(){
	var arr = initArr(9, 9);
	arr = setNineCell(arr);
	
	var bArr = backups(arr);
	do{
		arr = backups(bArr);
		arr = inputNumber(arr);
	}while (!checkArr(arr))
	
	return arr;
}

function getInputArr(arr, row, col){
	var inputArr = getAllNumberToArr(1, 9);
	
	for (var i = 0; i < 9; i++){
		if (arr[row][i] != 0){
			inputArr.remove(arr[row][i]);
		}
	}
	
	for (var i = 0; i < 9; i++){
		if (arr[i][col] != 0){
			inputArr.remove(arr[i][col]);
		}
	}
	
	var x = Math.floor(row / 3) * 3;
	var y = Math.floor(col / 3) * 3;
	for (var i = x; i < x + 3; i++) {
		for (var j = y; j < y + 3; j++) {
			if (arr[i][j] != 0){
				inputArr.remove(arr[i][j]);
			}
		}
	}
	return inputArr;
}

function inputNumber(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == 0){
				var temp = getInputArr(arr, i, j);
				if (temp.length == 0){
					return arr;
				}
				else {
					var index = Math.floor(Math.random() * temp.length);
					arr[i][j] = temp[index];
				}
			}
		}
	}
	return arr;
}

function checkArr(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function backups(arr){
	var bArr = [];
	for (var i = 0; i < arr.length; i++) {
		bArr[i] = [];
		for (var j = 0; j < arr[i].length; j++) {
			bArr[i][j] = arr[i][j];
		}
	}
	return bArr;
}
	  var message_Path = "/src/assets/model/"
	  var home_Path = "http://localhost:5173/"

function Live2dChange(path){
	loadlive2d("live2d", path);
}

