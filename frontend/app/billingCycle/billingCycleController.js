(function() {
    var app = angular.module('myApp')

    app.controller('billingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])
    function BillingCycleController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.dados = {}

        vm.refresh = function() {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page-1)*10}&limit=10`)
            .then(function(response) {
                vm.dados = {credits: [{}], debts: [{}]}
                vm.tabela = response.data
                vm.calculateValues()

                $http.get(`${url}/count`)
                .then(function(response) {
                    vm.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                    console.log('pages = ', vm.pages)
                })
            })
        }
        vm.refresh()

        vm.create = function() {
            $http.post(url, vm.dados)
            .then(function (response) {
                vm.refresh()
                msgs.addSuccess('Adicionado com Sucesso!')
            })
            .catch(function(response) {
                msgs.addError(response.data.errors)
             })
        }

        vm.showTabUpdate = function(dados) {
            vm.dados = dados
            vm.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(dados) {
            vm.dados = dados
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.update = function() {
            $http.put(`${url}/${vm.dados._id}`, vm.dados)
            .then(function(response) {
                vm.refresh()
                msgs.addSuccess('Alterado com Sucesso!')
            })
            .catch(function(response) {
                msgs.addError(response.data.errors)
             })
        }

        vm.delete = function() {
            $http.delete(`${url}/${vm.dados._id}`, vm.dados)
            .then(function(response) {
                vm.refresh()
                msgs.addSuccess('Excluído com Sucesso!')
            })
            .catch(function(response) {
                msgs.addError(response.data.errors)
             })
        }


        // Créditos
        vm.addCredit = function(index) {
            vm.dados.credits.splice(index+1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}) {
            vm.dados.credits.splice(index+1, 0, {name, value})
            vm.calculateValues()
        }

        vm.deleteCredit = function(index) {
            if(vm.dados.credits.length > 1) {
                vm.dados.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        // Débitos
        vm.addDebt = function(index) {
            vm.dados.debts.splice(index+1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}) {
            vm.dados.debts.splice(index+1, 0, {name, value, status})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index) {
            if(vm.dados.debts.length > 1) {
                vm.dados.debts.splice(index, 1)
                vm.calculateValues()
            }
        }


        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if(vm.dados) {
                vm.dados.credits.forEach(function({value}) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.dados.debts.forEach(function({value}) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debt
        }
    }
})()