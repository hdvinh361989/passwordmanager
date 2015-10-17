/**
 * Created by vinhhoang on 16/10/2015.
 */

/*
 * I use localStorage to simulate database, so some behavior is not real.
 * Example: I must load from database for all CRUD operation
 * */
(function () {
    angular
        .module('PasswordManager.page')
        .factory('Page', ['$q', 'localStorageService', 'filterFilter', '$log',
            function ($q, localStorageService, filterFilter, $log) {

                //Constructor
                function Page() {
                }

                Page.table = 'Page';

                //Add new page
                Page.prototype.add = function (newPage) {
                    var deferred = $q.defer(),
                        pages = loadFromDatabase();
                    newPage.id = generateID();
                    newPage.updated = Number(new Date());
                    pages.push(newPage);
                    saveToDataBase(pages);
                    deferred.resolve(newPage);
                    return deferred.promise;
                };

                //Update specific page
                Page.prototype.update = function (updatedPage) {
                    var deferred = $q.defer(),
                        pages = loadFromDatabase();
                    var selectedPage = filterFilter(pages, {id: updatedPage.id});
                    pages[pages.indexOf(selectedPage[0])] = updatedPage;
                    saveToDataBase(pages);
                    deferred.resolve(updatedPage);
                    return deferred.promise;
                };

                //Remove specific page
                Page.prototype.remove = function (removedPage) {
                    var deferred = $q.defer(),
                        pages = loadFromDatabase();
                    var selectedPage = filterFilter(pages, {id: removedPage.id});
                    var index = pages.indexOf(selectedPage[0]);
                    pages.splice(index, 1);
                    saveToDataBase(pages);
                    deferred.resolve(pages);
                    return deferred.promise;
                };

                //Load all page and return a promise with results loaded
                Page.prototype.loadAll = function () {
                    var deferred = $q.defer(),
                        rs = loadFromDatabase();
                    deferred.resolve(rs);
                    return deferred.promise;
                };

                //Load all with specific field
                Page.prototype.load = function (fields) {
                    var deferred = $q.defer(),
                        pages = loadFromDatabase(),
                        rs = pages.map(function (v) {
                            var page = {};
                            fields.forEach(function (field) {
                                page[field] = v[field];
                            });
                            return page;
                        });
                    deferred.resolve(rs);
                    return deferred.promise;
                };

                //Find by condition
                Page.prototype.find = function (condition) {
                    var deferred = $q.defer(),
                        pages = loadFromDatabase(),
                        rs = filterFilter(pages, condition[0])
                            .map(function (v) {
                                var page = {},
                                    fields = condition[1];
                                if (fields && fields.length > 0) {
                                    fields.forEach(function (field) {
                                        page[field] = v[field];
                                    });
                                } else {
                                    page = v;
                                }
                                return page;
                            });
                    deferred.resolve(rs);
                    return deferred.promise;
                };

                //Generate ID
                function generateID() {
                    return Math
                        .floor((1 + Math.random()) * new Date())
                        .toString(16);
                }

                //Save to database
                function saveToDataBase(projects) {
                    return localStorageService.set(Page.table, projects);
                }

                //Load database
                function loadFromDatabase() {
                    var rs = localStorageService.get(Page.table);

                    //If database empty, create some mock data
                    if (rs && rs.length > 0) {
                        return rs;
                    } else {
                        var pages = [
                            {
                                id: generateID(),
                                category: 'google',
                                name: 'google',
                                username: 'vinh',
                                password: '123',
                                updated: Number(new Date())
                            },
                            {
                                id: generateID(),
                                category: 'google',
                                name: 'google-map',
                                username: 'vinh-map',
                                password: '123-map',
                                updated: Number(new Date())
                            },
                            {
                                id: generateID(),
                                category: 'yahoo',
                                name: 'yahoo',
                                username: 'vinh-yahoo',
                                password: '123-yahoo',
                                updated: Number(new Date())
                            }
                        ];
                        saveToDataBase(pages);
                        return pages;
                    }
                }

                return Page;

            }])
})();