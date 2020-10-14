
function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    function animation(currentTime){
        if(startTime === null ) startTime = currentTime; 
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0,run);
        if(timeElapsed < duration) requestAnimationFrame(animation);

    }

    // function ease(t,b,c,d){
    //     t /= d / 2;
    //     if(t < 1) return c / 2 * t * t + b;
    //     t--;
    //     return -c / 2 * (t * (t - 2) - 1) + b;
    // }
    function ease(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    requestAnimationFrame(animation);

}

//home to about section
// var home = document.getElementsByClassName('home');

// home.addEventListener('click', function(){
//     smoothScroll('about', 2000);
// });

// var navAbout = document.querySelector('.navAbout');

// navAbout.addEventListener('click', function(){
//     smoothScroll('.about', 2000);
// });


//nav to projects section
var navProjects = document.querySelector('.navProjects');

navProjects.addEventListener('click', function(){
    smoothScroll('.projects', 2000);
});

//nav to contact section
var navContact = document.querySelector('.navContact');

navContact.addEventListener('click', function(){
    smoothScroll('.contact', 2000);
});

