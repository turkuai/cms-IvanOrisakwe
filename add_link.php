<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $href = $_POST['href'];

    if (!empty($name) && !empty($href)) {
        $db = new Database();
        $conn = $db->getConnection();

        $stmt = $conn->prepare("INSERT INTO links (name, href) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $href);
        $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        header("Location: admin.php?message=Social link added successfully");
    } else {
        header("Location: admin.php?error=Name and URL are required");
    }
}
?>