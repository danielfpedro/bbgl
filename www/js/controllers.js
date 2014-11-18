angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $localstorage, Me) {
	$scope.me = Me.data;

})

.controller('PlaygroundController', function($scope, $stateParams, $http, $localstorage, Me, Matches, $ionicLoading) {
	
	$scope.Me = Me.data;
	$scope.probablyMatches = Matches.probablyMatches;

	$scope.getProbablyMatches = function(){
		$ionicLoading.show({
			template: 'Carregando bofes lindos...'
		});
		Matches.getProbablyMatches().
			then(function(data){
				$scope.probablyMatches = data;
				$ionicLoading.hide();
			});
	}

	$scope.setResponse = function(response){
		Matches.setResponse(response);
		$scope.probablyMatches = Matches.probablyMatches;
	}
})

.controller('LoginController', function($scope, $http, $localstorage, $stateParams, $location, $cacheFactory, $window, Me, $ionicLoading) {
	$scope.doLogin = function(account_id){
		var me = Me.get(account_id);
		me.then(function(data){
			$location.url('/app/playground');
		});
	}
})
.controller('ChatController', function($scope, Message, $stateParams){
	
	$scope.messages = [];


	$scope.doRefresh = function(){
		Message.get($stateParams.id).
			then(function(data){
				$scope.messages = data;
			}).
			finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
	}

	$scope.sendMessage = function() {
		Message.send({account_id: $scope.me.account_id, account_id2: $stateParams.id, message: $scope.messageToSend}).
			then(function(data){
				//$scope.messages = Message.data;
				$scope.messageToSend = '';
			});
	}

	$scope.doRefresh();


}).
controller('ProfileController', function($stateParams){

}).

controller('FacebookLoginController', function($scope, $stateParams, $cordovaOauth, $ionicLoading, $timeout, $http){	
alert('dsds');
	$scope.image = '';

	$scope.facebookLogin = function (){
		$cordovaOauth.facebook("401554549993450", ["email"]).then(function(result) {
			$ionicLoading.show({
				template: 'Pegando imagem'
			});
			$http.get('https://graph.facebook.com/me/picture?redirect=false&access_token=' + result.access_token).
				then(function(data){
					$ionicLoading.hide();
					$scope.image = data.data.url;
				}).
				error(function(data){
					$ionicLoading.hide();
					alert(data);
				});
		}, function(error) {
			console.log(error);
		});
	}
}).
controller('MatchesController', function($scope, $stateParams, $localstorage, $http, $ionicLoading, Matches) {;
	$scope.profiles = [];

	$scope.doRefresh = function(){
		$ionicLoading.show({
			template: 'Carregando contatos'
		});
		Matches.getMatched().
			then(function(data){
				$ionicLoading.hide();
				$scope.profiles = data;
			}).
			finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
	}
	
	//Only search on the load of the page if lastsearch date is null
	if (Matches.dateMatchedLastSearch) {
		$scope.profiles = Matches.matched;
	} else {
		$scope.doRefresh();	
	};
	
	
})
.controller('SettingsController', function($scope, $ionicPopup, $timeout, Me, $ionicLoading, $localstorage) {
	console.log($localstorage.getObject('Me'));
	$scope.me = Me.data;
	$scope.data = {};
	$scope.data.distance = $scope.me.distance;

	$scope.showPopupDistance = function() {
		var myPopup = $ionicPopup.show({
			template: '<div class="list"><div class="item range range-positive"><input ng-model="data.distance" type="range" name="volume" min="3" max="120"></div><div class="item" style="text-align: center;">{{data.distance}} KM</div></div>',
			title: 'Distância',
			subTitle: 'Escolha a distância do bofe',
			scope: $scope,
			buttons: [
				{
					text: 'Cancelar'
				},
				{
					text: 'Salvar',
					type: 'button-positive',
					onTap: function(e) {
						$ionicLoading.show({
							template: 'Salvando, aguarde...'
						});

						Me.update($scope.data.distance).then(function(){
							$ionicLoading.hide();
						}).catch(function(error){
							alert('error');
						});
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
