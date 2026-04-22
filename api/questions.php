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

function getQuestions($subject = null, $activeOnly = true) {
    $conn = getConnection();
    
    $sql = "SELECT 
                id,
                subject,
                context,
                context_img,
                question_img,
                text_content,
                options,
                options_img,
                correct_index,
                competency,
                level,
                assertion,
                evidence,
                component,
                standard,
                skill,
                evaluation_criteria,
                justification,
                invalid_options
            FROM questions
            WHERE 1=1";
    
    $params = [];
    $types = '';
    
    if ($subject !== null && $subject !== '') {
        $sql .= " AND subject = ?";
        $params[] = $subject;
        $types .= 's';
    }
    
    if ($activeOnly) {
        $sql .= " AND (activo IS NULL OR activo = 1)";
    }
    
    $sql .= " ORDER BY id ASC";
    
    $stmt = $conn->prepare($sql);
    
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $questions = [];
    while ($row = $result->fetch_assoc()) {
        $questions[] = transformQuestion($row);
    }
    
    $stmt->close();
    
    return $questions;
}

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
    ];
}

function getQuestionById($id) {
    $conn = getConnection();
    
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

function getSubjects() {
    $conn = getConnection();
    
    $result = $conn->query("SELECT DISTINCT subject FROM questions WHERE activo IS NULL OR activo = 1 ORDER BY subject");
    
    $subjects = [];
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row['subject'];
    }
    
    return $subjects;
}

$subject = $_GET['subject'] ?? null;
$id = $_GET['id'] ?? null;
$subjects = $_GET['subjects'] ?? false;

if ($subjects) {
    echo json_encode(getSubjects());
    exit;
}

if ($id !== null) {
    $question = getQuestionById((int) $id);
    if ($question) {
        echo json_encode($question);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Pregunta no encontrada']);
    }
    exit;
}

echo json_encode(getQuestions($subject));