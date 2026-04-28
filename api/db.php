<?php

define('DB_HOST', '172.28.100.243');
define('DB_PORT', '3308');
define('DB_USER', 'practica');
define('DB_PASS', 'sed2026*');
define('DB_NAME', 'saber11'); // confirmar si realmente este es el nombre

if (function_exists('mysqli_report')) {
    mysqli_report(MYSQLI_REPORT_OFF);
}

function getConnection() {
    static $conn = null;
    
    if ($conn === null) {
        try {
            $conn = new mysqli(
                DB_HOST,
                DB_USER,
                DB_PASS,
                DB_NAME,
                DB_PORT
            );

            if ($conn->connect_error) {
                throw new RuntimeException($conn->connect_error);
            }

            if (!$conn->set_charset('utf8mb4')) {
                throw new RuntimeException($conn->error);
            }
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Error de conexion con la base de datos: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    
    return $conn;
}
