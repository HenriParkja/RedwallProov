let snapScrollingEnabled = true; // by default
/* Function to handle CTA click */ 

function handleCTA() {
    desktopCTA = document.getElementById("desktop-cta"); 
    let scrollTo = document.getElementById("kontakt").getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: scrollTo,
        left: 0, 
        behavior: 'smooth'
    }); 
}

/* Handle cookie notice */ 

localStorage.setItem('cookies_enabled', '0'); // for testing set 0
if ((localStorage.getItem('cookies_enabled') === null) || (localStorage.getItem('cookies_enabled') === '0')) {
    let cookieNotice = document.getElementById("cookie-notice");
    cookieNotice.style.display = "flex";
} else if (localStorage.getItem('cookies_enabled') === '1') {
    // TODO 
}

function hideCookieNotice() {
    localStorage.setItem('cookies_enabled', '1');
    let cookieNotice = document.getElementById("cookie-notice");
    cookieNotice.classList.add("animate-cookie-notice");
}

/* Static elements */ 

// scroll to next section
function scrollDown() {
    window.scrollTo(0, window.innerHeight-16);
  }

/* To-Do on page load */ 

// Hide bottom logo if screen too narrow 
let bottomLogo = document.getElementById("bottom-logo");
if(window.innerWidth < 1024) {
    bottomLogo.style.display = "none"; 
} else {
    bottomLogo.style.display = "block"; 

}

// Display different heading for mobile
let mobileHeading = document.getElementById("heading-mobile");
let desktopHeading = document.getElementById("heading-desktop");

if(window.innerWidth < 360) {
    mobileHeading.style.display = "block";
    desktopHeading.style.display = "none";

} else {
    mobileHeading.style.display = "none";
    desktopHeading.style.display = "block";
}

let scrollDownBtn = document.getElementById("scrolldown");
let detailInfoImg = document.getElementById("detailinfo-img");

if (isMobile()) {


    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); // consider viewport changes in mobile due to address bar

    detailInfoImg.style.display = "block";
    scrollDownBtn.style.display = "none"; // Hide scrolldown btn
    
} else {
    scrollDownBtn.style.display = "block";
    detailInfoImg.style.display = "none";

}

// In mobile landscape prevent logo being too large
let logo = document.getElementById("logo");
if (window.innerHeight < 350) {
    logo.style.height = "15vh";
    desktopHeading.style.bottom = "60px";
} else if ((window.innerHeight) < 481 && (window.innerHeight > 350)) {
    desktopHeading.style.bottom = "80px";
    logo.style.height = "10vw";
} else {
    logo.style.height = "10vw";
    desktopHeading.style.bottom = "153px";
}


/* Also change everything when viewport size changes  */

// Before define the current size - in order not to change when only the address bar dissapears
let currentHeight = window.innerHeight;
let currentWidth = window.innerWidth;

window.addEventListener('resize', () => {

    let vh = window.innerHeight; 
    let vw = window.innerWidth;
    let deltaHeight = Math.abs(currentHeight - vh);
    let deltaWidth = Math.abs(currentWidth - vw);
    if ((deltaHeight > 100) || (deltaWidth > 100)) {
        vh = vh * 0.01; // unit
        document.documentElement.style.setProperty('--vh', `${vh}px`); 
    }
    
    // Toggle snap scrolling
    if (isMobile() && snapScrollingEnabled) {
        let scroll = document.getElementsByTagName("section"); 
    
        for (let i = 0; i < 3; i++) {
            if (scroll[i].classList.contains("scroll")) {
                scroll[i].classList.remove("scroll");
            }
             
        }
        let lastScroll = document.getElementById("kontakt");
        if (lastScroll.classList.contains("scroll-end")) {
            lastScroll.classList.remove("scroll-end");
        }
        
        snapScrollingEnabled = false; 
    } else if (!isMobile() && !snapScrollingEnabled) {
        let scroll = document.getElementsByTagName("section"); 
    
        for (let i = 0; i < 3; i++) {
            scroll[i].classList.add("scroll"); 
        }
        let lastScroll = document.getElementById("kontakt");
        lastScroll.classList.add("scroll-end");
        snapScrollingEnabled = true; 
    }

    if(isMobile()) {
        stickyCTA.style.display = "none";
        let detailInfoWrapper = document.getElementById("detailinfo-wrapper");

        if (detailInfoWrapper.classList.contains("animate-detailinfo")) {
            detailInfoWrapper.classList.remove("animate-detailinfo");
        }

        let kontaktWrapper = document.getElementById("kontakt-wrapper"); 
        if(kontaktWrapper.classList.contains("animate-kontakt")) {
            kontaktWrapper.classList.remove("animate-kontakt");
        }
        
    } else {
        stickyCTA.style.display = "block";
    }


   // Hide bottom logo if screen too narrow 
    if(window.innerWidth < 1024) {
        bottomLogo.style.display = "none"; 
    } else {
        bottomLogo.style.display = "block"; 
    
    }

    // Display different content for mobile 
    let mobileHeading = document.getElementById("heading-mobile");
    let desktopHeading = document.getElementById("heading-desktop");
    if(window.innerWidth < 360) {
        // Different heading
        let mobileHeading = document.getElementById("heading-mobile");
        mobileHeading.style.display = "block";
        desktopHeading.style.display = "none";
    
    } else {
        mobileHeading.style.display = "none";
        desktopHeading.style.display = "block";
    }

    if (isMobile()) {
        
        detailInfoImg.style.display = "block";
        // hide scrolldown btn 
        scrollDownBtn.style.display = "none";
    } else {
        detailInfoImg.style.display = "none";
        scrollDownBtn.style.display = "block";
    }

    // mostly for mobile landscapes to prevent too large logo
    if (window.innerHeight < 350) {
        logo.style.height = "15vh";
        desktopHeading.style.bottom = "60px"; // and let heading be a bit lower
    } else if ((window.innerHeight) < 481 && (window.innerHeight > 350)) {
        desktopHeading.style.bottom = "80px";
        logo.style.height = "10vw";
    } else {
        logo.style.height = "10vw";
        desktopHeading.style.bottom = "153px";
    }

})

/* Everything related to scrolling  */

let detailInfoWrapper = document.getElementById("detailinfo-wrapper"); 
let detailInfo = document.getElementById("detailinfo"); 
let kontakt = document.getElementById("kontakt"); 
let kontaktWrapper = document.getElementById("kontakt-wrapper");
let stickyCTA = document.getElementById("sticky-cta"); 

// display sticky cta
if (!isMobile()) {
    if (((window.scrollY) > (window.innerHeight - 17)) && (window.scrollY < (window.innerHeight + window.innerHeight / 2))) {
        stickyCTA.style.display = "block";
    } else {
        stickyCTA.style.display = "none";
    }
}


window.addEventListener('scroll', () => {
      
    if (!isMobile()) {
        if (((window.scrollY) > (window.innerHeight - 17)) && (window.scrollY < (window.innerHeight + window.innerHeight / 2))) {
            stickyCTA.style.display = "block";
        } else {
            stickyCTA.style.display = "none";
        }
    }
    // animate detailinfo
    
    let detailinfoRect = detailInfo.getBoundingClientRect();  
    if((Math.abs(detailinfoRect.top - 16) <= 10) && (!detailInfoWrapper.classList.contains("animate-detailinfo")) 
    && (!isMobile())) {
        
        detailInfoWrapper.classList.add("animate-detailinfo");
        document.getElementById("detailinfo-transparent").classList.add("animate-transparent-layer");
    }    

    // animate contact 
    let kontaktRect = kontakt.getBoundingClientRect();
    if((Math.abs(kontaktRect.top - 16) <= 20) && (!kontaktWrapper.classList.contains("animate-kontakt"))
    && (!isMobile())) {
        
        kontaktWrapper.classList.add("animate-kontakt");
        
    }

    if((((Math.abs(kontaktRect.top - 16) <= 20) && (!kontaktWrapper.classList.contains("animate-kontakt"))) || (kontaktRect.top - 16 < -1))
    && (!isMobile())) {
        

        kontaktWrapper.classList.add("animate-kontakt");
        
    }
})

/* Animate elements that will appear without scrolling */ 
// animate detailinfo
let detailinfoRect = detailInfo.getBoundingClientRect();  
if((Math.abs(detailinfoRect.top - 16) <= 10) && (!detailInfoWrapper.classList.contains("animate-detailinfo"))
&& (!isMobile())) {
    detailInfoWrapper.classList.add("animate-detailinfo");
    document.getElementById("detailinfo-transparent").classList.add("animate-transparent-layer");
}    

// animate contact 
let kontaktRect = kontakt.getBoundingClientRect();
if((((Math.abs(kontaktRect.top - 16) <= 10) && (!kontaktWrapper.classList.contains("animate-kontakt"))) || (kontaktRect.top - 16 < -1))
&& (!isMobile())) {
    kontaktWrapper.classList.add("animate-kontakt")
    
}

// Disable snap scroll on mobile 

if (isMobile() && snapScrollingEnabled) {
    let scroll = document.getElementsByTagName("section"); 

    for (let i = 0; i < 3; i++) {
        scroll[i].classList.remove("scroll"); 
    }
    let lastScroll = document.getElementById("kontakt");
    lastScroll.classList.remove("scroll-end");
    snapScrollingEnabled = false; 
}




/* Handle ReCAPTCHA */
function recaptchaCallback() {

    sendBtn.disabled = false;
    sendBtn.classList.remove("before-recaptcha");

    
}

/* Handle form */ 

let form = document.getElementById("contact-form");
let sendBtn = document.getElementById("send-button"); 
sendBtn.disabled = true; // disable by default
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
        error.style.color = "white";
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


    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {
        let error = document.createElement("p");
        error.classList.add("body-m-basic");
        error.classList.add("cursive");
        error.style.marginTop = "8px";
        error.style.color = "white";

        error.innerHTML = event.target.responseText;
        notificationBox.appendChild(error);
        
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
        let error = document.createElement("p");
        error.classList.add("body-m-basic");
        error.classList.add("cursive");
        error.style.color = "white";

        error.innerHTML = "Tekkis viga. Palun proovige uuesti.";
        notificationBox.appendChild(error);
    });

    // Set up request
    XHR.open("POST", "mail.php");

    // The data sent is what the user provided in the form
    XHR.send(data);

    }

}

// Check if device is mobile according to breakpoints
function isMobile () {
    if ((window.innerWidth <= 600) || (window.innerHeight) <= 600) {
        return true;
    } else return false;
    
}

