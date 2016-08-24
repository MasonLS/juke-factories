juke.factory('AlbumFactory', function($http){
  var albumObj = {};

  albumObj.fetchAll = function(){
    return $http.get('/api/albums/')
    .then(function (res) { return res.data; })
  }

  albumObj.fetchById = function(albumId){
    return $http.get('/api/albums/' + albumId)
            .then(function(res){return res.data});
  }

  return albumObj;

});


juke.factory('ArtistsFactory', function($http){
  var artistsObj = {};

  artistsObj.fetchAll = function(){
    return $http.get('/api/artists')
      .then(function(res){return res.data});
  }

  artistsObj.fetchById = function(id) {
    return $http.get('/api/artists/'+ id)
    .then(function(res){
      return res.data;
    })
  }

  artistsObj.fetchAlbums = function(id) {
    return $http.get('/api/artists/'+ id + '/albums')
    .then(function(res){
      return res.data;
    })
  }

  artistsObj.fetchSongs = function(id) {
    return $http.get('/api/artists/'+ id + '/songs')
    .then(function(res){
      return res.data;
    })
  }

  return artistsObj;
});
