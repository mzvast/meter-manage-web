'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageRequirementCtrl
 * @description
 * # ManageRequirementsCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageRequirementCtrl', ['dataManager',function(dataManager) {
            var self = this;
            self.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            /////////////
            // Requirements //
            /////////////
            self.getRequirements = function() {
                dataManager.requirements.get({
                        current_page: self.currentPage,
                        items_per_page: self.itemsPerPage,
                        order_by: self.predicate,
                        reverse: self.reverse
                    }).$promise
                    .then(function(response) {
                        console.log("获取需求 SUCCESS!");
                        console.dir(response);
                        self.products = response.json;
                        self.totalItems = response.total_items;
                    });

            };

            self.getRequirements();
        }]);
