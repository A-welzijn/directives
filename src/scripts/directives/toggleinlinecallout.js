'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnNavigateOnClick', ['$state', function ($state) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      transclude: true,
      link: function ($scope, $element, $attrs) {
        $scope.label = $attrs.label;
        $scope.open = false;
      },
      templateUrl: 'templates/togglecallout.html'
    }
  }]);
})();
