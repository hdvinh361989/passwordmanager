/**
 * Created by vinhhoang on 17/10/2015.
 */
(function () {
    angular
        .module('vtAutoComplete', [])
        .directive('vtAutocomplete', function ($window) {
            return {
                restrict: 'E',
                controller: 'vtAutoCompleteCtrl',
                controllerAs: 'vtAutoCtrl',
                templateUrl: 'components/autocomplete/template/vtAutocomplete.tpl.html',
                scope: {
                    vtSearchText: '=',
                    vtSearchFunc: '&',
                    vtItemText: '=',
                    vtSelectedItem: '=',
                    vtSelectedItemChange: '&'
                },
                link: function (scope, element, attrs) {
                    var input = element.find('input');
                    var rsList = element.find('.list-group');

                    //Watch for window resize
                    var w = angular.element($window);
                    scope.getWindowDimensions = function () {
                        return {
                            'h': w.height(),
                            'w': w.width()
                        };
                    };
                    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                        updateWidth();
                    }, true);

                    w.bind('resize', function () {
                        scope.$apply();
                    });

                    // update rs list width when window resize
                    function updateWidth(){
                        rsList.css({
                            width: input.outerWidth()
                        });
                    }
                }
            }
        })
})();