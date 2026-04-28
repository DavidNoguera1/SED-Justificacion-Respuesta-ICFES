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
require_once __DIR__ . '/cache.php';

function getQuestions($subject = null, $activeOnly = true, $filters = [], $summary = false) {
    $conn = getConnection();
    
    if ($summary) {
        $sql = "SELECT 
                    id,
                    subject,
                    context,
                    text_content,
                    options,
                    competency,
                    level,
                    component,
                    skill
                FROM questions
                WHERE 1=1";
    } else {
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
    }
    
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
    
    if (!empty($filters['competency'])) {
        $sql .= " AND competency = ?";
        $params[] = $filters['competency'];
        $types .= 's';
    }
    
    if (!empty($filters['level'])) {
        $sql .= " AND level = ?";
        $params[] = $filters['level'];
        $types .= 's';
    }
    
    if (!empty($filters['component'])) {
        $sql .= " AND component = ?";
        $params[] = $filters['component'];
        $types .= 's';
    }
    
    if (!empty($filters['skill'])) {
        $sql .= " AND skill = ?";
        $params[] = $filters['skill'];
        $types .= 's';
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
        $questions[] = $summary ? transformQuestionSummary($row) : transformQuestion($row);
    }
    
    $stmt->close();
    
    return $questions;
}

function transformQuestionSummary($row) {
    $options = json_decode($row['options'] ?? '[]', true);
    if (!is_array($options)) {
        $options = [];
    }

    $searchText = trim(implode(' ', [
        $row['text_content'] ?? '',
        $row['context'] ?? '',
        implode(' ', $options),
    ]));

    return [
        'id' => (int) $row['id'],
        'subject' => $row['subject'],
        'text' => $row['text_content'] ?? '',
        'competency' => $row['competency'] ?? '',
        'level' => $row['level'] ?? '',
        'component' => $row['component'] ?? '',
        'skill' => $row['skill'] ?? '',
        'searchText' => $searchText,
    ];
}

function getUniqueFieldValues($subject) {
    $conn = getConnection();
    
    $sql = "SELECT DISTINCT competency, level, component, skill 
            FROM questions 
            WHERE (activo IS NULL OR activo = 1)";
    
    if ($subject !== null && $subject !== '') {
        $sql .= " AND subject = ?";
    }
    
    $stmt = $conn->prepare($sql);
    if ($subject !== null && $subject !== '') {
        $stmt->bind_param('s', $subject);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $uniqueValues = [
        'competency' => [],
        'level' => [],
        'component' => [],
        'skill' => []
    ];
    
    while ($row = $result->fetch_assoc()) {
        foreach (['competency', 'level', 'component', 'skill'] as $field) {
            $val = $row[$field];
            if (!empty($val) && !in_array($val, $uniqueValues[$field])) {
                $uniqueValues[$field][] = $val;
            }
        }
    }
    
    $stmt->close();
    
    foreach ($uniqueValues as $key => $values) {
        sort($uniqueValues[$key]);
    }
    
    return $uniqueValues;
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
$uniqueFields = $_GET['uniqueFields'] ?? false;
$summary = $_GET['summary'] ?? false;
$withFields = $_GET['withFields'] ?? false;
$competency = $_GET['competency'] ?? null;
$level = $_GET['level'] ?? null;
$component = $_GET['component'] ?? null;
$skill = $_GET['skill'] ?? null;

if ($subjects) {
    echo json_encode(getSubjects());
    exit;
}

if ($uniqueFields) {
    $cacheKey = apiCacheKey('questions_unique_fields', ['subject' => $subject]);
    $cached = apiCacheGet($cacheKey);
    if ($cached !== null) {
        apiJsonResponse($cached, true);
    }

    $payload = getUniqueFieldValues($subject);
    apiCacheSet($cacheKey, $payload);
    apiJsonResponse($payload, false);
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

$filters = [];
if ($competency) $filters['competency'] = $competency;
if ($level) $filters['level'] = $level;
if ($component) $filters['component'] = $component;
if ($skill) $filters['skill'] = $skill;

if ($summary) {
    $cacheKey = apiCacheKey('questions_summary', [
        'subject' => $subject,
        'filters' => $filters,
        'withFields' => (bool) $withFields,
    ]);
    $cached = apiCacheGet($cacheKey);
    if ($cached !== null) {
        apiJsonResponse($cached, true);
    }

    $questions = getQuestions($subject, true, $filters, true);
    $payload = $withFields ? [
        'questions' => $questions,
        'uniqueFields' => getUniqueFieldValues($subject),
    ] : $questions;

    apiCacheSet($cacheKey, $payload);
    apiJsonResponse($payload, false);
}

echo json_encode(getQuestions($subject, true, $filters));
