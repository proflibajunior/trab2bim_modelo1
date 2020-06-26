(function( app ){
    'use strict';
    
    app.controller('CategoriaController', function( $scope, CategoriaService ){
     //Controle para OrderBy e Filter
     $scope.decrescente = false;
     $scope.selectedColumn = 'id';
 
     //Controle de exibição da tabela/formulario
     $scope.showTable = true;
 
     //Seta a coluna para ser filtrada/ordenada
     $scope.setColumn = function ( columnName ){
         $scope.selectedColumn = columnName;
 
         //determina o ordenação decrescente (false)
         $scope.decrescente = !$scope.decrescente;
     }
 
     //Retornar para o FILTER qual a coluna será utilizada na ordenação/filtro
     $scope.filter = function() {
         var filtro = {};
 
         filtro[$scope.selectedColumn] = $scope.textFilter;
 
         return filtro;
     }
 
     //Prepara a tela para um novo cadastro
     $scope.novo = function() {
         //Representar o categoria atual
         $scope.categoria = {
             nome: ''
         }
 
         $scope.showTable = false;
     }
 
     //Cancelar a inclusao/edicao
     $scope.cancelar = function () {
         $scope.showTable = true;
     }
 
     //Salvar a inclusão/edição do categoria
     $scope.salvar = function() {
         CategoriaService.salvar($scope.categoria).then(function( result) {
             $scope.showTable = true;
         });
         
     }
 
     //Editar o categoria selecionado
     $scope.editar = function(categoria) {
         $scope.categoria = categoria;
         $scope.showTable = false;
     }
 
     //Excluir o categoria selecionado
     $scope.excluir = function() {
         CategoriaService.remover($scope.categoria).then(function(result){
             $scope.showTable = true;
         });
     }
 
     //Carrega uma lista de categorias
     CategoriaService.listar().then(function( result ){
         $scope.categorias = result.data;
     });
 
    });
 
 })( appM1 );