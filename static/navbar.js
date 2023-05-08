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
function saveToDB(songName) {
  // Send the songName to your server using AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:5001/add_song');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log(xhr.responseText);
      }
  };
  xhr.send(JSON.stringify({ songName: songName }));
}