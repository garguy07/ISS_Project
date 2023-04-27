// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get the search form and results div
    const searchForm = document.querySelector('form');
    const resultsDiv = document.querySelector('#results');

    // When the form is submitted, perform the search
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.querySelector('#searchTerm').value;
        searchiTunes(searchTerm);
    });

    // Function to search iTunes API
    function searchiTunes(term) {
        const endpoint = 'https://itunes.apple.com/search?';
        const searchTerm = 'term=' + encodeURIComponent(term);
        const entity = '&entity=song';
        const limit = '&limit=10';
        const url = endpoint + searchTerm + entity + limit;

        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.results))
            .catch(error => console.log(error));
    }

    // Function to display search results
    function displayResults(results) {
        // Clear any previous search results
        resultsDiv.innerHTML = '';

        // If no results, display a message
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        // Loop through the results and create a result div for each
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            const artwork = result.artworkUrl100.replace('100x100', '300x300');
            const trackName = result.trackName;
            const artistName = result.artistName;
            const albumName = result.collectionName;
            const genre = result.primaryGenreName;
            const releaseDate = result.releaseDate.slice(0, 4);
            const previewUrl = result.previewUrl;

            // Create a play button for each search result


            resultDiv.innerHTML = `
        <img src="${artwork}" alt="${trackName}">
        <h3>${trackName}</h3>
        <h4>${artistName}</h4>
        <p>${albumName} (${releaseDate})</p>
        <p>Genre: ${genre}</p>
      `;
            const playButton = document.createElement('span');
            playButton.classList.add('play');
            playButton.innerHTML = `
        <svg viewBox="0 0 100 100">
          <polygon points="30,20 80,50 30,80" />
        </svg>
      `;

            playButton.addEventListener('click', function () {
                // If there is an audio element already playing, stop it
                const audioElement = document.querySelector('audio');
                if (audioElement) {
                    audioElement.pause();
                    audioElement.remove();
                }

                // Create a new audio element for the preview URL and add it to the result div
                const audioElementNew = document.createElement('audio');
                audioElementNew.src = previewUrl;
                audioElementNew.controls = true;
                resultDiv.appendChild(audioElementNew);
            });



            resultsDiv.appendChild(resultDiv);
            resultDiv.insertBefore(playButton, resultDiv.secondChild);
            resultDiv.addEventListener('mouseover', function () {
                const img = resultDiv.querySelector('img');
                img.style.transform = 'scale(1.1)';
            });

            resultDiv.addEventListener('mouseout', function () {
                const img = resultDiv.querySelector('img');
                img.style.transform = 'scale(1)';
            });
        }
    }
});

const durationFilter = document.getElementById('durationFilter');
const explicitFilter = document.getElementById('explicitFilter');
const resultsDiv = document.getElementById('results');

function displayResults(results) {
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        const nameElement = document.createElement('h3');
        nameElement.textContent = result.trackName;
        const artistElement = document.createElement('p');
        artistElement.textContent = `by ${result.artistName}`;
        const posterElement = document.createElement('img');
        posterElement.src = result.artworkUrl100;
        posterElement.alt = `${result.collectionName} album poster`;
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        const sourceElement = document.createElement('source');
        sourceElement.src = result.previewUrl;
        sourceElement.type = 'audio/mpeg';
        audioElement.appendChild(sourceElement);
        resultDiv.appendChild(nameElement);
        resultDiv.appendChild(artistElement);
        resultDiv.appendChild(posterElement);
        resultDiv.appendChild(audioElement);
        resultsDiv.appendChild(resultDiv);
    });
}

function applyFilters() {
    const duration = durationFilter.value;
    const explicit = explicitFilter.value;
    const results = document.querySelectorAll('.result');

    results.forEach(result => {
        const durationText = result.querySelector('.duration').textContent;
        const explicitText = result.querySelector('.explicit').textContent;
        if (duration && durationText !== duration) {
            result.style.display = 'none';
        } else if (explicit && explicitText !== explicit) {
            result.style.display = 'none';
        } else {
            result.style.display = 'block';
        }
    });
}

durationFilter.addEventListener('change', applyFilters);
explicitFilter.addEventListener('change', applyFilters);

function clearFilters(filterObj) {
    for (let key in filterObj) {
        filterObj[key] = null; // Set filter value to null or default value
    }
}

function filterResults(maxDuration, isExplicit) {
    const results = Array.from(resultsDiv.children).map(child => child.children[0]);
    const filteredResults = results.filter(result => {
        const duration = result.querySelector('audio').duration / 60;
        const explicitness = result.querySelector('p').textContent.includes('Explicit');
        return (!maxDuration || duration <= maxDuration) && (!isExplicit || explicitness === (isExplicit === 'explicit'));
    }
    );
}