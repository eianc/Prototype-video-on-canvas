import * as PIXI from 'pixi.js';
import videoControls from 'modules/video-controls';

/// these are used for video/Harrietsham.mp4
import {locationEl, stateInLocation} from 'modules/barratt_location';
import {livingEl, stateInLiving} from 'modules/barratt_living';

/// create aliases for PIXI
let TextureCache = PIXI.utils.TextureCache;
let Texture = PIXI.utils.Texture;
let Container = PIXI.Container;
let main = document.querySelector('[data-id="videoCanvas"]');

export default function videoCanvas() {
	/// create the renderer - this can be canvas or WebGL
	let renderer = new PIXI.autoDetectRenderer(640, 360, {antialiasing :true, transparent: false, resolution: 1});

	/// add the canvas to the html doc
	main.appendChild(renderer.view);

	renderer.backgroundColor = 0xFFFFFF;

	/// the width and height values will change later 
	/// to be the same with the video ones
	// renderer.view.style.width = window.innerWidth + 'px';
	// renderer.view.style.height = window.innerHeight + 'px';

	/// create a container called stage
	let stage = new PIXI.Container();
	/// create the internal containers

	let stageLocation = new PIXI.Container();
	let stageLiving = new PIXI.Container();

	/// setting up the global variables for the video
	let videoCurrTime;
	let videoSprite;
	let video;

	/// We are adding here the images and the videos we need to load
	/// to the canvas. When they are loaded we can use them
	PIXI.loader
		.add('video/Harrietsham.mp4')
		.load(setup);

	/// create the video based on the video path
	function createVideo(videoPath) {
		let videoTexture = PIXI.Texture.fromVideo(videoPath);
		videoSprite = new PIXI.Sprite(videoTexture);
		video = videoTexture.baseTexture.source;
		videoSprite.width = 640;
	    videoSprite.height = 360;
	}

	/// animation function which takes as parameters the current time of the video,
	///  the times between where we want to animate elements
	/// and the tween function
	function animate(currTime, startTime, endTime, tweenFN) {
		if (currTime > startTime && currTime < endTime) {
	   	tweenFN();
		}
	}

	function setup() {
		/// calling the createVideo function with the video path as parameter
		createVideo('video/Harrietsham.mp4');

		/// add the video to the stage
		stage.addChild(videoSprite);

		/// create the elements needed for the animation
		/// add them to the internal stage
		locationEl(stageLocation);
		/// adding the internal container to the stage
		stage.addChild(stageLocation);

		/// create the elements needed for the animation
		/// add them to the internal stage
		livingEl(stageLiving);
		/// adding the internal container to the stage
		stage.addChild(stageLiving);		
		
		gameLoop();
		/// calling the custom controls with the current video playing
		videoControls(video);
	}


	function gameLoop() {

		/// get the current time
		videoCurrTime = video.currentTime;
		let videoDuration = video.duration;

		requestAnimationFrame(gameLoop);

		/// run the animation functions between the start and end times
		/// the first animation from stateInLocation will run
		/// between the times stated here
		animate(videoCurrTime, 5, 7, stateInLocation);
		
		/// the first animation from stateInLiving will run
		/// between the times stated here
		animate(videoCurrTime, 35, 38, stateInLiving);

		/// render the canvas
		renderer.render(stage);
	}

}
