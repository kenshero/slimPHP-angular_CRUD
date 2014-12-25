angular.module('todoMember.service', [])
  .factory('Member', ['$http','$q', function($http,$q) {

  	return{

  		addUser  : function (user,pass,callback) {
  			var tmp = {

  				username : user,
  				password : pass

  			};
  			console.log(tmp);
            $http.post('api/add',{params : tmp})
            .success(function(data) {
                callback(data);
            }).
            error(function(data){
            	callback(status);
            });
        },
        getData  : function(callback){

        	$http.get('api/getdata')
            .success(function(data) {
                callback(data);
            }).
            error(function(data,status){
            	callback(status);
            });     

        },
        delList  : function(id,callback){

        	$http.get('api/delete/'+id)
            .success(function(data,status) {
                callback(data);
            }).
            error(function(data,status){
            	 callback(status);
            });

        },
        edit  : function(data)
        {
        	$http.post('api/edit/'+data.ID,{params:data})
            .success(function(data,status) {
          
            }).
            error(function(data,status){
        
            });
             
        }

  	}
    

  }]);