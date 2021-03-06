'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.directives');
  } catch (e) {
    module = angular.module('awelzijn.directives', []);
  }
  module.directive('aWelzijnAutocomplete', ['$compile',function ($compile) {
    return {
      restrict: 'EA',
      scope: {
        ngModel: '=?',
        aWelzijnHighlightLength:'=?',
        aWelzijnArray:'=?',
        aWelzijnFilterOn:'@'
      },
      transclude:true,
      templateUrl: 'templates/autocomplete.html',
      controller:function($scope){
        var ctrl = this;
        ctrl.inputValue = "";

        $scope.$watch('aWelzijnArray',function(value){
          ctrl.visibleData = value;
        })
        ctrl.inputChange = function(){

        }

        ctrl.keyUp = function(event){return false;

        }

        ctrl.keyDown = function(event){
          var keyCode = event.which;
          

        }

        ctrl.filterValues = function(data){
          data = eval('data.'+$scope.aWelzijnFilterOn);
          if(data && ctrl.inputValue !== '' && ctrl.inputValue && ctrl.inputValue.length >= $scope.aWelzijnHighlightLength){
            try{
              var inText = data.toLowerCase().indexOf(ctrl.inputValue.toLowerCase());
              return inText > -1;
            }catch(e) {
              return false;
            }
          }
          return false;
        }

        ctrl.setModelData = function($event,data){
          $scope.ngModel = data;
          ctrl.inputValue = eval('data.'+$scope.aWelzijnFilterOn);
        };

        //to see if the value is numeric
        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }


        function init(){
          if(!isNumeric(parseFloat($scope.aWelzijnHighlightLength))){
            $scope.aWelzijnHighlightLength = 3;
          }
        }

        init();
      },
      controllerAs:'ctrl',
      link: function(scope,element,atrr,ctrl,transclude) {

      var input = element.find('input');
      input.focus(function(){
        element.find('.list-autocomplete').addClass('show');
      })
      input.blur(function(){
        element.find('.list-autocomplete').removeClass('show');
      })

      input.keydown(function(evt) {
        return ctrl.keyDown(evt);
      });

      transclude(function(transcludeEl) {
        var divTransclude = element.find('.list-result-autocomplete');
        divTransclude.append(transcludeEl);
        divTransclude.attr('ng-repeat',"aWelzijnArray in ctrl.visibleData | filter:ctrl.filterValues track by $index");
        var html = divTransclude.html().replace('| highlight','| highlight:ctrl.inputValue');
        divTransclude.html(html);
        $compile(divTransclude)(scope);
      });

      }
    };
  }]).filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<mark>$1</mark>')

      return $sce.trustAsHtml(text)
    }
  });
})();
;'use strict';
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
      template: '<a class="btn icon-btn btn-{{type}}"><i ng-if="icon" class="fa {{icon}}"></i><span ng-transclude/></a>',
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
    module.directive('aWelzijnKlantFiche', ['$http', 'AppConfig', function ($http, appConfig) {
        return {
            restrict: 'AE',
            replace: false,
            transclude: true,
            scope: {
                sleutel: '=',
                voornaam: '=',
                naam: '='
            },
            controllerAs: 'ctrl',
            templateUrl: 'templates/klantfiche.html',
            bindToController: true,
            controller: function ($scope) {
                var ctrl = this;
				ctrl.loading = false;

				ctrl.formatName = function () { return ctrl.naam + ', ' + ctrl.voornaam; }

				ctrl.popoverOpened = function () {
					ctrl.loading = true;
					var httpConfig = { method: 'GET', url: appConfig.apiRoot + "klant/dossier?sleutel=" + ctrl.sleutel };
					$http(httpConfig).then(function (response) {
						ctrl.dossier = response.data.klantDossier;
					}, function (data) { }).finally(function () {
						ctrl.loading = false;
					});
				};
            }
        };
    }]);
})();
;; 'use strict';
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
})();;'use strict';
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
        serviceParams: "=?",         // extra parameters die meegegeven worden aan de serviceFunction
        actionRefresh: "=?",         // referentie naar actie om een refresh van data te triggeren; actie wordt ingevuld door directive en opgeroepen door externe controller
        actionGetSelected: "=?",     // referentie naar actie om geselecteerde rijen op te halen; ; actie wordt ingevuld door directive en opgeroepen door externe controller
        actionRowClicked: "&",      // referentie naar actie van controller om een row-click-event op te vangen; als er niets is meegegeven wordt er default naar het detail van het object gegaan (zie "detailState" param); lege functie meegegeven als er geen actie nodig is
        detailState: "@",           // state-naam om het detail van een geselecteerde rij te bezien/behandelen
        detailId: "@",              // property-naam die de id van het rij-object bepaalt
        detailParams: "=?",	        // parameters die meegegeven worden bij navigatie naar object detail	
        loadDataOnInit: "=?",        // als 'false' laad geen data bij initialisatie; als niets meegegeven is, wordt data meteen geladen
        actionOnSelect: "&",
		defaultSortField: "@",		// default veldnaam waarop gesorteerd wordt
		defaultSortInverse: "@"		// default instelling of er omgekeerd gesorteerd moet worden; als er niets wordt meegegeven, wordt dit op true gezet
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
              scope.pagingInfo.huidigePagina = 1,
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
              // initialize scope params
              scope.loading = true;
              scope.resultaten = null;
              scope.totaalAantal = 0;
              if (!scope.serviceParams) scope.serviceParams = { zoekterm: "" };
              if (scope.loadDataOnInit == null || scope.loadDataOnInit == undefined) scope.loadDataOnInit = true;
			  
			  if(scope.defaultSortField) scope.pagingInfo.sortering = scope.defaultSortField;
			  
			  if(scope.defaultSortInverse == null || scope.defaultSortInverse == undefined) scope.defaultSortInverse = true;
			  scope.pagingInfo.omgekeerd = scope.defaultSortInverse;
              
              // initial actions
              if (scope.loadDataOnInit) scope.updateResultaten();
              if (!scope.loadDataOnInit) scope.loading = false;
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

  $templateCache.put('templates/autocomplete.html',
    "<div class=autocomplete> <input ng-keyup=ctrl.keyDown($event) ng-change=ctrl.inputChange() ng-model=ctrl.inputValue placeholder=\"\"> <ul class=list-autocomplete><li tabindex=0 class=list-result-autocomplete ng-mousedown=ctrl.setModelData($event,tinkArray)></li></ul> </div>"
  );


  $templateCache.put('templates/dossier.html',
    "<div> <div class=dossierRelatie ng-show=ctrl.loading> <div class=row> <div class=col-md-12> <h4>{{ctrl.naam}}, {{ctrl.voornaam}}</h4> </div> <div class=\"col-md-12 margin-top-sm\"> <span class=lidmaatschap> Laden... </span> </div> </div> <div class=row> <div class=col-md-12> <p class=dossierLabel>Adres</p> <p>Laden...</p> </div> <div class=col-md-6> <p class=dossierLabel>Geboortedatum</p> <p>Laden...</p> <p class=dossierLabel>Geboorteplaats</p> <p>Laden...</p> </div> <div class=col-md-6> <p class=dossierLabel>Telefoon</p> <p>Laden...</p> <p class=dossierLabel>E-mail</p> <p>Laden...</p> </div> </div> </div> <div class=dossierRelatie ng-show=!ctrl.loading> <div class=row> <div class=col-md-12> <h4>{{ctrl.naam}}, {{ctrl.voornaam}}</h4> </div> <div class=\"col-md-12 margin-top-sm\"> <span class=lidmaatschap> {{ctrl.dossier.relatie != null ? ctrl.dossier.relatie : ctrl.dossier.lidmaatschap}}\n" +
    "<i class=fa ng-class=\"{'fa-venus': ctrl.dossier.geslacht == 'v', 'fa-mars': ctrl.dossier.geslacht == 'm' }\"></i> </span>\n" +
    "<span style=\"font-size:.8em; color:grey; margin-left:.5em\">INSZ {{ctrl.dossier.inszNummer | insz}}</span> </div> </div> <div class=row> <div class=col-md-12> <p class=dossierLabel>Adres</p> <p>{{ctrl.dossier.adres | adres}}</p> </div> <div class=col-md-6> <p class=dossierLabel>Geboortedatum</p> <p>{{ctrl.dossier.geboorteDatum | datum}} ({{ctrl.dossier.geboorteDatum | leeftijd}}j.)</p> <p class=dossierLabel>Geboorteplaats</p> <p>{{ctrl.dossier.geboortePlaats | capitalize}}{{ctrl.dossier.geboorteLand.substring(0, 3).toUpperCase() | prepend:' (' | append:')'}}</p> </div> <div class=col-md-6> <p class=dossierLabel>Telefoon</p> <p>{{ctrl.dossier.telefoonnummer}}</p> <p class=dossierLabel>E-mail</p> <p>{{ctrl.dossier.emailadres}}</p> </div> </div> </div> </div>"
  );


  $templateCache.put('templates/klantfiche.html',
    "<span a-welzijn-hover-popover data-hover-popover-open=popoverOpened data-tink-popover-template=templates/dossier.html>{{ctrl.formatName()}}</span>"
  );


  $templateCache.put('templates/overzichtlijst.html',
    "<div> <div class=filterDiv></div> <div class=position-relative> <tink-interactive-table tink-headers=headers tink-data=resultaten tink-actions=actions tink-loading=loading tink-empty-message=\"Geen resultaten gevonden.\" tink-checked=boxChecked($data,$checked)> <div class=table-force-responsive> <table tink-sort-table=tinkData tink-callback=$parent.updateResultaten() tink-asc=$parent.pagingInfo.omgekeerd tink-init-sort-order=asc tink-sort-field=$parent.pagingInfo.sortering> <thead> <tr> <th tink-sort-header={{header.field}} tink-sort-active={{header.sort}} ng-repeat=\"header in tinkHeaders\">{{header.alias}}</th> </tr> </thead> <tbody> <tr class=clickableTableRow ng-class=\"{'row-selected': item.checked}\" ng-repeat=\"item in $parent.resultaten\" ng-click=$parent.$parent.rowClick(item)></tr> </tbody> </table> </div> <tink-pagination ng-show=\"$parent.totaalAantal > 10\" tink-current-page=$parent.pagingInfo.huidigePagina tink-change=$parent.updateResultaten() tink-total-items=$parent.totaalAantal tink-items-per-page=$parent.pagingInfo.aantalPerPagina tink-items-per-page-values=[10,20,30]></tink-pagination> </tink-interactive-table> </div> </div>"
  );


  $templateCache.put('templates/togglecallout.html',
    "<div class=\"toggle-callout col-lg-12\"> <a ng-click=\"open = !open\" href=\"\">{{label}} <i class=fa ng-class=\"{'fa-caret-up':open, 'fa-caret-down':!open}\"></i></a> <div ng-show=open class=\"callout callout-inline\"> <div ng-transclude> </div> </div>"
  );

}]);
