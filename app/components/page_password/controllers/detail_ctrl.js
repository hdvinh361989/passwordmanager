/**
 * Created by vinhhoang on 16/10/2015.
 */
(function () {
    angular
        .module('PasswordManager.page')
        .controller('detailController', ['$scope', 'initData', detailController]);

    function detailController($scope, initData) {
        //Local variable
        var ctrl = this;

        //Global variable
        ctrl.selectedPage = {};
        ctrl.isShowPlaintext = false;

        //Global variable
        //Toggle show/hide plain text
        ctrl.togglePlainText = function () {
            ctrl.isShowPlaintext = !ctrl.isShowPlaintext;
        };
        //Fallback for browser which do not have flash
        ctrl.fallback = function (copy) {
            window.prompt('Press cmd+c to copy the text below.', copy);
        };


        init();
        function init() {
            ctrl.selectedPage = initData[0];
        }
    }

})();