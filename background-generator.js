var backgroundLayer, context;


window.onload = function (){
	init();
	console.count("init");


}

function getCanvasContext(){
	backgroundLayer = document.getElementById("backgroundCanvas");
	context = layer1.getContext("2d");
}

function init(){
	resizeCanvas();
	$(window).resize(function(){console.count(resizeEvent); resizeCanvas});
}


function resizeCanvas(){
	console.log({width: window.innerWidth, height: window.innerHeight});
	backgroundLayer.width = window.innerWidth;
	backgroundLayer.height = window.innerHeight;

}