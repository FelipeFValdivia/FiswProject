
angular.module('appPersons', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('registrar_alumno', {
                url: '/registrar_alumno',
                templateUrl: 'views/registrar_alumno.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/editar.html',
                controller: 'ctrlAlta'
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
            .state('cursos_usuario', {
                url: '/tus_cursos',
                templateUrl: 'views/cursos_usuario.html',
                controller: 'ctrlAlta'
            })
            .state('curso', {
                url: '/curso',
                templateUrl: 'views/curso.html',
                controller: 'ctrlAlta'
            })
            .state('asimilador', {
                url: '/asimilador',
                templateUrl: 'views/asimilador.html',
                controller: 'ctrlAlta'
            })
            .state('convergente', {
                url: '/convergente',
                templateUrl: 'views/convergente.html',
                controller: 'ctrlAlta'
            })
            .state('adaptador', {
                url: '/adaptador',
                templateUrl: 'views/adaptador.html',
                controller: 'ctrlAlta'
            })
            .state('divergente', {
                url: '/divergente',
                templateUrl: 'views/divergente.html',
                controller: 'ctrlAlta'
            })
            .state('defecto', {
                url: '/defecto',
                templateUrl: 'views/defecto.html',
                controller: 'ctrlAlta'
            })
            .state('crear_curso', {
                url: '/crear_curso',
                templateUrl: 'views/crear_curso.html',
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

        comun.persons = [];
        comun.courses = [];
        comun.user_courses = [];
        comun.chapters = [];
        comun.course = {};
        comun.chapter = {};
        comun.person = {};
        comun.contents = [];


        //metodos remotos
        comun.getAllCourses = function(){
            return $http.get('/courses')
            .success(function(data){
                angular.copy(data, comun.courses)
                comun.courses = data;
                return comun.courses
            })
        }
        comun.updateStudent = function(user_id,user){
            return $http.put('/users/'+user_id, user)
            .success(function(data){
                angular.copy(data, comun.persons)
                comun.persons = data;
                return comun.persons
            })            
        }
        comun.getAllStudent = function(){

            return $http.get('/students')
            .success(function(data){
                angular.copy(data, comun.persons)
                comun.persons = data;
                return comun.persons
            })
        }
        comun.getAllContentForChapter = function(content_id){
            console.log('/chapters/'+content_id+'/contents')
            return $http.get('/chapters/'+content_id+'/contents')
            .success(function(data){
                angular.copy(data, comun.contents)
                comun.contents = data;
                return comun.contents
            })
        }
        comun.getCoursesForUser = function(user_id){
            return $http.get('/users/'+user_id+'/courses')
            .success(function(data){
                angular.copy(data, comun.user_courses)
                comun.user_courses = data;

                return comun.user_courses

            })
        }

        comun.getChaptersForCourse = function(course_id){
            return $http.get('/courses/'+course_id+'/chapters')
            .success(function(data){
                angular.copy(data, comun.chapters)
                comun.chapters = data;
                return comun.chapters
            })
        }
        comun.getCourse = function(course_id){
            return $http.get('/courses/'+course_id)
            .success(function(data){
                comun.course = data;
                return comun.course
            })
        }

        comun.addStudent = function(person){
            return $http.post('/users', person)
            .success(function(person){
                if (person.type == 2)
                    comun.persons.push(person);
            })
        }
        comun.addCourse = function(course){
            return $http.post('/courses', course)
        }
        comun.login = function(person){
            return $http.post('/login', person)

        }

        comun.addCourseToStudent = function(req){
            return $http.post('/user_course', req)
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
      
        $scope.user_courses = comun.user_courses;
        $scope.chapters = comun.chapters;
        $scope.chapter = comun.chapter;
        $scope.contents =comun.contents;
            // $scope.persons = [];
        $scope.person = comun.person;
        $scope.persons = comun.persons;
        $scope.courses = comun.courses;
        $scope.course = comun.course;
        $scope.prioridades = [ 'Administrador', 'Profesor','Alumno'];

         $scope.agregaralumno = function() {
            comun.addStudent({
                name: $scope.person.name,
                birthdate: $scope.person.birthdate,
                type: 2,
                learning_type: 0,
                email: $scope.person.email,
                password: $scope.person.password
            })
            .then(function(respons){
                $scope.person.email = respons.data.email
                $scope.person.password = respons.data.password
                alert("Tu perfil ha sido creado con éxito, felicidades.")
                $scope.login($scope.person)
            })

            $scope.person.name = '';
            $scope.person.password = '';
            $scope.person.learning_type= '';
            $scope.person.email = '';
            $scope.person.type = '';

        }  
        $scope.crear_curso = function(){
            comun.addCourse({
                name: $scope.course.name,
                description: $scope.course.description,
                short_name: $scope.course.short_name
            })
            $state.go('perfil')

        }
        $scope.course_create = function() {
            $state.go('crear_curso')
        }
        $scope.agregarprofesor = function() {
            comun.addStudent({
                name: $scope.person.name,
                birthdate: $scope.person.birthdate,
                type: 1,
                learning_type: 0,
                email: $scope.person.email,
                password: $scope.person.password
            })
            alert("Profesor agregado con éxito");

            $scope.person.name = '';
            $scope.person.password = '';
            $scope.person.learning_type= '';
            $scope.person.email = '';
            $scope.person.type = '';
            $state.go('perfil')
        }       
        $scope.login = function(){
            comun.login({
                email: $scope.person.email,
                password: $scope.person.password
                })
                .then(function(respons){
                    if (respons.data == null){
                        alert("Ingrese un correo valido");
                        $state.go('login');
                    }
                    else{
                        if (respons.data == "wrong password"){
                            alert("Password incorrecto");
                            $state.go('login');
                        }
                        else{
                            $scope.perf(respons.data);
                        }

                    }

                })



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
            comun.person = person
            $state.go('perfil');
        }
        $scope.cursos_usuario = function(person){
            comun.getCoursesForUser(person.id_person)
            .then(function(respons){
                $scope.user_courses = respons.data;
                $state.go('cursos_usuario');
            })
        }
        $scope.cursos = function(person) {       
            comun.getAllCourses()
            .then(function(respons){
                $scope.courses = respons.data;

            })
            $state.go('cursos');
            
        }
        $scope.inscribir_curso = function(course, person){
            comun.addCourseToStudent({
                c_person_id: person.id_person,
                p_course_id: course.id_course
            })
            $scope.perf(person)

        }
        $scope.curso = function(curso) {
            comun.getChaptersForCourse(curso.id_course)
            .then(function(respons){
                $scope.chapters = respons.data;

            })
            comun.getCourse(curso.id_course)
            .then(function(respons){
                comun.course = respons.data[0];
            })
            $state.go('curso');    
        }
        $scope.contenido = function(person, capitulo) {
            console.log(person)
            if (person.learning_type == 4){
                comun.getAllContentForChapter(capitulo.id_chapter)
                .then(function(respons){
                    $scope.contents = respons.data;
                })
                $state.go('asimilador');
            }
            if (person.learning_type == 3){
                comun.getAllContentForChapter(capitulo.id_chapter)
                .then(function(respons){
                    $scope.contents = respons.data;
                })
                $state.go('convergente');
            }
            if (person.learning_type == 2){
                comun.getAllContentForChapter(capitulo.id_chapter)
                .then(function(respons){
                    $scope.contents = respons.data;
                })
                $state.go('adaptador');
            }
            if (person.learning_type == 1){
                comun.getAllContentForChapter(capitulo.id_chapter)
                .then(function(respons){
                    $scope.contents = respons.data;
                })
                $state.go('divergente');
            }
            if (person.learning_type == 0){
                comun.getAllContentForChapter(capitulo.id_chapter)
                .then(function(respons){
                    $scope.contents = respons.data;
                })
                $state.go('defecto');
            }
        }
        $scope.desinscribir_curso = function(course){


        }
        $scope.calcular_estilo = function(person){
            person.learning_type = 4
            alert("Tu estilo es asimilador");
            comun.updateStudent(person.id_person, person)
            $state.go('perfil')

        }
        $scope.cerrar_sesion = function(person) {
            alert("Has cerrado sesión");
            $state.go('login');
        }

        $scope.delete_user = function(person)  {
            var resp = confirm("Estás seguro de que deseas eliminar tu cuenta?")
            if (resp==true){
                $state.go('login')
            }
            else {
                $state.go('editar')
            }
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
            $state.go('encuesta');
        }
        $scope.ini_ses = function(person){
            $state.go('registrar_alumno');
        }
        $scope.reg_prof= function(person){
            $state.go('registrar_profesor');
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
    });