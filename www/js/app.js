// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
	'ionic',
	'starter.controllers',
	'starter.utils',
	'starter.models',
	'ngResource',
	'ngCordova'])
.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
 
	$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: 'AppCtrl'
		})

		.state('app.search', {
			url: "/search",
			views: {
				'menuContent' :{
					templateUrl: "templates/search.html"
				}
			}
		})

		.state('app.playground', {
			url: "/playground",
			views: {
				'menuContent' :{
					templateUrl: "templates/playground.html",
					controller: 'PlaygroundController'
				}
			}
		})
		.state('app.matches', {
			url: "/matches",
			views: {
				'menuContent' :{
					templateUrl: "templates/matches.html",
					controller: 'MatchesController'
				}
			}
		})
		.state('app.chat', {
			url: "/chat/:id",
			views: {
				'menuContent' :{
					templateUrl: "templates/chat.html",
					controller: 'ChatController'
				}
			}
		})
		.state('app.settings', {
			url: "/settings",
			views: {
				'menuContent' :{
					templateUrl: "templates/settings.html",
					controller: 'SettingsController'
				}
			}
		})
		.state('app.profile', {
			url: "/profile/:id",
			views: {
				'menuContent' :{
					templateUrl: "templates/profile.html",
					controller: 'ProfileController'
				}
			}
		}).
		state('app.facebook-login', {
			url: "/facebook-login",
			views: {
				'menuContent' :{
					templateUrl: "templates/facebook_login.html",
					controller: 'FacebookLoginController'
				}
			}
		})
		.state('app.login', {
			url: "/login",
			views: {
				'menuContent' :{
					templateUrl: "templates/login.html",
					controller: 'LoginController'
				}
			}
		})

		.state('app.browse', {
			url: "/browse",
			views: {
				'menuContent' :{
					templateUrl: "templates/browse.html"
				}
			}
		})
		.state('app.playlists', {
			url: "/playlists",
			views: {
				'menuContent' :{
					templateUrl: "templates/playlists.html",
					controller: 'PlaylistsCtrl'
				}
			}
		})

		.state('app.single', {
			url: "/playlists/:playlistId",
			views: {
				'menuContent' :{
					templateUrl: "templates/playlist.html",
					controller: 'PlaylistCtrl'
				}
			}
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/facebook-login');
});

