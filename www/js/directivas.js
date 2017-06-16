var app = angular.module('starter');

app.directive('hourOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput.length > 4){
                      transformedInput = transformedInput.substring(0, 4);
                    }

                    if (transformedInput.length == 3){
                      transformedInput = transformedInput[0] + ":" + transformedInput.substring(1, 3)
                    }
                    else if(transformedInput.length == 4){
                      transformedInput = transformedInput.substring(0, 2) + ":" + transformedInput.substring(2, 4)
                    }


                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


app.directive('phoneOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput.length > 9){
                      transformedInput = transformedInput.substring(0,9);
                    }

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
