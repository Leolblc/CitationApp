# CitationApp

<h1>Requirement</h1>

* Appache with https , localhost , loopback

* Php Last version

* MariaDb Last Version

<h2> Database Script</h2>

CREATE DATABASES api;<br>
CREATE USER 'operateur'@'192.168.56.2' IDENTIFIED BY 'Operateur';<br>
GRANT ALL ON api.* TO 'operateur'@'192.168.56.2';<br>
FLUSH PRIVILEGES;<br>


CREATE TABLE `citation` (<br>
  `id` int(11) NOT NULL AUTO_INCREMENT,<br>
  `texte` text NOT NULL,<br>
  `auteur` varchar(255) NOT NULL,<br>
  PRIMARY KEY (`id`)<br>
)<br>