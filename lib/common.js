
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");
soundfiles = [
  {
    filename:'808drum.wav',
    name: '808 Drum',
    type: 'percussion'
  },
  {
    filename:'slowdrums16.wav',
    name: 'Slow Drums',
    type: 'percussion'
  },
  {
    filename:'drums1.wav',
    name: 'Drums',
    type: 'percussion'
  },
  {
    filename:'bassdrum1.wav',
    name: 'Bassdrum',
    type: 'percussion'
  },
  {
    filename:'snaredrum1.wav',
    name: 'Snare Drum',
    type: 'percussion'
  },
  {
    filename:'hihat2.wav',
    name: 'Hi-Hat',
    type: 'percussion'
  },
  {
    filename:'cymbal1.wav',
    name: 'Cymbal',
    type: 'percussion'
  },
  {
    filename:'arp16.wav',
    name: 'Arpeggio',
    type: 'melody'
  },
  {
    filename:'arp216.wav',
    name: 'Arpeggio2',
    type: 'melody'
  },
  {
    filename:'chords16.wav',
    name: 'Chords',
    type: 'melody'
  },
   {
    filename:'vibes16.wav',
    name: 'Vibes',
    type: 'melody'
  },
  {
    filename:'bassline24bit.wav',
    name: 'Bassline',
    type: 'bass'
  }
];
