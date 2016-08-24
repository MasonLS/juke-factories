'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.getElementById('audio');

  var playerObj = {};

  audio.addEventListener('ended', function() {
    playerObj.next();
  })

  playerObj.start = function(song, songList){
    playerObj.pause();
    playerObj.currentSong = song;
    playerObj.songList = songList;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }

  playerObj.pause = function(){
    audio.pause();
  }

  playerObj.resume = function(){
    audio.play();
  }

  playerObj.isPlaying = function(){
    return !audio.paused;
  }

  playerObj.getCurrentSong = function(){
    if(playerObj.currentSong === undefined) return null;
    return playerObj.currentSong;
  }

  playerObj.next = function(){
    var index = playerObj.songList.indexOf(playerObj.currentSong);
    var nextSong = playerObj.songList[index+1];
    if (index === playerObj.songList.length-1) nextSong = playerObj.songList[0];
    playerObj.start(nextSong,playerObj.songList);
  }

  playerObj.previous = function(){
    var index = playerObj.songList.indexOf(playerObj.currentSong);
    var nextSong = playerObj.songList[index-1];
    if (index === 0) nextSong = playerObj.songList[playerObj.songList.length-1];
    playerObj.start(nextSong,playerObj.songList);
  }

  playerObj.getProgress = function(){
    if (!audio.src) return 0;
    return audio.currentTime / audio.duration;
  }

  playerObj.toggle = function (song) {
    if (playerObj.isPlaying() && song === playerObj.getCurrentSong()) {
      playerObj.pause()
    } else {
      playerObj.start(song, playerObj.songList)
    }
  };

  return playerObj;
});
