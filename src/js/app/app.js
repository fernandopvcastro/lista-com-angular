angular.module("testeWooza",['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when("/home",{
		templateUrl:"templates/home.html",
		controller:"indexController"
	})
	.when("/planos",{
		templateUrl:"templates/planos.html",
		controller:"planoController"
	})
	.when("/formulario",{
		templateUrl:"templates/formulario.html",
		controller:"formularioController"
	});

	$routeProvider.otherwise({redirectTo:"/home"});
})