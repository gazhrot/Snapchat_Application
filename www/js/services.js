angular.module('app.services', [])

.factory('Snap', function($http){

	var snaps = snaps || '';

	return {
		all: function() {
			console.log(snaps + ' snaps');
			return snaps;
		},
		get: function(snapId) {
			for (var i = 0; i < snaps.length; i++) {
				if (snaps[i].id_snap === snapId) {
					return snaps[i];
				}
			}
			return null;
		},
		populate: function(data) {
			$http.post("http://snapchat.samsung-campus.net/api.php?option=newsnap", data)
			.success(function(data, status) {
				snaps = JSON.parse(data.data);
				return snaps;
			});
		}
	};

});