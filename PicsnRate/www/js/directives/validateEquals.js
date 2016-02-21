angular.module('starter.directives', []).directive('validateEquals', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            function validateEqual(value) {
                console.log("neo Pwd " + value);
                var valid = (value === scope.$eval(attrs.validateEquals));
                ngModelCtrl.$setValidity('equal', valid);
                return valid ? value : undefined;
            }
            ngModelCtrl.$parsers.push(validateEqual);
            ngModelCtrl.$formatters.push(validateEqual);
            scope.$watch(attrs.validateEquals, function () {
                console.log("Pr pwd: " + scope.$eval(attrs.validateEquals))
                validateEqual(ngModelCtrl.$viewValue);
                ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
            })
        }
    };
});