<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $image_url = $_POST['image_url'];

    if (!empty($id) && !empty($title) && !empty($description) && !empty($image_url)) {
        $db = new Database();
        $conn = $db->getConnection();

        $stmt = $conn->prepare("UPDATE sections SET title = ?, description = ?, image_url = ? WHERE id = ?");
        $stmt->bind_param("sssi", $title, $description, $image_url, $id);
        $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        header("Location: admin.php?message=Article updated successfully");
    } else {
        header("Location: admin.php?error=All fields are required");
    }
}
?>