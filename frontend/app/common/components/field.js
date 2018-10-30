(function() {
    var app = angular.module('myApp')

    app.component('field', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=',
            readonly: '<'
        },
        controller: [
            'gridSystem',
            function(gridSystem) {
                const self = this
                this.$onInit = () => self.gridClasses = gridSystem.toCssClasses(self.grid)
            }
        ],
        template: `
            <div class="{{$ctrl.gridClasses}}">
                <div class="form-group">
                    <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
                    <input type="{{$ctrl.type}}" class="form-control" id="{{$ctrl.id}}" placeholder="{{$ctrl.placeholder}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly">
                </div>
            </div>
        `
    })
})()