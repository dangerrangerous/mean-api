var mainApplicationModuleName = 'Choons-Rebuild';

var mainApplicationModule = angular.module(mainApplicationModuleName,
['ngResource','ngRoute', 'users', 'example', 'articles', 'chat']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

// Facebook oAuth fix in case using FB Strat
if (window.location.hash === '#_=_#') window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
