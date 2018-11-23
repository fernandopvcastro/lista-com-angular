angular.module("testeWooza")

.factory('Scopes', function($rootScope){
    var mem = {};

    return {
        store: function(key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function(key) {
            return mem[key];
        }
    }
})

.controller("indexController",function($scope, $http, Scopes){
	$scope.titulo = "Plataformas";

	$http.get("https://private-59658d-celulardireto2017.apiary-mock.com/plataformas")
	.then(function(response) {
		// console.log(response);
		$scope.plataformas = response.data.plataformas;
	});

	Scopes.store('indexController', $scope);

	$scope.getInfosPlataforma = function(plataforma){
		$scope.plataforma = plataforma;
	}
})

.controller("planoController",function($scope, $http, Scopes){
	$scope.titulo = "Planos";

	$scope.sku = Scopes.get('indexController').plataforma.sku;

	$http.get("http://private-59658d-celulardireto2017.apiary-mock.com/planos/" + $scope.sku)
	.then(function(response) {
		// console.log(response);
		$scope.planos = response.data.planos;
	});

	Scopes.store('planoController', $scope);

	$scope.getInfosPlano = function(plano){
		$scope.plano = plano;
	};
})

.controller("formularioController",function($scope, Scopes){
	$scope.titulo = "Formulário";

	$scope.plataforma = Scopes.get('indexController').plataforma;

	$scope.plano = Scopes.get('planoController').plano;

	Scopes.store('formularioController', $scope);

	angular.element(document).ready(function () {
		$('.nascimento').mask('99/99/9999');
		$('.cpf').mask('999.999.999-99');
		$('.telefone').mask('(99) 99999-9999');

		$('#form').validate({
			rules : {
	            nome: {
	                required:true,
	                minlength:3
	            },
	            email: {
	                required:true
	            },
	            nascimento: {
	                required:true
	            },
	            cpf: {
	                required:true
	            },
	            telefone: {
	                required:true
	            }
	       	},
			messages: {
	            nome: {
	                required: ""
	            },
	            email: {
	                required: "",
	                email: ""
	            },
	            nascimento: {
	                required: ""
	            },
	            cpf: {
	                required: ""
	            },
	            telefone: {
	                required: ""
	            }
	        },
			submitHandler: function(form) {
				console.log("------------- Formulário enviado ------------");

				console.log("Nome da Plataforma: ", $scope.plataforma.nome);
				console.log("Sku: ", $scope.plataforma.sku);
				console.log("Descrição: ", $scope.plataforma.descricao);

				console.log("Plano: ", $scope.plano.franquia);
				console.log("Valor do Plano: ", $scope.plano.valor);
				if($scope.plano.aparelho){
					console.log("Aparelho: ", $scope.plano.aparelho.nome);
					console.log("Valor do Aparelho: ", $scope.plano.aparelho.valor);
					console.log("Número de Parcelas: ", $scope.plano.aparelho.numeroParcelas);
					if($scope.plano.aparelho.valorParcela){
						console.log("Valor das Parcelas: ", $scope.plano.aparelho.valorParcela);
					}
				}

				console.log("------------- Dados da pessoa ------------");
				console.log("Nome: ", $('.nome').val());
				console.log("E-mail: ", $('.email').val());
				console.log("Data Nascimento: ", $('.nascimento').val());
				console.log("CPF: ", $('.cpf').val());
				console.log("Telefone: ", $('.telefone').val());

				$('#formContato input[type="text"], #formContato input[type="email"]').val('');
			}
		});
    });
});