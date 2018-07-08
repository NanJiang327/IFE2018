$ = function (el) { return document.querySelector(el)};
$All = function(el) { return document.querySelectorAll(el)};
var task20 = {
	number : /^\d+$/,
	symbol: /[,_\s*\n\r.=+]/,
	arr : [],
}

/**
 * 随机生成数据
 */
function randomBuildData() {
	for (var i = 0; i < 10; i++){
		var num = Math.ceil(Math.random() * 91 +9);
		task20.arr.push(num.toString());
	}
}

/**
 * addEventHandler方法
 * 跨浏览器实现事件绑定
 */
function addEventHandler(ele, event, handler) {
	if (ele.addEventListener){
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent){
		ele.attachEvent("on"+event, handler);
	} else {
		ele["on" + event] = handler;
	}
}


/**
 * 渲染函数
 */
function render(match) {
	$('.arr').innerHTML =
		task20.arr.map(function (d) {
			var r = d;
			if (match != null && match.length > 0){
				console.log(typeof r);
				r = r.replace(new RegExp(match,'g'),"<span class='select'>" + match + "</span>");
			}
			return "<p>" + r + "</p>";
		}).join('');
}


/**
 *
 * @param arr
 * 冒泡排序
 */
function sortArr(arr) {
	for (var i = 0; i < arr.length - 1; i++){
		for (var j = i + 1; j < arr.length; j++){
			if (arr[i] - arr[j] >= 0){
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
}

function initBtns() {
	var textArea = $('#content');
	var input = $('#searchInput');

	addEventHandler($('#submit'),'click',function () {
		var splitArr = textArea.value.split(task20.symbol);
		for (var i = 0; i < splitArr.length; i++){
			task20.arr.push(splitArr[i]);
		}
		render();
	});

	addEventHandler($('#search'),'click',function () {
		render(input.value);
	});

	addEventHandler($('#sort'),'click',function () {
		if (task20.arr.length > 0){
			sortArr(task20.arr);
			render();
		}
	});
}

window.onload = function () {
		randomBuildData();
		initBtns();
		render();
}


function Tag(input, output, button) {
	this.input = $('#'+input);
	this.output = $('#'+output);
	this.button = $('#'+button);
}

Tag.prototype = {
	constructor: Tag,
	trim:function () {

	},

	checkRepeat: function () {

	},

	checkLength: function () {

	},

	render: function () {

	}




}