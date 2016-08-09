var movieApp = angular.module('movieApp',['ngMaterial']);
movieApp.controller('movieController', function($scope, $http, $mdDialog){

	var apiBaseUrl = 'http:api.themoviedb.org/3/';
	// base url for all images
	// after the / comes the width. e.g. imageBaseUrl + 'w300' + poster_path
	var imgBaseUrl = 'http://image.tmdb.org/t/p/'
	// the query string, including the api key
	var apiKey = 'api_key=fec8b5ab27b292a68294261bb21b04a5';
	var userPopular = 'popular';
	var userNowPlaying = 'now_playing';
	var userSearchOptions = 'popular';
	var userUpcoming = 'upcoming';

	var movieURL = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query=superman';
	$scope.imagePath = 'http://image.tmdb.org/t/p/w300/';
	
	$http({
		method: 'GET',
		url: movieURL
	}).then(
	function successFunction(movieData){
		console.log(movieData);
		$scope.movieArray = movieData.data.results;
	}, function failureFunction(movieData){
		console.log('whomp');
	});

	$scope.getNewMovieStuff = function(){
		var movieSearch = apiBaseUrl + 'search/movie?' + apiKey + '&query=' + $scope.userChoice;
		$http({
			method: 'GET',
			url: movieSearch
		}).then(
		function successSearch(searchData){
			$scope.movieArray = searchData.data.results;
		}, function failedSearch(searchData){
			console.log('whomp');
		});
	}
	$scope.showAlert = function(ev, movie) {
		console.log(movie);
	// Appending dialog to document.body to cover sidenav in docs app
	// Modal dialogs should fully cover application
	// to prevent interaction outside of dialog
	$mdDialog.show(
		$mdDialog.alert()
		.parent(angular.element(document.querySelector('#popupContainer')))
		.clickOutsideToClose(true)
		.title(movie.title)
		.textContent(movie.overview)
		.ariaLabel('Movie Description Popup')
		.ok('Got it!')
		.targetEvent(ev)
		);
	};
	// $scope.showAdvanced = function(ev) {
	// 	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	// 	$mdDialog.show({
	// 		controller: DialogController,
	// 		templateUrl: 'modal.html',
	// 		parent: angular.element(document.body),
	// 		targetEvent: ev,
	// 		clickOutsideToClose:true,
	// 		fullscreen: useFullScreen
	// 	}).then(function(answer){
	// 		$scope.status = 'You said the information was "' + answer + '".';
	// 	}, function(){
	// 		$scope.status = 'You cancelled the dialog.';
	// 	});
	// 	$scope.$watch(function() {
	// 		return $mdMedia('xs') || $mdMedia('sm');
	// 	}, function(wantsFullScreen) {
	// 		$scope.customFullscreen = (wantsFullScreen === true);
	// 	});
	// };
	// function DialogController($scope, $mdDialog) {
	// 	$scope.hide = function() {
	// 		$mdDialog.hide();
	// 	};
	// 	$scope.cancel = function() {
	// 		$mdDialog.cancel();
	// 	};
	// 	$scope.answer = function(answer) {
	// 		$mdDialog.hide(answer);
	// 	};
	// }
})