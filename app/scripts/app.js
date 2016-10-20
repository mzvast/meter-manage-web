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
          // controller: 'MainCtrl',
          authenticate: false
        })
        .state("login", {
          url: "/login",
          template:"<login-component></login-component>",
          authenticate: false
        })
        /*测试管理*/
        .state("manage-product", {
          url: "/manage-product",
          template:"<manage-product-component></manage-product-component>",
          authenticate: false
        })
        .state("manage-vendor", {
          url: "/manage-vendor",
          template:"<manage-vendor-component></manage-vendor-component>",
          authenticate: false
        })
        .state("manage-user", {
          url: "/manage-user",
          template:"<manage-user-component></manage-user-component>",
          authenticate: false
        })
        .state("manage-requirement", {
          url: "/manage-requirement",
          template:"<manage-requirement-component></manage-requirement-component>",
          authenticate: false
        })
        .state("manage-env", {
          url: "/manage-env",
          template:"<manage-env-component></manage-env-component>",
          authenticate: false
        })
        .state("search", {
          url: "/search",
          template:"<quick-select-env-component></quick-select-env-component>",
          authenticate: false
        })
        .state("manage",{//TODO继续重构
          url:"/manage/:category",
          params:{
            canEdit:true
          },
          templateUrl: "views/manage/main.html",
          controller: 'ManageCtrl as manageCtrl',
          authenticate: false
        })
        /*用例管理*/
        .state("manage-case", {
          url: "/manage-case",
          template:"<manage-case-component></manage-case-component>",
          authenticate: false
        })
        /*计划管理*/
        .state("manage-plan-new", {
          url: "/manage-plan-new",
          template:"<manage-plan-component></manage-plan-component>",
          authenticate: false
        })
        .state("manage-plan", {
          url: "/manage-plan",
          params:{
            onPlan:true,
            canEdit:true
          },
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
          params:{
            canEdit:false,
            category:'products'
          },
          controller: 'ManageCtrl as manageCtrl',
          templateUrl: "views/manage/main.html"
        })
        .state("manage-plan.on.requirements", {
          url: "-requirements",
          params:{
            canEdit:false,
            category:'requirements'
          },
          controller: 'ManageCtrl as manageCtrl',
          templateUrl: "views/manage/main.html"
        })
        .state("manage-plan.on.cases", {
          url: "-cases",
          params:{
            canEdit:false,
            category:'cases'
          },
          controller: 'ManageCtrl as manageCtrl',
          templateUrl: "views/manage/main.html"
        })
        .state("manage-plan.on.envs", {
          url: "-envs",
          params:{
            canEdit:false,
            category:'envs'
          },
          controller: 'ManageCtrl as manageCtrl',
          templateUrl: "views/manage/main.html"
        })
        .state("manage-plan.on.users", {
          url: "-users",
          params:{
            canEdit:false,
            category:'users'
          },
          controller: 'ManageCtrl as manageCtrl',
          templateUrl: "views/manage/main.html"
        })
        .state("manage-result", {
          url: "/manage-result",
          templateUrl: "views/manage/result.html",
          authenticate: false
        })
        /*功能测试执行*/
        .state("func",{
          url:"/func",
          templateUrl:"views/action/func-main.html",
          controller:'ActionFuncCtrl as funcCtrl',
          authenticate:false
        })
        .state("func.onPlan",{
          url:"/choosePlan",
          templateUrl:"views/action/func-on-plan.html",
          controller: 'ManagePlanCtrl as managePlan',
          authenticate:false
        })
        .state("func.onTest",{
          url:"/doTest",
          templateUrl:"views/action/func-on-test.html",
          // controller:'ActionFuncCtrl as funcCtrl',
          authenticate:false
        })
        /*功能测试结果*/
        .state("results",{
          url:"/results",
          templateUrl:"views/manage/result.html",
          controller:'ManageResultCtrl as resultCtrl',
          authenticate:false
        })
        .state('results.plan',{
          url:"/plan/:id",
          templateUrl:"views/manage/result-plan.html",
          authenticate:false
        })
        .state('results.plan.detail',{
          url:"/detail",
          template:"<plan-detail-component id='$resolve.id'></plan-detail-component>",
          resolve:{
            id:function ($stateParams) {
              return $stateParams.id;
            }
          },
          authenticate:false
        })
        // .state('results.plan.case',{
        //   url:"/case",
        //   templateUrl:"views/manage/result-plan-case.html",
        //   authenticate:false
        // })
        // .state('plan-detail',{
        //   url:'/plan-detail',
        //   component:'planDetailComponent'
        // })
        /*比对测试执行*/
        .state("action-beian", {
          url: "/:mode",
          params:{
            onCompare:true
          },
          templateUrl: "views/action/beian-main.html",
          controller: 'ActionBeianCtrl as beianCtrl',
          authenticate: false
        })
        .state("action-beian.setProduct", {
          url: "/setProduct",
          templateUrl: "views/manage/main.html",
          params:{
            canEdit:false,
            category:'products'
          },
          controller: "ManageCtrl as manageCtrl",
          authenticate: false
        })
        .state("action-beian.setInfo", {
          url: "/setInfo",
          templateUrl: "views/action/set-info.html",
          controller: "ActionBeianInfoCtrl as infoCtrl",
          authenticate: false
        })
        .state("action-beian.setArg", {
          url: "/setArg",
          templateUrl: "views/action/set-arg.html",
          controller: "ActionBeianArgCtrl as argCtrl",
          authenticate: false
        })
        .state("action-beian.setHex",{
          url:"/setHex",
          templateUrl:"views/action/set-hex.html",
          controller: 'ActionBeianHexCtrl as hexCtrl',
          authenticate:false
        })
        .state("action-beian.compare",{
          url:"/compare",
          templateUrl:"views/action/beian-compare.html",
          controller: 'ActionBeianCompareCtrl as compareCtrl',
          authenticate:false
        })
        .state("action-beian.report",{
          url:"/report",
          templateUrl:"views/action/beian-report.html",
          controller: 'ActionBeianReportCtrl as reportCtrl',
          authenticate:false
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
      // httpProvider.interceptors.push('rapMockInterceptor');
    }]
  )
  .run(['$rootScope', '$state', 'authService',function ($rootScope, $state, authService) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !authService.isAuthenticated()) {
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault();
      }
    });
  }])
  .run(['formlyConfig',function (formlyConfig) {
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
  }])
;
