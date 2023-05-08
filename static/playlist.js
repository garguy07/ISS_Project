// Get the playlist element
const playlist = document.getElementById("playlist");

// An array of songs
const songs = [
  { title: "Song 1", artist: "Artist 1" },
  { title: "Song 2", artist: "Artist 2" },
  { title: "Song 3", artist: "Artist 3" },
];

// Function to create a list item for a song
function createSongListItem(song) {
  // Create the list item
  const li = document.createElement("li");

  // Create the title element
  const titleElement = document.createElement("span");
  titleElement.innerText = song.title;

  // Create the artist element
  const artistElement = document.createElement("span");
  artistElement.innerText = song.artist;
  artistElement.style.marginLeft = "10px";

  // Create the remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", () => {
    playlist.removeChild(li);
  });

  // Add the elements to the list item
  li.appendChild(titleElement);
  li.appendChild(artistElement);
  li.appendChild(removeButton);

  return li;
}

// Add the songs to the playlist
songs.forEach((song) => {
  playlist.appendChild(createSongListItem(song));
});
