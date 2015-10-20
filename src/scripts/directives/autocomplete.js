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
