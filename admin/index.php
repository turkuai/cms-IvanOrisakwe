<?php
// admin/index.php
$data = json_decode(file_get_contents('../data.php'), true);
$logo = $data['logo'];
$footerNote = $data['footerNote'];

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Save footer note
    if (isset($_POST['footerNote'])) {
        $footerNote = $_POST['footerNote'];
        file_put_contents('../footer.json', json_encode(['footerNote' => $footerNote]));
    }

    // Handle logo upload
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        $allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
        $fileType = mime_content_type($_FILES['logo']['tmp_name']);
        
        if (in_array($fileType, $allowedTypes)) {
            // Delete existing logo if present
            $existingLogos = glob($uploadDir . 'logo.*');
            foreach ($existingLogos as $existing) {
                unlink($existing);
            }
            
            // Save new logo
            $ext = pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION);
            $newFileName = 'logo.' . $ext;
            move_uploaded_file($_FILES['logo']['tmp_name'], $uploadDir . $newFileName);
            $logo = $uploadDir . $newFileName;
        } else {
            echo "<script>alert('Invalid file type. Only PNG, JPEG, and GIF are allowed.');</script>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin - Edit Website Content</title>
    <link rel="stylesheet" href="../wireframe.css" />
  </head>
  <body class="admin-body">
    <div class="header">
      <img id="logo" src="<?php echo htmlspecialchars($logo); ?>" alt="IAI Logo" class="editable-field" />
      <div class="nav">
        <a href="../index.php">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
      </div>
    </div>
    <div class="content">
      <!-- Logo Upload Form -->
      <form method="POST" enctype="multipart/form-data">
        <label>Upload New Logo:</label>
        <input type="file" name="logo" accept="image/*" />
        <button type="submit">Upload Logo</button>
      </form>
      <!-- Footer Note Form -->
      <form method="POST">
        <label>Edit Footer Note:</label>
        <input type="text" name="footerNote" value="<?php echo htmlspecialchars($footerNote); ?>" />
        <button type="submit">Save Footer Note</button>
      </form>
    </div>
    <div class="footer">
      <div>Your company's name</div>
      <div>
        <a href="../index.php">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
      </div>
      <div class="social-links" id="social-links"></div>
      <div id="footer-note"><?php echo htmlspecialchars($footerNote); ?></div>
      <button onclick="resetAll()">Reset All</button>
    </div>

    <script src="../index.js"></script>
    <script src="../admin.js"></script>
  </body>
</html>