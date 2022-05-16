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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'dia de las madres'),(2,'dia del padre'),(3,'dia del niño');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_productos`
--

DROP TABLE IF EXISTS `categorias_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias_productos` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `id_producto` int(16) NOT NULL,
  `id_categoria` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_productos`
--

LOCK TABLES `categorias_productos` WRITE;
/*!40000 ALTER TABLE `categorias_productos` DISABLE KEYS */;
INSERT INTO `categorias_productos` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
/*!40000 ALTER TABLE `categorias_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacto` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) NOT NULL,
  `correo` varchar(64) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,'HENRYFDF','<zx<zx','undefined','0000-00-00 00:00:00.000000'),(2,'HENRYFDF','<zx<zx','undefined','0000-00-00 00:00:00.000000'),(3,'sdfsd','<zx<zxsdfsdf','undefined','0000-00-00 00:00:00.000000'),(4,'carlosa','rodriguezq','asdsccsas','0000-00-00 00:00:00.000000'),(5,'carlos','8891957','undefined','0000-00-00 00:00:00.000000'),(6,'carlos','8891957','undefined','0000-00-00 00:00:00.000000'),(7,'Henry Rodriguez','rodriguezcarlos9716@gmail.com','mmm','0000-00-00 00:00:00.000000');
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(32) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `nivel` int(16) NOT NULL DEFAULT 0,
  `fecha_registro` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'carlos','User','$2b$10$JqXCvUyH/9kdPiDtxGfJ3uIrA3xHSWbBDxzy7vUt/HruGrN.GjFO.',1,'2022-05-14 04:01:19.420877'),(4,'carlos2','User','$2b$10$Lg40WMuWj5E62XeqaJp5M.ouy',0,'2022-05-14 04:25:36.330838'),(5,'caarlos','User','$2b$10$JqXCvUyH/9kdPiDtxGfJ3uIrA',0,'2022-05-14 04:39:38.212628');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 15:17:10
