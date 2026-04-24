<?php

define('DB_HOST', '172.28.100.243');
define('DB_PORT', '3308');
define('DB_USER', 'practica');
define('DB_PASS', 'sed2026*');
define('DB_NAME', 'saber11'); // confirmar si realmente este es el nombre

function getConnection() {
    static $conn = null;
    
    if ($conn === null) {
        $conn = new mysqli(
            DB_HOST,
            DB_USER,
            DB_PASS,
            DB_NAME,
            DB_PORT
        );
        
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Error de conexión: ' . $conn->connect_error
            ]);
            exit;
        }
        
        $conn->set_charset('utf8mb4');
    }
    
    return $conn;
}

if (function_exists('mysqli_report')) {
    mysqli_report(MYSQLI_REPORT_ERROR);
}