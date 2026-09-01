<?php

// Setup necessary writable directories in /tmp for Vercel serverless environment
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/database',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// Copy SQLite database to writable /tmp if using local SQLite database
$sqliteFile = '/tmp/database/database.sqlite';
if (!file_exists($sqliteFile)) {
    $sourceDb = __DIR__ . '/../database/database.sqlite';
    if (file_exists($sourceDb)) {
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

require __DIR__ . '/../public/index.php';
