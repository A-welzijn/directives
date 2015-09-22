'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnRichTextbox', ['$state', function ($state) {
    return {
      restrict: 'E',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        scope.ck = CKEDITOR.replace(element[0],
          {
            toolbarGroups: [
              { name: 'basicstyles' }
            ],
            disableNativeSpellChecker: false,
            removePlugins: 'liststyle,tabletools,scayt,menubutton,contextmenu,elementspath',
            browserContextMenuOnCtrl: true
          });

        if (!ngModel) return;

        scope.ck.on('pasteState', function () {
          scope.$apply(function () {
            ngModel.$setViewValue(scope.ck.getData());
          });
        });

        ngModel.$render = function (value) {
          scope.ck.setData(ngModel.$viewValue);
        };
      }
    }
  }]);
})();
