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
