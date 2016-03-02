Meteor.publish("mm", function(){
  return MusicMachine.find();
});
