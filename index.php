<?php
// index.php
require_once 'db_connect.php';

$db = new Database();
$conn = $db->getConnection();

// Fetch social links
$links_result = $conn->query("SELECT * FROM links");
$socialLinks = [];
while ($row = $links_result->fetch_assoc()) {
    $socialLinks[] = $row;
}

// Fetch sections (articles)
$sections_result = $conn->query("SELECT * FROM sections");
$sections = [];
while ($row = $sections_result->fetch_assoc()) {
    $sections[] = $row;
}

$db->closeConnection();
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
        <img id="logo" src="" alt="IAI Logo" />
        <div class="nav">
            <a href="index.php">Home</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="admin.php">Admin</a>
        </div>
    </div>
    <div class="content">
        <?php foreach ($sections as $section): ?>
            <div class="article">
                <h2><?php echo htmlspecialchars($section['title']); ?></h2>
                <p><?php echo htmlspecialchars($section['description']); ?></p>
                <img src="<?php echo htmlspecialchars($section['image_url']); ?>" alt="Article Image">
            </div>
        <?php endforeach; ?>
    </div>
    <div class="footer">
        <div>Your company's name</div>

        <div class="social-links" id="social-links">
            <?php foreach ($socialLinks as $link): ?>
                <div class="social-link-item">
                    <a href="<?php echo htmlspecialchars($link['href']); ?>">
                        <?php echo htmlspecialchars($link['name']); ?>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
        <div id="footer-note"></div>
    </div>

    <script>
        // Keep localStorage for logo and footer note
        const logo = localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
        document.getElementById("logo").src = logo;
        const footerNote = localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.";
        document.getElementById("footer-note").textContent = footerNote;
    </script>
</body>
</html>