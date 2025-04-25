const container = document.getElementById('container');
const cursor = document.getElementById('cursor');
const grid = document.getElementById('grid');
const navButtons = document.querySelectorAll('.nav-button');
const menuCards = document.querySelectorAll('.menu-card');
const backButtons = document.querySelectorAll('.back-button');
const pages = document.querySelectorAll('.page-content');
const body = document.body;

// 3d effect on hovering
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    const xRotation = (e.clientY / window.innerHeight - 0.5) * -20;
    const yRotation = (e.clientX / window.innerWidth - 0.5) * 20;
    // rotation to container
    container.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    // parallax effect
    const gridX = (e.clientX / window.innerWidth - 0.5) * 40;
    const gridY = (e.clientY / window.innerHeight - 0.5) * 40;
    grid.style.transform = `rotateX(75deg) translateZ(-100px) translate(${gridX}px, ${gridY}px)`;
});

// button hover effects
navButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });

    button.addEventListener('click', function (e) {
        glitchAllText();
        const nav = this.getAttribute('data-nav');
        console.log(`Navigating to: ${nav} section`);
        document.getElementById(`${nav}-page`).classList.add('active');
    });
});

// menu card hover and click effects
menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
    });

    card.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });

    card.addEventListener('click', function (e) {
        const page = this.getAttribute('data-page');
        console.log(`Navigating to: ${page} page`);
        //too much to do now, will come back later
        alert(`Navigating to ${page} page`);
    });
});

// back button 
backButtons.forEach(button => {
    button.addEventListener('click', function () {
        glitchAllText();
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const rect = this.getBoundingClientRect();
    });
});

let isGlitching = false; // glitch lock because of a bug i took to long to find

function glitchAllText() {
    if (isGlitching) return; // prevent overlapping glitches
    isGlitching = true; // lock the glitch

    const textElements = document.querySelectorAll('h1, h2, p, .nav-button, .menu-card h3, .menu-card p');
    const originalTexts = Array.from(textElements).map(element => element.textContent);

    // best solution i found to random char
    const getRandomChar = () => {
        const chars = '!@#$%^&*()_+[]{}|;:,.<>?';
        return chars[Math.floor(Math.random() * chars.length)];
    };

    // glitch effect on wach word
    textElements.forEach((element, index) => {
        const originalText = originalTexts[index];

        // avoid overlapping glitches
        if (element.__glitchInterval) {
            clearInterval(element.__glitchInterval);
        }

        // smaller version of glitching for a different animation
        element.__glitchInterval = setInterval(() => {
            const glitchText = originalText.split('').map((char) => {
                // random char
                return Math.random() < 0.1 ? getRandomChar() : char;
            }).join('');
            element.textContent = glitchText;
        }, 40); // timer

        // restore the original (obviously)
        setTimeout(() => {
            clearInterval(element.__glitchInterval);
            element.textContent = originalText;
            delete element.__glitchInterval; 
        }, 400); // timer
    });

    triggerScreenGlitch();

    // unlock the glitch after the effect ends
    setTimeout(() => {
        isGlitching = false;
    }, 400);
}

function triggerScreenGlitch() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    const screenTear = document.querySelector('.screen-tear');
    // trigger for glitch and screen tear
    glitchOverlay.classList.add('active');
    screenTear.classList.add('active');
    // clean effects
    setTimeout(() => {
        glitchOverlay.classList.remove('active');
        screenTear.classList.remove('active');
    }, 200); //timer
}
// timer
setInterval(() => {
    glitchAllText();
}, 5000);