(function(){
	/* how to guide 
	 http://www.html5canvastutorials.com/tutorials/html5-canvas-bezier-curves/
	*/
	var body = document.body;
	var html = document.documentElement;
	var pageHeight = Math.max( body.scrollHeight, 
							body.offsetHeight, 
							html.clientHeight, 
							html.scrollHeight,
							html.offsetHeight );
	
	var container = document.getElementById('container');
	var firstLine = document.getElementById('firstLine');

	var canvasMargin = 50
	var movingBoxPosition = document.getElementById('movingBox').offsetTop
	
	var stillBoxPosition = document.getElementById('stillBox').offsetTop + (document.getElementById('stillBox').clientHeight/2)
	var exagerate = 2 // how 'bendy' is the line
	var shapeStyles = {
		lineThickness: 10,
		lineColor: 'red',
		endcaps: 'round'
	}


	function drawLine(){
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var scrollPosition = window.scrollY
		var endPositonTop = movingBoxPosition - scrollPosition + 50;

		var bezWidth = function(){
			var val = windowWidth * ( (movingBoxPosition - scrollPosition - stillBoxPosition) / movingBoxPosition)
			return Math.sqrt(val*val) * exagerate	
		} 

		firstLine.width = windowWidth 
		firstLine.height = windowHeight

		var ctx = firstLine.getContext("2d");
			ctx.beginPath();
			ctx.moveTo(canvasMargin, stillBoxPosition); // start point
			
			ctx.bezierCurveTo(
				bezWidth(), stillBoxPosition, // first bezier control
				(windowWidth - bezWidth()), endPositonTop, // second bezier control
				(windowWidth - 2*canvasMargin), endPositonTop // end point
				);

			//ctx.closePath();
			ctx.lineWidth = shapeStyles.lineThickness;
			ctx.strokeStyle = shapeStyles.lineColor;
			ctx.lineCap = shapeStyles.endcaps;
			//ctx.fillStyle = shapeStyles.fillColor;
			//ctx.fill();
			ctx.stroke(); // draw stroke

	}
	drawLine()


	window.onresize = drawLine
	window.onscroll = drawLine




})()