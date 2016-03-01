

MusicMachine.remove({});
if (MusicMachine.find().count() === 0) {
  var sound={};
  for(var i = 0; i < soundfiles.length; i++){
    sound[i] = {on:false, volume:0, speed:50};
  }
  MusicMachine.insert({masterSlide: 50, masterVolume: 100, sound});

}
