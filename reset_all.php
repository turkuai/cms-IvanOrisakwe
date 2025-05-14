<?php
require_once 'db_connect.php';

$db = new Database();
$conn = $db->getConnection();

$conn->query("TRUNCATE TABLE links");
$conn->query("TRUNCATE TABLE sections");

$stmt = $conn->prepare("INSERT INTO links (name, href) VALUES (?, ?)");
$defaults = [
    ['Facebook', '#'],
    ['LinkedIn', '#'],
    ['GitHub', '#']
];
foreach ($defaults as $link) {
    $stmt->bind_param("ss", $link[0], $link[1]);
    $stmt->execute();
}

// Insert default sections
$stmt = $conn->prepare("INSERT INTO sections (title, description, image_url) VALUES (?, ?, ?)");
$defaultSections = [
    [
        'A title for your first article',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56'
    ],
    [
        'A title for your first article',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56'
    ]
];
foreach ($defaultSections as $section) {
    $stmt->bind_param("sss", $section[0], $section[1], $section[2]);
    $stmt->execute();
}
$stmt->close();
$db->closeConnection();

header("Location: admin.php?message=All content reset to default");
?>