angular.module('userControllers', ['userServices'])
	.controller('regCtrl', function ($http, $location, $timeout, User) {

		var app = this;

		this.regUser = function (regData) {
			app.loading = true;
			app.errorMsg = false;
			//console.log('form submitted');
			//console.log(this.regData);
			User.create(app.regData).then(function (data) {
					//console.log(data.data.success);
					//console.log(data.data.message);
					if (data.data.success) {
						app.loading = false;
						//Create successful message
						app.successMsg = data.data.message + '...Redirecting';
						//Redirect to home page
						$timeout(function () {
							$location.path('/');
						}, 2000);

					} else {
						//create error message
						app.loading = false;
						app.errorMsg = data.data.message;
					}
				});
		};
	});

//router.post('/users', function(req, res){
