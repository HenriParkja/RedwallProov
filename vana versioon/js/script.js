/* Temporary items for testing */ 
localStorage.setItem('cookies_enabled', '0'); // for testing keep the box for revisits

/* Disable Send btn by default */ 
let btn = document.getElementById("send-button"); 
//btn.disabled = true; // disable button until recaptcha is verified

/* Global variables */
let blockStickyCTA = false;

/* Scroll section by section - NOT IMPLEMENTED */
/*
let isScrolling = false;
let nextSection, prevSection;
var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    event.preventDefault();
  if (checkScrollDirectionIsUp(event)) { // scroll up
    
    let value; 
    if (prevSection) {
        value = prevSection.getBoundingClientRect().top + window.scrollY;
    }
    let currentSection = Math.ceil(window.scrollY / window.innerHeight + 0.1);
    prevSection = document.getElementById(currentSection - 1);
    if (!prevSection) {
        return;
    }
    let prevSectionY = prevSection.getBoundingClientRect().top + scrollY;
    window.scrollTo({
        top: prevSectionY - 16,
        left: 0,
        behavior: 'smooth'
      });
    window.onscroll = function(ev) {
        if(!prevSection) {
            return;
        }
        if ((window.scrollY + 16)>= Math.floor(prevSection.getBoundingClientRect().top + window.scrollY)) {
          isScrolling = false;
          
        }
    };
    if (!nextSection || isScrolling) {
        return;
    }
    isScrolling = true;

  } else { // Scroll down

    let value;
    if (nextSection) {
        value = nextSection.getBoundingClientRect().top + window.scrollY;
    }
    let currentSection = Math.ceil(window.scrollY / window.innerHeight + 0.1);
    nextSection = document.getElementById(currentSection + 1);
    console.log(nextSection);
    if (!nextSection) {
        console.log("return");
        return;
    }
    let nextSectionY = nextSection.getBoundingClientRect().top + scrollY;
    window.scrollTo({
        top: nextSectionY - 16,
        left: 0,
        behavior: 'smooth'
      });
    window.onscroll = function(ev) {
        if(!nextSection) {
            return;
        }
        if ((window.scrollY + 16)>= Math.floor(nextSection.getBoundingClientRect().top + window.scrollY)) {
          isScrolling = false;
          
        }
    };
    if (!nextSection || isScrolling) {
        return;
    }
    isScrolling = true;
    //document.body.style.overflow = "hidden"; 
    
  
  }
}


function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }
*/

/* Scroll to next section after intro by pressing button */
function scrollDown(target) {
    let section = document.getElementById("eelised");
    window.scrollTo(0, window.innerHeight-16);
  }


/* Handle showing cookie alert */
if ((localStorage.getItem('cookies_enabled') === null) || (localStorage.getItem('cookies_enabled') === '0')) {
    let cookieAlert = document.getElementById("cookie-alert");
    cookieAlert.style.display = "flex";
} else if (localStorage.getItem('cookies_enabled') === '1') {
    
}

// Hide cookie alert
function hideCookieAlert() {
    localStorage.setItem('cookies_enabled', '1');
    let cookieAlert = document.getElementById("cookie-alert");
    cookieAlert.classList.add("animate-cookies-alert");
}

/* Scroll to contact form when CTA is clicked */
function callToAction(target) {
    blockStickyCTA = true;
    let el = document.getElementById("kontakt");
    let value = el.getBoundingClientRect().top + window.scrollY;

    window.scroll(0, value);
}

/* Show sticky CTA */
let checkScrollForStickyCTA = function() {
    let y = window.scrollY;
    let value = document.getElementById("kontakt").getBoundingClientRect().top + window.scrollY;
    if (y >= value) {
        blockStickyCTA = false;
    }
    if (blockStickyCTA) {
        return;
    }

    let stickyCTA = document.getElementById("sticky-cta");
    let contactSection = document.getElementById("kontakt");
    if ((y >= window.innerHeight-18) && (contactSection.getBoundingClientRect().top >= window.innerHeight / 2)) {
        stickyCTA.style.display = "block";
    } else {
        stickyCTA.style.display = "none";
    }
}

if (window.innerWidth > 600) {
    window.addEventListener("scroll", checkScrollForStickyCTA);
}


/* Animate elements that appear on the page */

let infoBox1 = document.getElementById("info-box1");
let detailInfo = document.getElementById("detailinfo-wrapper");
let contactForm = document.getElementById("contact-form-wrapper");

// check the conditions for a static page
if ((window.scrollY >= 3 * window.innerHeight - 3*16 - 16) && (!infoBox1.classList.contains("animate"))) {   
    let infoBox2 = document.getElementById("info-box2");
    let textWrapper = document.getElementById("asukoht-kaardil-text-wrapper");
    infoBox1.classList.add("animate");
    infoBox2.classList.add("lower-info-box-animate");
    textWrapper.classList.add("animate");
}

if ((window.scrollY >= 4 * window.innerHeight - 4*16 - 16) && (!detailInfo.classList.contains("animate-detailinfo"))) {
    detailInfo.classList.add("animate-detailinfo");
}
if ((window.scrollY >= 5 * window.innerHeight - 5*16 - 16) && (!contactForm.classList.contains("animate-contact"))) {
    contactForm.classList.add("animate-contact");
}
 
window.onscroll = handleScrolling;



// check while scrolling
function handleScrolling() {
    
    // only on desktop 
    if (window.innerWidth <= 601) {
        return;
    }


    if ((window.scrollY >= 3 * window.innerHeight - 3*16 - 50) && (!infoBox1.classList.contains("animate"))) {
       
        let infoBox2 = document.getElementById("info-box2");
        let textWrapper = document.getElementById("asukoht-kaardil-text-wrapper");
    
        if (infoBox1.classList.contains("animate")) {
            return;
        } 
        
        infoBox1.classList.add("animate");
        infoBox2.classList.add("lower-info-box-animate");
        textWrapper.classList.add("animate");
        return;
    }

    if ((window.scrollY >= 4 * window.innerHeight - 4*16 - 50) && (!detailInfo.classList.contains("animate-detailinfo"))) {
        detailInfo.classList.add("animate-detailinfo");
    }
    if ((window.scrollY >= 5 * window.innerHeight - 5*16 - 50) && (!contactForm.classList.contains("animate-contact"))) {
        contactForm.classList.add("animate-contact");
    }
}

/* Handle ReCAPTCHA */
function recaptchaCallback() {

    let btn = document.getElementById("send-button"); 
    btn.disabled = false;
    btn.classList.remove("before-recaptcha");
    console.log("test");
    
}

/* Handle form */ 

let form = document.getElementById("contact-form");
form.addEventListener('submit', function(event) {
    event.preventDefault();
    sendData();
}); 

function sendData() {
    const XHR = new XMLHttpRequest();

    // remove any text if present
    let notificationBox = document.getElementById("form-notifications");
    if (notificationBox.firstChild) {
        notificationBox.removeChild(notificationBox.firstChild);
    }

    // process form data
    let data = new FormData(); 
    let name = document.getElementById("first-name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;    

    if (name == '' || email == '' || phone == '' || message == '') {
        let error = document.createElement("p");
        error.classList.add("body-m-basic");
        error.classList.add("cursive");
        error.style.marginTop = "8px";
        error.innerHTML = "Palun täida kõik väljad.";
        notificationBox.appendChild(error);
        
    } else {
        // add data to formData
        data.append("name", name);
        data.append("phone", phone);
        data.append("email", email);
        data.append("message", message);

        for (let pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {
        let error = document.createElement("p");
        error.classList.add("body-m-basic");
        error.classList.add("cursive");
        error.style.marginTop = "8px";
        error.innerHTML = event.target.responseText;
        notificationBox.appendChild(error);
        
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
        let error = document.createElement("p");
        error.classList.add("body-m-basic");
        error.classList.add("cursive");
        error.innerHTML = "Tekkis viga. Palun proovige uuesti.";
        notificationBox.appendChild(error);
    });

    // Set up request
    XHR.open("POST", "mail.php");

    // The data sent is what the user provided in the form
    XHR.send(data);

    }
    
}

/* Handle and display different elements on mobiles */

//window.addEventListener('resize', windowResizeEvent); 

window.onresize = windowResizeEvent;

function windowResizeEvent() {
    // display different heading for mobile/desktop
    let desktopHeading = document.getElementById("desktop-main-heading"); 
    let mobileHeading = document.getElementById("mobile-main-heading"); 
    let bottomLogo = document.getElementById("bottom-logo");
    if (window.innerWidth <= 337) {
    
        desktopHeading.style.display = "none";
        mobileHeading.style.display = "block";
    } else {
        
        mobileHeading.style.display = "none";
        desktopHeading.style.display = "block";
    }

    if (window.innerWidth < 1024) {
        bottomLogo.style.display = "none"; // Hide bottom logo
    }
    else {
        bottomLogo.style.display = "block";
    }
    if ((window.innerWidth <= 601) || (window.innerHeight <= 481)) {
        document.body.style.overflowX = "hidden";
        document.getElementById("scroll-down").style.display="none";

        // add new maps for mobile
        let img = document.createElement("img"); 
        img.src = "maps/map-est-zoom.png";
        let container = document.getElementById("asukoht-kaardil-img");
        if (container.firstChild) {
            console.log(container.firstChild);
            return;
        }
        container.appendChild(img); 
        img.classList.add("asukoht-kaardil-img-mobile");

        let flexWrapper = document.getElementById("asukoht-kaardil-flex-wrapper"); 
        let googleBtn = document.getElementById("google-maps-button"); 

        flexWrapper.appendChild(googleBtn); // move btn to another location
          


        
    } else {
        document.getElementById("scroll-down").style.display="block";

    }

    if (window.innerWidth <= 601) {
        
    }



}

windowResizeEvent();



// display different heading on mobile

// disable scroll down btn on mobile




// Implement intersection observer for animations
/*
const section = document.getElementById("asukoht-pildiga");
let observer = new IntersectionObserver((entry, observer) => {

    if (entry.intersectionRatio > 0) {
        console.log("test");
    }
   
}); 
observer.observe(section);*/










