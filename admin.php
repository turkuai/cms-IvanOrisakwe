<?php
// admin.php
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
    <title>Admin - Edit Website Content</title>
    <link rel="stylesheet" href="wireframe.css" />
</head>
<body class="admin-body">
    <div class="header">
        <img id="logo" src="" alt="IAI Logo" class="editable-field" onclick="saveLogo()" />
        <div class="nav">
            <a href="index.php">Home</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
        </div>
    </div>
    <div class="content">
        <h2>Manage Articles</h2>
        <?php foreach ($sections as $section): ?>
            <div class="article">
                <h2><?php echo htmlspecialchars($section['title']); ?></h2>
                <p><?php echo htmlspecialchars($section['description']); ?></p>
                <img src="<?php echo htmlspecialchars($section['image_url']); ?>" alt="Article Image">
                <form action="edit_section.php" method="POST" class="edit-form">
                    <input type="hidden" name="id" value="<?php echo $section['id']; ?>">
                    <input type="text" name="title" value="<?php echo htmlspecialchars($section['title']); ?>" required>
                    <textarea name="description" required><?php echo htmlspecialchars($section['description']); ?></textarea>
                    <input type="text" name="image_url" value="<?php echo htmlspecialchars($section['image_url']); ?>" required>
                    <button type="submit">Update Article</button>
                </form>
                <form action="delete_section.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo $section['id']; ?>">
                    <button type="submit" class="edit-btn">Delete Article</button>
                </form>
            </div>
        <?php endforeach; ?>
        <h2>Add New Article</h2>
        <form action="add_section.php" method="POST" class="edit-form">
            <input type="text" name="title" placeholder="Article Title" required>
            <textarea name="description" placeholder="Article Content" required></textarea>
            <input type="text" name="image_url" placeholder="Image URL" required>
            <button type="submit">Add Article</button>
        </form>
    </div>
    <div class="footer">
        <div>Your company's name</div>
       
        <div class="social-links" id="social-links">
            <?php foreach ($socialLinks as $link): ?>
                <div class="social-link-item">
                    <a href="<?php echo htmlspecialchars($link['href']); ?>">
                        <?php echo htmlspecialchars($link['name']); ?>
                    </a>
                    <form action="edit_link.php" method="POST" class="edit-form">
                        <input type="hidden" name="id" value="<?php echo $link['id']; ?>">
                        <input type="text" name="name" value="<?php echo htmlspecialchars($link['name']); ?>" required>
                        <input type="text" name="href" value="<?php echo htmlspecialchars($link['href']); ?>" required>
                        <button type="submit">Edit</button>
                    </form>
                    <form action="delete_link.php" method="POST">
                        <input type="hidden" name="id" value="<?php echo $link['id']; ?>">
                        <button type="submit">Delete</button>
                    </form>
                </div>
            <?php endforeach; ?>
            <form action="add_link.php" method="POST">
                <input type="text" name="name" placeholder="Link Name" required>
                <input type="text" name="href" placeholder="Link URL" required>
                <button type="submit">Add Social Link</button>
            </form>
        </div>
        <div id="footer-note" class="editable-field" onclick="saveFooterNote()"></div>
        <button onclick="resetAll()">Reset All</button>
    </div>

    <script>
        // Keep localStorage for logo and footer note
        const logo = localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
        document.getElementById("logo").src = logo;
        const footerNote = localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.";
        document.getElementById("footer-note").textContent = footerNote;

        function saveLogo() {
            const logoUrl = prompt("Enter new logo URL:", localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png");
            if (logoUrl) {
                localStorage.setItem("logo", logoUrl);
                document.getElementById("logo").src = logoUrl;
                alert("Logo updated successfully! Refresh index.php to see changes.");
            } else {
                alert("No changes made.");
            }
        }

        function saveFooterNote() {
            const footerNote = prompt("Enter new footer note:", localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.");
            if (footerNote) {
                localStorage.setItem("footerNote", footerNote);
                document.getElementById("footer-note").textContent = footerNote;
                alert("Footer note updated successfully! Refresh index.php to see changes.");
            } else {
                alert("No changes made.");
            }
        }

        function resetAll() {
            if (confirm("Are you sure you want to reset all content to default? This will clear all changes.")) {
                localStorage.setItem("logo", "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png");
                localStorage.setItem("footerNote", "© 2024, Company's name. All rights reserved.");
                // Reset database content via PHP
                window.location.href = 'reset_all.php';
            }
        }
    </script>
</body>
</html>