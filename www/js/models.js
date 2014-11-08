angular.module('starter.models', [])

.factory('Me', ['$q', '$http', '$localstorage', function($q, $http, $localstorage) {
	return {
		model: 'Me',
		url: 'http://192.168.0.104:80/bbgl/profiles',
		data: $localstorage.getObject('Me'),
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
		update: function(distance){
			var _this = this;
			var  me = $q.defer();
			$http.put(this.url + '/' + this.data.account_id, {
				distance: distance
			}).
				success(function(data){
					_this.data.distance = distance;
					$localstorage.setObject(_this.model, _this.data);
					me.resolve(data);
				}).
				error(function(error){
					me.reject(error);
				});
			return me.promise;
		}
	};
}]).
factory('Matches', ['Me', '$http', '$q', '$localstorage', 'dateUtil', function(Me, $http, $q, $localstorage, dateUtil){
	return {
		url: 'http://192.168.0.104:80/bbgl/matches',
		probablyMatches: $localstorage.getArray('ProbablyMatches'),
		matched: $localstorage.getArray('matched'),
		dateMatchedLastSearch: $localstorage.get('dateMatchedLastSearch', null),
		getProbablyMatches: function(){
			var _this = this;
			var pMatches = $q.defer();
			$http.get(this.url + '/getProbably').
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
		getMatched: function(){
			var _this = this;
			var pMatches = $q.defer();
			$http.get(this.url + '/getMatched').
				success(function(data){
					_this.matched = data;
					$localstorage.setArray('matched', data);

					_this.dateMatchedLastSearch = dateUtil.dbFormat;
					$localstorage.set('dateMatchedLastSearch', _this.dateMatchedLastSearch);
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