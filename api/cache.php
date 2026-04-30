<?php

define('API_CACHE_VERSION', '20260430_tech_fields');
define('API_CACHE_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR . '.cache' . DIRECTORY_SEPARATOR . 'api');
define('API_CACHE_TTL', 300);

function apiCacheIsBypassed() {
    return isset($_GET['refresh']) && $_GET['refresh'] === '1';
}

function apiCacheKey($scope, array $parts = []) {
    $payload = [
        'version' => API_CACHE_VERSION,
        'scope' => $scope,
        'parts' => $parts,
    ];

    return preg_replace('/[^a-z0-9_\-]/i', '_', $scope) . '_' . sha1(json_encode($payload)) . '.json';
}

function apiCachePath($key) {
    return API_CACHE_DIR . DIRECTORY_SEPARATOR . $key;
}

function apiCacheEnsureDir() {
    if (is_dir(API_CACHE_DIR)) {
        return true;
    }

    return mkdir(API_CACHE_DIR, 0775, true) || is_dir(API_CACHE_DIR);
}

function apiCacheGet($key, $ttl = API_CACHE_TTL) {
    if (apiCacheIsBypassed()) {
        return null;
    }

    $path = apiCachePath($key);
    if (!is_file($path)) {
        return null;
    }

    if ((time() - filemtime($path)) > $ttl) {
        @unlink($path);
        return null;
    }

    $raw = @file_get_contents($path);
    if ($raw === false || $raw === '') {
        return null;
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded) || !array_key_exists('data', $decoded)) {
        @unlink($path);
        return null;
    }

    return $decoded['data'];
}

function apiCacheSet($key, $data) {
    if (!apiCacheEnsureDir()) {
        return false;
    }

    $path = apiCachePath($key);
    $payload = json_encode([
        'createdAt' => time(),
        'data' => $data,
    ], JSON_UNESCAPED_UNICODE);

    if ($payload === false) {
        return false;
    }

    return @file_put_contents($path, $payload, LOCK_EX) !== false;
}

function apiCacheClearAll() {
    if (!is_dir(API_CACHE_DIR)) {
        return;
    }

    $files = glob(API_CACHE_DIR . DIRECTORY_SEPARATOR . '*.json');
    if (!$files) {
        return;
    }

    foreach ($files as $file) {
        if (is_file($file)) {
            @unlink($file);
        }
    }
}

function apiJsonResponse($data, $cacheHit = false) {
    header('X-API-Cache: ' . ($cacheHit ? 'HIT' : 'MISS'));
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
