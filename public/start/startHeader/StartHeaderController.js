(function() {
    "use strict";

    angular.module('mafia').controller('StartHeaderController', controller);

    controller.$inject = ['$window'];

    function controller($window) {

        var vm = this;

        vm.loginVk = loginVk;

        function loginVk () {
            var url = '/auth/vkontakte',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2;
            $window.open(url, 'vkontakte_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
        }
    }
})();
