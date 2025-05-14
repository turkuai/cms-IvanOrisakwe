<?php
// index.php
$data = json_decode(file_get_contents('data.php'), true);
$logo = $data['logo'];
$footerNote = $data['footerNote'];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IAI</title>
    <link rel="stylesheet" href="wireframe.css" />
  </head>
  <body>
    <div class="header">
      <img id="logo" src="<?php echo htmlspecialchars($logo); ?>" alt="IAI Logo" />
      <div class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="admin/index.php">Admin</a>
      </div>
    </div>
    <div class="content"></div>
    <div class="footer">
      <div>Your company's name</div>
      <div>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
      </div>
      <div class="social-links" id="social-links"></div>
      <div id="footer-note"><?php echo htmlspecialchars($footerNote); ?></div>
    </div>

    <script src="index.js"></script>
  </body>
</html>