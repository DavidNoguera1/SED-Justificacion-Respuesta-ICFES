<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-cache, private');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/cache.php';

function transformQuestion($row) {
    $options = json_decode($row['options'], true);
    if (!is_array($options)) {
        $options = [];
    }
    
    $optionsImg = null;
    if (!empty($row['options_img'])) {
        $optionsImg = json_decode($row['options_img'], true);
        if (!is_array($optionsImg)) {
            $optionsImg = [];
        }
    }
    
    return [
        'id' => (int) $row['id'],
        'subject' => $row['subject'],
        'context' => $row['context'] ?? '',
        'contextImg' => $row['context_img'] ?? '',
        'questionImg' => $row['question_img'] ?? '',
        'text' => $row['text_content'] ?? '',
        'options' => $options,
        'optionsImg' => $optionsImg,
        'correct' => (int) $row['correct_index'],
        'competency' => $row['competency'] ?? '',
        'level' => $row['level'] ?? '',
        'assertion' => $row['assertion'] ?? '',
        'evidence' => $row['evidence'] ?? '',
        'component' => $row['component'] ?? '',
        'standard' => $row['standard'] ?? '',
        'skill' => $row['skill'] ?? '',
        'evaluationCriteria' => $row['evaluation_criteria'] ?? '',
        'justification' => $row['justification'] ?? '',
        'invalidOptions' => $row['invalid_options'] ?? '',
        '_updatedAt' => $row['updated_at'] ?? null,
    ];
}

function getQuestionById($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM questions WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $question = null;
    if ($row = $result->fetch_assoc()) {
        $question = transformQuestion($row);
    }
    
    $stmt->close();
    return $question;
}

function getJustificacionExpandida($conn, $idPregunta) {
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
            'errorComunFeedback' => $row['error_comun_feedback'] ?? '',
            '_updatedAt' => $row['updated_at'] ?? null
        ];
    }
    
    $stmt->close();
    return $justificacion;
}

function getQuestionsBySubject($conn, $subject) {
    $stmt = $conn->prepare("SELECT id, text_content, subject FROM questions WHERE subject = ? AND (activo IS NULL OR activo = 1) ORDER BY id ASC");
    $stmt->bind_param('s', $subject);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $questions = [];
    while ($row = $result->fetch_assoc()) {
        $questions[] = [
            'id' => (int) $row['id'],
            'text' => $row['text_content'] ?? '',
            'subject' => $row['subject']
        ];
    }
    
    $stmt->close();
    return $questions;
}

$id = $_GET['id'] ?? null;
$area = $_GET['area'] ?? 'mat';

if ($id === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta parametro id']);
    exit;
}

$id = (int) $id;

$cacheKey = apiCacheKey('question_complete', ['id' => $id]);
$cached = apiCacheGet($cacheKey);
if ($cached !== null) {
    apiJsonResponse($cached, true);
}

$conn = getConnection();

$question = getQuestionById($conn, $id);

if (!$question) {
    http_response_code(404);
    echo json_encode(['error' => 'Pregunta no encontrada']);
    exit;
}

$expanded = getJustificacionExpandida($conn, $id);
$questionsList = getQuestionsBySubject($conn, $question['subject']);
$version = [
    'question' => $question['_updatedAt'] ?? null,
    'justificacion' => is_array($expanded) ? ($expanded['_updatedAt'] ?? null) : null,
    'timestamp' => time()
];

$payload = [
    'question' => $question,
    'expanded' => $expanded ?: (object) [],
    'questionsList' => $questionsList,
    'version' => $version
];

apiCacheSet($cacheKey, $payload);
apiJsonResponse($payload, false);
