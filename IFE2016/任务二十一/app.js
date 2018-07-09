$ = function (el) { return document.querySelector(el)};
$All = function(el) { return document.querySelectorAll(el)};
var task21 = {
	skillList : [],
	hobbyList : []
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

function Tag(name, el, type){
	this.name = name;
	this.el = el;
	this.type = type;
}

Tag.prototype = {
	constructor: Tag,
	initEvent: function () {
		var self = this;
		addEventHandler(self.el, 'mouseover', function (event) {
			event.target.textContent = '删除: '+ event.target.textContent;
		});
		
		addEventHandler(self.el, 'mouseout', function (event) {
			event.target.textContent = event.target.textContent.replace(/删除: /, '');
		});
		
		addEventHandler(self.el, 'click', function (event) {
			event.target.textContent = event.target.textContent.replace(/删除: /, '');
			delData(event, self.type);
		})
	}
}

function initBtn(){
	addEventHandler($('#submit'),'click', function () {
		render('hobby');
		$('#hobbyInput').value = '';
	})
}

function initInput(){
	addEventHandler($('#tagInput'),'keydown',function (e) {
		// 获取keycode
		var keyCode = e.keyCode;
		if (/^32|13|188$/.test(keyCode)) {
			render('skill');
			$('#tagInput').value = '';
		}
	})
}

function render(type) {
	var arr, el, tag, data = getData(type);
	$('#'+type).innerHTML = '';
	if (type === 'skill'){
		arr = task21.skillList;
		el = document.createElement('div');
		el.textContent = data;
		checkInput(arr, data);
		tag = new Tag(data, el, type);
		tag.initEvent();
		arr.push(tag);
		if (arr.length > 10) arr.shift();

	} else {
		arr = task21.hobbyList;
		for (var i = 0; i < data.length; i++){
			el = document.createElement('div');
			el.textContent = data[i];
			checkInput(arr, data[i]);
			tag = new Tag(data[i], el, type);
			tag.initEvent();
			arr.push(tag);
			if (arr.length > 10) arr.shift();
		}
	}

	for (var j = 0; j < arr.length; j++){
		$('#'+type).appendChild(arr[j].el);
	}
}

function checkInput(arr, input){
	for (var i = 0; i < arr.length; i++){
		if (arr[i].name.localeCompare(input) === 0){
			arr.splice(i,1);
		}
	}
}

function delData(event, type){
	var arr = type === 'skill' ? task21.skillList : task21.hobbyList;
	var removeChild = event.target.parentNode.removeChild(event.target);

	for (var i = 0; i < arr.length; i++){
		if (arr[i].name.localeCompare(event.target.textContent) === 0){
			arr.splice(i,1);
		}
	}
	console.log(removeChild);
	removeChild = null;
	console.log(removeChild);
}

window.onload = function () {
	initBtn();
	initInput();
}