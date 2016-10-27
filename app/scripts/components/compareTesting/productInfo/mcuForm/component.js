/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('mcuFormComponent', {
    templateUrl: 'scripts/components/compareTesting/productInfo/mcuForm/component.html',
    bindings: {
      data:'<'
    },
    controller: mcuFormController
  });

mcuFormController.$inject = [];

function mcuFormController() {
  var $ctrl = this;

  $ctrl.form = {
    "mcu_id":1,
    "mcu_model":'model',
    "memory_addr": {
      "start": "4000",
      "end": "13fff"
    },
    "software_addr": {
      "start": "4000",
      "end": "97ff"
    },
    "protect_addr": [{
      "start": "12000",
      "end": "121ff"
    }, {
      "start": "13000",
      "end": "133ff"
    }],
    "reserve_addr": [{
      "start": "12000",
      "end": "121ff"
    }, {
      "start": "13000",
      "end": "133ff"
    }]
  };
  $ctrl.$onInit = function () {
    if($ctrl.data){
      console.log("$ctrl.data received");
      console.log($ctrl.data);
    }
  }


}
