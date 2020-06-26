(function (app) {
    'use strict';

    app.controller('ProdutoController', function ($scope, ProdutoService, CategoriaService) {
        //Controle para OrderBy e Filter
        $scope.decrescente = false;
        $scope.selectedColumn = 'id';

        //Controle de exibição da tabela/formulario
        $scope.showTable = true;

        //Seta a coluna para ser filtrada/ordenada
        $scope.setColumn = function (columnName) {
            $scope.selectedColumn = columnName;

            //determina o ordenação decrescente (false)
            $scope.decrescente = !$scope.decrescente;
        }

        //Retornar para o FILTER qual a coluna será utilizada na ordenação/filtro
        $scope.filter = function () {
            var filtro = {};

            filtro[$scope.selectedColumn] = $scope.textFilter;

            return filtro;
        }

        //Prepara a tela para um novo cadastro
        $scope.novo = function () {
            //Representar o produto atual
            $scope.produto = {
                nome: '',
                foto: '',
                descricao: '',
                preco: 0
            }

            $scope.showTable = false;
        }

        //Cancelar a inclusao/edicao
        $scope.cancelar = function () {
            $scope.showTable = true;
        }

        //Salvar a inclusão/edição do produto
        $scope.salvar = function () {
            ProdutoService.salvar($scope.produto).then(function (result) {
                $scope.showTable = true;
            });

        }

        //Editar o produto selecionado
        $scope.editar = function (produto) {
            $scope.produto = produto;
            $scope.showTable = false;
        }

        //Excluir o produto selecionado
        $scope.excluir = function () {
            ProdutoService.remover($scope.produto).then(function (result) {
                $scope.showTable = true;
            });
        }

        //Carrega uma lista de produtos
        ProdutoService.listar().then(function (result) {
            $scope.categorias = [];
            $scope.produtos = result.data;

            //Carrega as categorias
            CategoriaService.listar().then(function(result2) {
                $scope.categorias = result2.data;
            });
        });

    });

})(appM1);