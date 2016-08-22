var backgroundLayer, context;
var skewDegrees = 17; skewDegrees /= 100;
var dotSpacing = 1, dotMaxRadius = 8, dotCenterDistance = dotSpacing + dotMaxRadius*2;
var dotOpacity = 0.8;

window.onload = function (){init();}


function getCanvasContext(){
	backgroundLayer = document.getElementById("backgroundCanvas");
	context = backgroundLayer.getContext("2d");
}

function init(){
	getCanvasContext();
	window.addEventListener("resize", resizeCanvas);
	resizeCanvas();
}
function drawBackground(){
	var color1 = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
	var color2 = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
	console.log({backgroundColor1: color1, backgroundColor2: color2});
	backgroundLayer.style.background="linear-gradient(to top,"+color1+","+color2+")";
}

function resizeCanvas(){
	backgroundLayer.width = window.innerWidth;
	backgroundLayer.height = window.innerHeight;
	console.log({width: backgroundLayer.width, height: backgroundLayer.height});
	drawBorder();
	drawBackground();
	dotsLoop();
}

function dotsLoop () {
	var color1 = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+dotOpacity+')';
	var color2 = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+dotOpacity+')';
	console.log({dotsColor1: color1, dotsColor2: color2});
	
	decrementVariable = 100 * (dotCenterDistance)/ window.innerHeight; //Determine what percentage to decrement each turn
	// decrementVariable = Math.ceil(window.innerHeight * Math.tan(skewDegrees)); 

	var oppositeSideHeight = (dotCenterDistance) * Math.tan(skewDegrees); //Use tangent to determine the opposite since the adjacent and angle are given
	console.log(oppositeSideHeight); console.log("Decrement: "+decrementVariable);

	
	for (let x=0; x < (window.innerWidth / Math.sin(skewDegrees)) / (dotCenterDistance); x++ ){ //The hypotenuse is the is the length of the furtherst width and is the width of the window / sin(skewDegrees)
		for (let y=0; y < Math.ceil(window.innerHeight * Math.tan(skewDegrees)); y++){ 
		
			var dotColor; oddRowSpacing=0;
			if (y % 2 == 0){dotColor = color1; oddRowSpacing = (dotCenterDistance)/2}
			else {dotColor = color2; oddRowSpacing = 0;}


		drawDots((dotCenterDistance)*x -oppositeSideHeight*x + oddRowSpacing*Math.cos(skewDegrees), //x
		 		(dotCenterDistance)*y - oppositeSideHeight*x - oddRowSpacing*Math.tan(skewDegrees), //Y
		 		dotMaxRadius * (1-(decrementVariable*(y)/130)), //radius
				// dotMaxRadius * (1-(decrementVariable*(y-(dotCenterDistance * Math.tan(skewDegrees/100)))/100)), //radius
		 		dotColor); //Color
		}
	}
}
//TESTING BORDER
function drawBorder() {
           context.strokeStyle = 'red';
           context.lineWidth = '5';
           context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
        }

function drawDots(xCoordinate, yCoordinate, radius, color){
	if (radius > 0){
	// console.count(drawDots);
	context.beginPath();
	context.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.lineWidth = 0.5;
	context.fill();
	// context.stroke();
}

}    