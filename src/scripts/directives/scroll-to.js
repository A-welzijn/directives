'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnScrollTo', ['aWelzijnScrollService', function (aWelzijnScrollService) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        aWelzijnScrollTo: '@'
      },
      link: function (scope, element, attrs) {
        element.on('click', function () {
          aWelzijnScrollService.scrollTo(scope.aWelzijnScrollTo);
        });
      }
    };
  }]);
  module.factory('aWelzijnScrollService', ['$location', function ($location) {
    function _scrollTo(eID) {
      var i;
      var startY = currentYPosition();
      var stopY = elmYPosition(eID);
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
        scrollTo(0, stopY); return;
      }
      var speed = Math.round(distance / 75);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        for (i = startY; i < stopY; i += step) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
      }
      for (i = startY; i > stopY; i -= step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
      //haalt de laatste route uit de history collection
      $location.replace();
    }
    
    function currentYPosition() {
      if (window.pageYOffset) {
        return window.pageYOffset;
      }
      if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
      }
      if (document.body.scrollTop) {
        return document.body.scrollTop;
      }
      return 0;
    }

    function elmYPosition(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop - 270;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }

    return {
      scrollTo: _scrollTo
    };
  }]);
})();
