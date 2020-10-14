let slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  console.log(slideIndex);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
      slideIndex = 1;
      console.log(n);
      console.log(slideIndex)
    }
  if (n < 1) {
      slideIndex = slides.length;
      console.log(slides.length);
    }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";

}