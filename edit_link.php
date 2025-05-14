<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $href = $_POST['href'];

    if (!empty($id) && !empty($name) && !empty($href)) {
        $db = new Database();
        $conn = $db->getConnection();

        $stmt = $conn->prepare("UPDATE links SET name = ?, href = ? WHERE id = ?");
        $stmt->bind_param("ssi", $name, $href, $id);
        $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        header("Location: admin.php?message=Social link updated successfully");
    } else {
        header("Location: admin.php?error=All fields are required");
    }
}
?>