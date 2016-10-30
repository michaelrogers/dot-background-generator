document.addEventListener('DOMContentLoaded', () => {
	let skewDegrees = 7; skewDegrees /= 100;
	const dotSpacing = 1;
	const dotMaxRadius = 8;
	const dotCenterDistance = dotSpacing + dotMaxRadius * 2;
	const dotOpacity = 0.8;
	let timeoutResize, intSet, intervalTimes;

	const drawBackground = (backgroundLayer) => {
		const color1 = ('rgb('
						+ Math.floor(Math.random() * 255) + ','
						+ Math.floor(Math.random() * 255) + ','
						+ Math.floor(Math.random() * 255) + ')'
		);
		const color2 = ('rgb('
						+ Math.floor(Math.random() * 255) + ','
						+ Math.floor(Math.random() * 255) + ','
						+ Math.floor(Math.random() * 255) + ')'
		);
		console.log({backgroundColor1: color1,
					 backgroundColor2: color2});
		
		backgroundLayer.style.background = (
			"linear-gradient("
				+ "to top" + ","
				+ color1 + ","
				+ color2 + ")"
		);
	}

	const drawBorder = (context) => { //Test border to show the canvas is resizing to fit window
       context.strokeStyle = 'red';
       context.lineWidth = '5';
       context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

	const drawDots = (xCoordinate, yCoordinate, radius, color, context) => {
		if (radius > 0) {
			context.beginPath();
			context.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI, false);
			context.fillStyle = color;
			context.lineWidth = 0.5;
			context.fill();
		}
	}
	
	const resizeCanvas = () => {
		let backgroundLayer = document.getElementById("backgroundCanvas");
		let context = backgroundLayer.getContext("2d");
		backgroundLayer.width = window.innerWidth;
		backgroundLayer.height = window.innerHeight;
		console.log({width: backgroundLayer.width,
					height: backgroundLayer.height});
		drawBorder(context);
		drawBackground(backgroundLayer);
		dotsLoop(context);
	}

	const skewRotate = () => {
		resizeCanvas();
		intervalTimes -= 1;
		skewDegrees += 0.2 / 100;
		if (intervalTimes < 1)  {clearInterval(intSet);}
	}
	
	const timeoutResizeEvent = () => {
		clearTimeout(timeoutResize);
		timeoutResize = setTimeout(() => {resizeCanvas()}, 200);
	}

	const dotsLoop = (context) => {
		let color1 = ('rgba('
					+ Math.floor(Math.random() * 255) + ','
					+ Math.floor(Math.random() * 255) + ','
					+ Math.floor(Math.random() * 255) + ','
					+ dotOpacity + ')'
		);
		let color2 = ('rgba(' 
					+ Math.floor(Math.random() * 255) + ','
					+ Math.floor(Math.random() * 255) + ','
					+ Math.floor(Math.random() * 255) + ','
					+ dotOpacity +')'
		);
		console.log({dotsColor1: color1,
					 dotsColor2: color2});

		// decrementVariable = Math.ceil(window.innerHeight * Math.tan(skewDegrees)); 
		const decrementVariable = 105 * (dotCenterDistance) / window.innerHeight; //Determine what percentage to decrement each turn
		const oppositeSideHeight = (dotCenterDistance) * Math.tan(skewDegrees); //Use tangent to determine the opposite since the adjacent and angle are given
		console.log({oppositeSideHeight, decrementVariable});
		let dotColor;
		let oddRowSpacing = 0;
		for (let x = 0; x < (window.innerWidth / Math.sin(skewDegrees)) / (dotCenterDistance); x++ ){ //The hypotenuse is the is the length of the furtherst width and is the width of the window / sin(skewDegrees)
			for (let y = 0; y < Math.ceil(window.innerHeight * Math.tan(skewDegrees)); y++){ 
				if (y % 2 == 0) {
					dotColor = color1;
					oddRowSpacing = (dotCenterDistance - dotMaxRadius)
				}
				else {
					dotColor = color2;
					oddRowSpacing = 0;
				}
				drawDots(
					(dotCenterDistance) * x - oppositeSideHeight * x + oddRowSpacing * Math.cos(skewDegrees), //x
			 		(dotCenterDistance) * y - oppositeSideHeight * x - oddRowSpacing * Math.tan(skewDegrees), //Y
			 		dotMaxRadius * (1 - (decrementVariable * (y) / 130)), //radius
			 		dotColor, //Color
			 		context //Context
		 		); 
			}
		}
	}
	
	const init = () => {
		document.title = "Dot Background Generator";
		window.addEventListener("resize", timeoutResizeEvent);
		resizeCanvas();
		// intervalTimes = 40;
		// intSet = setInterval(skewRotate, 50);
	}

	init();
});
