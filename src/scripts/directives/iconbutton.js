'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnButton', [function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        icon: '@',
        type: '@',
        ngClick: '&',
        ngShow:'&'
      },
      template: '<a class="btn icon-btn btn-{{type}}" ng-show=""><i class="fa {{icon}}"></i><span ng-transclude/></a>',
      link: function (scope, element, attrs) { }
    };
  }]);
})();
