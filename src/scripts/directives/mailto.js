'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnMailTo', [function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div><a ng-show="emailAdres" href="mailto:{{emailAdres}}">{{emailAdres}}</a><span ng-show="!emailAdres">-</span></div>',
      scope: {
        emailAdres: "="
      },
			link: function (scope, element, attrs) { }
    }
  }]);
})();
