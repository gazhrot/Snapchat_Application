angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })

  .state('tabsController.cameraTabDefaultPage', {
    url: '/page14',
    views: {
      'tab6': {
        templateUrl: 'templates/cameraTabDefaultPage.html'
      }
    }
  })

  .state('tabsController.cartTabDefaultPage', {
    url: '/snap',
    views: {
      'tab7': {
        templateUrl: 'templates/cartTabDefaultPage.html'
      }
    }
  })

  .state('tabsController.snap-details', {
    url: '/snap/:snapId',
    views: {
      'tab7': {
        templateUrl: 'templates/snap-details.html'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    abstract:true,
    templateUrl: 'templates/tabsController.html'
  });

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/login');

});