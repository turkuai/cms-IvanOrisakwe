// Default data
const DEFAULT_DATA = {
  logo: "https://taito.edu.turku.fi/pluginfile.php/1/theme_mb2nl/logo/1729438228/tai_logo_300x150.png",
  companyName: "Your company's name",
  footerNote: "© 2024, Company's name. All rights reserved.",
  socialLinks: [
    { id: "social1", text: "Facebook", url: "#" },
    { id: "social2", text: "LinkedIn", url: "#" },
    { id: "social3", text: "GitHub", url: "#" }
  ],
  articles: [
    {
      id: "article1",
      title: "A title for your first article",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56"
    },
    {
      id: "article2",
      title: "A title for your second article",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "https://preview.redd.it/nissan-skyline-gtr-r34-these-are-all-the-photos-wallpapers-v0-2ifr1pr92bue1.jpg?width=640&crop=smart&auto=webp&s=4e7c1f72224a895d4c81cf1340cffe0e0547df56"
    }
  ]
};

// Helper function to get data from localStorage or use defaults
function getData() {
  const storedData = localStorage.getItem('websiteData');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Error parsing stored data:", e);
      return DEFAULT_DATA;
    }
  }
  return DEFAULT_DATA;
}

// Helper function to save data to localStorage
function saveData(data) {
  localStorage.setItem('websiteData', JSON.stringify(data));
  showSuccessMessage("Changes saved successfully!");
}

// Helper function to show a success message
function showSuccessMessage(message) {
  // Check if we're on the admin page
  if (document.querySelector('.admin-content')) {
    let successMessage = document.querySelector('.success-message');
    
    if (!successMessage) {
      successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      document.querySelector('.admin-content').prepend(successMessage);
    }
    
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }
}

// Initialize the home page
function initHomePage() {
  const data = getData();
  
  // Set logo
  document.getElementById('site-logo').src = data.logo;
  
  // Set company name and footer note
  document.getElementById('company-name').textContent = data.companyName;
  document.getElementById('footer-note').textContent = data.footerNote;
  
  // Render social links
  const socialLinksContainer = document.getElementById('social-links');
  socialLinksContainer.innerHTML = '';
  
  data.socialLinks.forEach(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link.url;
    linkElement.textContent = link.text;
    socialLinksContainer.appendChild(linkElement);
  });
  
  // Render articles
  const articleContainer = document.getElementById('article-container');
  articleContainer.innerHTML = '';
  
  data.articles.forEach(article => {
    articleContainer.innerHTML += `
      <div class="article">
        <h2>${article.title}</h2>
        <p>${article.content}</p>
        <img src="${article.imageUrl}" alt="${article.title}">
      </div>
    `;
  });
}

// Initialize the admin page
function initAdminPage() {
  const data = getData();
  
  // Set logo field
  document.getElementById('logo-url').value = data.logo;
  
  // Set company name and footer note fields
  document.getElementById('company-name-input').value = data.companyName;
  document.getElementById('footer-note-input').value = data.footerNote;
  
  // Render social links editor
  renderSocialLinksEditor();
  
  // Render articles editor
  renderArticlesEditor();
}

// Render social links editor
function renderSocialLinksEditor() {
  const data = getData();
  const socialLinksEditor = document.getElementById('social-links-editor');
  socialLinksEditor.innerHTML = '';
  
  data.socialLinks.forEach(link => {
    const linkEditor = document.createElement('div');
    linkEditor.className = 'social-link-editor';
    linkEditor.innerHTML = `
      <label>Link Text:</label>
      <input type="text" class="admin-input social-text-input" value="${link.text}" data-id="${link.id}">
      
      <label>Link URL:</label>
      <input type="text" class="admin-input social-url-input" value="${link.url}" data-id="${link.id}">
      
      <button class="delete-btn" onclick="removeSocialLink('${link.id}')">Remove</button>
      <button onclick="updateSocialLink('${link.id}')">Update</button>
    `;
    socialLinksEditor.appendChild(linkEditor);
  });
}

// Render articles editor
function renderArticlesEditor() {
  const data = getData();
  const articlesEditor = document.getElementById('articles-editor');
  articlesEditor.innerHTML = '';
  
  data.articles.forEach(article => {
    const articleEditor = document.createElement('div');
    articleEditor.className = 'article-editor';
    articleEditor.innerHTML = `
      <h3>Edit Article</h3>
      <label>Title:</label>
      <input type="text" class="admin-input article-title-input" value="${article.title}" data-id="${article.id}">
      
      <label>Content:</label>
      <textarea class="article-content-input" data-id="${article.id}">${article.content}</textarea>
      
      <label>Image URL:</label>
      <input type="text" class="admin-input article-image-input" value="${article.imageUrl}" data-id="${article.id}">
      
      <button class="delete-btn" onclick="removeArticle('${article.id}')">Remove Article</button>
      <button onclick="updateArticle('${article.id}')">Update Article</button>
    `;
    articlesEditor.appendChild(articleEditor);
  });
}

// Save logo
function saveLogo() {
  const logoUrl = document.getElementById('logo-url').value;
  const data = getData();
  data.logo = logoUrl;
  saveData(data);
}

// Save footer info
function saveFooter() {
  const companyName = document.getElementById('company-name-input').value;
  const footerNote = document.getElementById('footer-note-input').value;
  const data = getData();
  data.companyName = companyName;
  data.footerNote = footerNote;
  saveData(data);
}

// Add new social link
function addSocialLink() {
  const text = document.getElementById('social-text').value.trim();
  const url = document.getElementById('social-url').value.trim();
  
  if (!text || !url) {
    alert("Please enter both text and URL for the social link");
    return;
  }
  
  const data = getData();
  const newId = 'social' + (Date.now() % 10000);
  
  data.socialLinks.push({
    id: newId,
    text: text,
    url: url
  });
  
  saveData(data);
  renderSocialLinksEditor();
  
  // Clear input fields
  document.getElementById('social-text').value = '';
  document.getElementById('social-url').value = '';
}

// Update existing social link
function updateSocialLink(id) {
  const textInput = document.querySelector(`.social-text-input[data-id="${id}"]`);
  const urlInput = document.querySelector(`.social-url-input[data-id="${id}"]`);
  
  const text = textInput.value.trim();
  const url = urlInput.value.trim();
  
  if (!text || !url) {
    alert("Please enter both text and URL for the social link");
    return;
  }
  
  const data = getData();
  const linkIndex = data.socialLinks.findIndex(link => link.id === id);
  
  if (linkIndex !== -1) {
    data.socialLinks[linkIndex].text = text;
    data.socialLinks[linkIndex].url = url;
    saveData(data);
  }
}

// Remove social link
function removeSocialLink(id) {
  if (confirm("Are you sure you want to remove this social link?")) {
    const data = getData();
    data.socialLinks = data.socialLinks.filter(link => link.id !== id);
    saveData(data);
    renderSocialLinksEditor();
  }
}

// Add new article
function addNewArticle() {
  const data = getData();
  const newId = 'article' + (Date.now() % 10000);
  
  data.articles.push({
    id: newId,
    title: "New Article Title",
    content: "Enter your article content here...",
    imageUrl: "https://via.placeholder.com/640x360"
  });
  
  saveData(data);
  renderArticlesEditor();
}

// Update existing article
function updateArticle(id) {
  const titleInput = document.querySelector(`.article-title-input[data-id="${id}"]`);
  const contentInput = document.querySelector(`.article-content-input[data-id="${id}"]`);
  const imageInput = document.querySelector(`.article-image-input[data-id="${id}"]`);
  
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const imageUrl = imageInput.value.trim();
  
  if (!title || !content || !imageUrl) {
    alert("Please fill in all fields for the article");
    return;
  }
  
  const data = getData();
  const articleIndex = data.articles.findIndex(article => article.id === id);
  
  if (articleIndex !== -1) {
    data.articles[articleIndex].title = title;
    data.articles[articleIndex].content = content;
    data.articles[articleIndex].imageUrl = imageUrl;
    saveData(data);
    showSuccessMessage("Article updated successfully!");
  }
}

// Remove article
function removeArticle(id) {
  if (confirm("Are you sure you want to remove this article?")) {
    const data = getData();
    data.articles = data.articles.filter(article => article.id !== id);
    saveData(data);
    renderArticlesEditor();
  }
}

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', function() {
  // Check which page we're on
  if (document.querySelector('.admin-content')) {
    initAdminPage();
  } else {
    initHomePage();
  }
});