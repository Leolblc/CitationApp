<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

define('MYSQL_HOST', '192.168.56.2');
define('MYSQL_USERNAME', 'operateur');
define('MYSQL_PASSWORD', 'Operateur');
define('MYSQL_DATABASE', 'api');

try {
    $pdo = new PDO(
        "mysql:host=" . MYSQL_HOST . ";dbname=" . MYSQL_DATABASE . ";charset=utf8",
        MYSQL_USERNAME,
        MYSQL_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion à la base de données : " . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT id, texte, auteur FROM citation");
            $citation = $stmt->fetchAll();
            http_response_code(200);
            echo json_encode($citation);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'exécution de la requête : " . $e->getMessage()]);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $texte = $input['texte'] ?? '';
        $auteur = $input['auteur'] ?? '';

        if (empty($texte) || empty($auteur)) {
            http_response_code(400);
            echo json_encode(["error" => "Les champs 'texte' et 'auteur' sont obligatoires."]);
            exit;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO citation (texte, auteur) VALUES (:texte, :auteur)");
            $stmt->execute(['texte' => $texte, 'auteur' => $auteur]);

            http_response_code(201);
            echo json_encode([
                "texte" => $texte,
                "auteur" => $auteur,
                "message" => "Citation ajoutée avec succès"
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout de la citation : " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée."]);
        break;
}
