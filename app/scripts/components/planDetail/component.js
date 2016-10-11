/**
 * Created by mzvast on 2016/8/27.
 */
  'use strict';
  angular.module('manageApp')
    .component('planDetailComponent', {
      templateUrl: 'scripts/components/planDetail/component.html',
      bindings: {
        id: '<'
      },
      controller: function(dataManager,$uibModal,$document) {
        var $ctrl = this;
        $ctrl.cases = [];
        $ctrl.showModal = false;
        $ctrl.openModal = function () {
          $ctrl.showModal = true;
        };
        $ctrl.closeModal = function () {
          $ctrl.showModal = false;
        };

        this.$onInit = function() {
          dataManager.ReadOneById('plans',$ctrl.id,function (response) {
            // console.log(response.data);
            var data = response.data;
            var casesList = data.casesList;

            $ctrl.product = data.productsList[0]['name'];
            $ctrl.vendor = data.productsList[0]['vendor'];
            $ctrl.envsList = data.envsList;
            $ctrl.requirementsList = data.requirementsList;

            // console.log(casesList);
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

          dataManager.getPlanResultbyId($ctrl.id,function (response) {
            console.log($ctrl.id);
            console.log("-----getPlanResultbyId-------",response);
            $ctrl.resultsList = response.data;
          })

        };
        $ctrl.setCase = function (index,caseId) {
          $ctrl.currentCase = $ctrl.cases[index];
          $ctrl.resultsList.forEach(function(item){
              if(item.caseId === caseId){
                    console.log('caseId:',caseId);
                $ctrl.currentRecord = item.record;
              }
            })
        };





      },
    });
