# CitationApp

<h1>Requirements</h1>

* Appache with https 

* Php Last version

* MariaDb Last Version

<h2> SQL Script</h2>

CREATE DATABASE api;<br>
CREATE USER 'operateur'@'192.168.56.2' IDENTIFIED BY 'Operateur';<br>
GRANT ALL ON api.* TO 'operateur'@'192.168.56.2';<br>
FLUSH PRIVILEGES;<br>


CREATE TABLE `citation` (<br>
  `id` int(11) NOT NULL AUTO_INCREMENT,<br>
  `texte` text NOT NULL,<br>
  `auteur` varchar(255) NOT NULL,<br>
  PRIMARY KEY (`id`)<br>
)<br>

<h1> Application Configuration </h1>

You need to modify the IP address on the files : 

-site.webmanifest <br>
-main.js <br>
-index.php <br>
<h1>Exemple : </h1>
<img alt="Image Exemple" src="https://github.com/Leolblc/CitationApp/blob/main/flavicon/exemple.png" />