/**
 * Created by jsj on 2016/9/27.
 */
angular.module("ng.filter",[])
  .filter("bannerImg",function(){
    return function(o){
    //  console.info(o)

      var str = o.split('",')[0].split('["')[1];
      return str;

    }
  })
