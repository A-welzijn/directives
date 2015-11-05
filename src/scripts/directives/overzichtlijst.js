'use strict';
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
