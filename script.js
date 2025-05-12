// Load logo text
function loadLogo() {
  const logo = localStorage.getItem('logoText') || 'My Website';
  document.getElementById('logo').textContent = logo;
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

// Load footer note
function loadFooterNote() {
  const footerNote = localStorage.getItem('footerNote') || '© 2025 My Website. All rights reserved.';
  document.getElementById('footerNote').textContent = footerNote;
}

// Save footer note
function saveFooterNote() {
  const footerNote = document.getElementById('footerNote').value;
  if (footerNote.trim()) {
    localStorage.setItem('footerNote', footerNote);
    alert('Footer note updated successfully!');
  } else {
    alert('Please enter a footer note.');
  }
}

// Load social media links
function loadSocialLinks() {
  const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [
    { text: 'Facebook', url: 'https://facebook.com' },
    { text: 'Twitter', url: 'https://twitter.com' },
    { text: 'Instagram', url: 'https://instagram.com' }
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
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link.url}" target="_blank">${link.text}</a>`;
      socialLinksList.appendChild(li);
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
        <button onclick="editSocialLinkForm(${index})">Edit</button>
        <button onclick="deleteSocialLink(${index})">Delete</button>
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
  document.getElementById('editIndex').value = index;
  document.getElementById('editButton').style.display = 'inline';
}

// Save edited social media link
function editSocialLink() {
  const index = document.getElementById('editIndex').value;
  const text = document.getElementById('socialText').value;
  const url = document.getElementById('socialUrl').value;

  if (text.trim() && url.trim()) {
    const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
    socialLinks[index] = { text, url };
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    loadSocialLinks();
    document.getElementById('socialText').value = '';
    document.getElementById('socialUrl').value = '';
    document.getElementById('editIndex').value = '';
    document.getElementById('editButton').style.display = 'none';
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