
angular.module('appPersons', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/registrar_alumno',
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
            })
            .state('cursos', {
                url: '/cursos',
                templateUrl: 'views/cursos.html',
                controller: 'ctrlAlta'
            })
            .state('curso', {
                url: '/curso',
                templateUrl: 'views/curso.html',
                controller: 'ctrlAlta'
            })
            .state('perfil_tipo', {
                url: '/perfi',
                templateUrl: 'views/perfil_tipo.html',
                controller: 'ctrlAlta'
            })
            .state('perfil_tipo', {
                url: '/perfi',
                templateUrl: 'views/perfil_tipo.html',
                controller: 'ctrlAlta'
            });
        $urlRouterProvider.otherwise('login');
    })
    .factory('comun', function($http) {
        var comun = {}

        comun.persons = []

        comun.person = {};

        comun.eliminar = function(person) {
            var indice = comun.persons.indexOf(person);
            comun.persons.splice(indice, 1);
        }

        //metodos remotos

        comun.getAllStudent = function(){

            return $http.get('/students')
            .succes(function(data){
                angular.copy(data, comun.tareas)
                comun.persons = data;
                return comun.tareas
            })
        }

        comun.addStudent = function(person){
            return $http.post('/person', person)
            .succes(function(person){
                comun.persons.push(person);
            })
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.person = {}
            // $scope.persons = [];
        comun.getAllStudent();
        $scope.persons = comun.persons;

        $scope.prioridades = ['Alumno', 'Profesor', 'Administrador'];

        $scope.agregaralumno = function() {
            comun.add({
                name: $scope.person.name,
                age: $scope.person.age,
                type: 2,
                learning_type: 2,
                email: $scope.person.email,
                password: $scope.person.password,
                nick: $scope.person.nick
            })

            $scope.person.name = '';
            $scope.person.nick = '';
            $scope.person.password = '';
            $scope.person.learning_type= '';
            $scope.person.email = '';
            $scope.person.type = '';

        }
        $scope.agregar = function() {
            $scope.persons.push({
                nombre: $scope.person.nombre,
                password: $scope.person.password,
                username: $scope.person.username,
                email: $scope.person.email,
                prioridad: $scope.person.prioridad='0',
                aprendizaje: $scope.person.aprendizaje='2'
            })

            $scope.person.nombre = '';
            $scope.person.password = '';
            $scope.person.username = '';
            $scope.person.prioridad = '';
            $scope.person.email = '';
            $scope.person.aprendizaje = '';

        }
        $scope.profesor = function() {
            $scope.persons.push({
                nombre: $scope.person.nombre,
                password: $scope.person.password,
                username: $scope.person.username,
                email: $scope.person.email,
                prioridad: $scope.person.prioridad='1',
                aprendizaje: $scope.person.aprendizaje='0'
            })

            $scope.person.nombre = '';
            $scope.person.password = '';
            $scope.person.username = '';
            $scope.person.prioridad = '';
            $scope.person.email = '';
            $scope.person.aprendizaje = '';
        }
        $scope.prof_ini = function(person) {
            $state.go('registrar_profesor');
        }

        $scope.eliminar = function(person) {
            comun.eliminar(person)
        }

        $scope.procesaObjeto = function(person) {
            comun.person = person;
            $state.go('editar');
        }
        $scope.perf = function(person) {
            comun.person = person;
            $state.go('perfil');
        }
        $scope.cursos = function(person) {
            comun.person = person;
            $state.go('cursos');
        }
        $scope.curso = function(person) {
            comun.person = person;
            $state.go('curso');
        }
        $scope.perf_tipo = function(person) {
            comun.person = person;
            alert("Felicidades tu perfil es investigador");
            $state.go('perfil_tipo');
        }
        $scope.perfil_profesor = function(person) {
            comun.person = person;
            $state.go('perfil_profesor');
        }
        $scope.encuesta = function(person){
            comun.person = person;
            $state.go('encuesta');
        }
        $scope.ini_ses = function(person){
            $state.go('alta');
        }
        $scope.sesion = function(person) {
            $scope.persons.push({
                nombre: $scope.person.nombre,
                password: $scope.person.password,
                username: $scope.person.username= 'username',
                email: $scope.person.email='correo@correo.com',
                prioridad: $scope.person.prioridad='0',
                aprendizaje: $scope.person.aprendizaje='2'
            })

            $scope.person.nombre = '';
            $scope.person.password = '';
            $scope.person.username = '';
            $scope.person.prioridad = '';
            $scope.person.email = '';
            $scope.person.aprendizaje = '';
        }
    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.person = comun.person;
        
        $scope.actualizar = function() {
            var indice = comun.persons.indexOf(comun.person);
            comun.persons[indice] = $scope.person;
            $state.go('perfil');
        }

        $scope.eliminar = function(){
            comun.eliminar($scope.person);
            $state.go('login');
        }
    })
