<?php

// 1. Setup necessary writable directories in /tmp for Vercel serverless environment
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/database',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
}

// 2. Setup SQLite database file in writable /tmp
$sqliteFile = '/tmp/database/database.sqlite';
if (!file_exists($sqliteFile)) {
    $sourceDb = __DIR__ . '/../database/database.sqlite';
    if (file_exists($sourceDb) && filesize($sourceDb) > 0) {
        @copy($sourceDb, $sqliteFile);
    } else {
        @touch($sqliteFile);
    }
}

if (!getenv('DB_DATABASE') || getenv('DB_CONNECTION') === 'sqlite') {
    putenv("DB_DATABASE={$sqliteFile}");
    $_ENV['DB_DATABASE'] = $sqliteFile;
    $_SERVER['DB_DATABASE'] = $sqliteFile;
}

// 3. Ensure HTTPS is recognized behind Vercel SSL proxy
if ((isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') || isset($_ENV['VERCEL']) || isset($_SERVER['VERCEL']) || is_dir('/tmp')) {
    $_SERVER['HTTPS'] = 'on';
    $_SERVER['SERVER_PORT'] = 443;
}

// 4. Forward request to Laravel public/index.php
require __DIR__ . '/../public/index.php';
