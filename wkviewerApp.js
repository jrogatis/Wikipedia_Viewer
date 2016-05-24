
// JavaScript Document
 'use strict';

var app = angular.module('appWpViewer', []);
  
  //aqui crio o objeto que ira fazer a conexão e trazer o json com as infos para mostrar
  app.factory('wpApi', function($http) {
	  var obj = {};
	  
 	  //aqui crio o objeto que vai retornar os dados pra consulta
	    obj.getArticles = function(queryText) {
		var api = 'https://en.wikipedia.org/w/api.php?action=query';
		var format = '&format=json';
		var list = '&list=search';
		var charSet = '&utf8=1';
		var action = '&srsearch=' + queryText;
		var numLimit ='&srlimit=10';
	    var cb = "&callback=JSON_CALLBACK";
		console.log(api + format + list+ charSet + action +numLimit+ cb);
		
		return $http.jsonp(api + format + list+ charSet + action + cb);
	 
	  };
	 	//alert(obj.prototype);
		return obj;
  });
  
  
 app.controller('MainCtrl', function($scope, wpApi) {
  $scope.Data = {};
 
  });
  
  
app.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);
    };

});


 
 //aqui eu crio o bind do "enter" que vai ser usado no text box
app.directive('myEnter', function (wpApi) {
    return function ($scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval(attrs.myEnter);
					//alert($scope.queryText);
					//aqui quando da enter carrego a query
					 wpApi.getArticles($scope.queryText).success(function(data) {
						$scope.articles = data.query.search;
						$scope.hasArticles = true;
						//alert(data[0].title);
						console.log(data.query.searchinfo.totalhits);
						console.log(data.query.search[0].snippet);
					});
	
                });
						
                event.preventDefault();
            }
        });
    };
});
  


  


  
  