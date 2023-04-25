// Get the navbar element
const nav = document.querySelector('nav');

// Add a click event listener to the navbar
nav.addEventListener('click', (event) => {
  // Check if the clicked element is a link
  if (event.target.tagName === 'a') {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the href value of the clicked link
    const href = event.target.getAttribute('href');

    // Use the href value to scroll to the appropriate section of the page
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  }
});