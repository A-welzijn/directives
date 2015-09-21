'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.factory('aWelzijnBroadcastService', ['$rootScope', function ($rootScope) {
    function _send(message, data) {
      $rootScope.$broadcast(message, data);
    }

    return {
      send: _send
    };
  }]);
})();
