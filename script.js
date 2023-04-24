var taylorImg = document.getElementById("taylor");

taylorImg.style.filter = "grayscale(100%)";

taylorImg.addEventListener("mouseover", function () {
    taylorImg.style.filter = "grayscale(0%)";
    taylorImg.style.transition = "transform 0.5s ease"
});

taylorImg.addEventListener("mouseout", function () {
    taylorImg.style.filter = "grayscale(100%)";
    taylorImg.style.transition = "transform 0.5s ease"
});

taylorImg.addEventListener("mouseover", function () {
    taylorImg.style.transform = "scale(1.15)";
    taylorImg.style.transition = "transform 0.5s ease"
});

taylorImg.addEventListener("mouseout", function () {
    taylorImg.style.transform = "scale(1)";
    taylorImg.style.transition = "transform 0.5s ease";
});

const countdownElement = document.getElementById("countdown");

var countDownDate = new Date("Jun 30, 2023 00:00:00").getTime();

countdownElement.style.color = 'Silver';
countdownElement.style.fontSize = '30px';
countdownElement.style.fontFamily = 'Courier New'

var x = setInterval(function () {

    var now = new Date().getTime();
    
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

const artists = ['Taylor Swift', 'Shawn Mendes', 'Charlie Puth', 'Alan Walker', 'Ed Sheeran'];

const ratingForm = document.getElementById('rating-form');
const artistSelect = document.getElementById('artist-select');
const reviewTable = document.getElementById('review-table');

artists.forEach((artist) => {
    const option = document.createElement('option');
    option.text = artist;
    artistSelect.add(option);
});

ratingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const artist = artistSelect.value;
    const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
    const review = document.getElementById('review').value;
    const name = document.getElementById('name').value;

    const row = reviewTable.insertRow();
    const artistCell = row.insertCell();
    const ratingCell = row.insertCell();
    const reviewCell = row.insertCell();
    const userCell = row.insertCell();
    artistCell.innerHTML = artist;
    ratingCell.innerHTML = rating;
    reviewCell.innerHTML = review;
    userCell.innerHTML = name;

    ratingForm.reset();
});