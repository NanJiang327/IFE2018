var tableWrapper = document.querySelector('#table');
var area = document.querySelector('#area');
var areaBtn = area.getElementsByTagName('input');
var product = document.querySelector('#product');
var productBtn = product.getElementsByTagName('input');
var selectedProduct = [];
var selectedArea = [];
var clickedBtns = {
	area: {
		'华北': true,
		'华南': false,
		'华东': false
	},
	product: {
		'手机': true,
		'笔记本': false,
		'智能音箱': false
	}
};
var areaArr = [{name:'area', value:'huabei', text:'华北'},
	{name:'area', value:'huanan', text:'华南'},
	{name:'area', value:'huadong', text:'华东'},
	{name:'area', value:'all', text:'全选'}];

var productArr = [{name:'prodcut', value:'mobile', text:'手机'},
	{name:'product', value:'laptop', text:'笔记本'},
	{name:'product', value:'speaker', text:'智能音箱'},
	{name:'product', value:'all', text:'全选'}];
var selectionNumber = 0;
var colorSet = ["#3759C8","#FFF954","#5BB54A","#D04E34","#FFC620","#C5DDEB","#979495","#222F3E","#B0F566"];
var xAix = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

function setLocalStorage() {
	if (!localStorage.dataSet) localStorage.dataSet = JSON.stringify(sourceData);
}

setLocalStorage();
var getUseData = JSON.parse(localStorage.dataSet) || sourceData;

function checkString(value) {
	return isNaN(Number(value));
}

function changeData(inputData, value) {
	var insertInfo = inputData.split('-');
	var insertPlace = {
		place: insertInfo[0],
		region: insertInfo[1],
		product: insertInfo[2]
	}

	for (var i in getUseData){
		if (getUseData[i].region === insertPlace.region && getUseData[i].product === insertPlace.product){
			getUseData[i].sale[insertPlace.place] = value;
		}
	}
	localStorage.dataSet = JSON.stringify(getUseData);
	console.log(JSON.parse(localStorage.dataSet));
}

changeData("0-华北-手机", "100");
