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
    {
        name: "TechVision Corp",
        members: 1500,
        orders: 12000,
        nomination: "Best Digital Innovation"
    },
    {
        name: "Creative Solutions",
        members: 800,
        orders: 8500,
        nomination: "Community Excellence"
    },
    {
        name: "Digital Pioneers",
        members: 2000,
        orders: 15000,
        nomination: "Technical Achievement"
    }
];

// Populate Nominees
const nomineesGrid = document.querySelector('.nominees-grid');
// Clear any existing content
nomineesGrid.innerHTML = `
    <div class="nominee-card glass-panel">
        <h3>No Nominees Yet</h3>
        <p><strong>Nominations are still open.</strong> Head to the discord to get nominated!</p>
        <p>Stay tuned for updates!</p>
    </div>
`;

// Active Navigation Highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
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

