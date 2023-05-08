var next_img1 = document.getElementsByClassName("like-button-1");
var img_ind1 = 0;
var imgs1 = ["grey_heart.png", "red_heart.png"];
var img_elem1 = document.getElementById("like-id-1");
for (var i = 0; i < next_img1.length; i++) {
    next_img1[i].addEventListener("click", function () {
        img_ind1++;
        if (img_ind1 == 2) {
            img_ind1 = 0;
        }
        img_elem1.src = imgs1[img_ind1];
    });
}

var next_img2 = document.getElementsByClassName("like-button-2");
var img_ind2 = 0;
var imgs2 = ["grey_heart.png", "red_heart.png"];
var img_elem2 = document.getElementById("like-id-2");
for (var i = 0; i < next_img2.length; i++) {
    next_img2[i].addEventListener("click", function () {
        img_ind2++;
        if (img_ind2 == 2) {
            img_ind2 = 0;
        }
        img_elem2.src = imgs[img_ind2];
    });
}

