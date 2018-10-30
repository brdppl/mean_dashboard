(function() {
    var app = angular.module('myApp')

    app.component('paginator', {
        bindings: {
            url: '@',
            pages: '@'
        },
        controller: [
            '$location',
            function($location) {
                // const self = this
                this.$onInit = function() {
                    const pages = parseInt(this.pages) || 1
                    this.pagesArray = Array(pages).fill(0).map((e, i) => i+1)
                }

                this.current = parseInt($location.search().page) || 1
                // this.needPagination = this.pages > 1
                // this.hasPrev = this.current > 1
                // this.hasNext = this.current < this.pages

                this.isCurrent = function(i) {
                    return this.current === i
                }
            }
        ],
        template: `
            <ul ng-if="$ctrl.pages > 1" class="pagination">
                <li ng-if="$ctrl.current > 1">
                    <a href="{{$ctrl.url}}?page={{$ctrl.current - 1}}">Anterior</a>
                </li>
                <li ng-class="{'active': $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
                    <a href="{{$ctrl.url}}?page={{index}}">{{index}}</a>       
                </li>
                <li ng-if="$ctrl.current < $ctrl.pages">
                    <a href="{{$ctrl.url}}?page={{$ctrl.current + 1}}">Próximo</a>
                </li>
            </ul>
        `
    })
})()