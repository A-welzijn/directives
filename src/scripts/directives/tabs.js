'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnNavTab', [function () {
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      transclude: true,
      link: function ($scope, $element, $attrs) {
        $scope.tabNaam = $attrs.aWelzijnNavTab;
        if (angular.isDefined($attrs.start)) {
          $scope.$parent.ctrl.tabview = $scope.tabNaam;
        }
      },
      template:
      '<li role="presentation" ng-class="{active: ctrl.tabview === tabNaam}"><a href="" ng-click="ctrl.tabview = tabNaam"><div ng-transclude></div></a></li>'
    }
  }]);
  module.directive('aWelzijnTabId', [function () {
    return {
      restrict: 'A',
      scope: true,
      link: function ($scope, $element, $attrs) {
        $scope.tabId = $attrs.aWelzijnTabId;
        $scope.$watch("$parent.ctrl.tabview", function (value) {
          if (value) {
            if (value === $scope.tabId) {
              $element[0].classList.remove("ng-hide");
            } else {
              $element[0].classList.add("ng-hide");
            }
          }
        });
      }
    }
  }]);
})();
