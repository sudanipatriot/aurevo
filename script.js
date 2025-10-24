// Particle Background
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#00f5d4', '#00ff9d', '#ff0099'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        if (this.y < 0) this.y = window.innerHeight;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Sample Nominees Data
const nominees = [
    { name: "Peak Branding", members: 60, orders: 50, nomination: "Aurevo Creative Awards" },
    { name: "Seattle Roleplay", members: 100, nomination: "Aurevo Roleplay Awards" },
    { name: "FlareUP Advertising", members: 150, nomination: "Aurevo Miscellanous Awards" },
    // 5 new cards added:
    { name: "Pop Rock's World", members: 270, nomination: "Aurevo Miscellanous Awards" },
    { name: "Louisiana State Roleplay", members: 20, nomination: "Aurevo Roleplay Awards" },
];

// Populate Nominees
const nomineesGrid = document.querySelector('.nominees-grid');
nominees.forEach(nominee => {
    const card = document.createElement('div');
    card.className = 'nominee-card glass-panel';
    card.innerHTML = `
        <h3>${nominee.name}</h3>
        <p>Members: ${nominee.members}</p>
        <p>Nominated for: ${nominee.nomination}</p>
    `;
    nomineesGrid.appendChild(card);
});


// Update the events section population
const eventsTimeline = document.querySelector('.events-timeline');
eventsTimeline.innerHTML = `
    <div class="event">
        <div>
            <h3>Nominations Open</h3>
            <p>October 14, 2025</p>
            <div class="event-status">
                <span class="status-dot"></span>
                Happening Now
            </div>
        </div>
    </div>
    <div class="event">
        <div>
            <h3>Finalists Announcement</h3>
            <p>November 2, 2025</p>
        </div>
    </div>
    <div class="event">
        <div>
            <h3>Awards Ceremony</h3>
            <p>November 11, 2025</p>
        </div>
    </div>
`;

