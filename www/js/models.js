angular.module('starter.models', [])

.factory('Api', ['$resource', function($resource) {
	return {
		Profile: $resource('http://localhost/bbgl/profiles/:id', null,
		{
			'update': {method:'PUT'}
		})
	};
}])
.factory('Me', ['$q', '$http', '$localstorage', function($q, $http, $localstorage) {
	return {
		model: 'Me',
		url: 'http://192.168.0.100:80/bbgl/profiles',
		data: $localstorage.getObject(this.model),
		get: function(id){
			var _this = this;
			var me = $q.defer();
			$http.get(this.url + '/' + id).
				success(function(data){
					_this.data = data;
					$localstorage.setObject(_this.model, data);
					me.resolve(data);
				}).
				error(function(){
					alert('Erro ao pegar o perfil na nuvem');
				});
			return me.promise;
		},
	};
}]).
factory('Matches', ['Me', '$http', '$q', '$localstorage', function(Me, $http, $q, $localstorage){
	return {
		url: 'http://192.168.0.100:80/bbgl/matches/getProbably',
		probablyMatches: $localstorage.getArray('ProbablyMatches'),
		matched: [],
		getProbablyMatches: function(){
			var _this = this;
			var pMatches = $q.defer();
			$http.get(this.url).
				success(function(data){
					_this.probablyMatches = data;
					$localstorage.setArray('ProbablyMatches', data);
					pMatches.resolve(data);
				}).
				error(function(){
					alert('Erro ao pegar os matches na nuvem');
				});
			return pMatches.promise;
		},
		setResponse: function(response){
			this.probablyMatches.shift();
		}
	}
}]);