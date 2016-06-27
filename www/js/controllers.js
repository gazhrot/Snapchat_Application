angular.module('app.controllers', ['ionic'])
  
.controller('signupCtrl', function($scope, $http, $state) {

	$scope.signup = function() {

		var data = {
			password: $scope.password,
			email: $scope.email
		}
		$http.post("http://104.197.159.176:3000/user/inscription", data).success(function(data, status) {
			console.log(data);
		})
	}

	$scope.ready = function() {
		$state.go('tabsController.login');
	}
})
   
.controller('loginCtrl', function($scope, $http, $state) {

	$scope.login = function() {

		var data = {
			password: $scope.password,
			email: $scope.email
		}
		$http.post("http://104.197.159.176:3000/user/connection", data).success(function(data, status) {
			$scope.dataApi = JSON.parse(data.data);
			$scope.tokenApi = data.token;
			$scope.currentUser = {};
			$scope.currentUser.id = $scope.dataApi.id;
			$scope.currentUser.token = $scope.tokenApi;
			$scope.currentUser.email = $scope.email;


			if (!localStorage.getItem('snapchat'))
				localStorage.setItem('snapchat', JSON.stringify([]));
			else
				localStorage.setItem('snapchat', JSON.stringify($scope.currentUser));				

			if (data.error == true)
				$scope.ready();
		})
	}

	$scope.ready = function() {
		$state.go('tabsController.cartTabDefaultPage');
	}

})
      
.controller('photoCtrl', function($scope, $state, $cordovaCamera, $http, $ionicPopup, $ionicLoading) {

	$scope.Current = JSON.parse(localStorage.getItem('snapchat'));

	// init variables
	$scope.data = {};
	$scope.obj;
	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
	var url;
	
	// on DeviceReady check if already logged in (in our case CODE saved)
	ionic.Platform.ready(function() {
		//console.log("ready get camera types");
		if (!navigator.camera)
			{
			// error handling
			return;
			}
		//pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
		pictureSource=navigator.camera.PictureSourceType.CAMERA;
		destinationType=navigator.camera.DestinationType.FILE_URI;
		});
	
	// take picture
	$scope.takePicture = function() {
		//console.log("got camera button click");
		var options =   {
			quality: 50,
			destinationType: destinationType,
			sourceType: pictureSource,
			encodingType: 0
		};
		if (!navigator.camera)
		{
			// error handling
			return;
		}
		navigator.camera.getPicture(
			function (imageURI) {
				//console.log("got camera success ", imageURI);
				$scope.mypicture = imageURI;
			},
			function (err) {
				//console.log("got camera error ", err);
				// error handling camera plugin
			},
			options);
	};

	$scope.update = function() {
		$ionicLoading.show();
		if (!$scope.mypicture)
		{
			return;
		}
		var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		var params = {};
		params.email = $scope.Current.email;
		params.u2 = $scope.contact;
		params.temps = $scope.time;
		params.token = $scope.Current.token;
		options.params = params;
		
		var ft = new FileTransfer();
		ft.upload($scope.mypicture, encodeURI('http://104.197.159.176:3000/snap/sendSnap'), uploadSuccess, uploadError, options);
		function uploadSuccess(r) {
			$scope.showAlert();
			$ionicLoading.hide();
		}
		function uploadError(error) {
			console.log(error);
		}


		};
		
		$scope.showAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Snapchat',
				template: 'Votre Snap a ete envoyer avec Succes.'
			});
		}; 
})
   
.controller('snapDetailCtrl', function($scope, $stateParams, Snap, $http) {
	
	$scope.Current = JSON.parse(localStorage.getItem('snapchat'));
	$scope.snap = Snap.get($stateParams.snapId);

	var data = {
			email: $scope.Current.email,
			token: $scope.Current.token,
			id: $scope.snap.id_snap
		};

	$http.post("http://104.197.159.176:3000/snap/viewsnap", data).success(function(data, status) {
			console.log(data);
	});

})

.controller('snapCtrl', function($scope, $state, $http, Snap, $stateParams) {


	$scope.Current = JSON.parse(localStorage.getItem('snapchat'));
	
	var data = {
		email: $scope.Current.email,
		token: $scope.Current.token
	}


	$scope.getAllUser = function() {

		var data = {
			email: $scope.Current.email,
			token: $scope.Current.token
		}


		$http.post("http://104.197.159.176:3000/user/alluser", data).success(function(data, status) {
			console.log(data);
		})
	}

	$scope.getSnap = function() {

		$http.post("http://104.197.159.176:3000/snap/getSnap", data).success(function(data, status) {
			$scope.snaps = JSON.parse(data.data)
			console.log(data);
		});
	}
})
    