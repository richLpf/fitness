/**
 * Created by jsj on 2016/9/27.
 */
angular.module("ng-service",[])
.factory("mall",function($http,$q){
  var baseUrl ="http://datainfo.duapp.com";
  var mall = {};
  mall.getBanner = function(){
    var q = $q.defer();
    $http.jsonp(baseUrl+"/shopdata/getBanner.php?callback=JSON_CALLBACK").then(function(e){
      q.resolve(e.data);
      //console.info(e)
    },function(err){
      q.reject();
    });
  return q.promise;
  }
  mall.getmall = function(obj){
    var q =$q.defer();
    $http.jsonp(baseUrl+"/shopdata/getGoods.php?callback=JSON_CALLBACK",{params:obj}).then(function(e){
      q.resolve(e.data);
    //  console.info(e)
    },function(err){
      q.reject();
    })
    return q.promise;
  }
  mall.getlist = function(){
    var q =$q.defer();
    $http.get(baseUrl+"/shopdata/getclass.php").then(function(e){
      q.resolve(e.data);
   //  console.info(e.data)
    })
    return q.promise;
  }
  return mall;
}).factory("loginR",function($http,$q) {
  var baseUrl = "http://datainfo.duapp.com";
  var loginR = {};
  loginR.postPass = function (obj) {
    var q = $q.defer();
    $http.get(baseUrl + "/shopdata/userinfo.php", {params:obj}).then(function (e) {
      q.resolve(e.data);
      //console.info(e)
    }, function (err) {
      q.reject();
    });
    return q.promise;
  }

  loginR.goLogin = function(obj){
    var q = $q.defer();
    $http.get(baseUrl + "/shopdata/userinfo.php", {params:obj}).then(function (e) {
      q.resolve(e.data);
      //console.info(e)
    }, function (err) {
      q.reject();
    });
    return q.promise;
  }



  return loginR;
})


