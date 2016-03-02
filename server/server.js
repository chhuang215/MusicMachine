

//MusicMachine.remove({});
if (MusicMachine.find().count() === 0) {
  var sound={};
  for(var i = 0; i < soundfiles.length; i++){
    sound[i] = {on:false, volume:50, speed:100};
  }
  MusicMachine.insert({masterSlide: 100, masterVolume: 100, start:0,sound});
}
