var app = angular.module('dmsApp', ['ui.router', 'ngStorage', 'ngMaterial', 'ngAria', 'ngResource', 'ngMdIcons']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/',     
        templateUrl: 'app/views/home.view.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.view.html',
        controller: 'UserCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/views/signup.view.html',
        controller: 'UserCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.view.html',
        controller: 'DashboardCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.view.html',
        controller: 'UserCtrl'
      });

      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
        return {
          'request': function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
              config.headers['x-access-token'] = $window.sessionStorage.token;
            }
            return config;
          },
          'responseError': function(response) {
            if (response.status === 401 || response.status === 403) {
              // $location.url('/home');
              return $q.reject(response);
            }
            // return $q.reject(response);
          }
        };
      }]);
  }]);
