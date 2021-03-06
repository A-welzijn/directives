'use strict';
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
