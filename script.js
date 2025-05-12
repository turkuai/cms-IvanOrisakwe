// Load logo text
function loadLogo() {
  const logo = localStorage.getItem('logoText') || 'LOGO';
  const logoElement = document.getElementById('logo');
  if (logoElement) logoElement.textContent = logo;

  // Load into admin.html for editing
  const adminLogoInput = document.getElementById('logoText');
  if (adminLogoInput) adminLogoInput.value = logo;
}

// Save logo text
function saveLogo() {
  const logoText = document.getElementById('logoText').value;
  if (logoText.trim()) {
      localStorage.setItem('logoText', logoText);
      alert('Logo updated successfully!');
  } else {
      alert('Please enter a logo text.');
  }
}

// Load navigation links (header)
function loadNavLinks() {
  const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [
      { text: 'Home', url: '#' },
      { text: 'About', url: '#' },
      { text: 'Blog', url: '#' }
  ];

  // Save default links if none exist
  if (!localStorage.getItem('navLinks')) {
      localStorage.setItem('navLinks', JSON.stringify(navLinks));
  }

  // Display links on index.html (header)
  const navLinksList = document.getElementById('navLinks');
  if (navLinksList) {
      navLinksList.innerHTML = '';
      navLinks.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.text;
          navLinksList.appendChild(a);
      });
  }

  // Display links on admin.html with edit/delete buttons
  const adminNavLinksList = document.getElementById('navLinksList');
  if (adminNavLinksList) {
      adminNavLinksList.innerHTML = '';
      navLinks.forEach((link, index) => {
          const div = document.createElement('div');
          div.className = 'nav-link-item';
          div.innerHTML = `
              ${link.text} (${link.url})
              <button onclick="editNavLinkForm(${index})">✏️</button>
              <button onclick="deleteNavLink(${index})">🗑️</button>
          `;
          adminNavLinksList.appendChild(div);
      });
  }
}

// Add a new navigation link
function addNavLink() {
  const text = document.getElementById('navText').value;
  const url = document.getElementById('navUrl').value;

  if (text.trim() && url.trim()) {
      const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
      navLinks.push({ text, url });
      localStorage.setItem('navLinks', JSON.stringify(navLinks));
      loadNavLinks();
      document.getElementById('navText').value = '';
      document.getElementById('navUrl').value = '';
      alert('Navigation link added successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Prepare form for editing a navigation link
function editNavLinkForm(index) {
  const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
  const link = navLinks[index];
  document.getElementById('navText').value = link.text;
  document.getElementById('navUrl').value = link.url;
  document.getElementById('editNavIndex').value = index;
  document.getElementById('editNavButton').style.display = 'inline';
}

// Save edited navigation link
function editNavLink() {
  const index = document.getElementById('editNavIndex').value;
  const text = document.getElementById('navText').value;
  const url = document.getElementById('navUrl').value;

  if (text.trim() && url.trim()) {
      const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
      navLinks[index] = { text, url };
      localStorage.setItem('navLinks', JSON.stringify(navLinks));
      loadNavLinks();
      document.getElementById('navText').value = '';
      document.getElementById('navUrl').value = '';
      document.getElementById('editNavIndex').value = '';
      document.getElementById('editNavButton').style.display = 'none';
      alert('Navigation link updated successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Delete a navigation link with confirmation
function deleteNavLink(index) {
  if (confirm('Are you sure you want to delete this navigation link?')) {
      const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
      navLinks.splice(index, 1);
      localStorage.setItem('navLinks', JSON.stringify(navLinks));
      loadNavLinks();
      alert('Navigation link deleted successfully!');
  }
}

// Load articles
function loadArticles() {
  const defaultImage = 'https://imgs.search.brave.com/V1d9YPzDQJ1_3Qzx1omnwbcvTct3kUWnEMdeBk1w2Zs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcG9yc2NoZS5p/bWdpeC5uZXQvLS9t/ZWRpYS85N0Y3MTk4/RUQyRTA0NTA2QjdD/NDFCQjc0MEU1RUQ5/Q184Q0VBRDk0OUIz/Njc0RDY2OUM5RDIy/NUI2RTNDRkNBNF8x/LTFfUENOQS1FeHBl/cmllbmNlXzEyMDB4/MTIwMD9pYXI9MCZ3/PTEyOTkmYXI9MTox/JnE9ODUmYXV0bz1m/b3JtYXQ';

  const article1Title = localStorage.getItem('article1Title') || 'A title for your first article';
  const article1Text1 = localStorage.getItem('article1Text1') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const article1Text2 = localStorage.getItem('article1Text2') || 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.';
  const article1Image = localStorage.getItem('article1Image') || defaultImage;

  const article2Title = localStorage.getItem('article2Title') || 'A title for your first article';
  const article2Text1 = localStorage.getItem('article2Text1') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const article2Text2 = localStorage.getItem('article2Text2') || 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.';
  const article2Image = localStorage.getItem('article2Image') || defaultImage;

  // Load into index.html
  if (document.getElementById('article1Title')) {
      document.getElementById('article1Title').textContent = article1Title;
      document.getElementById('article1Text1').textContent = article1Text1;
      document.getElementById('article1Text2').textContent = article1Text2;
      document.getElementById('article1Image').src = article1Image;

      document.getElementById('article2Title').textContent = article2Title;
      document.getElementById('article2Text1').textContent = article2Text1;
      document.getElementById('article2Text2').textContent = article2Text2;
      document.getElementById('article2Image').src = article2Image;
  }

  // Load into admin.html for editing
  if (document.getElementById('article1Title')) {
      document.getElementById('article1Title').value = article1Title;
      document.getElementById('article1Text1').value = article1Text1;
      document.getElementById('article1Text2').value = article1Text2;
      document.getElementById('article1Image').value = article1Image;

      document.getElementById('article2Title').value = article2Title;
      document.getElementById('article2Text1').value = article2Text1;
      document.getElementById('article2Text2').value = article2Text2;
      document.getElementById('article2Image').value = article2Image;
  }
}

// Save article
function saveArticle(articleNumber) {
  const title = document.getElementById(`article${articleNumber}Title`).value;
  const text1 = document.getElementById(`article${articleNumber}Text1`).value;
  const text2 = document.getElementById(`article${articleNumber}Text2`).value;
  const image = document.getElementById(`article${articleNumber}Image`).value;

  if (title.trim() && text1.trim() && text2.trim() && image.trim()) {
      localStorage.setItem(`article${articleNumber}Title`, title);
      localStorage.setItem(`article${articleNumber}Text1`, text1);
      localStorage.setItem(`article${articleNumber}Text2`, text2);
      localStorage.setItem(`article${articleNumber}Image`, image);
      alert(`Article ${articleNumber} updated successfully!`);
  } else {
      alert('Please enter all fields for the article.');
  }
}

// Load footer content
function loadFooterContent() {
  const footerCompanyTitle = localStorage.getItem('footerCompanyTitle') || 'Wireframe';
  const footerCompanyDesc = localStorage.getItem('footerCompanyDesc') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const footerCopyright = localStorage.getItem('footerCopyright') || '© 2024, Wireframe, All rights reserved.';

  // Load into index.html
  if (document.getElementById('footerCompanyTitle')) {
      document.getElementById('footerCompanyTitle').textContent = footerCompanyTitle;
      document.getElementById('footerCompanyDesc').textContent = footerCompanyDesc;
      document.getElementById('footerCopyright').textContent = footerCopyright;
  }

  // Load into admin.html for editing
  if (document.getElementById('footerCompanyTitle')) {
      document.getElementById('footerCompanyTitle').value = footerCompanyTitle;
      document.getElementById('footerCompanyDesc').value = footerCompanyDesc;
      document.getElementById('footerCopyright').value = footerCopyright;
  }

  // Load footer navigation links
  const footerNavLinks = JSON.parse(localStorage.getItem('footerNavLinks')) || [
      { text: 'Home', url: '#' },
      { text: 'About', url: '#' },
      { text: 'Blog', url: '#' }
  ];

  // Save default footer nav links if none exist
  if (!localStorage.getItem('footerNavLinks')) {
      localStorage.setItem('footerNavLinks', JSON.stringify(footerNavLinks));
  }

  // Display footer nav links on index.html
  const footerNavLinksList = document.getElementById('footerNavLinks');
  if (footerNavLinksList) {
      footerNavLinksList.innerHTML = '';
      footerNavLinks.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.text;
          footerNavLinksList.appendChild(a);
      });
  }

  // Display footer nav links on admin.html with edit/delete buttons
  const adminFooterNavLinksList = document.getElementById('footerNavLinksList');
  if (adminFooterNavLinksList) {
      adminFooterNavLinksList.innerHTML = '';
      footerNavLinks.forEach((link, index) => {
          const div = document.createElement('div');
          div.className = 'footer-nav-link-item';
          div.innerHTML = `
              ${link.text} (${link.url})
              <button onclick="editFooterNavLinkForm(${index})">✏️</button>
              <button onclick="deleteFooterNavLink(${index})">🗑️</button>
          `;
          adminFooterNavLinksList.appendChild(div);
      });
  }
}

// Save footer content
function saveFooterContent() {
  const footerCompanyTitle = document.getElementById('footerCompanyTitle').value;
  const footerCompanyDesc = document.getElementById('footerCompanyDesc').value;
  const footerCopyright = document.getElementById('footerCopyright').value;

  if (footerCompanyTitle.trim() && footerCompanyDesc.trim() && footerCopyright.trim()) {
      localStorage.setItem('footerCompanyTitle', footerCompanyTitle);
      localStorage.setItem('footerCompanyDesc', footerCompanyDesc);
      localStorage.setItem('footerCopyright', footerCopyright);
      alert('Footer content updated successfully!');
  } else {
      alert('Please enter all footer content fields.');
  }
}

// Add a new footer navigation link
function addFooterNavLink() {
  const text = document.getElementById('footerNavText').value;
  const url = document.getElementById('footerNavUrl').value;

  if (text.trim() && url.trim()) {
      const footerNavLinks = JSON.parse(localStorage.getItem('footerNavLinks')) || [];
      footerNavLinks.push({ text, url });
      localStorage.setItem('footerNavLinks', JSON.stringify(footerNavLinks));
      loadFooterContent();
      document.getElementById('footerNavText').value = '';
      document.getElementById('footerNavUrl').value = '';
      alert('Footer navigation link added successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Prepare form for editing a footer navigation link
function editFooterNavLinkForm(index) {
  const footerNavLinks = JSON.parse(localStorage.getItem('footerNavLinks')) || [];
  const link = footerNavLinks[index];
  document.getElementById('footerNavText').value = link.text;
  document.getElementById('footerNavUrl').value = link.url;
  document.getElementById('editFooterNavIndex').value = index;
  document.getElementById('editFooterNavButton').style.display = 'inline';
}

// Save edited footer navigation link
function editFooterNavLink() {
  const index = document.getElementById('editFooterNavIndex').value;
  const text = document.getElementById('footerNavText').value;
  const url = document.getElementById('footerNavUrl').value;

  if (text.trim() && url.trim()) {
      const footerNavLinks = JSON.parse(localStorage.getItem('footerNavLinks')) || [];
      footerNavLinks[index] = { text, url };
      localStorage.setItem('footerNavLinks', JSON.stringify(footerNavLinks));
      loadFooterContent();
      document.getElementById('footerNavText').value = '';
      document.getElementById('footerNavUrl').value = '';
      document.getElementById('editFooterNavIndex').value = '';
      document.getElementById('editFooterNavButton').style.display = 'none';
      alert('Footer navigation link updated successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Delete a footer navigation link with confirmation
function deleteFooterNavLink(index) {
  if (confirm('Are you sure you want to delete this footer navigation link?')) {
      const footerNavLinks = JSON.parse(localStorage.getItem('footerNavLinks')) || [];
      footerNavLinks.splice(index, 1);
      localStorage.setItem('footerNavLinks', JSON.stringify(footerNavLinks));
      loadFooterContent();
      alert('Footer navigation link deleted successfully!');
  }
}

// Load social media links
function loadSocialLinks() {
  const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [
      { text: 'Facebook', url: '#' },
      { text: 'LinkedIn', url: '#' },
      { text: 'GitHub', url: '#' }
  ];

  // Save default links if none exist
  if (!localStorage.getItem('socialLinks')) {
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }

  // Display links on index.html
  const socialLinksList = document.getElementById('socialLinks');
  if (socialLinksList) {
      socialLinksList.innerHTML = '';
      socialLinks.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.text;
          socialLinksList.appendChild(a);
      });
  }

  // Display links on admin.html with edit/delete buttons
  const adminSocialLinksList = document.getElementById('socialLinksList');
  if (adminSocialLinksList) {
      adminSocialLinksList.innerHTML = '';
      socialLinks.forEach((link, index) => {
          const div = document.createElement('div');
          div.className = 'social-link-item';
          div.innerHTML = `
              ${link.text} (${link.url})
              <button onclick="editSocialLinkForm(${index})">✏️</button>
              <button onclick="deleteSocialLink(${index})">🗑️</button>
          `;
          adminSocialLinksList.appendChild(div);
      });
  }
}

// Add a new social media link
function addSocialLink() {
  const text = document.getElementById('socialText').value;
  const url = document.getElementById('socialUrl').value;

  if (text.trim() && url.trim()) {
      const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
      socialLinks.push({ text, url });
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
      loadSocialLinks();
      document.getElementById('socialText').value = '';
      document.getElementById('socialUrl').value = '';
      alert('Social link added successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Prepare form for editing a social media link
function editSocialLinkForm(index) {
  const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
  const link = socialLinks[index];
  document.getElementById('socialText').value = link.text;
  document.getElementById('socialUrl').value = link.url;
  document.getElementById('editSocialIndex').value = index;
  document.getElementById('editSocialButton').style.display = 'inline';
}

// Save edited social media link
function editSocialLink() {
  const index = document.getElementById('editSocialIndex').value;
  const text = document.getElementById('socialText').value;
  const url = document.getElementById('socialUrl').value;

  if (text.trim() && url.trim()) {
      const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
      socialLinks[index] = { text, url };
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
      loadSocialLinks();
      document.getElementById('socialText').value = '';
      document.getElementById('socialUrl').value = '';
      document.getElementById('editSocialIndex').value = '';
      document.getElementById('editSocialButton').style.display = 'none';
      alert('Social link updated successfully!');
  } else {
      alert('Please enter both display text and URL.');
  }
}

// Delete a social media link with confirmation
function deleteSocialLink(index) {
  if (confirm('Are you sure you want to delete this social media link?')) {
      const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
      socialLinks.splice(index, 1);
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
      loadSocialLinks();
      alert('Social link deleted successfully!');
  }
}