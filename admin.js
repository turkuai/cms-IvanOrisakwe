// admin.js

let socialLinks = JSON.parse(localStorage.getItem("socialLinks")) || [
  { text: "Facebook", url: "#" },
  { text: "LinkedIn", url: "#" },
  { text: "GitHub", url: "#" }
];
let articles = JSON.parse(localStorage.getItem("articles")) || [
  {
      title: "A title for your first article",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56"
  },
  {
      title: "A title for your first article",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56"
  }
];

// Load initial values
window.onload = function() {
  // Load logo
  const logo = localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png";
  document.getElementById("logo").src = logo;

  // Load footer note
  const footerNote = localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.";
  document.getElementById("footer-note").textContent = footerNote;

  // Load social links
  renderSocialLinks();

  // Load articles
  renderArticles();
};

// Save logo
function saveLogo() {
  const logoUrl = prompt("Enter new logo URL:", localStorage.getItem("logo") || "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png");
  if (logoUrl) {
      localStorage.setItem("logo", logoUrl);
      document.getElementById("logo").src = logoUrl;
      alert("Logo updated successfully!");
  } else {
      alert("No changes made.");
  }
}

// Save footer note
function saveFooterNote() {
  const footerNote = prompt("Enter new footer note:", localStorage.getItem("footerNote") || "© 2024, Company's name. All rights reserved.");
  if (footerNote) {
      localStorage.setItem("footerNote", footerNote);
      document.getElementById("footer-note").textContent = footerNote;
      alert("Footer note updated successfully!");
  } else {
      alert("No changes made.");
  }
}

// Render social links
function renderSocialLinks() {
  const socialLinksContainer = document.getElementById("social-links");
  socialLinksContainer.innerHTML = "";
  socialLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.text;
      socialLinksContainer.appendChild(a);
  });
}

// Add social link
function addSocialLink() {
  const text = prompt("Enter display text for the social link:");
  const url = prompt("Enter URL for the social link:");
  if (text && url) {
      socialLinks.push({ text, url });
      localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
      renderSocialLinks();
      alert("Social link added successfully!");
  } else {
      alert("Both text and URL are required.");
  }
}

// Render articles
function renderArticles() {
  const contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = "";
  articles.forEach((article, index) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";
      articleDiv.innerHTML = `
          <h2 class="editable-field" onclick="editArticle(${index}, 'title')">${article.title}</h2>
          <p class="editable-field" onclick="editArticle(${index}, 'content')">${article.content}</p>
          <img src="${article.image}" alt="Article Image" class="editable-field" onclick="editArticle(${index}, 'image')">
          <button class="edit-btn" onclick="deleteArticle(${index})">Delete Article</button>
      `;
      contentDiv.appendChild(articleDiv);
  });
}

// Edit article
function editArticle(index, field) {
  let value;
  if (field === "title" || field === "content") {
      value = prompt(`Edit ${field}:`, articles[index][field]);
  } else if (field === "image") {
      value = prompt("Edit image URL:", articles[index][field]);
  }
  if (value !== null) {
      articles[index][field] = value;
      localStorage.setItem("articles", JSON.stringify(articles));
      renderArticles();
      alert(`${field} updated successfully!`);
  }
}

// Delete article
function deleteArticle(index) {
  if (confirm("Are you sure you want to delete this article?")) {
      articles.splice(index, 1);
      localStorage.setItem("articles", JSON.stringify(articles));
      renderArticles();
      alert("Article deleted successfully!");
  }
}

// Add new article
function addArticle() {
  const title = prompt("Enter article title:");
  const content = prompt("Enter article content:");
  const image = prompt("Enter article image URL:");
  if (title && content && image) {
      articles.push({ title, content, image });
      localStorage.setItem("articles", JSON.stringify(articles));
      renderArticles();
      alert("Article added successfully!");
  } else {
      alert("Title, content, and image URL are required.");
  }
}