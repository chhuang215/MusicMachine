Meteor.startup(function () {

      var mm = MusicMachine.findOne({});
      if(mm){
        Session.set('startdac', mm.start);
      }
});

Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/',function(){
  this.render('playground',{
    to:'main'
  });
});

Template.playground.helpers({

  "allSounds":function(){

    return soundfiles;
  },

  "sound": function (soundId) {

    var status = Session.get('sound'+soundId);

    var mm = MusicMachine.findOne();
    if (mm && mm.sound) {
      var aSound = mm.sound[soundId];
      if(mm.start == 1){
        if (aSound && aSound.on) {

          playSound(soundId, (aSound.volume/100) * (mm.masterVolume/100),(aSound.speed/50)*(mm.masterSlide/50));

          $("#"+soundId).removeClass('btn-default').addClass('btn-success');

          return;
        }
      }
      playSound(soundId, 0, aSound.speed/50*(mm.masterSlide/50));
      $("#"+soundId).removeClass('btn-success').addClass('btn-default');
      if (aSound && aSound.on) {
        aSound.on = false;
        aSound.volume = 0;
        var muteSound = {};
        muteSound['sound.'+soundId] = aSound;
        MusicMachine.update({_id:mm._id}, {$set: muteSound});
      }


    }
  //  return status;
  },
  "startdac": function () {

    var mm = MusicMachine.findOne();
    if (mm) {
      if (mm.start==1) {
          playAll();
          $('.js-start-dac').prop('disabled', true);
          $('.js-stop-dac').prop('disabled', false);
      }
      else {
          stopAll();
          $('.js-start-dac').prop('disabled', false);
          $('.js-stop-dac').prop('disabled', true);
      }
    }

    return Session.get('startdac');
  },

  "sliderSpeedVal":  function() {
    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var masterSlide = mm.masterSlide;
        if(tmpl.view.isRendered){
          tmpl.$('#sliderSpeed').data('uiSlider').value(masterSlide);
        }
        return (masterSlide/50).toFixed(2);
    }
  },


  "sliderVolumeVal":  function() {
    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var masterVolume = mm.masterVolume;
        if(tmpl.view.isRendered){
          tmpl.$('#sliderVolume').data('uiSlider').value(masterVolume);
        }
        return masterVolume;
    }
  },
  "sliderSVal":  function(soundId) {
    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var speed = mm.sound[soundId].speed;
        if(tmpl.view.isRendered){
          tmpl.$('#'+soundId+'.sliderS').data('uiSlider').value(speed);
        }
        return speed;
    }
  },
  "sliderVVal":  function(soundId) {
    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var volume = mm.sound[soundId].volume;
        if(tmpl.view.isRendered){
          tmpl.$('#'+soundId+'.sliderV').data('uiSlider').value(volume);
        }
        return volume;
    }
  }
});


Template.playground.events({

  "click .js-start-dac": function () {
    Session.set('startdac', 1);
    var mm = MusicMachine.findOne({});
    MusicMachine.update({ _id: mm._id }, {$set: {start: 1}});
  },
  "click .js-stop-dac":function(){
    Session.set('startdac', 0);
    var mm = MusicMachine.findOne({});
    MusicMachine.update({ _id: mm._id }, {$set: {start: 0}});
  },
  "click .js-sound-onoff": function (e) {
    var mm = MusicMachine.findOne({});
    var sound = mm.sound;
    if(mm.start == 1){
      var soundId = e.target.id;

      var isOn = sound[soundId].on;

      if(!isOn){
        Session.set('sound'+soundId, 1);
        sound[soundId].on = true;
        
        sound[soundId].volume = 100;
        MusicMachine.update({ _id: mm._id}, {$set: {sound:sound}});
      }
      else if(isOn){
        Session.set('sound'+soundId, 0);
        sound[soundId].on = false;
        sound[soundId].volume = 0;
        MusicMachine.update({ _id: mm._id}, {$set: {sound:sound}});
      }
    }


  }

  //  "click button.myButton1": function () {
  //   Session.set('drums', 1);
  //   var val = MusicMachine.findOne({});
  //   MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});
  //
  // },
  //   "click button.myButton2": function () {
  //   Session.set('drums', 0);
  //   var val = MusicMachine.findOne({});
  //   MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
  // }

});

Template.playground.onRendered(function() {
  $('h2').hide();

  if(!this.$('.slider').data('uiSlider')){
    $(".slider").slider({
        min: 0,
        max: 100
    });
  }

  var handler = _.throttle(function(event, ui) {
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {masterSlide: ui.value}});
  }, 50, { leading: false });

  var handlervolume = _.throttle(function(event, ui) {
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {masterVolume: ui.value}});
  }, 50, { leading: false });


    $("#sliderSpeed").slider({
        slide: handler,

    });

    $("#sliderVolume").slider({
        slide: handlervolume,
    });

    var handlerV = _.throttle(function(event, ui) {
        var mm = MusicMachine.findOne({});
        var soundId = event.target.id;

        var soundData = mm.sound;
        soundData[soundId].volume = ui.value;
        MusicMachine.update({ _id: mm._id }, {$set: {sound:soundData}});
    }, 50, { leading: false });

    var handlerS = _.throttle(function(event, ui) {
        var mm = MusicMachine.findOne({});
        var soundId = event.target.id;

        var soundData = mm.sound;
        soundData[soundId].speed = ui.value;
        MusicMachine.update({ _id: mm._id }, {$set: {sound:soundData}});
    }, 50, { leading: false });


      $(".sliderV").slider({

        slide:handlerV

      });



      $(".sliderS").slider({
        slide:handlerS
      });



});
