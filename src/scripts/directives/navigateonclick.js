'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnNavigateOnClick', ['$state', function ($state) {
    return {
      restrict: 'A',
      scope: {
        state: '@',
        calculatedState: '=',
        params: '='
      },
      link: function (scope, element, attrs) {
        if (scope.calculatedState) {
          scope.state = scope.calculatedState;
        }
        function navigate() {
          $state.go(scope.state, scope.params);
        }

        element.on('click', navigate);
      }
    }
  }]);
})();
