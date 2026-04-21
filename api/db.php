<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'admin');
define('DB_NAME', 'saber11');

function getConnection() {
    static $conn = null;
    
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]);
            exit;
        }
        
        $conn->set_charset('utf8mb4');
    }
    
    return $conn;
}

function closeConnection() {
    static $conn = null;
    
    if ($conn !== null) {
        $conn->close();
        $conn = null;
    }
}

if (function_exists('mysqli_report')) {
    mysqli_report(MYSQLI_REPORT_ERROR);
}