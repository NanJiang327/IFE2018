var task18  = {
	taskArr: [10, 3, 20, 11],
	number : /^\d+$/,
	leftPush: function (num) {
		if (this.taskArr.length >= 60){
			alert('队列长不能超过60')
		} else {
			this.taskArr.unshift(num);
			renderArr();
		}
	},

	rightPush: function (num) {
		if (this.taskArr.length >= 60){
			alert('队列长不能超过60')
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
function renderArr(){
	var arr = document.getElementsByClassName('arr')[0];
	var arrLength = task18.taskArr.length;
	arr.innerHTML = '';
	if (arrLength <= 0){
		arr.textContent = '队列为空, 请为队列添加内容';
	} else {
		for (var i = 0; i < task18.taskArr.length; i++) {
			var span = document.createElement('span');
			span.style.height = task18.taskArr[i]+'px';
			span.style.width = 100 / task18.taskArr.length+'px'
			arr.appendChild(span);
		}
	}
}

/**
 * initBtn 方法
 * 为按钮绑定事件
 */
function initBtns() {
	var buttons = document.getElementsByTagName('button');
	var inputs = document.getElementsByTagName('input');
	addEventHandler(buttons[0], 'click', function() {
		var input = inputs[0].value;
		if (task18.number.test(input) || 10 <= input <= 100){
			task18.leftPush(input);
		} else {
			alert('请输入一个10到100的整数');
		}
	})

	addEventHandler(buttons[1], 'click', function() {
		var input = inputs[0].value;
		if (task18.number.test(input) ||  10 <= input <= 100){
			task18.rightPush(input);
		} else {
			alert('请输入一个10到100的整数');
		}
	})

	addEventHandler(buttons[2],'click', function() {
		task18.leftPop()
	})


	addEventHandler(buttons[3],'click', function() {
		task18.rightPop()
	})
}

function init(){
	initBtns();
	renderArr();
}

init();