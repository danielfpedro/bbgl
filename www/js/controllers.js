angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $localstorage, Me) {

})

.controller('PlaygroundController', function($scope, $stateParams, $http, $localstorage, Me, Matches) {
	$scope.Me = Me.data;
	$scope.probablyMatches = Matches.probablyMatches;
	console.log(Matches.probablyMatches);

	$scope.getProbablyMatches = function(){
		Matches.getProbablyMatches().
			then(function(data){
				$scope.probablyMatches = data;
			});
	}

	$scope.setResponse = function(response){
		Matches.setResponse(response);
		$scope.probablyMatches = Matches.probablyMatches;
	}
})

.controller('LoginController', function($scope, $http, $localstorage, $stateParams, $location, $cacheFactory, $window, Me) {
	$scope.doLogin = function(account_id){
		var me = Me.get(account_id);
		me.then(function(data){
			$location.url('/app/playground');
		});
	}
})
.controller('ChatController', function($scope, $stateParams, $localstorage, $http) {
	$http(
		{
			method: 'PUT',
			url: 'http://localhost/xuxuzinho/tey',
		}
	)
	.success(function(data, status, headers, config){
		console.log('Resposta on success: ' + status);
	})
	.error(function(data, status, headers, config){
		console.log('Resposta on error: ' + status);
	});
	// $scope.profile = $localstorage.getObject('profile');

	// $scope.profiles = [];
	// $http(
	// 	{
	// 		method: 'GET',
	// 		url: 'http://localhost/xuxuzinho/relationships/getMatches/' + $scope.profile.account_id,
	// 	}
	// )
	// .success(function(data, status, headers, config){
	// 	$scope.profiles = data;
	// })
	// .error(function(data, status, headers, config){
	// 	alert('Ocorreu um erro')
	// });

	// $http(
	// 	{
	// 		method: 'GET',
	// 		url: 'http://localhost/xuxuzinho/articles',
	// 	}
	// )
	// .success(function(data, status, headers, config){
	// 	console.log('Resposta on success: ' + status);
	// })
	// .error(function(data, status, headers, config){
	// 	console.log('Resposta on error: ' + status);
	// });

})
.controller('SettingsController', function($scope, $ionicPopup, $timeout, Api, Profile, $http) {

	$http({
		url: 'http://localhost/profiles/1',
		method:'PUT'
	});

	$scope.myProfile = Profile.get();
	return false;

	$scope.data = {};
	$scope.data.distance = $scope.myProfile.distance;

$scope.showPopupDistance = function() {

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<div class="list"><div class="item range range-positive"><input ng-model="data.distance" type="range" name="volume" min="3" max="120"></div><div class="item" style="text-align: center;">{{data.distance}} KM</div></div>',
    title: 'Distância',
    subTitle: 'Escolha a distância do bofe',
    scope: $scope,
    buttons: [
      { text: 'Cancelar' },
      {
        text: 'Salvar',
        type: 'button-positive',
        onTap: function(e) {
        	$scope.myProfile.distance = $scope.data.distance;

        	var profile = Api.Profile.get({id: $scope.myProfile.id});
        	Api.Profile.update({id: 2}, $scope.myProfile);
        	return true;
        }
      },
    ]
  });
  myPopup.then(function(res) {
    //console.log('Tapped!', res);
  });
 };

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
