import videoControls from 'modules/video-controls';

let videoElement;
let theCanvas;

export default function eventWindowLoaded() {
	videoElement = document.querySelector('[data-id="video"]');
	videoElement.addEventListener('canplaythrough', videoLoaded, false);
}

function videoLoaded(event) {
	canvasApp();
	videoControls(videoElement);
}

function canvasApp() {
	let cx = videoElement.offsetWidth;
	let cy = videoElement.offsetHeight;

	theCanvas = document.querySelector('[data-id="canvas"]');
	let context = theCanvas.getContext('2d');
	
	theCanvas.setAttribute('width', cx);
	theCanvas.setAttribute('height', cy);

	function drawScreen() {
		let dynamicCanvas = document.createElement('canvas');
		let dynamicContext = dynamicCanvas.getContext('2d');
		dynamicCanvas.width = cx;
		dynamicCanvas.height = cy;

		context.fillStyle = '#fff';
		//context.fillRect(0,0,theCanvas.width, theCanvas.height);

		/// draw the video to the canvas
		context.drawImage(videoElement, 0, 0, cx, cy);

		/// draw the video controls to the canvas
		context.fillText('Duration:' + videoElement.duration, 10, 20);
		context.fillText('Current Time:' + videoElement.currentTime, 10, 40);

		// context.fillStyle = 'rgba(255, 217, 0, 0.7)';
		// context.fillRect(0, 0, cx, cy);
		// context.translate(0, context.canvas.height/2);
		// dynamicContext.fillStyle = '#ffd900';
		dynamicContext.fillStyle = 'rgba(255, 217, 0, 0.8)';
		dynamicContext.fillRect(0, 0, cx, cy);
		
		let messages = [
			{timeOne: 6, timeTwo: 8, message: 'First Word', x:100, y:200},
			{timeOne: 10, timeTwo: 14, message: 'Second Word', x:100, y:100}
		];

		let images = [
			{timeOne: 1, timeTwo: 3, source: 'images/ladybug.jpg', x:100, y:50},
			{timeOne: 15, timeTwo: 17, source: 'images/ladybug.jpg', x:100, y:100}
		];

		/// draw the text to the canvas
		for (let i = 0; i < messages.length; i++) {
			let tempMessage = messages[i];
			if ((videoElement.currentTime >= tempMessage.timeOne) && (videoElement.currentTime <= tempMessage.timeTwo)) {
				context.fillStyle = '#fff';
				context.fillText(tempMessage.message, tempMessage.x, tempMessage.y);
			}
		}

		/// draw the images to the canvas
		for (let j = 0; j < images.length; j++) {
			let tempImage = images[j];

			if( (videoElement.currentTime >= tempImage.timeOne) && (videoElement.currentTime <= tempImage.timeTwo)) {
				let image = new Image();
				image.src = tempImage.source;
				context.drawImage(dynamicCanvas, 0, 0);
				context.drawImage(image, tempImage.x, tempImage.y);
			}
		}
	}

	//videoElement.play();

	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	gameLoop();
}
