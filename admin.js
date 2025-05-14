// admin.js
renderAdminSocialLinks();
renderAdminArticles();

function renderAdminSocialLinks() {
  const socialLinksContainer = document.getElementById("social-links");
  socialLinksContainer.innerHTML = "";
  socialLinks.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "social-link-item";
    div.innerHTML = `
      <a href="${link.url}">${link.text}</a>
      <button onclick="editSocialLink(${index})">Edit</button>
      <button onclick="deleteSocialLink(${index})">Delete</button>
    `;
    socialLinksContainer.appendChild(div);
  });
  const addLinkBtn = document.createElement("button");
  addLinkBtn.textContent = "Add Social Link";
  addLinkBtn.onclick = addSocialLink;
  socialLinksContainer.appendChild(addLinkBtn);
}

function renderAdminArticles() {
  const contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = `
    <form method="POST" enctype="multipart/form-data">
      <label>Upload New Logo:</label>
      <input type="file" name="logo" accept="image/*" />
      <button type="submit">Upload Logo</button>
    </form>
    <form method="POST">
      <label>Edit Footer Note:</label>
      <input type="text" name="footerNote" value="${document.getElementById('footer-note').textContent}" />
      <button type="submit">Save Footer Note</button>
    </form>
  `;
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
  const addArticleBtn = document.createElement("button");
  addArticleBtn.textContent = "Add Article";
  addArticleBtn.onclick = addArticle;
  contentDiv.appendChild(addArticleBtn);
}

function addSocialLink() {
  const text = prompt("Enter display text for the social link:");
  const url = prompt("Enter URL for the social link:");
  if (text && url) {
    socialLinks.push({ text, url });
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    renderAdminSocialLinks();
    alert("Social link added successfully!");
  } else {
    alert("Both text and URL are required.");
  }
}

function editSocialLink(index) {
  const link = socialLinks[index];
  const newText = prompt("Edit display text:", link.text);
  const newUrl = prompt("Edit URL:", link.url);
  if (newText && newUrl) {
    socialLinks[index] = { text: newText, url: newUrl };
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    renderAdminSocialLinks();
    alert("Social link updated successfully!");
  } else {
    alert("Both text and URL are required.");
  }
}

function deleteSocialLink(index) {
  if (confirm("Are you sure you want to delete this social link?")) {
    socialLinks.splice(index, 1);
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    renderAdminSocialLinks();
    alert("Social link deleted!");
  }
}

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
    renderAdminArticles();
    alert(`${field} updated successfully!`);
  }
}

function deleteArticle(index) {
  if (confirm("Are you sure you want to delete this article?")) {
    articles.splice(index, 1);
    localStorage.setItem("articles", JSON.stringify(articles));
    renderAdminArticles();
    alert("Article deleted!");
  }
}

function addArticle() {
  const title = prompt("Enter article title:");
  const content = prompt("Enter article content:");
  const image = prompt("Enter article image URL:");
  if (title && content && image) {
    articles.push({ title, content, image });
    localStorage.setItem("articles", JSON.stringify(articles));
    renderAdminArticles();
    alert("Article added successfully!");
  } else {
    alert("Title, content, and image URL are required.");
  }
}

function resetAll() {
  if (confirm("Are you sure you want to reset all content to default? This will clear all changes.")) {
    localStorage.setItem("socialLinks", JSON.stringify([
      { text: "Facebook", url: "#" },
      { text: "LinkedIn", url: "#" },
      { text: "GitHub", url: "#" },
    ]));
    localStorage.setItem("articles", JSON.stringify([
      {
        title: "A title for your first article",
        content: "Lorem ipsum dolor sit amet...",
        image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56",
      },
      {
        title: "A title for your first article",
        content: "Lorem ipsum dolor sit amet...",
        image: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56",
      },
    ]));
    // Reset server-side data via a form submission
    document.body.insertAdjacentHTML('beforeend', `
      <form id="resetForm" method="POST" action="../admin/index.php">
        <input type="hidden" name="footerNote" value="© 2024, Company's name. All rights reserved.">
      </form>
    `);
    document.getElementById('resetForm').submit();
    alert("All content reset to default!");
  }
}