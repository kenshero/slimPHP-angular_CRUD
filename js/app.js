var myApp = angular.module('todoMember', ['todoMember.service','ui.router']);

  myApp.controller('TodoController', ['$scope','Member','$stateParams','$rootScope',function($scope,Member,$stateParams,$rootScope) {


    $scope.editData    = function(data)
     {
       Member.edit(data);
     }

    $scope.addUser = function(user,pass)
    {
      Member.addUser(user,pass,function(data){
          Member.getData(function(data){
            $scope.sss = data;
          });
      });
    }

    $scope.del     = function(id){

      Member.delList(id,function(data){
          Member.getData(function(data){
            $scope.sss = data;
          });
      });
    }

    if ($stateParams.ID != undefined)
     {
      $scope.aaa={};
        for (var i = 0; i < $rootScope.sss.length; i++) {
          if ($rootScope.sss[i].ID == $stateParams.ID)
           {
             $scope.aaa.ID         =  $stateParams.ID;
             $scope.aaa.userName   =  $rootScope.sss[i].userName;
             $scope.aaa.Phone      =  $rootScope.sss[i].Phone;

           }
        }
     }

      

  }]);

  myApp.controller('getController', ['$scope','promiseObj','$rootScope',function($scope,promiseObj,$rootScope) {

    $rootScope.sss= promiseObj;
      

  }]);

  myApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/home");
      //
      // Now set up the states
      $stateProvider
        .state('state1', {
          url: "/home",
          templateUrl: "home.html",
          controller : "getController",
          resolve:{
            promiseObj:  function($http){
                var test = $http.get('api/getdata').then(function (data) {
                       return data.data;
                   });
                return test;
           }
         }
        })
        .state('state2', {
          url: "/edit/:ID",
          templateUrl: "edit.html",
          controller : "TodoController"
        });

      });