; 'use strict';
(function (module) {
    try {
        module = angular.module('awelzijn.directives');
    } catch (e) {
        module = angular.module('awelzijn.directives', []);
    }
    module.directive('loadingText', [function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div><span ng-show="loading"><i>Laden...</i></span><span ng-hide="loading" ng-transclude /></div>',
            scope: {
        loading: '='
    },
            link: function (scope, element, attrs) { }
        }
    }]);
})();