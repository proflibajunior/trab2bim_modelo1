(function (app) {
    'use strict';

    app.service('ProdutoService', function ($q, $localStorage) {
        const deferred = $q.defer();

        function loadJSON() {
            deferred.resolve({ data: $localStorage.produtos || [] });

            return deferred.promise;
        }

        function save(produto) {
            var dados = $localStorage.produtos || [];

            if (!produto.id) {
                //Pega o ultimo registro
                var ultimo = dados[dados.length - 1];

                //Incrementa o valor de ID o ultimo registro
                produto.id = ultimo ? ultimo.id + 1 : 1;

                //Adiciona o produto no vetor
                dados.push(produto);

                //Devolve o vetor para o localstorage
                $localStorage.produtos = dados;
            }

            deferred.resolve(produto);

            return deferred.promise;
        }

        function remove( produto ) {
            var dados = $localStorage.produtos;

            //Procura o index do produto que está vindo por parametro
            var index = dados.indexOf( produto );

            //Remove a partir do indice uma qtdade de elementos, no caso 1
            dados.splice(index, 1)

            //Atualioza local storage
            $localStorage.produtos = dados;

            deferred.resolve({data: dados});
            return deferred.promise;
        }

        return {
            listar: loadJSON,
            salvar: save,
            remover: remove
        }

    });

})(appM1);