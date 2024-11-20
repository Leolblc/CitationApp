# CitationApp

<h1>Requirement</h1>

* Appache with https , localhost , loopback

* Php Last version

* MariaDb Last Version

<h2> Database Script</h2>

CREATE DATABASES api;
CREATE USER 'operateur'@'192.168.56.2' IDENTIFIED BY 'Operateur';
GRANT ALL ON api.* TO 'operateur'@'192.168.56.2';


CREATE TABLE `citation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texte` text NOT NULL,
  `auteur` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)