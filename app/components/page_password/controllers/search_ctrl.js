(function () {
    /**
     * Created by vinhhoang on 16/10/2015.
     */
    angular
        .module('PasswordManager.page', ['ui.router'])
        .controller('searchController', ['$scope', 'Page', searchController]);

    function searchController($scope, Page) {
        //Local variable
        var ctrl = this,
            pageService;

        //Global variable
        ctrl.txtSearch = '';
        ctrl.slbCate = '';
        ctrl.cates = [];
        ctrl.pages = [];
        ctrl.currentEditing = -1;
        ctrl.autoSelectedItem = '';
        ctrl.selectedPage = {};

        //Global methods
        //Show/hide txtPageName input of a item in list
        ctrl.toggleEdit = function (index) {
            ctrl.currentEditing = index;
        };
        //Save updated item when blur input
        ctrl.update = function (page) {
            pageService.update(page).then(function (rs) {
                ctrl.currentEditing = -1;
                alert('Update success!');
            })
        };
        //Save updated item when enter is pressed
        ctrl.updateByEnter = function (page, e) {
            if (e.keyCode === 13) {
                e.target.blur();
            }
        };
        //Remove page from database
        ctrl.remove = function (page) {
            if (confirm('Are you sure?'))
                pageService.remove(page).then(function (rs) {
                    ctrl.pages = rs;
                    alert('Remove success!');
                });
        };
        //Autocomplete search function
        ctrl.searchAutoComplete = function (searchQuery) {
            return findByNameAndCate(searchQuery).then(function (rs) {
                return rs;
            });
        };
        //When selected item change, update results
        ctrl.updateResult = function () {

        };
        //Select page from list on the left
        ctrl.selectPage = function (page) {
          ctrl.selectedPage = page;
        };


        //Watcher
        $scope.$watchGroup(['searchCtrl.autoSelectedItem', 'searchCtrl.slbCate'], function (newVal, oldVal) {
            if (newVal && ((newVal[0] !== oldVal[0]) || (newVal[1] !== oldVal[1])))
                findByNameAndCate(ctrl.autoSelectedItem.name).then(function (rs) {
                    ctrl.pages = rs;
                });
        });


        //Initial
        init();
        function init() {
            pageService = new Page();
            pageService.load(['category']).then(function (rs) {
                ctrl.cates = rs;
                findByNameAndCate(ctrl.autoSelectedItem).then(function (rs) {
                    ctrl.pages = rs;
                });
                console.log(ctrl.pages);
            });
        }

        //Find page by page's name and category
        function findByNameAndCate(searchQuery) {
            return pageService.find([
                {
                    name: searchQuery,
                    category: ctrl.slbCate ? ctrl.slbCate.category : ''
                }
            ]).then(function (rs) {
                return rs;
            })
        }
    }

})();