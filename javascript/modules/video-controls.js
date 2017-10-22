/// Custom video controls
let videoControlsContainer = document.querySelector('[data-controls="video-controls"]');
let playPauseButton = videoControlsContainer.querySelector('[data-id="play-pause"]');
let currentTime = videoControlsContainer.querySelector('[data-id="current-time"]');
let durationVid = videoControlsContainer.querySelector('[data-id="total-time"]');
let muteButton = videoControlsContainer.querySelector('[data-id="mute"]');
let seekBar = videoControlsContainer.querySelector('[date-id="seek-bar"]');
let volumeBar = videoControlsContainer.querySelector('[data-id="volume-bar"]');


/// function for toggling the play/pause button
function playPause(video, button) {
	if (video.paused) {
		video.play();
		button.innerHTML = 'Pause';
	}
	else {
		video.pause();
		button.innerHTML = 'Play';
	}
}


/// function for toggling the mute/unmute button
function getSound(video, volumeBar, button) {

	if (video.muted) {
		video.muted = false;
		button.innerHTML = 'Mute';
		volumeBar.value = video.volume * 100;
	}
	else {
		video.muted = true;
		button.innerHTML = 'UnMute';
		volumeBar.value = 0;
	}
}


function setvolume(video, volumeBar, button) {
	
	if (volumeBar.value === 0) {
		video.muted = true;
		button.innerHTML = 'UnMute';
		video.volume = 0;
	} else {
		video.muted = false;
		button.innerHTML = 'Mute';
		video.volume = volumeBar.value / 100;
	}
}


function seekTimeUpdate(slider, video, button) {
	// Calculate the slider value
	let value = (100 / video.duration) * video.currentTime;

// console.log(video.duration, 'duration');

	// Update the slider value
	slider.value = value;

	let curmins = Math.floor(video.currentTime / 60);
	let cursecs = Math.floor(video.currentTime - curmins * 60);
	let durmins = Math.floor(video.duration / 60);
	let dursecs = Math.floor(video.duration - durmins * 60);
	if (cursecs < 10) {
		cursecs = `0${cursecs}`;
	}
	if (dursecs < 10) {
		dursecs = `0${dursecs}`;
	}
	if (curmins < 10) {
		curmins = `0${curmins}`;
	}
	if (durmins < 10) {
		durmins = `0${durmins}`;
	}
	currentTime.innerHTML = `${curmins}:${cursecs}`;
	durationVid.innerHTML = `${durmins}:${dursecs}`;

	if (Math.floor(video.duration) === Math.floor(video.currentTime)) {
		video.pause();
		button.innerHTML = 'Play';	
	}
}


function seekBarOnDrag(el, video) {
	// Calculate the new time
	/// the seekbar values are between 0 and 100
	var time = video.duration * (el.value / 100);
	// Update the video time
	video.currentTime = time;
}


export default function videoControls(vid) {
	/// toggle the play/pause button on click	
	playPauseButton.addEventListener('click', function() {
		playPause(vid, this);
	}, false);
	
	/// toggle the mute/unmute button on click
	muteButton.addEventListener('click', function() {
		getSound(vid, volumeBar, this);
	}, false);

	/// update the volume based on the volume bar value
	volumeBar.addEventListener("change", function() {
		// Update the video volume
		setvolume(vid, this, muteButton);
	}, false);
		
	/// Update the seek bar as the video plays
	vid.addEventListener("timeupdate", function() {
		seekTimeUpdate(seekBar, this, playPauseButton);
	}, false);
	
	/// Update the seek bar on change
	seekBar.addEventListener("change", function() {
		seekBarOnDrag(this, vid)
	}, false);

	/// Pause the video when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		vid.pause();
	}, false);

	/// Play the video when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		vid.play();
	}, false);
}
