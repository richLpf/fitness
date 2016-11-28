/**
 * Created by jsj on 2016/9/27.
 */
//点击购买加入购物车
function addgoods(e){
  var isEqual=false;
  if(localStorage.getItem('mallArray')==null) {
    var mallArray = new Array();
  }
  else {
    mallArray=JSON.parse(localStorage.getItem('mallArray'));
    //判断加入购物车商品是否重复
    var goodsID = e.goodsID;
    for(var i=0;i<mallArray.length;i++){
      if(goodsID==mallArray[i].goodsID){
        isEqual = true;
      }
    }
  }
  //console.info(isEqual)
  if(!isEqual){
    mallArray.push(e);
  }
  //console.info(mallArray)
  localStorage.setItem('mallArray',JSON.stringify(mallArray));
}


angular.module("ng-controller",['ionic'])
.controller("indexCtrl",function($scope,mall,$ionicSlideBoxDelegate){
  $scope.obj={
    pageCode:0,
    linenumber:5
  }
/*    mall.getBanner().then(function(e){
    //  console.info(e)
      /!*$scope.banners = eval(e[0].goodsBenUrl);*!/
      $scope.banners = e;
     //console.info($scope.banners);
      $ionicSlideBoxDelegate.update();
    });*/

  if(localStorage.getItem('banners')==null) {
    mall.getBanner().then(function(e) {
      $scope.banners = e;
      localStorage.setItem('banners',JSON.stringify(e));
    });
  } else {
    var o = localStorage.getItem('banners');
    $scope.banners = JSON.parse(o);
  }

    $scope.list = [];
    $scope.loadMore = function(){
      mall.getmall($scope.obj).then(function(e){

       if(angular.isArray(e)){
         for(var i=0;i< e.length;i++){
           $scope.list.push(e[i])
         }
         $scope.obj.pageCode++;
       }else{
     //    console.info(1)
          $scope.loadLast=true
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');

    })
   }

//点击加入购物车
  $scope.buy = function(e){
    addgoods(e)
  }

}).controller("classCtrl",function($scope,$state,$ionicSideMenuDelegate,mall){

  $scope.obj={
    pageCode:0,
    linenumber:5,
    classID:""
  }
  mall.getlist().then(function(e){
    $scope.classlist = e;
    //console.info(e)
  })
  $scope.list=[];
  $scope.loadMore = function() {
   // console.info($scope.obj)

    mall.getmall($scope.obj).then(function(e) {

      if(angular.isArray(e)) {
        for(var i=0;i< e.length;i++) {
          $scope.list.push(e[i]);
        }
      //  console.info($scope.list)
      } else {
        $scope.loadLast = true;
      }
      $scope.obj.pageCode++;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
  }

  //通过分类获取对应的信息
  $scope.menu = function(info,i) {
//    console.info(info.classID)
    $scope.obj.pageCode = 0;
    $scope.obj.classID = info.classID;
    $scope.list = [];
    $scope.loadLast = false;
    $scope.loadMore();
  //  console.info($scope.obj)
  }
 // console.info($scope.obj)
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.detail = function(e){
    /*$scope.list = [];*/
    $state.go("home.goodsdetail",{id:e.goodsID});
   // console.info(e)
  }
}).controller("goodsCtrl",function($scope,mall,$state,$stateParams,$ionicActionSheet){
      var o = {
        goodsID:$stateParams.id
      }
      mall.getmall(o).then(function(e){
        console.info(e[0])
        $scope.detailImg = e[0];

           $scope.clickShare = function(){
         $ionicActionSheet.show({
           buttons: [
           { text: '<b>微信</b>' },
           { text: '<b>qq</b>' },
           ],
           titleText: '分享到',
           cancelText: '取消',
           buttonClicked: function(index) {
           if(index==0){

           }else if(index==1){

           }
           return true;
           }
         })
         }

        //点击计入购物车
        $scope.addToCar = function(e){
          addgoods(e)
        }

  })
}).controller("mallCtrl",function($scope){
  var o = localStorage.getItem('mallArray');
  $scope.mallArray = JSON.parse(o);
 // console.info(($scope.mallArray.length))
  var arr = $scope.mallArray;
  var total = 0;
  for(var i=0;i<arr.length;i++){
    /*console.info(typeof arr[i].price)*/

    total = total + parseFloat(arr[i].price);
  }
  $scope.total = total;


  $scope.nums = 1;
  $scope.adds = function(){
    this.nums++;
    total = total + parseFloat(this.goods.price);
    $scope.total = total
  //  console.info(total)
  }
  $scope.reduce = function(){
    if(this.nums>1){
      this.nums--;
    total = total - parseFloat(this.goods.price);
    }else{
      this.nums = 1;
    }
    $scope.total = total;
  }

}).controller("mineCtrl",function($scope,$state){
//判断是否存在localstorages  若存在就直接进入我的页面
//若不存在就跳转到登录注册页面
  //点击登录注册页面  跳转到相应的页面
  if(localStorage.getItem('userName')==null) {
   // alert(123)
    $state.go("home.loginRegister",{});
  }else{
    var mineUserName = localStorage.getItem("userName");
    //console.info(mineUserName)
    $scope.mineUserName = mineUserName;
  }

  $scope.exit = function(){
    localStorage.removeItem("userName");
    localStorage.removeItem("password");
    $state.go("home.loginRegister",{});
  }


}).controller("shareCtrl",function($scope,$ionicActionSheet/*,$cordovaBarcodeScanner*/){
 /*   $scope.show = function(){
      $ionicActionSheet.show({
        buttons: [
          { text: '<b>相机</b>' },
          { text: '<b>相册</b>' },
        ],
        titleText: '我也来晒个单',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          if(index==0){

          }else if(index==1){

          }
          return true;
        }
      })
    }*/
 /* var app = {
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');

      console.log('Received Event: ' + id);
    }
  };
  app.initialize();
  document.querySelector("#demo").onclick = function(o){

    navigator.camera.getPicture(onSuccess, onFail,{});

    function onSuccess(e) {
      alert(e)
    }
    function onFail(err) {
      alert(err);
    }
  }
  document.querySelector("#demo1").onclick = function(){
    var o = {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,//返回图片编码为base64
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY //图片资源从本地获取
    }
    navigator.camera.getPicture(onSuccess, onFail,o);
    function onSuccess(e) {
      document.getElementById("first").src= e;
    }
    function onFail(err) {
      alert(err);
    }
  }

/!*  //扫描二维码

  $scope.scanCode = function () {

    $cordovaBarcodeScanner
      .scan()
      .then(function (barcodeData) {
        alert(barcodeData);
        $scope.barcodeData = barcodeData;
        // Success! Barcode data is here
      }, function (error) {
        alert('失败')
        // An error occurred
      });
  };*!/*/

}).controller("loginRegisterCtrl",function($scope,$state){
//判断是否存在localstorages  若存在就直接进入我的页面
//若不存在就跳转到登录注册页面
  //点击登录注册页面  跳转到相应的页面
  $scope.register = function(){
    $state.go("home.register",{});
  }
  $scope.login = function(){
    $state.go("home.login",{});
  }
}).controller("registerCtrl",function($scope,loginR){
  $scope.next = function(){
    //alert(1)
    //console.info($scope.userName);
    $scope.obj = {
        status:'register',
        userID:$scope.userName,
        password:$scope.passwords
    }
    //console.info($scope.obj)
    loginR.postPass($scope.obj).then(function(e) {
        console.info(e);
    })
  }
}).controller("loginCtrl",function($scope,loginR,$state){
  $scope.login = function(){
    //alert(1)
    //console.info($scope.userName);
    $scope.obj = {
      status:'login',
      userID:$scope.phoneNumber,
      password:$scope.loginPass
    }
   // console.info($scope.obj)
    loginR.goLogin($scope.obj).then(function(e) {
      console.info(e);
      if(e==0){
        alert('用户名不存在');
      }else if(e==2){
        alert('用户密码不正确');
      }else{
       localStorage.setItem('userName',JSON.stringify(e.userID));
       localStorage.setItem('password',JSON.stringify(e.password));
       $state.go("home.mine",{});
      }
    })
  }
})


