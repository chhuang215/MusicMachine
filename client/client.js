Meteor.subscribe("mm");
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

    var soundIsOn = Session.get('sound'+soundId);

    var mm = MusicMachine.findOne();
    if (mm && mm.sound) {
      var soundData = mm.sound;
      var aSound = soundData[soundId];
      var soundSpeed = (aSound.speed/100)*(mm.masterSlide/100);
      if(mm.start == 1){
        if (aSound && aSound.on) {
          if(soundIsOn==0) Session.set('sound'+soundId , 1);
          playSound(soundId, (aSound.volume/100) * (mm.masterVolume/100),soundSpeed);

          $("#"+soundId).removeClass('btn-default').addClass('btn-success');
          return
        }
      }

      if(soundIsOn==1) Session.set('sound'+soundId , 0);
      playSound(soundId, 0, soundSpeed);
      $("#"+soundId).removeClass('btn-success').addClass('btn-default');
      if ((mm.start == 0) && aSound.on) {
        aSound.on = false;
        soundData[soundId] = aSound;
        Meteor.call("updateSound", soundData);
      }

    }
  //  return status;
  },
  "startdac": function () {

    var mm = MusicMachine.findOne();
    if (mm) {

      if (mm.start==1) {
        if(Session.get('startdac') != mm.start) Session.set('startdac',mm.start);
        playAll();
        $('.js-start-dac').prop('disabled', true);
        $('.js-stop-dac').prop('disabled', false);
      }
      else if(mm.start == 0){
        if(Session.get('startdac') != mm.start) Session.set('startdac',mm.start);
        stopAll();
        $('.js-start-dac').prop('disabled', false);
        $('.js-stop-dac').prop('disabled', true);
      }
      else if(mm.start == 2){
        stopAll();

        Session.set('startdac', 1);
        Meteor.call("updateStart", 1);
        playAll();
      }
    }

    //return Session.get('startdac');
  },

  "sliderSpeedVal":  function() {

    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var masterSlide = mm.masterSlide;
        if(tmpl.view.isRendered){
          tmpl.$('#sliderSpeed').data('uiSlider').value(masterSlide);
        }
        return (masterSlide/100).toFixed(2);
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
  "sliderVal":  function(soundId,type) { //type=volume or speed

    var mm = MusicMachine.findOne();
    if (mm) {
      var tmpl = Template.instance();
      var val = mm.sound[soundId][type];
        if(tmpl.view.isRendered){
          if(type=="volume"){
            $('#'+soundId+'.sliderV').data('uiSlider').value(val);
            return val;
          }else{
            $('#'+soundId+'.sliderS').data('uiSlider').value(val);
            return (val/100).toFixed(2);
          }
        }

    }
  }
});


Template.playground.events({

  "click .js-start-dac": function () {
    Session.set('startdac', 1);

    Meteor.call("updateStart", 1);
  },
  "click .js-stop-dac":function(){
    Session.set('startdac', 0);

    Meteor.call("updateStart", 0);
  },
  "click .js-sound-onoff": function (e) {

    var mm = MusicMachine.findOne({});
    var soundData = mm.sound;
    if(mm.start == 1){
      var soundId = e.target.id;

      var isOn = soundData[soundId].on;

      if(!isOn){
        Session.set('sound'+soundId, 1);
        soundData[soundId].on = true;
      }
      else if(isOn){
        Session.set('sound'+soundId, 0);
        soundData[soundId].on = false;
      }
      Meteor.call("updateSound", soundData);
    }


  },
  "click .js-resync":function(e){

    mm = MusicMachine.findOne();
    if(mm.start == 1){
      Session.set('startdac',2);
      Meteor.call("updateStart", 2);
    }
  }
});

Template.playground.onRendered(function() {
  $('h2').hide();

  if(!this.$('.slider').data('uiSlider')){
    $(".slider").slider({
        min: 0,
    });
  }

  var handler = _.throttle(function(event, ui) {

      var val = MusicMachine.findOne({});
      Meteor.call("updateMasterSpeed", ui.value);
  }, 50, { leading: false });

  var handlervolume = _.throttle(function(event, ui) {

      var val = MusicMachine.findOne({});
      Meteor.call("updateMasterVolume", ui.value);
  }, 50, { leading: false });

  $("#sliderSpeed").slider({
      slide: handler,
      max: 200

  });

  $("#sliderVolume").slider({
      slide: handlervolume,
      max: 100
  });

  var handlerV = _.throttle(function(event, ui) {

      var mm = MusicMachine.findOne({});
      var soundId = event.target.id;

      var soundData = mm.sound;
      soundData[soundId].volume = ui.value;
      Meteor.call("updateSound", soundData);
  }, 50, { leading: false });

  var handlerS = _.throttle(function(event, ui) {

      var mm = MusicMachine.findOne({});
      var soundId = event.target.id;

      var soundData = mm.sound;
      soundData[soundId].speed = ui.value;
      Meteor.call("updateSound", soundData);
  }, 50, { leading: false });


  $(".sliderV").slider({

    slide:handlerV,
    max: 100
  });



  $(".sliderS").slider({
    slide:handlerS,
    max: 200
  });



});
