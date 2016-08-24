/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  $scope.visible = false;
  $rootScope.$on('viewAlbum', function(event, data){

    $scope.visible = true;
    AlbumFactory.fetchById(data.albumId).then(function(album){
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

  })

  $rootScope.$on('viewAlbums', function(){
    $scope.visible = false;
  })

  $rootScope.$on('viewAllArtists', function(){
    $scope.visible = false;
  })

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  // main toggle
  $scope.toggle = PlayerFactory.toggle;

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }



});


juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, AlbumFactory, PlayerFactory){

  AlbumFactory.fetchAll()
  .then(function(albums){
    // $log.log(albums);
    albums.forEach(function(album){
      album.imageUrl = '/api/albums/' + album.id + '/image';
    });
    $scope.albums = albums;
  })
  .catch($log.error);

  $scope.showAlbum = function(albumId){
    $scope.visible = false;
    $rootScope.$broadcast('viewAlbum', {albumId: albumId})
  }
  $rootScope.$on('viewAllArtists', function(){
    $scope.visible = false;
  })

  $scope.visible = true;

  $rootScope.$on('viewAlbums', function(){
    $scope.visible = true;
  })

});

juke.controller('SidebarCtrl', function($scope, $rootScope){
  $scope.viewAlbums = function(){
    $rootScope.$broadcast('viewAlbums')
  }
  $scope.viewAllArtists = function(){
    $rootScope.$broadcast('viewAllArtists');
  }
})


juke.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistsFactory){
  $rootScope.$on('viewAllArtists', function(){
    ArtistsFactory.fetchAll().then(function(artists){
      $scope.artists = artists;
      $scope.visible = true;
    }).catch($log.error);
  });

  $rootScope.$on('viewAlbums', function(){
    $scope.visible = false;
  })
  $rootScope.$on('viewAlbum', function(){
    $scope.visible = false;
  })



  $scope.viewOneArtist = function(artistId){
    $scope.visible = false;
    $rootScope.$broadcast('viewOneArtist', {artistId: artistId});

  }


});



juke.controller('ArtistCtrl', function($scope, $rootScope, ArtistsFactory, $log, PlayerFactory) {
  $rootScope.$on('viewOneArtist', function(event, data) {
    $scope.visible = true;
    ArtistsFactory.fetchById(data.artistId)
    .then(function(artist){
      $scope.artist = artist;
      $scope.visible = true;
    }).catch($log.error)

    ArtistsFactory.fetchSongs(data.artistId)
    .then(function(songs){
      songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
      });
      $scope.songs = songs;
      PlayerFactory.songList = songs
    }).catch($log.error)

    ArtistsFactory.fetchAlbums(data.artistId)
    .then(function(albums){
      albums.forEach(function(album){
        album.imageUrl = '/api/albums/' + album.id + '/image';
      });
      $scope.albums = albums;
    }).catch($log.error)


  })

  $rootScope.$on('viewAlbums', function(){
    $scope.visible = false;

  })

  $rootScope.$on('viewAlbum', function(){
    $scope.visible = false;

  })

  $rootScope.$on('viewAllArtists', function(){
    $scope.visible = false;

  })

  $scope.showAlbum = function(albumId){
    $scope.visible = false;
    $rootScope.$broadcast('viewAlbum', {albumId: albumId})
  }

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  // main toggle
  $scope.toggle = PlayerFactory.toggle;

})
