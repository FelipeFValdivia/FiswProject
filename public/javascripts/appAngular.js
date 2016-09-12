
angular.module('appTareas', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'views/alta.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/editar.html',
                controller: 'ctrlEditar'
            })
            .state('encuesta', {
                url:'/encuesta',
                templateUrl: 'views/encuesta.html',
                controller: 'ctrlAlta'
            })
            .state('perfil', {
                url:'/perfil',
                templateUrl: 'views/perfil.html',
                controller: 'ctrlAlta'
            })
            .state('login', {
                url:'/login',
                templateUrl: 'views/login.html',
                controller: 'ctrlAlta'
            })
            .state('registrar_profesor', {
                url: '/registrar_profesor',
                templateUrl: 'views/registrar_profesor.html',
                controller: 'ctrlAlta'
            })
            .state('perfil_profesor', {
                url: '/perfil_profesor',
                templateUrl: 'views/perfil_profesor.html',
                controller: 'ctrlAlta'
            });

        $urlRouterProvider.otherwise('login');
    })
    .factory('comun', function() {
        var comun = {}

        comun.tareas = [{
            nombre: 'Perico los palotes',
            password: '12345',
            username: 'PLP',
            email: 'plp@correo.org',
            prioridad: '0',
            aprendizaje: '0'
        }, {
            nombre: 'Che Pinochet', 
            password: '123456',
            username: 'CP',
            email: 'cp@correo.org',
            prioridad: '1',
            aprendizaje: '0'
        }, {
            nombre: 'John Osama Stalin Hitler',
            password: '12345',
            username: 'JOSH',
            email: 'JOSH@correo.org',
            prioridad: '2',
            aprendizaje: '3'
        }]

        comun.tarea = {};

        comun.eliminar = function(tarea) {
            var indice = comun.tareas.indexOf(tarea);
            comun.tareas.splice(indice, 1);
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.tarea = {}
            // $scope.tareas = [];

        $scope.tareas = comun.tareas;

        $scope.prioridades = ['Alumno', 'Profesor', 'Administrador'];


        $scope.agregar = function() {
            $scope.tareas.push({
                nombre: $scope.tarea.nombre,
                password: $scope.tarea.password,
                username: $scope.tarea.username,
                email: $scope.tarea.email,
                prioridad: $scope.tarea.prioridad='0',
                aprendizaje: $scope.tarea.aprendizaje='2'
            })

            $scope.tarea.nombre = '';
            $scope.tarea.password = '';
            $scope.tarea.username = '';
            $scope.tarea.prioridad = '';
            $scope.tarea.email = '';
            $scope.tarea.aprendizaje = '';
            var post  = {idperros: 3  , perroscol: 'Hello MySQL'};
            connection.query('INSERT INTO perros SET ?', post, function(err, result) {
              if (err) throw err;
            });
console.log(query.sql);
        }
        $scope.profesor = function() {
            $scope.tareas.push({
                nombre: $scope.tarea.nombre,
                password: $scope.tarea.password,
                username: $scope.tarea.username,
                email: $scope.tarea.email,
                prioridad: $scope.tarea.prioridad='1',
                aprendizaje: $scope.tarea.aprendizaje='0'
            })

            $scope.tarea.nombre = '';
            $scope.tarea.password = '';
            $scope.tarea.username = '';
            $scope.tarea.prioridad = '';
            $scope.tarea.email = '';
            $scope.tarea.aprendizaje = '';
        }
        $scope.prof_ini = function(tarea) {
            $state.go('registrar_profesor');
        }

        $scope.eliminar = function(tarea) {
            comun.eliminar(tarea)
        }

        $scope.procesaObjeto = function(tarea) {
            comun.tarea = tarea;
            $state.go('editar');
        }
        $scope.perf = function(tarea) {
            comun.tarea = tarea;
            $state.go('perfil');
        }
        $scope.perfil_profesor = function(tarea) {
            comun.tarea = tarea;
            $state.go('perfil_profesor');
        }
        $scope.encuesta = function(tarea){
            comun.tarea = tarea;
            $state.go('encuesta');
        }
        $scope.ini_ses = function(tarea){
            $state.go('alta');
        }
        $scope.sesion = function(tarea) {
            $scope.tareas.push({
                nombre: $scope.tarea.nombre,
                password: $scope.tarea.password,
                username: $scope.tarea.username= 'username',
                email: $scope.tarea.email='correo@correo.com',
                prioridad: $scope.tarea.prioridad='0',
                aprendizaje: $scope.tarea.aprendizaje='2'
            })

            $scope.tarea.nombre = '';
            $scope.tarea.password = '';
            $scope.tarea.username = '';
            $scope.tarea.prioridad = '';
            $scope.tarea.email = '';
            $scope.tarea.aprendizaje = '';
        }
    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.tarea = comun.tarea;
        
        $scope.actualizar = function() {
            var indice = comun.tareas.indexOf(comun.tarea);
            comun.tareas[indice] = $scope.tarea;
            $state.go('perfil');
        }

        $scope.eliminar = function(){
            comun.eliminar($scope.tarea);
            $state.go('login');
        }
    })
