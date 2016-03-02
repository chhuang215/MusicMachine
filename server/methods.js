Meteor.methods({
  "updateSound":function(soundData){
    var mm = MusicMachine.findOne();
    if(mm){
      MusicMachine.update({ _id: mm._id }, {$set: {sound:soundData}});
    }
  },
  "updateMasterVolume":function(val){
    var mm = MusicMachine.findOne();
    if(mm){
      MusicMachine.update({ _id: mm._id }, {$set: {masterVolume:val}});
    }
  },
  "updateMasterSpeed":function(val){
    var mm = MusicMachine.findOne();
    if(mm){
      MusicMachine.update({ _id: mm._id }, {$set: {masterSlide:val}});
    }
  },
  "updateStart":function(val){
    var mm = MusicMachine.findOne();
    if(mm){
      MusicMachine.update({ _id: mm._id }, {$set: {start:val}});
    }
  }

});
