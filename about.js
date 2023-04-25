var text = "ABOUT BEATS";

var typingText = document.getElementById("typing");

var i = 0;

function typeWriter(text, i) {
    if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1);
        }, 300);
    }
}

typeWriter(text, 0);