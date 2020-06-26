(function (app) {
    'use strict';

    app.service('CategoriaService', function ($q, $localStorage) {
        const deferred = $q.defer();

        function loadJSON() {
            deferred.resolve({ data: $localStorage.categorias || [] });

            return deferred.promise;
        }

        function save(categoria) {
            var dados = $localStorage.categorias || [];

            if (!categoria.id) {
                //Pega o ultimo registro
                var ultimo = dados[dados.length - 1];

                //Incrementa o valor de ID o ultimo registro
                categoria.id = ultimo ? ultimo.id + 1 : 1;

                //Adiciona o categoria no vetor
                dados.push(categoria);

                //Devolve o vetor para o localstorage
                $localStorage.categorias = dados;
            }

            deferred.resolve(categoria);

            return deferred.promise;
        }

        function remove( categoria ) {
            var dados = $localStorage.categorias;

            //Procura o index do categoria que está vindo por parametro
            var index = dados.indexOf( categoria );

            //Remove a partir do indice uma qtdade de elementos, no caso 1
            dados.splice(index, 1)

            //Atualioza local storage
            $localStorage.categorias = dados;

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