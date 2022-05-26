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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
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
  PRIMARY KEY (`id`),
  KEY `FK_categorias` (`id_categoria`) USING BTREE,
  KEY `FK_productos` (`id_producto`),
  CONSTRAINT `FK_categorias` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_productos`
--

LOCK TABLES `categorias_productos` WRITE;
/*!40000 ALTER TABLE `categorias_productos` DISABLE KEYS */;
INSERT INTO `categorias_productos` VALUES (23,46,1),(24,47,2),(26,49,2),(27,50,1);
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
  `visto` char(1) NOT NULL DEFAULT 'N',
  `fecha` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (19,'Henry Rodriguez','rodriguezcarlos9716@gmail.com','Hola Estoy interesado en ver algunas cosas','N','0000-00-00 00:00:00.000000');
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
  PRIMARY KEY (`id`),
  KEY `FK_img_product` (`id_producto`),
  CONSTRAINT `FK_img_product` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `img_producto`
--

LOCK TABLES `img_producto` WRITE;
/*!40000 ALTER TABLE `img_producto` DISABLE KEYS */;
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
  `visible` char(1) NOT NULL DEFAULT 'N',
  `fecha` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `imagen` varchar(128) NOT NULL DEFAULT '/productos/default.jpg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (46,'Arreglo de Globos ',5600,'S','2022-05-25 23:19:44.992388','/productos/post-landscape-3.jpg'),(47,'Arreglo de Flores',6800,'S','2022-05-25 23:20:10.999763','/productos/post-landscape-6.jpg'),(49,'Arreglo de Globos blacos',6900,'S','2022-05-25 23:22:19.788822','/productos/post-landscape-4.jpg'),(50,'Galletas Rosas',11000,'S','2022-05-25 23:22:40.696392','/productos/post-landscape-7.jpg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_inicio`
--

DROP TABLE IF EXISTS `productos_inicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_inicio` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `id_producto` int(16) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_inicio_productos` (`id_producto`),
  CONSTRAINT `fk_inicio_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_inicio`
--

LOCK TABLES `productos_inicio` WRITE;
/*!40000 ALTER TABLE `productos_inicio` DISABLE KEYS */;
INSERT INTO `productos_inicio` VALUES (5,47,'2022-05-26 03:23:39'),(6,49,'2022-05-26 03:23:45'),(7,50,'2022-05-26 03:24:11');
/*!40000 ALTER TABLE `productos_inicio` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'carlos','User','$2b$10$JqXCvUyH/9kdPiDtxGfJ3uIrA3xHSWbBDxzy7vUt/HruGrN.GjFO.',1,'2022-05-14 04:01:19.420877'),(4,'carlos2','User','$2b$10$Lg40WMuWj5E62XeqaJp5M.ouy',0,'2022-05-14 04:25:36.330838'),(5,'caarlos','User','$2b$10$JqXCvUyH/9kdPiDtxGfJ3uIrA',0,'2022-05-14 04:39:38.212628'),(6,'carlos rodriguez','carlos9716','$2b$10$RQ9aOHBB7gG0d0ETceJEaec8fbjvWgK3KxOlJp887UildrkjI6B2q',0,'2022-05-18 18:28:23.204979'),(10,'carlos9716','carlos rodriguez','$2b$10$BJn3qkhT27.S8RI8lXVmVepw58OQeUAJ4UgFN1f9O1dTBMqszhbhe',0,'2022-05-18 18:34:59.998357'),(15,'robertocarlos','sonia','$2b$10$1tjP49/lmSw8dZtp2iGOiOSojAQMjX2GlTXPAo0.VuSA/9BHbs7ZS',0,'2022-05-18 18:43:12.222333'),(19,'carlos2415q','carlos','$2b$10$0bmPTYol.tciXpUUYIPdr.Xf94vfmqQHxj9C.3EWJd2.pil0taxYS',0,'2022-05-26 03:28:46.072609'),(20,'V26403295','asdasd','$2b$10$pkkjE0FtGfgmWObPwSEYSOyTFZbxYahgLEQqVHOFxPdEpph5tK9Ym',0,'2022-05-26 03:29:41.397604');
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

-- Dump completed on 2022-05-25 23:32:39
