angular.module('matterApp', [])
.service('$matter', ['$window', '$log', '$q', function ($window, $log, $q) {
  var matter = new $window.Matter('cloudbrain', {localServer:false});
  return matter;
}])
.controller('MainCtrl', ['$scope', '$matter', function($scope, $matter){
    console.log('Matter service:', $matter);
    $scope.data = {};
    $scope.login = function() {
      $matter.login({username: $scope.data.username, password: $scope.data.password}).then(function(loginRes){
        console.log('Login response:', loginRes);
        $scope.currentUser = loginRes.account;
        $scope.$apply();
      });
    }
}]);
