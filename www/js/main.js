/**
 * Created by jsj on 2016/9/28.
 */
angular.module("starter",['ionic','ng-service','ng-controller','ng.filter'/*,'ngCordova'*/])
  .config(["$stateProvider","$urlRouterProvider",function($state,$url){
  $state.state("home",{
    url:'/home',
    templateUrl:"views/home.html"
  }).state("home.index", {
    url: '/index',
    views: {
      "index": {
        templateUrl: 'views/index.html',
        controller: "indexCtrl"
      }
    }
  }).state("home.class", {
    url: '/class',
    views: {
      "class": {
        templateUrl: 'views/class.html',
        controller: "classCtrl"
      }
    }
  }).state("home.mallcar", {
    url: '/mallcar',
    views: {
      "mallCar": {
        templateUrl: 'views/mallcar.html',
        controller: "mallCtrl"
      }
    }
  }).state("home.goodsdetail", {
    url: '/goodsdetail',
    params:{id:""},
    views: {
      "class": {
        templateUrl: 'views/goodsdetail.html',
        controller: "goodsCtrl"
      }
    }
  }).state("home.mine", {
    url: '/mine',
    views: {
      "mine": {
        templateUrl: 'views/mine.html',
        controller: "mineCtrl"
      }
    }
  }).state("home.share", {
    url: '/share',
    views: {
      "share": {
        templateUrl: 'views/share.html',
        controller: "shareCtrl"
      }
    }
  }).state("home.loginRegister", {
    url: '/loginRegister',
    views: {
      "mine": {
        templateUrl: 'views/loginRegister.html',
        controller: "loginRegisterCtrl"
      }
    }
  }).state("home.register", {
    url: '/register',
    views: {
      "mine": {
        templateUrl: 'views/register.html'
       /* controller: "registerCtrl"*/
      }
    }
  }).state("home.login", {
    url: '/login',
    views: {
      "mine": {
        templateUrl: 'views/login.html',
        /*controller:"loginCtrl"*/
      }
    }
  })
  $url.otherwise("/home")
}])



