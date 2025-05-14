<?php
// data.php

// Load footer note from JSON file
$footerFile = 'footer.json';
$defaultFooter = "© 2024, Company's name. All rights reserved.";
$footerNote = $defaultFooter;

if (file_exists($footerFile)) {
    $footerNote = json_decode(file_get_contents($footerFile), true)['footerNote'] ?? $defaultFooter;
}

// Load logo URL (default or uploaded)
$logoDir = 'uploads/';
$defaultLogo = 'https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png';
$logo = $defaultLogo;

// Check for uploaded logo
$uploadedLogo = glob($logoDir . 'logo.*');
if (!empty($uploadedLogo)) {
    $logo = $uploadedLogo[0]; // Use the first matching logo file
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode([
    'footerNote' => $footerNote,
    'logo' => $logo
]);
?>