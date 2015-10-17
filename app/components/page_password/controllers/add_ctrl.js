/**
 * Created by vinhhoang on 16/10/2015.
 */
(function () {
    angular
        .module('PasswordManager.page')
        .controller('addController', ['$scope', 'Page', addController]);

    function addController($scope, Page) {
        //Local variable
        var ctrl = this,
            pageService = new Page();

        //GLobal variable
        ctrl.newPage = {};

        //Global methods
        ctrl.addPage = function (newPage) {
            pageService.add(newPage).then(function (addedPage) {
                alert('This "' + addedPage.name + '" page/app have bean added');
                ctrl.newPage = {};
            });
        }
    }

})();