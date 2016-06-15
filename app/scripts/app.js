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
  .module('manageApp',
    [
      'ui.router',
      'angularCSS',
      'ngCookies',
      'ngResource',
      'ngRap',
      'formly',
      'formlyBootstrap',
      'ui.bootstrap'
    ])
  .config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }])

  //////////////////////////////
  //configure $cookiesProvider //
  //////////////////////////////
  .config(['$cookiesProvider', function ($cookiesProvider) {
    $cookiesProvider.defaults.expires = '600';

  }])
  /////////////////////////////
  //configure $stateProvider //
  /////////////////////////////
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          authenticate: false
        })
        .state("login", {
          url: "/login",
          templateUrl: "views/login.html",
          controller: "LoginCtrl as login",
          authenticate: false
        })
        /*测试管理*/
        .state("manage-product", {
          url: "/manage-product",
          templateUrl: "views/manage/product.html",
          controller: 'ManageProductCtrl as manageProduct',
          authenticate: false
        })
        .state("manage-user", {
          url: "/manage-user",
          templateUrl: "views/manage/user.html",
          controller: 'ManageUserCtrl as manageUser',
          authenticate: false
        })
        .state("manage-requirement", {
          url: "/manage-requirement",
          templateUrl: "views/manage/requirement.html",
          controller: 'ManageRequirementCtrl as manageReq',
          authenticate: false
        })
        .state("manage-environment", {
          url: "/manage-environment",
          templateUrl: "views/manage/environment.html",
          controller: 'ManageEnvironmentCtrl as manageEnv',
          authenticate: false
        })
        .state("manage-plan", {
          url: "/manage-plan",
          templateUrl: "views/manage/plan.html",
          controller: 'ManagePlanCtrl as managePlan',
          authenticate: false
        })
        .state("manage-plan.on", {
          url: "-on",
          templateUrl: "views/manage/plan-new.html"
        })
        .state("manage-plan.on.products", {
          url: "-products",
          templateUrl: "views/manage/plan-new-products.html"
        })
        .state("manage-plan.on.requirements", {
          url: "-requirements",
          templateUrl: "views/manage/plan-new-requirements.html"
        })
        .state("manage-plan.on.envs", {
          url: "-envs",
          templateUrl: "views/manage/plan-new-envs.html"
        })
        .state("manage-plan.on.users", {
          url: "-users",
          templateUrl: "views/manage/plan-new-users.html"
        })
        .state("manage-flaw", {
          url: "/manage-flaw",
          templateUrl: "views/manage/flaw.html",
          controller: "ManageFlawCtrl as manageFlaw",
          authenticate: false
        })
        .state("manage-result", {
          url: "/manage-result",
          templateUrl: "views/manage/result.html",
          authenticate: false
        })
        /*测试执行*/
        .state("action-test", {
          url: "/action-test",
          templateUrl: "views/action/test.html",
          controller: 'ActionTestCtrl as vm',
          authenticate: false
        })
        .state("action-test.form", {
          url: "/form",
          templateUrl: "views/action/form-main.html",
          controller:"FormTabCtrl as formTabCtrl",
          authenticate: false
        })
        .state("action-test.form.show", {
          url: "/show/:fid",
          templateUrl: "views/action/form-detail.html",
          controller:"FormCtrl as formCtrl",
          authenticate: false
        })
        .state("action-test.run",{
          url:"/run",
          templateUrl:"views/action/run.html",
          controller: 'ActionTestRunCtrl as runCtrl',
          authenticate:false
        })
        .state("action-test.encrypt",{
          url:"/encrypt",
          templateUrl:"views/action/encrypt.html",
          controller: 'ActionTestEncryptCtrl as encryptCtrl',
          authenticate:false
        })
        .state("action-test.status",{
          url:"/status",
          templateUrl:"views/action/register-status.html",
          authenticate:false
        })
        .state("action-suite-edit", {
          url: "/action-suite-edit",
          templateUrl: "views/action/suite-edit.html",
          authenticate: false
        })
        .state("action-process-record", {
          url: "/action-process-record",
          templateUrl: "views/action/process-record.html",
          authenticate: false
        })
        .state("action-flaw-submit", {
          url: "/action-flaw-submit",
          templateUrl: "views/action/flaw-submit.html",
          authenticate: false
        })
        .state("action-product-register", {
          url: "/action-product-register",
          controller: 'ActionProductRegisterCtrl as reg',
          templateUrl: "views/form-main.html",
          authenticate: false
        })
        .state("action-product-register.form", {
          url: "-form/:fid",
          templateUrl: "views/form-detail.html",
          authenticate: false
        })
        .state("action-registered-software-encrypt", {
          url: "/action-registered-software-encrypt",
          templateUrl: "views/action/registered-software-encrypt.html",
          authenticate: false
        })
        .state("action-registered-product-compare", {
          url: "/action-registered-product-compare",
          templateUrl: "views/action/registered-product-compare.html",
          authenticate: false
        })
        .state("action-generate-test-result", {
          url: "/action-generate-test-result",
          templateUrl: "views/action/generate-test-result.html",
          authenticate: false
        })
        /*系统配置*/
        .state("setting-role", {
          url: "/setting-role",
          templateUrl: "views/setting/role.html",
          authenticate: false
        })
        .state("setting-encrypt", {
          url: "/setting-encrypt",
          templateUrl: "views/setting/encrypt.html",
          authenticate: false
        })
      ;

    }])
  .config(['$httpProvider',
    'ngRapProvider',
    function (httpProvider,
              ngRapProvider) {
      ngRapProvider.script = 'http://rap.taobao.org/rap.plugin.js?projectId=3768'; // replce your host and project id
      ngRapProvider.enable({
        mode: 3
      });
      httpProvider.interceptors.push('rapMockInterceptor');
    }]
  )
  .run(function ($rootScope, $state, authService) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !AuthService.isAuthenticated()) {
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault();
      }
    });
  })
  .run(function (formlyConfig) {
    /*datepicker config*/
    var attributes = [
      'date-disabled',
      'custom-class',
      'show-weeks',
      'starting-day',
      'init-date',
      'min-mode',
      'max-mode',
      'format-day',
      'format-month',
      'format-year',
      'format-day-header',
      'format-day-title',
      'format-month-title',
      'year-range',
      'shortcut-propagation',
      'datepicker-popup',
      'show-button-bar',
      'current-text',
      'clear-text',
      'close-text',
      'close-on-date-selection',
      'datepicker-append-to-body'
    ];

    var bindings = [
      'datepicker-mode',
      'min-date',
      'max-date'
    ];

    var ngModelAttrs = {};

    function camelize(string) {
      string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      // Ensure 1st char is always lowercase
      return string.replace(/^([A-Z])/, function (match, chr) {
        return chr ? chr.toLowerCase() : '';
      });
    }

    angular.forEach(attributes, function (attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    angular.forEach(bindings, function (binding) {
      ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    // console.log(ngModelAttrs);
    formlyConfig.setType(
      {
        name: 'datepicker',
        templateUrl: 'views/form/datepicker.html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            datepickerOptions: {
              format: 'yyyy-dd-MM',
              initDate: new Date()
            }
          }
        },
        controller: ['$scope', function ($scope) {
          $scope.datepicker = {};

          $scope.datepicker.opened = false;

          $scope.datepicker.open = function ($event) {
            $scope.datepicker.opened = !$scope.datepicker.opened;
          };
        }]
      });
    /*custom config*/
    formlyConfig.setType(
      {
        name: 'custom',
        templateUrl: 'views/form/custom.html'
      }
    );
    /*重复内容模板*/
    var unique = 1;
    formlyConfig.setType({
      name: 'repeatSection',
      templateUrl: 'views/form/repeat-section.html',
      controller: ['$scope',function ($scope) {
        $scope.formOptions = {formState: $scope.formState};
        $scope.addNew = addNew;

        $scope.copyFields = copyFields;


        function copyFields(fields) {
          fields = angular.copy(fields);
          addRandomIds(fields);
          return fields;
        }

        function addNew() {
          $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
          var repeatsection = $scope.model[$scope.options.key];
          var lastSection = repeatsection[repeatsection.length - 1];
          var newsection = {};
          if (lastSection) {
            newsection = angular.copy(lastSection);
          }
          repeatsection.push(newsection);
        }

        function addRandomIds(fields) {
          unique++;
          angular.forEach(fields, function (field, index) {
            if (field.fieldGroup) {
              addRandomIds(field.fieldGroup);
              return; // fieldGroups don't need an ID
            }

            if (field.templateOptions && field.templateOptions.fields) {
              addRandomIds(field.templateOptions.fields);
            }

            field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
          });
        }

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
      }]
    });
  })
;
