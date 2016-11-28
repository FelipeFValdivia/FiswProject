-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ada
-- ------------------------------------------------------
-- Server version	5.7.14-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapters` (
  `id_chapter` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `course_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id_chapter`),
  KEY `chapters_fk1_idx` (`course_id`),
  CONSTRAINT `chapters_fk1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id_course`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,'Campo eléctrico','soy un capitulo de prueba',1,1),(2,'Circuito','soy un capitulo de prueba',1,1),(3,'Campo magnético','soy un capitulo de prueba',1,1);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id_content` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  PRIMARY KEY (`id_content`),
  KEY `content_fk1_idx` (`chapter_id`),
  CONSTRAINT `content_fk1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id_chapter`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,'nombre actualizado','vídeo','https://www.youtube.com/embed/cFaf1_P2Y8c',1),(2,'contenttest','imagen','holacomoestanawkawjdjwdajawdj',1),(3,'contenttest','imagen','holacomoestanawkawjdjwdajawdj',1),(4,'contenttest','imagen','holacomoestanawkawjdjwdajawdj',1);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_person`
--

DROP TABLE IF EXISTS `course_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_person` (
  `id_course_person` int(11) NOT NULL AUTO_INCREMENT,
  `p_course_id` int(11) NOT NULL,
  `c_person_id` int(11) NOT NULL,
  PRIMARY KEY (`id_course_person`),
  KEY `course_person_fk1_idx` (`c_person_id`),
  KEY `course_person_fk2_idx` (`p_course_id`),
  CONSTRAINT `course_person_fk1` FOREIGN KEY (`c_person_id`) REFERENCES `users` (`id_person`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `course_person_fk2` FOREIGN KEY (`p_course_id`) REFERENCES `courses` (`id_course`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_person`
--

LOCK TABLES `course_person` WRITE;
/*!40000 ALTER TABLE `course_person` DISABLE KEYS */;
INSERT INTO `course_person` VALUES (3,2,11),(4,3,12),(5,1,17),(6,2,17),(7,3,17),(14,1,16),(15,5,16);
/*!40000 ALTER TABLE `course_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id_course` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `short_name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_course`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Electromagnetismo','soy un curso de prueba','c1'),(2,'Matemáticas discretas','soy un curso de prueba','c2'),(3,'Estructuras de datos','soy un curso de prueba','c3'),(4,'Ecuaciones diferenciales','soy un curso de prueba','c4'),(5,'Curso de prueba','Soy un curso de prueba','CP');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_person` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` int(11) NOT NULL,
  `learning_type` int(11) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id_person`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'rodsadrigo',2,0,'1991-12-07','h2@hola.cl','1234'),(12,'rodrigo',2,0,'1991-12-07','hola2@hola.cl','1234'),(13,'ivan',0,0,'1995-12-07','h221312@hola.cl','21345142'),(14,'prueba',0,0,'1993-12-01','asksafk@dkakdas','eakskdas'),(15,'12345',2,0,'1992-12-12','felipe@fmamfsam.cl','lfalasfllfsalsfal'),(16,'1',2,0,'1990-10-10','1','1'),(17,'Ivan Caro Leon',2,4,'1990-10-10','ivan@sansano.cl','pass'),(18,'admin',0,0,'1990-10-10','admin@admin.cl','admin'),(19,'4',1,0,'1992-12-12','4','4'),(20,'idsasdan',0,0,'1995-12-07','h221dsasadsa12@hola.cl','21345dasdsa142'),(21,'5',1,0,'1992-10-10','5','5'),(22,'6',1,0,'1992-10-10','6','6'),(46,'profe',1,0,'1992-10-10','profe','profesor'),(47,'prof',1,0,'1992-10-10','prof','profe'),(48,'user',2,0,'1992-10-10','user','user'),(49,'nacha',2,0,'1992-10-10','nacha@edu.cl','nacha'),(50,'Rodrigo Contreras',2,0,'1991-10-10','rodrigo@correo.cl','rodrigo');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ada'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-27 23:52:59
