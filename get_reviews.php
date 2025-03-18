<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'config.php'; // Importation de la clé API

// URL de l'API Google Places pour récupérer les avis
$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . PLACE_ID . "&fields=reviews&key=" . GOOGLE_API_KEY . "&language=fr";

// Appel API Google
$response = file_get_contents($url);

// Vérifier si la réponse est valide
if ($response === FALSE) {
    echo json_encode(["error" => "Erreur lors de la récupération des avis"]);
    exit;
}

// Convertir la réponse en JSON
$data = json_decode($response, true);

// Vérifier si des avis sont présents
if (!isset($data['result']['reviews'])) {
    echo json_encode(["error" => "Aucun avis trouvé"]);
    exit;
}

// Extraire les avis
$reviews = $data['result']['reviews'];

// Renvoyer les avis en JSON
echo json_encode(["reviews" => $reviews]);
