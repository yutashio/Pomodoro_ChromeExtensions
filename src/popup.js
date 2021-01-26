//初期設定
let disptime = '00:00';
let speakerFlag = true;
let breakTimeFlag = false;

function start(convertToSec, time) {

	if(!breakTimeFlag){
		keepConvertToSec = convertToSec;
		keepTime = time;
	}

	let startDt = new Date();
	let endDt = new Date(startDt.getTime() + convertToSec * 1000);

	let countDownSec = convertToSec;
	interval = setInterval(function countDown(){
		countDownSec--;
		disptime = ('00' + Math.floor(countDownSec/60)).slice(-2)+':'+('00' + countDownSec % 60).slice(-2);
		if(countDownSec == 0 && speakerFlag==true){
			soundPlay('/sound/people-stadium-applause1.mp3');
		}
		//効果音タイミング調節のため-1秒実行
		startDt = new Date();
		if(startDt.getTime() >= endDt.getTime()+1000){
			if(breakTimeFlag == false){
				stop();
				alert('You worked hard for '+time+' minutes.⏰！ Let\'s take a break!');
				breakTimeFlag = true;
				start(300,5);
			}else{
				stop();
				alert(time+'minutes break is over.☕');
				breakTimeFlag = false;
				start(keepConvertToSec,keepTime);
			}
		}
	}, 1000);
}

function stop(){
	clearInterval(interval);
	disptime = '00:00';
	breakTimeFlag = false;
}

function soundPlay(filePass){
	let sound = new Audio();
	sound.src = filePass;
	sound.play();
}

function soundVolume(speakerButtonFlag){
	speakerFlag = speakerButtonFlag;
}


dispTime = () => {
	return disptime;
}

dispSpeakerIcon = () => {
	return speakerFlag;
}

breakTime = () => {
	return breakTimeFlag;
}