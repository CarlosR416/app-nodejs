-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: laurents_db
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `img_producto`
--

DROP TABLE IF EXISTS `img_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `img_producto` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(64) NOT NULL,
  `src` varchar(64) NOT NULL,
  `id_producto` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `img_producto`
--

LOCK TABLES `img_producto` WRITE;
/*!40000 ALTER TABLE `img_producto` DISABLE KEYS */;
INSERT INTO `img_producto` VALUES (1,'Arreglo pequeño con peluche','/assets/img/post-landscape-2.jpg',1),(2,'arreglo grande con globos','/assets/img/post-landscape-2.jpg',2),(3,'arreglo para cada ocasion','/assets/img/post-landscape-2.jpg',3),(4,'arreglo para bebes','/assets/img/post-landscape-2.jpg',5),(5,'Un detalle que alegra','/assets/img/post-landscape-2.jpg',5);
/*!40000 ALTER TABLE `img_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(64) NOT NULL,
  `precio` decimal(64,0) NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `imagen` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'arreglo grande con peluche',0,'0000-00-00 00:00:00.000000','asdasd'),(2,'arreglo pequeño sin peluche',0,'0000-00-00 00:00:00.000000','asdasd'),(3,'arreglo coon globos',0,'0000-00-00 00:00:00.000000','asdasdsadasd'),(4,'detalle que agrada',2,'0000-00-00 00:00:00.000000','asdasdsadasd'),(5,'alegria para todo el dia',3,'0000-00-00 00:00:00.000000','asdasdsadasd'),(6,'hacer feliz',2,'0000-00-00 00:00:00.000000','asdasdsadasd'),(7,'dia de las madres',3,'0000-00-00 00:00:00.000000','asdasdsadasd'),(8,'dia del padre',3,'0000-00-00 00:00:00.000000','asdasdsadasd'),(9,'3',3,'0000-00-00 00:00:00.000000','asdasdsadasd');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

