const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const durationInput = document.getElementById('max-duration-input');
const explicitnessInput = document.getElementById('explicit-input');
const clearFiltersButton = document.getElementById('reset-filters-button');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    let url = `https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=10`;
    //limit=10 creates a limit of maximum of 10 elements
    if (durationInput.value) {
        const durationInSeconds = parseInt(durationInput.value) * 60;
        url += `&duration=${durationInSeconds}`;
    }
    if (explicitnessInput.checked) {
        url += '&explicit=yes';
    }


    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            searchResults.innerHTML = '';

            if (data.resultCount === 0) {
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'search-row';
                noResultsMessage.innerHTML = '<div class="errorpara">No results found</div>';
                searchResults.appendChild(noResultsMessage);
            }
            else {
                let row;
                for (let i = 0; i < data.results.length; i++) {
                    const result = data.results[i];
                    const trackName = result.trackName;
                    const artistName = result.artistName;
                    const artworkUrl = result.artworkUrl100;
                    const previewUrl = result.previewUrl;
                    const explicitness = result.trackExplicitness;
                    const duration = (result.trackTimeMillis / 1000) / 60;

                    if (explicitness === 'explicit' && explicitnessInput.checked) {
                        continue; // skip explicit tracks if checkbox not checked
                    }
                    if (durationInput.value && duration > durationInput.value) {
                        continue; // skip tracks longer than duration limit
                    }

                    if (i % 3 === 0) { // create a new row after every 3 search results
                        row = document.createElement('div');
                        row.className = 'search-row';
                        searchResults.appendChild(row);
                    }

                    const column = document.createElement('div');
                    column.className = 'search-column';

                    column.innerHTML = `
                <div style="padding: 20px">
                    <div class="track-name">${trackName}</div>
                    <div class="artist-name">${artistName}</div>
                    <div class="artwork"><img src="${artworkUrl}" alt="${trackName}"></div>
                    <div class="preview"><audio controls><source src="${previewUrl}" type="audio/mpeg"></audio></div>
                </div>`;
                    row.appendChild(column);
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });




    clearFiltersButton.addEventListener('click', () => {
        durationInput.value = '';
        explicitnessInput.checked = false;
    });
});