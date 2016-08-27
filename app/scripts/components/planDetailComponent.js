/**
 * Created by mzvast on 2016/8/27.
 */
  'use strict';
  angular.module('manageApp')
    .component('planDetailComponent', {
      templateUrl: 'scripts/components/planDetailComponent.html',
      bindings: {
        id: '<'
      },
      controller: function(dataManager,$uibModal,$document) {
          var $ctrl = this;
          $ctrl.cases = [];

          this.$onInit = function() {
            dataManager.ReadOneById('plans',$ctrl.id,function (response) {
              console.log(response.data);
              var resdata = response.data;
              var casesList = resdata.casesList;
              $ctrl.product = resdata.productsList[0]['name'];
              $ctrl.vendor = resdata.productsList[0]['vendor'];
              $ctrl.envsList = resdata.envsList;
              $ctrl.requirementsList = resdata.requirementsList;

              console.log(casesList);
              /*获取所选plan中case列表的详情*/
              casesList.forEach(function (caseEntity) {
                // console.log('caseEntity===?===',caseEntity);
                dataManager.ReadOneById('cases',caseEntity.id,function (response) {
                  var caseItem = response.data;
                  // console.log(caseItem);
                  $ctrl.cases.push({
                    id:caseEntity.id,
                    content:caseItem,
                    record:'',
                    pass:false
                  });
                  $ctrl.setCase(0);
                });
              })
            });
          };
          $ctrl.setCase = function (index) {
            $ctrl.currentCase = $ctrl.cases[index];
          };



      },
    });
