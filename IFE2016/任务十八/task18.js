$ = function (el) { return document.getElementsByClassName(el)};
var task18  = {
	taskArr: [10, 3, 20, 11],
	number : /^\d+$/,
	symbol: /[,_\s*\n\r.=+]/,
	leftPush: function (num) {
		if (this.taskArr.length >= 60){
			return alert('队列长不能超过60')
		} else {
			this.taskArr.unshift(num);
			renderArr();
		}
	},

	rightPush: function (num) {
		if (this.taskArr.length >= 60){
			return alert('队列长不能超过60')
		} else {
			this.taskArr.push(num);
			renderArr();
		}
	},

	leftPop: function () {
		if (this.taskArr.length === 0){
			alert('队列为空');
		} else {
			this.taskArr.shift();
			renderArr();
		}
	},

	rightPop: function () {
		if (this.taskArr.length === 0){
			alert('队列为空');
		} else {
			this.taskArr.pop();
			renderArr();
		}
	},

	sortArr: function (arr) {
		for (var i = 0; i < arr.length - 1; i++){
			for (var j = i + 1; j < arr.length; j++){
				if (arr[i] > arr[j]){
					var num = arr[i];
					arr[i] = arr[j];
					arr[j] = num;
				}
			}
		}
	},
	
	search: function (input) {
		this.position = '';
		for (var i = 0; i < this.taskArr.length; i++){
			if (input.indexOf(this.taskArr[i])){
				this.position += i;
			} else{
				console.log('miss');
			}
		}
		console.log(this.position);
	}

};

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
 * renderArr 方法
 * 渲染arr
 */
function renderArr() {
	var arr = $('arr')[0];
	var arrLength = task18.taskArr.length;
	arr.innerHTML = '';
	if (arrLength <= 0) {
		arr.textContent = '队列为空, 请为队列添加内容';
	} else {
		for (var i = 0; i < task18.taskArr.length; i++) {
			var span = document.createElement('span');
			span.textContent = task18.taskArr[i] || null;
			if (task18.position.indexOf(i.toString())) span.classList.add('select');
			arr.appendChild(span);
		}
	}
}

/**
 * initBtn 方法
 * 为按钮绑定事件
 */
function initBtns() {
	var buttons = $('arrBtn');
	var textArea = document.getElementsByTagName('textarea');
	var inputs = document.getElementsByTagName('input');

	addEventHandler(buttons[0], 'click', function() {
		var input = textArea[0].value;
		var inputArr = input.split(task18.symbol);

		for (var i = 0; i < inputArr.length; i++){
			task18.leftPush(inputArr[i]);
		}
	})

	addEventHandler(buttons[1], 'click', function() {
		var input = textArea[0].value;
		var inputArr = input.split(task18.symbol);
		for (var i = 0; i < inputArr.length; i++){
			task18.rightPush(inputArr[i]);
		}
	})

	addEventHandler(buttons[2],'click', function() {
		task18.leftPop()
	})


	addEventHandler(buttons[3],'click', function() {
		task18.rightPop()
	})

	addEventHandler(buttons[4],'click', function() {
		task18.sortArr(task18.taskArr);
		renderArr();
	})
	
	addEventHandler(buttons[5],'click', function () {
	})
}

/**
 * 冒泡排序
 */

function init(){
	initBtns();
	renderArr();
}

init();