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
;'use strict';
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
        ngClick: '&'
      },
      template: '<a class="btn icon-btn btn-{{type}}"><i class="fa {{icon}}"></i><span ng-transclude/></a>',
      link: function (scope, element, attrs) { }
    };
  }]);
})();
;'use strict';
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
;'use strict';
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
;'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnTable', [function () {
    return {
      restrict: 'E',
      priority: 1500.1,
      replace: true,
      compile: function compile(tElement, tAttrs) {
        tAttrs._originalTemplate = $(tElement).clone();
      }
    }
  }]);
  module.directive('aWelzijnTable', ['$injector', '$state', function ($injector, $state) {
    return {
      restrict: 'E',
      replace: true,
      priority: 1500,
      transclude: true,
      scope: {
        headers: "=",               // headers voor tink-interactive-table
        actions: "=",               // actions voor tink-interactive-table
        serviceName: "@",           // service naam voor ophalen van de data
        serviceFunction: "@",       // functienaam van de service die aangeroepen moet worden
        serviceParams: "=",         // extra parameters die meegegeven worden aan de serviceFunction
        overzichtParentId: "=",
        actionRefresh: "=",         // referentie naar actie om een refresh van data te triggeren; actie wordt ingevuld door directive en opgeroepen door externe controller
        actionGetSelected: "=",     // referentie naar actie om geselecteerde rijen op te halen; ; actie wordt ingevuld door directive en opgeroepen door externe controller
        actionRowClicked: "&",      // referentie naar actie van controller om een row-click-event op te vangen; als er niets is meegegeven wordt er default naar het detail van het object gegaan (zie "detailState" param); lege functie meegegeven als er geen actie nodig is
        detailState: "@",           // state-naam om het detail van een geselecteerde rij te bezien/behandelen
        detailId: "@",              // property-naam die de id van het rij-object bepaalt
        detailParams: "=",	        // parameters die meegegeven worden bij navigatie naar object detail	
        loadDataOnInit: "=",        // als 'false' laad geen data bij initialisatie, als niets meegegeven is wordt data meteen geladen
        actionOnSelect: "&"
      },
      templateUrl: 'templates/overzichtlijst.html',
      compile: function (telement, attrs) {

        var tdElements = attrs._originalTemplate.find('td');
        telement.find('.clickableTableRow').append(tdElements);
        var filterbar = attrs._originalTemplate.find('.filterBar');
        telement.find('.filterDiv').append(filterbar);

        return {
          post: function postlink(scope, element, attrs, ctrl, trans) {

            scope.$on('updateLijst', function (event, data) {
              init();
            });

            scope.getService = function () {
              scope.service = $injector.get(scope.serviceName);
            };

            scope.actionRefresh = function () {
              scope.updateResultaten();
            };

            //bepaal alle geselecteerde data items
            scope.actionGetSelected = function () {
              var selected = _(scope.resultaten).filter({ "checked": true }).value();
              return selected;
            };

            scope.updateResultaten = function () {
              scope.loading = true;
              scope.getService();
              if (scope.serviceFunction) {
                scope.service[scope.serviceFunction](scope.pagingInfo, scope.serviceParams).then(function (response) {
                  scope.resultaten = response.page.lijst;
                  scope.totaalAantal = response.page.totaalAantal;
                }).finally(function () {
                  scope.loading = false;
                })
              }
            };

            scope.regelPaginatie = function (page, next) {
              if (page.type === 'perPage') {
                scope.pagingInfo.huidigePagina = 1;
                scope.pagingInfo.aantalPerPagina = page.value;
              }
              else {
                scope.pagingInfo.huidigePagina = page.value;
              }
              scope.updateResultaten();
              next();
            };

            scope.rowClick = function (element) {
              if (attrs["actionRowClicked"]) {
                scope.actionRowClicked({ $element: element });
              }
              else {
                gaNaarDetail(element);
              }
            };

            function gaNaarDetail(element) {
              if (scope.detailState) {
                var link = scope.detailState;
                if (scope.detailId) {
                  var detailId = eval('element' + '.' + scope.detailId);
                }
                else {
                  var detailId = element.id;
                }
                if (!scope.detailParams) {
                  $state.go(link, { id: detailId });
                }
                else {
                  var linkObject = { id: detailId };
                  for (var i in scope.detailParams) {
                    linkObject[i] = element[i];
                  };
                  $state.go(link, linkObject);
                }
              }
            };

            scope.boxChecked = function ($data, $checked) {
              if (attrs.actionOnSelect) {
                scope.actionOnSelect()($data, $checked);
              }
            }

            scope.pagingInfo = {
              huidigePagina: 1,
              aantalPerPagina: 10,
              sortering: "",
              omgekeerd: true,
            };

            init();
            function init() {
              scope.loading = true;
              scope.resultaten = null;
              scope.totaalAantal = 0;
              if (!scope.serviceParams) scope.serviceParams = { zoekterm: "" };
              if (scope.loadDataOnInit != false) {
                scope.updateResultaten();
              }
              if (scope.loadDataOnInit == false) {
                scope.loading = false;
              }
            };
          }
        }
      }
    }
  }]);
})();
;'use strict';
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
;'use strict';
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
;'use strict';
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
;'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnToggleCallout', ['$state', function ($state) {
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
;angular.module('awelzijn.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/overzichtlijst.html',
    "<div> <div class=filterDiv></div> <div class=position-relative> <tink-interactive-table tink-headers=headers tink-data=resultaten tink-actions=actions tink-loading=loading tink-empty-message=\"Geen resultaten gevonden.\" tink-checked=boxChecked($data,$checked)> <table tink-sort-table=tinkData tink-callback=$parent.updateResultaten() tink-asc=$parent.pagingInfo.omgekeerd tink-init-sort-order=asc tink-sort-field=$parent.pagingInfo.sortering> <thead> <tr> <th tink-sort-header={{header.field}} ng-repeat=\"header in tinkHeaders\">{{header.alias}}</th> </tr> </thead> <tbody> <tr class=clickableTableRow ng-class=\"{'row-selected': item.checked}\" ng-repeat=\"item in $parent.resultaten\" ng-click=$parent.$parent.rowClick(item)></tr> </tbody> </table> <tink-pagination ng-show=\"$parent.totaalAantal > 10\" tink-current-page=$parent.pagingInfo.huidigePagina tink-change=$parent.updateResultaten() tink-total-items=$parent.totaalAantal tink-items-per-page=$parent.pagingInfo.aantalPerPagina tink-items-per-page-values=[10,20,30]></tink-pagination> </tink-interactive-table> </div> </div>"
  );


  $templateCache.put('templates/togglecallout.html',
    "<div class=\"toggle-callout col-lg-12\"> <a ng-click=\"open = !open\" href=\"\">{{label}} <i class=fa ng-class=\"{\\'fa-caret-up\\':open, \\'fa-caret-down\\':!open}\"></i></a> <div ng-show=open class=\"callout callout-inline\"> <div ng-transclude> </div> </div>"
  );

}]);
