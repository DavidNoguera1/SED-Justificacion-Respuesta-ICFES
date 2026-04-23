<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

function getJustificacionExpandida($idPregunta) {
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT * FROM justificaciones_expandidas WHERE idPregunta = ?");
    $stmt->bind_param('i', $idPregunta);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $justificacion = null;
    if ($row = $result->fetch_assoc()) {
        $justificacion = [
            'id' => (int) $row['idJustificacionExpandida'],
            'idPregunta' => (int) $row['idPregunta'],
            'nombrePregunta' => $row['nombre_pregunta'],
            'descripcionExtendida' => $row['descripcion_extendida'] ?? '',
            'mediaInteractiva' => $row['media_interactiva'] ?? '',
            'glosario_items' => $row['glosario_items'] ?? '',
            'datoCurioso' => $row['dato_curioso'] ?? '',
            'errorComunFeedback' => $row['error_comun_feedback'] ?? ''
        ];
    }
    
    $stmt->close();
    return $justificacion;
}

function saveJustificacionExpandida($idPregunta, $data) {
    $conn = getConnection();
    
    $stmt = $conn->prepare("SELECT idJustificacionExpandida FROM justificaciones_expandidas WHERE idPregunta = ?");
    $stmt->bind_param('i', $idPregunta);
    $stmt->execute();
    $stmt->store_result();
    $existe = $stmt->num_rows > 0;
    $stmt->close();
    
    $nombrePregunta = $data['nombrePregunta'] ?? '';
    $descripcionExtendida = $data['descripcionExtendida'] ?? '';
    $mediaInteractiva = $data['mediaInteractiva'] ?? '';
    $glosarioItems = $data['glosarioItems'] ?? '';
    $datoCurioso = $data['datoCurioso'] ?? '';
    $errorComunFeedback = $data['errorComunFeedback'] ?? '';
    
    if ($existe) {
        $stmt = $conn->prepare("UPDATE justificaciones_expandidas SET 
            nombre_pregunta = ?,
            descripcion_extendida = ?,
            media_interactiva = ?,
            glosario_items = ?,
            dato_curioso = ?,
            error_comun_feedback = ?
            WHERE idPregunta = ?");
        
        $stmt->bind_param('ssssssi', 
            $nombrePregunta,
            $descripcionExtendida,
            $mediaInteractiva,
            $glosarioItems,
            $datoCurioso,
            $errorComunFeedback,
            $idPregunta);
    } else {
        $stmt = $conn->prepare("INSERT INTO justificaciones_expandidas 
            (idPregunta, nombre_pregunta, descripcion_extendida, media_interactiva, glosario_items, dato_curioso, error_comun_feedback)
            VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->bind_param('issssss', 
            $idPregunta,
            $nombrePregunta,
            $descripcionExtendida,
            $mediaInteractiva,
            $glosarioItems,
            $datoCurioso,
            $errorComunFeedback);
    }
    
    $success = $stmt->execute();
    $stmt->close();
    
    return $success;
}

$idPregunta = $_GET['id'] ?? null;

// GET para obtener justificacion expandida
if ($idPregunta !== null) {
    $justificacion = getJustificacionExpandida((int) $idPregunta);
    if ($justificacion && isset($justificacion['id'])) {
        echo json_encode($justificacion);
    } else {
        echo json_encode(['existe' => false]);
    }
    exit;
}

// POST para guardar
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['idPregunta'])) {
    $data = [
        'nombrePregunta' => $_POST['nombrePregunta'] ?? '',
        'descripcionExtendida' => $_POST['descripcionExtendida'] ?? '',
        'mediaInteractiva' => $_POST['mediaInteractiva'] ?? '',
        'glosarioItems' => $_POST['glosarioItems'] ?? '',
        'datoCurioso' => $_POST['datoCurioso'] ?? '',
        'errorComunFeedback' => $_POST['errorComunFeedback'] ?? ''
    ];
    
    $success = saveJustificacionExpandida((int) $_POST['idPregunta'], $data);
    echo json_encode(['success' => $success]);
    exit;
}

// POST JSON
$input = file_get_contents('php://input');
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($input)) {
    $json = json_decode($input, true);
    if (isset($json['idPregunta'])) {
        $data = [
            'nombrePregunta' => $json['nombrePregunta'] ?? '',
            'descripcionExtendida' => $json['descripcionExtendida'] ?? '',
            'mediaInteractiva' => $json['mediaInteractiva'] ?? '',
            'glosarioItems' => $json['glosarioItems'] ?? '',
            'datoCurioso' => $json['datoCurioso'] ?? '',
            'errorComunFeedback' => $json['errorComunFeedback'] ?? ''
        ];
        
        $success = saveJustificacionExpandida((int) $json['idPregunta'], $data);
        echo json_encode(['success' => $success]);
        exit;
    }
}

echo json_encode(['error' => 'Sin acción']);