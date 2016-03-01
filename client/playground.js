//playground.js
maxim = [];
player = [];
for(var i = 0 ; i < soundfiles.length; i++){
	maxim.push(new Maxim());
	player.push(maxim[i].loadFile(soundfiles[i].filename));
	player[i].setLooping(true);
	player[i].volume(0);
}

playSound = function(playerId, vol, spd){
	player[playerId].volume(vol);
	player[playerId].speed(spd);
}

playAll = function() {
	for(var i = 0; i < soundfiles.length; i++){
		player[i].play();
	};
}

stopAll = function() {
	for(var i = 0; i < soundfiles.length; i++){
		player[i].stop();
	};
}

setSpeed = function(speed) {

	for(var i = 0; i < soundfiles.length; i++){
		player[i].speed(speed);
	};
}
