/**
 * SuratBunga App Logic - Birthday Edition untuk Natasha
 */

// ==========================================
// KONFIGURASI PERSONAL
// ==========================================
const CONFIG = {
    wallpaper: "assets/img/wallpaper.png",
    profilePhoto: "assets/img/profil.png",
    musicUrl: "assets/music/Lagu.mp3",
    loveIcon: "assets/img/Cute Face.jpg",
};

// --- Apply Configurations ---
document.getElementById('intro-wallpaper').src = CONFIG.wallpaper;
document.getElementById('small-photo').src = CONFIG.profilePhoto;
document.querySelector('#bg-music source').src = CONFIG.musicUrl;
document.getElementById('bg-music').load();
document.getElementById('love-icon-img').src = CONFIG.loveIcon;

// ==========================================
// STARRY BACKGROUND & SHOOTING STARS
// ==========================================
function createStars() {
    const starryBg = document.getElementById('starry-bg');
    const starCount = 150; // More stars

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        starryBg.appendChild(star);
    }
}

function createShootingStar() {
    const starryBg = document.getElementById('starry-bg');
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 60 + '%';
    shootingStar.style.top = Math.random() * 40 + '%';
    starryBg.appendChild(shootingStar);

    setTimeout(() => shootingStar.remove(), 1500);
}

// Start shooting stars interval
createStars();
setInterval(createShootingStar, 3000);

// Shooting stars interval for cake layer (faster)
let cakeShootingStarInterval = null;

function startCakeShootingStars() {
    // Create shooting stars more frequently during cake
    cakeShootingStarInterval = setInterval(createShootingStar, 1000);
}

function stopCakeShootingStars() {
    if (cakeShootingStarInterval) {
        clearInterval(cakeShootingStarInterval);
        cakeShootingStarInterval = null;
    }
}

// ==========================================
// FLOWER COLOR - MERAH MAWAR (RED ROSE)
// ==========================================
function applyRoseRedFlowerColor() {
    const roseRed = {
        primary: '#ff4d6d',
        secondary: '#c9184a',
        glow: '#ff758f',
    };

    const style = document.createElement('style');
    style.id = 'flower-colors';
    style.textContent = `
        .flower__leaf {
            background-color: ${roseRed.primary} !important;
            background-image: linear-gradient(to top, ${roseRed.secondary}, ${roseRed.primary}) !important;
        }
        .flower__leafs::after {
            background-color: ${roseRed.glow} !important;
        }
        .flower__white-circle {
            background: radial-gradient(${roseRed.primary}, ${roseRed.secondary} 60%) !important;
        }
        .flower__light {
            background-color: ${roseRed.glow} !important;
        }
        .flower__light:nth-child(odd) {
            background-color: #ffccd5 !important;
        }
    `;
    document.head.appendChild(style);
    console.log('🌹 Flower color: Red Rose');
}

applyRoseRedFlowerColor();

// ==========================================
// CONFETTI EFFECT
// ==========================================
function createConfetti(count = 50) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#84fab0', '#ffecd2', '#fcb69f', '#ffd93d'];
    const shapes = ['circle', 'square', 'rect'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.className = `confetti ${shape}`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// ==========================================
// POPUP SEQUENCE (using SweetAlert2)
// ==========================================
const POPUP_STEPS = [
    { title: "aamiin.....", img: "assets/js/download3.jpg" },
    { title: "Kami doain yanng terbaik buat kamu ok !! kamu ga sendirian", img: "assets/js/download4.jpg" },
    { title: "Semangat kuliahnya natasha !!!", img: "assets/js/download5.jpg" },
    { title: "aku dan seluruh teman teman kamu selalu disamping kamu !!", img: "assets/js/Paham_.jpg" },
];

async function runPopups() {
    for (const step of POPUP_STEPS) {
        await Swal.fire({
            title: step.title,
            imageUrl: step.img,
            imageWidth: 280,
            imageHeight: 200,
            imageAlt: 'Memory',
            confirmButtonText: 'Lanjut →',
            confirmButtonColor: '#ff4757',
            background: 'rgba(20, 20, 40, 0.95)',
            color: '#fff',
            allowOutsideClick: false
        });
    }

    // After all popups, show flowers
    await showFlowersAfterPopups();
}

async function showFlowersAfterPopups() {
    // Show flowers
    revealFlowers();

    // Show birthday text
    setTimeout(() => {
        const birthdayText = document.getElementById('birthday-text');
        birthdayText.style.display = 'flex';
        birthdayText.style.opacity = '1';
    }, 2000);

    // Show save button
    setTimeout(() => showSaveOption(), 5000);
}

// ==========================================
// BIRTHDAY CAKE & CANDLE
// ==========================================
let candleBlown = false;

window.blowCandle = function () {
    if (candleBlown) return;
    candleBlown = true;

    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');

    // Blow out flame
    flame.classList.add('blown-out');

    // Show smoke
    smoke.style.opacity = '1';
    smoke.classList.add('active');

    // Create confetti
    setTimeout(() => {
        createConfetti(80);
    }, 500);

    // Hide balloons
    setTimeout(() => {
        const balloonsContainer = document.getElementById('balloons-container');
        balloonsContainer.style.opacity = '0';
        balloonsContainer.style.transition = 'opacity 1s ease';
    }, 1500);

    // Stop extra shooting stars
    stopCakeShootingStars();

    // Langsung ke bunga setelah 2.5 detik (tanpa popup)
    setTimeout(() => {
        showFlowersDirectly();
    }, 2500);
};

async function showFlowersDirectly() {
    const cakeLayer = document.getElementById('cake-layer');
    const balloonsContainer = document.getElementById('balloons-container');

    // Fade out cake layer
    cakeLayer.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 1000));
    cakeLayer.style.display = 'none';
    balloonsContainer.style.display = 'none';

    // Show flowers langsung
    revealFlowers();

    // Show birthday text
    setTimeout(() => {
        const birthdayText = document.getElementById('birthday-text');
        birthdayText.style.display = 'flex';
        birthdayText.style.opacity = '1';
    }, 2000);

    // Show save button
    setTimeout(() => showSaveOption(), 5000);
}

// ==========================================
// APP FLOW CONTROL
// ==========================================

// Start Button
document.getElementById('start-overlay').addEventListener('click', function () {
    const audio = document.getElementById('bg-music');
    audio.play().then(() => {
        console.log("Music Playing");
    }).catch(e => console.log("Audio play failed:", e));

    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
    }, 1500);
});

// Gift Click -> Show Birthday Cake with Balloons
window.startPopUpSequence = async function () {
    const introLayer = document.getElementById('intro-layer');
    introLayer.style.opacity = '0';

    await new Promise(resolve => setTimeout(resolve, 1000));
    introLayer.style.display = 'none';

    // Show cake layer with balloons and extra shooting stars
    showCakeLayer();
};

function showCakeLayer() {
    const cakeLayer = document.getElementById('cake-layer');
    const balloonsContainer = document.getElementById('balloons-container');

    // Show balloons
    balloonsContainer.style.display = 'block';
    balloonsContainer.style.opacity = '1';

    // Start extra shooting stars for cake layer
    startCakeShootingStars();

    // Show cake
    cakeLayer.style.display = 'flex';
    void cakeLayer.offsetWidth;
    cakeLayer.style.opacity = '1';
}

function revealFlowers() {
    const flowerContainer = document.getElementById('flower-container');
    flowerContainer.style.display = 'block';
    void flowerContainer.offsetWidth;
    flowerContainer.style.opacity = '1';
    document.body.classList.remove("not-loaded");
}

function showSaveOption() {
    const uiLayer = document.getElementById('ui-layer');
    uiLayer.style.display = 'flex';
    void uiLayer.offsetWidth;
    uiLayer.style.opacity = '1';
}

// ==========================================
// SCREENSHOT CAPTURE
// ==========================================
document.getElementById('capture-btn').addEventListener('click', () => {
    const captureBtn = document.getElementById('capture-btn');

    captureBtn.style.visibility = 'hidden';

    html2canvas(document.body, {
        backgroundColor: '#000',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        captureBtn.style.visibility = 'visible';
        const link = document.createElement('a');
        link.download = `HappyBirthday-Natasha-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
