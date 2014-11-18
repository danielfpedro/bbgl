angular.module('starter.models', []).
factory('Model', [function() {
	return {
		baseUrl: 'http://192.168.0.100:80/bbgl'
	}
}]).
factory('Me', ['$q', '$http', '$localstorage', 'Model', function($q, $http, $localstorage, Model) {
	return {
		model: 'Me',
		url: Model.baseUrl + '/profiles',
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
factory('Message', ['$q', '$http', '$localstorage', 'Model', function($q, $http, $localstorage, Model) {
	return {
		url: Model.baseUrl + '/messages',
		lastRefresh: $localstorage.get('lastRefresh', null),
		get: function(id){
			var _this = this;
			var messages = $q.defer();
			$http.get(this.url).
				success(function(data){
					// _this.data = data;
					// $localstorage.setObject(_this.model, data);
					messages.resolve(data);
				}).
				error(function(){
					messages.reject('Erro ao pegar o perfil na nuvem');
				});
			return messages.promise;
		},
		send: function(params){
			var _this = this;
			var message = $q.defer();
			$http.post(this.url, params).
				success(function(data){
					message.resolve(data);
				}).
				error(function(){
					messages.reject('Erro ao enviar mensagem');
				});
			return message.promise;
		}
	};
}]).
factory('Matches', ['Me', '$http', '$q', '$localstorage', 'dateUtil', 'Model', function(Me, $http, $q, $localstorage, dateUtil, Model){
	return {
		url: Model.baseUrl + '/matches',
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