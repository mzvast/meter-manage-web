'use strict';

/**
 * @ngdoc overview
 * @name manageApp
 * @description
 * # manageApp
 *
 * Main module of the application.
 */
angular
  .module('manageApp', ['ui.router',
                              'angularCSS',
                              'ngCookies',
                              'ngRap',
                              'ui.bootstrap'])
  .config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
  
    //////////////////////////////
    //configure $cookiesProvider //
    //////////////////////////////
  .config(['$cookiesProvider',function($cookiesProvider) {
    $cookiesProvider.defaults.expires = '600';

  }])
    /////////////////////////////
    //configure $stateProvider //
    /////////////////////////////
  .config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
  	$urlRouterProvider.otherwise('/home');
  	$stateProvider
  	.state('home',{
  		url:'/',
  		templateUrl:'views/main.html',
  		controller:'MainCtrl',      
  		authenticate:false
  	})
  	.state("login", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginCtrl as login",
      authenticate: false
    }) 
    .state("manage-product", {
      url: "/manage-product",
      templateUrl: "views/manage-product.html",
      controller:'ManageProductCtrl as manageProduct',
      authenticate: false,
    })
    .state("manage-user", {
      url: "/manage-user",
      templateUrl: "views/manage-user.html",
      controller:'ManageUserCtrl as manageUser',
      authenticate: false,
    })
    .state("manage-requirement", {
      url: "/manage-requirement",
      templateUrl: "views/manage-requirement.html",
      authenticate: false,
    })
    .state("manage-environment", {
      url: "/manage-environment",
      templateUrl: "views/manage-environment.html",
      authenticate: false,
    }) 
    .state("manage-plan", {
      url: "/manage-plan",
      templateUrl: "views/manage-plan.html",
      authenticate: false,
    }) 
    .state("manage-flaw", {
      url: "/manage-flaw",
      templateUrl: "views/manage-flaw.html",
      authenticate: false,
    }) 
    .state("manage-result", {
      url: "/manage-result",
      templateUrl: "views/manage-result.html",
      authenticate: false,
    }) 
    .state("action-suite-edit", {
      url: "/action-suite-edit",
      templateUrl: "views/action-suite-edit.html",
      authenticate: false,
    })
    .state("action-process-record", {
      url: "/action-process-record",
      templateUrl: "views/action-process-record.html",
      authenticate: false,
    })
    .state("action-flaw-submit", {
      url: "/action-flaw-submit",
      templateUrl: "views/action-flaw-submit.html",
      authenticate: false,
    })
    .state("action-product-register", {
      url: "/action-product-register",
      templateUrl: "views/action-product-register.html",
      authenticate: false,
    })
    .state("action-registered-software-encrypt", {
      url: "/action-registered-software-encrypt",
      templateUrl: "views/action-registered-software-encrypt.html",
      authenticate: false,
    })
    .state("action-registered-product-compare", {
      url: "/action-registered-product-compare",
      templateUrl: "views/action-registered-product-compare.html",
      authenticate: false,
    })
    .state("action-generate-test-result", {
      url: "/action-generate-test-result",
      templateUrl: "views/action-generate-test-result.html",
      authenticate: false,
    }) 
    .state("setting-role", {
      url: "/setting-role",
      templateUrl: "views/setting-role.html",
      authenticate: false,
    })
    .state("setting-encrypt", {
      url: "/setting-encrypt",
      templateUrl: "views/setting-encrypt.html",
      authenticate: false,
    })   
    ;
  	
  }])
  .config(['$httpProvider', 
          'ngRapProvider',
          function (
            httpProvider, 
            ngRapProvider) {
            ngRapProvider.script = 'http://rap.taobao.org/rap.plugin.js?projectId=3768'; // replce your host and project id
            ngRapProvider.enable({
                mode: 3
            });
            httpProvider.interceptors.push('rapMockInterceptor');
                  }]
    )
  .run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
  })
  ;
