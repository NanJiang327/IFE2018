$ = function (el) { return document.querySelector(el)};
$All = function(el) { return document.querySelectorAll(el)};
var task21 = {
	skillList : [],
	hobbyList : []
}
/**
 *
 * @param obj
 * @returns {boolean}
 * 为Array原型添加一个检查内容是否在数组中的方法
 */
Array.prototype.in_array = function (obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

function getData(type) {
	if (type === 'skill') {
		var value = $('#tagInput').value.match(/(^[^,\,  ]*)/)[0];

	} else {
		var value = $('#hobbyInput').value.trim().split(/,|\s|\n|\r|\t/);
	}
	return value;
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

function Tag(name, el){
	this.name = name;
	this.el = el;
}

Tag.prototype = {
	constructor: Tag,
	init: function () {
		addEventHandler(this.el, 'mouseover', function (event) {
			event.target.textContent = '删除: '+ event.target.textContent;
		});
		
		addEventHandler(this.el, 'mouseout', function (event) {
			event.target.textContent = event.target.textContent.replace(/删除: /, '');
		});
		
		addEventHandler(this.el, 'click', function (event) {
			this.el.parentNode.removeChild(event.target);
		})
	}
}

function initBtn(){
	addEventHandler($('#submit'),'click', function () {


	})
}

function initInput(){

}

function checkInput(arr){
	for (var i = 0; i < arr.length; i++){

	}
}

function checkRepeat(){

}