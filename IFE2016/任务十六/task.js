/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var reg = {
	number : /\d+/,
	city : /[a-zA-Z*\u4e00-\u9fa5*]/,
	space: /^\s+|\s+$/g
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInput = document.querySelector("#aqi-city-input").value;
    var valueInput = document.querySelector("#aqi-value-input").value;
	if (reg.city.test(cityInput)){
    	if (reg.number.test(valueInput)){
    		cityInput = trim(cityInput);
    		valueInput = trim(valueInput);
    		console.log(valueInput);
    		aqiData[cityInput] = valueInput;
	    } else{
    		alert("空气质量的数值只能为数字");
	    }
    } else{
    	alert("城市名只能为中英文字符");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.querySelector("#aqi-table");
	table.innerHTML = "<tr>\n" +
		"\t\t<td>城市</td><td>空气质量</td><td>操作</td>\n" +
		"\t  </tr>";

	for (var key in aqiData){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var td2 = document.createElement("td");
		var button = document.createElement("button");
		td.innerText = key;
		tr.appendChild(td);
		td2.innerText = aqiData[key];
		tr.appendChild(td2);
		button.textContent = "删除";
		tr.appendChild(button);
		table.appendChild(tr);
	}
	console.log(aqiData);
}

/**
 *
 * @param str
 * @returns {string | * | void}
 * 去空格
 */
function trim(str){
	return str.replace(reg.space,''); //把空格替换成空
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
	// do sth.
	var key =
		target.previousElementSibling.previousElementSibling.textContent;
	delete  aqiData[key];
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.querySelector("#add-btn").onclick = function () {
		addBtnHandle();
	}
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	document.querySelector("#aqi-table").addEventListener("click",function () {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.nodeName.toLowerCase() === "button"){
			delBtnHandle(target);
		}
	})

}

init();