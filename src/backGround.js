let backGroundPage = chrome.extension.getBackgroundPage();
let speakerButtonFlag;
let breakTime = false;
let screenDispState = document.getElementById("pomodoroScreenDisplayState");
let screenDisp = document.getElementById("pomodoroScreenDisplay");
let startButton = document.getElementById("startbutton");
let stoptButton = document.getElementById("stopbutton");
let getTime = document.getElementById('timeSettings');
let speakerButton = document.getElementById('speakerbutton');
let startPicsList = new Array("png/start.png","png/start_grayout.png");
let speakerPicsList = new Array("png/speaker.png","png/speaker_mute.png");


/**
 * 初期処理
 */
window.addEventListener('load', function() {
	dispTimer();
});

/**
 * 画面表示処理
 */
dispTimer = () => {
	setTimeout(() => {
		screenDisp.innerHTML = backGroundPage.dispTime();
		speakerButtonFlag = backGroundPage.dispSpeakerIcon();
		breakTime = backGroundPage.breakTime();
		if(speakerButtonFlag){
			speakerButton.src=speakerPicsList[0];
			speakerButton.alt = "speakerbuttonimage";
		}else{
			speakerButton.src=speakerPicsList[1];
			speakerButton.alt = "speaker_mutebuttonimage";
		}

		if(screenDisp.innerHTML == "00:00"){
			chrome.browserAction.setBadgeText({ text: "" });
			startButton.disabled = false;
			stoptButton.disabled = true;
			startButton.src=startPicsList[0];
		}else{
			startButton.disabled = true;
			stoptButton.disabled = false;
			startButton.src=startPicsList[1];
			if(breakTime){
				chrome.browserAction.setBadgeText({ text: "☕" });
				document.querySelector('.state').style.backgroundColor = ' rgba(6, 182, 108, 0.918)';
				screenDispState.innerHTML = "BREAK TIME☕";
			}else{
				chrome.browserAction.setBadgeText({ text: "▶" });
				chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
				document.querySelector('.state').style.backgroundColor = 'rgba(255, 0, 98, 0.918)';
				screenDispState.innerHTML = "WORK IN PROGRESS📝";
			}
		}
		dispTimer();
	}, 10);
}

/**
 * スタートボタン
 */
startButton.addEventListener("click",function() {
	let time = getTime.value;
	let convertToSec = time*60;
	backGroundPage.start(convertToSec, time);
});

/**
 * ストップボタン
 */
stoptButton.addEventListener("click",function() {
	screenDispState.innerHTML = "";
	backGroundPage.stop();
});

/**
 * スピーカーボタン
 */
speakerButton.addEventListener("click",function() {
	if(speakerButton.alt == "speakerbuttonimage"){
		speakerButton.src=speakerPicsList[1];
		speakerButton.alt = "speaker_mutebuttonimage";
		speakerButtonFlag = false;
	}else{
		speakerButton.src=speakerPicsList[0];
		speakerButton.alt = "speakerbuttonimage";
		speakerButtonFlag = true;
	}
	backGroundPage.soundVolume(speakerButtonFlag);
});