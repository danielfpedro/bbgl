angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	$scope.profile = {};
})

.controller('PlaylistsCtrl', function($scope) {
	$scope.playlists = [
		{ title: 'Reggae', id: 1 },
		{ title: 'Chill', id: 2 },
		{ title: 'Dubstep', id: 3 },
		{ title: 'Indie', id: 4 },
		{ title: 'Rap', id: 5 },
		{ title: 'Cowbell', id: 6 }
	];
})

.controller('PlaygroundController', function($scope, $stateParams, $http, $localstorage) {

	$scope.profile = $localstorage.getObject('profile');

	var profiles = [];
	$scope.current_profile = {};
	start();


	function start() {
		profiles = $localstorage.getArray('profiles');
		getCurrentProfile();
		console.log(profiles);
	}
	function getCurrentProfile(){
		$scope.total_profiles = profiles.length;
		if ($scope.total_profiles > 0){
			$scope.current_profile = profiles[$scope.total_profiles - 1];	
		}
		
	}

	$scope.setResponse = function(action, account_id){
		$http({
			method: 'POST',
			url: 'http://localhost/xuxuzinho/relationships/add',
			params: {action: action, account_id: $scope.profile.account_id, account_id2: $scope.current_profile.id}
		})
		.success(function(data){

		})
		.error(function(){
			alert('erro');
		});


		profiles.forEach(function(value, index){
			if (value.id == $scope.current_profile.id) {
				profiles.splice(index, 1);
				$localstorage.setObject('profiles', profiles);
				start();
			};
		});
		if (action == 1) { // Fornecer

		} else if(action == 2){ //Gastar

		} else if(action == 3){ //Não faz nada

		};


	}

	$scope.getProfiles = function() {
		$http(
			{
				method: 'GET',
				url: 'http://localhost/xuxuzinho/profiles/probablyMatches/' + $scope.profile.account_id
			}
		)
			.success(function(data, status, headers, config){
				$localstorage.setObject('profiles', data);
				start();
			})
			.error(function(data, status, headers, config){
				alert('Ocorreu um erro')
			});
	}

})

.controller('LoginController', function($scope, $http, $localstorage, $stateParams, $location) {
	$scope.loginData = {};
	$scope.doLogin = function(){
		$http(
			{
				method: 'GET',
				url: 'http://localhost/xuxuzinho/profiles/' + $scope.loginData.account_id,
			}
		)
		.success(function(data, status, headers, config){
			$localstorage.setObject('profile', data);

			$location.path('app/playground', true);

		})
		.error(function(data, status, headers, config){
			alert('Ocorreu um erro')
		});
	}
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
