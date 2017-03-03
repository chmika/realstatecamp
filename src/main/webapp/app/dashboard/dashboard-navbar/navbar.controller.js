(function() {
    'use strict';

    angular
        .module('assessoriaTorrellesApp')
        .controller('NavbarController', NavbarController);


    //Se ha importado $scope, y principal - Arnau
    NavbarController.$inject = ['$scope', '$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', '$translate'];

    function NavbarController ($scope, $state, Auth, Principal, ProfileService, LoginService, $translate) {
        var vm = this;
        var authorities = "";

        //Account things - Arnau
        vm.account = null;

        vm.isAuthenticated = null;
        vm.login = LoginService.open;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        //Account things - Arnau
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                if(account.authorities[1] == "ROLE_ADMIN") {
                    vm.nameAuthorities = "global.menu.account.roleAdmin";
                }else {
                    vm.nameAuthorities = "global.menu.account.roleUser";
                }
            });
        }

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }


        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }

    }
})();