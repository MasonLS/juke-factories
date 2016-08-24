/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {



  AlbumFactory.fetchById(1).then(function(album){
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    PlayerFactory.songList = album.songs
    return StatsFactory.totalTime(album);
  }).then(function(duration){
    $log.log(duration);
    $scope.albumDuration = duration;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound


  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  // main toggle
  $scope.toggle = PlayerFactory.toggle;

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

});


juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, AlbumFactory){

  AlbumFactory.fetchAll()
  .then(function(albums){
    $log.log(albums);
    albums.forEach(function(album){
      album.imageUrl = '/api/albums/' + album.id + '/image';
    });
    $scope.albums = albums;
  })
  .catch($log.error);



});
