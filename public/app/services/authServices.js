angular.module('authServices', [])
	.factory('Auth',function ($http,AuthToken) {
		var authFactory  = {};

		//send data to back end
		authFactory.login = function (loginData) {
			return $http.post('/api/authenticate', loginData).then(function (data) {
				//console.log(data.data.token);
				AuthToken.setAuthToken(data.data.token);
				return data;
			});
		};

		/*----------------
		* Test the user who login will get a auth token or not
		------------------*/
		authFactory.loggedIn = function () {
			if(AuthToken.getAuthToken()){
				return true;
			}else{
				return false;
			}
		}

		return authFactory;
	})

.factory('AuthToken', function ($window) {
	var authTokenFactory = {};


	//AuthToken.setAuthToken(token)
	//set the token for authentication
	authTokenFactory.setAuthToken = function (authtoken) {
		$window.localStorage.setItem('token', authtoken);
	};

	authTokenFactory.getAuthToken = function () {
		return $window.localStorage.getItem('token');
	}

	return authTokenFactory;
});