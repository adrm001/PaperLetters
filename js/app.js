var app = (function () {
    var $AM = [[0, 0], [49, -170], [100, 0], [150, -30], [125, -170], [75, -50], [80, -58], [10, -58]];
    var $primaryDark = window.getComputedStyle(document.getElementById('brand-dark7'), null).color;//'#B2DFDB';
    var $primaryLight = window.getComputedStyle(document.getElementById('brand-light1'), null).color;//'#0094B2';
    var $AMLogo;

    var app = angular.module('main', ['ngRoute']);
    //define routes
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'partials/about.html'
                }).
                when('/projects', {
                    templateUrl: 'partials/projects.html'
                }).
                when('/resume', {
                    templateUrl: 'partials/resume.html'
                }).
                when('/contact', {
                    templateUrl: 'partials/contact.html'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }
    ]);

    app.controller('NavCtl',['$scope',
        function ($scope) {
            $scope.tab = 'home';
            $scope.select = function(tab){
                $scope.tab = tab;
            }
        }
    ]);

    app.controller('ViewCtl',['$scope',
        function($scope){
            $scope.$on('$viewContentLoaded',function(){
                $AMLogo = app.addLogo('AMLogoDiv');
            })
    }]);

    app.addLogo = function (divID) {
        var svgDiv = SVG(divID);
        var points = AM.Math.Vec2d.Array2DToVec($AM);
        var orig = new AM.Math.Vec2d(20, 180);
        return new AM.PaperLetter(svgDiv, points, orig, 15, $primaryLight, $primaryDark);
    };

    return app;
})();