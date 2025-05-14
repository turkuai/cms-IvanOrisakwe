<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $image_url = $_POST['image_url'];

    if (!empty($title) && !empty($description) && !empty($image_url)) {
        $db = new Database();
        $conn = $db->getConnection();

        $stmt = $conn->prepare("INSERT INTO sections (title, description, image_url) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $title, $description, $image_url);
        $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        header("Location: admin.php?message=Article added successfully");
    } else {
        header("Location: admin.php?error=All fields are required");
    }
}
?>