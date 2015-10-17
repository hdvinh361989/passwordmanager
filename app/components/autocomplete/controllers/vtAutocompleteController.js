/**
 * Created by vinhhoang on 17/10/2015.
 */
(function () {
    angular
        .module('vtAutoComplete')
        .controller('vtAutoCompleteCtrl', ['$scope', function ($scope) {
            var ctrl = this,
                isSelected = false;

            //Global variable
            ctrl.pages = [];
            ctrl.searchExpr = $scope.vtSearchFunc;

            //Global methods
            ctrl.select = function (item) {
                isSelected = true;
                $scope.vtSelectedItem = item;
                $scope.vtSearchText = item.name;
                ctrl.pages = [];
            };

            //Watch vtSearchText change and update search result
            $scope.$watch('vtSearchText', function (newVal, oldVal) {
                if (newVal && newVal !== oldVal && !isSelected) {
                    $scope.$parent.$eval(ctrl.searchExpr)($scope.vtSearchText).then(function (rs) {
                        ctrl.pages = rs;
                    });
                }else if(!newVal){
                    //When newVal is empty reset properties
                    ctrl.pages = [];
                    $scope.vtSelectedItem = '';
                }else{
                    isSelected = false;
                }
            });
        }])
})();