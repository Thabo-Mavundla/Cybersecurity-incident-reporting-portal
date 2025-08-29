// Global variables
let threatAlertsData = [];
let worldMapSvg;
let attackTypesChart;
let threatTrendsChart;
let uploadedFiles = [];
let selectedPriority = 'medium';
let chatHistory = [];

// FAQ Database for chatbot
const faqDatabase = {
    'password-policy': {
        question: 'What is our password policy?',
        answer: 'Our password policy requires: minimum 12 characters, combination of uppercase, lowercase, numbers, and special characters. Passwords must be changed every 90 days and cannot reuse the last 5 passwords.'
    },
    'phishing': {
        question: 'How do I report phishing emails?',
        answer: 'To report phishing: 1) Do not click any links or download attachments, 2) Forward the email to security@company.com, 3) Mark as spam in your email client, 4) Contact the security hotline if you suspect you\'ve been compromised.'
    },
    'vpn-access': {
        question: 'How do I get VPN access?',
        answer: 'VPN access can be requested through the IT portal. You\'ll need manager approval and completion of the security training module. Once approved, you\'ll receive connection details within 24 hours.'
    },
    'data-breach': {
        question: 'What should I do if I suspect a data breach?',
        answer: 'If you suspect a data breach: 1) Immediately contact the security hotline, 2) Do not attempt to investigate yourself, 3) Preserve any evidence, 4) Document what you observed, 5) Follow instructions from the security team.'
    },
    'multi-factor-authentication': {
        question: 'How do I set up multi-factor authentication?',
        answer: 'To set up MFA: 1) Go to your account settings, 2) Select Security options, 3) Choose your preferred method (SMS, authenticator app, or hardware token), 4) Follow the setup wizard, 5) Test the configuration before saving.'
    },
    'report-virus': {
        question: 'How do I report a virus or malware?',
        answer: 'To report malware: 1) Disconnect from the network immediately, 2) Do not restart your computer, 3) Call the security hotline, 4) Describe symptoms you observed, 5) Wait for IT support before taking any action.'
    }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    console.log('Cybersecurity Portal Loading...');
    
    // Initialize hero section first for immediate visual impact
    initializeHeroSection();
    
    // Initialize emergency button
    initializeEmergencyButton();
    
    // Initialize components
    initializeNavigation();
    initializeTimeline();
    initializeCharts();
    initializeWorldMap();
    initializeContactMap();
    initializeTraining();
    initializeIncidentForm();
    initializeContactForm();
    initializeChatbot();
    initializeFileUpload();
    initializeNewsletter();
    loadThreatAlerts();
    
    // Initialize about page stats if on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.commitment-stats')) {
        initializeAboutPageStats();
    }
    
    // Add scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Add resize handler for charts
    window.addEventListener('resize', handleResize);
    
    console.log('Cybersecurity Portal Loaded Successfully!');
}

// Initialize emergency button functionality
function initializeEmergencyButton() {
    const emergencyBtn = document.querySelector('.report-incident-btn');
    
    if (emergencyBtn) {
        // Enhanced hover effects
        emergencyBtn.addEventListener('mouseenter', () => {
            emergencyBtn.style.animationDuration = '1s';
        });
        
        emergencyBtn.addEventListener('mouseleave', () => {
            emergencyBtn.style.animationDuration = '2s';
        });
        
        // Click tracking and confirmation
        emergencyBtn.addEventListener('click', (e) => {
            // Add visual feedback
            emergencyBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                emergencyBtn.style.transform = '';
            }, 150);
            
            // Log emergency button usage (for analytics)
            console.log('Emergency incident report button clicked');
            
            // Optional: Show brief confirmation before redirect
            const confirmMessage = 'You are being redirected to the incident reporting system.';
            if (window.innerWidth <= 768) {
                // For mobile, show a brief toast instead of confirm dialog
                showMobileToast(confirmMessage);
            }
        });
        
        // Add keyboard accessibility
        emergencyBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                emergencyBtn.click();
            }
        });
        
        // Ensure button is focusable
        emergencyBtn.setAttribute('tabindex', '0');
        emergencyBtn.setAttribute('role', 'button');
        emergencyBtn.setAttribute('aria-label', 'Report Security Incident - Emergency Response');
    }
}

// Mobile toast notification for emergency button
function showMobileToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 71, 87, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease-out;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// Hero Section Initialization
function initializeHeroSection() {
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        initializeGSAPAnimations();
    }
    
    // Initialize counter animations
    initializeStatCounters();
    
    // Initialize Lottie fallback
    initializeLottieFallback();
    
    console.log('Hero Section Initialized');
}

// GSAP Animations for Hero Section
function initializeGSAPAnimations() {
    // Set initial states
    gsap.set('.hero-badge', { opacity: 0, y: 30 });
    gsap.set('.hero-title', { opacity: 0, y: 50 });
    gsap.set('.hero-description', { opacity: 0, y: 30 });
    gsap.set('.hero-buttons', { opacity: 0, y: 30 });
    gsap.set('.hero-stats', { opacity: 0, y: 30 });
    gsap.set('.cybersecurity-animation', { opacity: 0, scale: 0.8 });
    
    // Create timeline
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.to('.hero-badge', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' })
      .to('.hero-title', { duration: 1, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.4')
      .to('.hero-description', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.5')
      .to('.hero-buttons', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.3')
      .to('.hero-stats', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.3')
      .to('.cybersecurity-animation', { duration: 1.2, opacity: 1, scale: 1, ease: 'power2.out' }, '-=0.8');
    
    // Add hover effects for CTAs
    const primaryCTA = document.querySelector('.hero-cta-primary');
    const secondaryCTA = document.querySelector('.hero-cta-secondary');
    
    if (primaryCTA) {
        primaryCTA.addEventListener('mouseenter', () => {
            gsap.to(primaryCTA, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
        });
        
        primaryCTA.addEventListener('mouseleave', () => {
            gsap.to(primaryCTA, { duration: 0.3, scale: 1, ease: 'power2.out' });
        });
    }
    
    if (secondaryCTA) {
        secondaryCTA.addEventListener('mouseenter', () => {
            gsap.to(secondaryCTA, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
        });
        
        secondaryCTA.addEventListener('mouseleave', () => {
            gsap.to(secondaryCTA, { duration: 0.3, scale: 1, ease: 'power2.out' });
        });
    }
}

// Initialize about page statistics
function initializeAboutPageStats() {
    const commitmentStats = document.querySelector('.commitment-stats');
    if (!commitmentStats) return;
    
    const statNumbers = commitmentStats.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Counter Animation for Statistics
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate individual counter
function animateCounter(element) {
    const targetValue = element.getAttribute('data-target');
    let target = parseFloat(targetValue);
    
    // Handle NaN cases by providing fallback values
    if (isNaN(target) || !targetValue) {
        // Use text content as fallback or provide default values
        const textContent = element.textContent.trim();
        if (textContent && !isNaN(parseFloat(textContent))) {
            target = parseFloat(textContent);
        } else {
            // Provide sensible defaults based on common stat patterns
            if (element.classList.contains('uptime-stat')) {
                target = 99.9;
            } else if (element.classList.contains('monitoring-stat')) {
                target = 24;
            } else if (element.classList.contains('threats-stat')) {
                target = 10000;
            } else {
                target = 100; // Generic fallback
            }
        }
    }
    
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = target * easeOut;
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Lottie Animation Fallback
function initializeLottieFallback() {
    const lottiePlayer = document.querySelector('lottie-player');
    const fallbackAnimation = document.querySelector('.fallback-animation');
    
    if (lottiePlayer && fallbackAnimation) {
        // Show fallback initially
        fallbackAnimation.style.display = 'block';
        
        // Try to load Lottie animation
        lottiePlayer.addEventListener('ready', () => {
            fallbackAnimation.style.display = 'none';
            console.log('Lottie animation loaded successfully');
        });
        
        // If Lottie fails to load after 3 seconds, keep fallback
        setTimeout(() => {
            if (lottiePlayer.currentFrame === undefined) {
                console.log('Lottie animation failed to load, using fallback');
                lottiePlayer.style.display = 'none';
                fallbackAnimation.style.display = 'block';
            }
        }, 3000);
    }
}

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to FAQ Assistant function
function scrollToFAQAssistant() {
    const element = document.querySelector('.chatbot-section');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on the chat input for better UX
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.focus();
            }
        }, 800);
    }
}

// Handle scroll effects
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    }
}

// Handle window resize
function handleResize() {
    // Redraw charts on resize
    if (attackTypesChart) {
        attackTypesChart.resize();
    }
    if (threatTrendsChart) {
        threatTrendsChart.resize();
    }
}

// Timeline Initialization
function initializeTimeline() {
    const timelineData = {
        "title": {
            "media": {
                "url": "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800",
                "caption": "Cybersecurity Timeline"
            },
            "text": {
                "headline": "Our Cybersecurity Journey",
                "text": "A comprehensive timeline of our organization's cybersecurity initiatives and milestones."
            }
        },
        "events": [
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
                    "caption": "Security Framework Launch"
                },
                "start_date": {
                    "year": "2020",
                    "month": "1"
                },
                "text": {
                    "headline": "Security Framework Implementation",
                    "text": "Launched comprehensive cybersecurity framework covering all organizational aspects including policies, training, and incident response procedures."
                }
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
                    "caption": "Security Team Formation"
                },
                "start_date": {
                    "year": "2020",
                    "month": "6"
                },
                "text": {
                    "headline": "Dedicated Security Team Formation",
                    "text": "Established our specialized cybersecurity team with experts in threat intelligence, incident response, and security awareness."
                }
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
                    "caption": "Advanced Threat Detection"
                },
                "start_date": {
                    "year": "2021",
                    "month": "3"
                },
                "text": {
                    "headline": "Advanced Threat Detection System",
                    "text": "Deployed AI-powered threat detection system providing 24/7 monitoring and automated incident response capabilities."
                }
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=600",
                    "caption": "Employee Training Program"
                },
                "start_date": {
                    "year": "2022",
                    "month": "1"
                },
                "text": {
                    "headline": "Comprehensive Training Program Launch",
                    "text": "Implemented organization-wide cybersecurity awareness training program reaching 100% of employees with monthly updates and assessments."
                }
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
                    "caption": "Zero Trust Architecture"
                },
                "start_date": {
                    "year": "2023",
                    "month": "8"
                },
                "text": {
                    "headline": "Zero Trust Architecture Implementation",
                    "text": "Successfully migrated to Zero Trust security model, enhancing our defense against sophisticated cyber threats and insider risks."
                }
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
                    "caption": "Incident Response Portal"
                },
                "start_date": {
                    "year": "2024",
                    "month": "12"
                },
                "text": {
                    "headline": "Incident Response Portal Launch",
                    "text": "Launched this comprehensive cybersecurity portal providing real-time threat intelligence, streamlined incident reporting, and educational resources."
                }
            }
        ]
    };
    
    // Initialize Timeline.js
    if (typeof TL !== 'undefined') {
        try {
            window.timeline = new TL.Timeline('timeline-embed', timelineData, {
                hash_bookmark: false,
                height: 600,
                theme: 'dark'
            });
        } catch (error) {
            console.log('Timeline.js not available, using fallback display');
            createFallbackTimeline();
        }
    } else {
        createFallbackTimeline();
    }
}

// Fallback timeline if Timeline.js fails to load
function createFallbackTimeline() {
    const timelineContainer = document.getElementById('timeline-embed');
    if (timelineContainer) {
        timelineContainer.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #b8c5d6;">
                <h3 style="color: #00d4ff; margin-bottom: 1rem;">Cybersecurity Timeline</h3>
                <div style="display: grid; gap: 1rem; text-align: left;">
                    <div style="background: #3a4556; padding: 1rem; border-radius: 8px; border-left: 4px solid #00d4ff;">
                        <strong>2020 - Security Framework</strong><br>
                        Comprehensive cybersecurity framework implementation
                    </div>
                    <div style="background: #3a4556; padding: 1rem; border-radius: 8px; border-left: 4px solid #00d4ff;">
                        <strong>2021 - Advanced Detection</strong><br>
                        AI-powered threat detection system deployment
                    </div>
                    <div style="background: #3a4556; padding: 1rem; border-radius: 8px; border-left: 4px solid #00d4ff;">
                        <strong>2022 - Training Program</strong><br>
                        Organization-wide cybersecurity awareness training
                    </div>
                    <div style="background: #3a4556; padding: 1rem; border-radius: 8px; border-left: 4px solid #00d4ff;">
                        <strong>2024 - Portal Launch</strong><br>
                        Cybersecurity Incident Response Portal
                    </div>
                </div>
            </div>
        `;
    }
}

// Charts Initialization
function initializeCharts() {
    initializeAttackTypesChart();
    initializeThreatTrendsChart();
}

function initializeAttackTypesChart() {
    const ctx = document.getElementById('attackTypesChart');
    if (ctx) {
        attackTypesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Phishing', 'Malware', 'Ransomware', 'Data Breach', 'DDoS', 'Insider Threat'],
                datasets: [{
                    data: [35, 25, 15, 10, 10, 5],
                    backgroundColor: [
                        '#ff4757', '#ff6b35', '#f39c12', '#27ae60', '#00d4ff', '#764ba2'
                    ],
                    borderColor: '#2a3142',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#b8c5d6',
                            padding: 15,
                            boxWidth: 12
                        }
                    }
                }
            }
        });
    }
}

function initializeThreatTrendsChart() {
    const ctx = document.getElementById('threatTrendsChart');
    if (ctx) {
        threatTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Critical Threats',
                    data: [12, 19, 8, 15, 22, 18, 25, 20],
                    borderColor: '#ff4757',
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                }, {
                    label: 'High Threats',
                    data: [25, 30, 22, 28, 35, 30, 40, 35],
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                }, {
                    label: 'Medium Threats',
                    data: [45, 52, 40, 48, 55, 50, 65, 58],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#b8c5d6',
                            padding: 15,
                            boxWidth: 12
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#b8c5d6'
                        },
                        grid: {
                            color: '#3a4556'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#b8c5d6'
                        },
                        grid: {
                            color: '#3a4556'
                        }
                    }
                }
            }
        });
    }
}

// World Map Initialization
function initializeWorldMap() {
    const mapContainer = document.getElementById('world-map');
    if (mapContainer && typeof L !== 'undefined') {
        createOpenStreetMap();
    } else {
        createFallbackMap();
    }
}

function createOpenStreetMap() {
    // Clear any existing content
    document.getElementById('world-map').innerHTML = '';
    
    // Initialize the map
    const map = L.map('world-map', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        worldCopyJump: true,
        zoomControl: true
    });
    
    // Add dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Threat data with geographical coordinates
    const threatLocations = [
        {
            name: "North America",
            coords: [45.0, -100.0],
            threats: 245,
            level: "high",
            incidents: ["Ransomware attacks on healthcare", "Financial sector breaches", "Government data theft"],
            color: "#ff6b35",
            radius: 800000
        },
        {
            name: "South America",
            coords: [-15.0, -60.0],
            threats: 89,
            level: "medium",
            incidents: ["Banking trojans", "Cryptocurrency theft", "E-commerce fraud"],
            color: "#f39c12",
            radius: 600000
        },
        {
            name: "Europe",
            coords: [50.0, 10.0],
            threats: 312,
            level: "critical",
            incidents: ["State-sponsored attacks", "Critical infrastructure targeting", "Supply chain compromises"],
            color: "#ff3838",
            radius: 900000
        },
        {
            name: "Africa",
            coords: [0.0, 20.0],
            threats: 156,
            level: "medium",
            incidents: ["Mobile banking fraud", "SIM swapping", "Business email compromise"],
            color: "#f39c12",
            radius: 700000
        },
        {
            name: "Asia",
            coords: [35.0, 100.0],
            threats: 428,
            level: "critical",
            incidents: ["Advanced persistent threats", "Zero-day exploits", "Industrial espionage"],
            color: "#ff3838",
            radius: 1000000
        },
        {
            name: "Oceania",
            coords: [-25.0, 140.0],
            threats: 67,
            level: "low",
            incidents: ["Phishing campaigns", "Malware distribution", "Data breaches"],
            color: "#27ae60",
            radius: 500000
        }
    ];
    
    // Add threat circles to the map
    threatLocations.forEach(location => {
        // Create main threat circle
        const circle = L.circle(location.coords, {
            color: location.color,
            fillColor: location.color,
            fillOpacity: 0.3,
            radius: location.radius,
            weight: 3
        }).addTo(map);
        
        // Create pulsing effect for critical threats
        if (location.level === 'critical') {
            const pulseCircle = L.circle(location.coords, {
                color: location.color,
                fillColor: 'transparent',
                fillOpacity: 0,
                radius: location.radius * 0.8,
                weight: 2,
                className: 'pulse-circle'
            }).addTo(map);
        }
        
        // Create custom icon for threat markers
        const threatIcon = L.divIcon({
            className: 'threat-marker',
            html: `
                <div style="
                    background: ${location.color};
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 3px solid #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: white;
                    font-size: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                    animation: ${location.level === 'critical' ? 'threatPulse 2s infinite' : 'none'};
                ">
                    ${location.threats}
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        // Add marker with custom icon
        const marker = L.marker(location.coords, { icon: threatIcon }).addTo(map);
        
        // Create detailed popup content
        const popupContent = `
            <div style="
                background: #2a3142;
                color: #ffffff;
                padding: 1rem;
                border-radius: 8px;
                min-width: 250px;
                border: 2px solid ${location.color};
            ">
                <div style="
                    text-align: center;
                    border-bottom: 2px solid ${location.color};
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                ">
                    <h3 style="margin: 0; color: #00d4ff; font-size: 1.2rem;">${location.name}</h3>
                </div>
                
                <div style="display: grid; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #b8c5d6;">Threat Level:</span>
                        <span style="
                            color: ${location.color};
                            font-weight: bold;
                            text-transform: uppercase;
                        ">${location.level}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #b8c5d6;">Active Threats:</span>
                        <span style="color: #ff4757; font-weight: bold;">${location.threats}</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: #00d4ff; margin-bottom: 0.5rem; font-size: 1rem;">Recent Incidents:</h4>
                    <ul style="margin: 0; padding-left: 1rem; color: #b8c5d6; font-size: 0.9rem;">
                        ${location.incidents.map(incident => `<li style="margin: 0.25rem 0;">${incident}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="showContinentDetails(${JSON.stringify(location).replace(/"/g, '&quot;')})" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    ">View Details</button>
                </div>
            </div>
        `;
        
        // Bind popup to both circle and marker
        circle.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'threat-popup'
        });
        
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'threat-popup'
        });
        
        // Add click event to show detailed modal
        circle.on('click', () => {
            showContinentDetails(location);
        });
        
        marker.on('click', () => {
            showContinentDetails(location);
        });
        
        // Add hover effects
        circle.on('mouseover', function() {
            this.setStyle({
                weight: 5,
                fillOpacity: 0.5
            });
        });
        
        circle.on('mouseout', function() {
            this.setStyle({
                weight: 3,
                fillOpacity: 0.3
            });
        });
    });
    
    // Add custom CSS for animations and styling
    if (!document.querySelector('#map-styles')) {
        const style = document.createElement('style');
        style.id = 'map-styles';
        style.textContent = `
            @keyframes threatPulse {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.2); opacity: 0.4; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            
            .pulse-circle {
                animation: circlePulse 3s infinite;
            }
            
            @keyframes circlePulse {
                0% { stroke-opacity: 1; }
                50% { stroke-opacity: 0.3; }
                100% { stroke-opacity: 1; }
            }
            
            .threat-popup .leaflet-popup-content-wrapper {
                background: #2a3142 !important;
                color: #ffffff !important;
                border-radius: 8px !important;
                border: 2px solid #00d4ff !important;
            }
            
            .threat-popup .leaflet-popup-tip {
                background: #2a3142 !important;
                border: 2px solid #00d4ff !important;
            }
            
            .leaflet-control-zoom {
                background: #2a3142 !important;
                border: 2px solid #3a4556 !important;
            }
            
            .leaflet-control-zoom a {
                background: #2a3142 !important;
                color: #00d4ff !important;
                border-bottom: 1px solid #3a4556 !important;
            }
            
            .leaflet-control-zoom a:hover {
                background: #3a4556 !important;
                color: #ffffff !important;
            }
            
            #world-map {
                border-radius: 12px;
                overflow: hidden;
                border: 2px solid #3a4556;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add map info overlay
    const info = L.control({ position: 'topright' });
    
    info.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-info');
        div.innerHTML = `
            <div style="
                background: rgba(42, 49, 66, 0.95);
                padding: 1rem;
                border-radius: 8px;
                color: #ffffff;
                min-width: 200px;
                border: 2px solid #00d4ff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
                <h4 style="margin: 0 0 0.5rem 0; color: #00d4ff;">Global Threats</h4>
                <div style="font-size: 0.9rem; color: #b8c5d6;">
                    <div style="margin: 0.25rem 0;">🔴 Critical: Europe, Asia</div>
                    <div style="margin: 0.25rem 0;">🟠 High: North America</div>
                    <div style="margin: 0.25rem 0;">🟡 Medium: Africa, S. America</div>
                    <div style="margin: 0.25rem 0;">🟢 Low: Oceania</div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #8b97a8;">
                    Click regions for details
                </div>
            </div>
        `;
        return div;
    };
    
    info.addTo(map);
    
// Store map reference for potential cleanup
    window.threatMap = map;
}

// Contact Office Map Initialization
function initializeContactMap() {
    const mapContainer = document.getElementById('contact-map');
    if (mapContainer && typeof L !== 'undefined') {
        createContactMap();
    } else {
        createContactMapFallback();
    }
}

function createContactMap() {
    // Clear any existing content
    const mapContainer = document.getElementById('contact-map');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = '';
    
    // Coordinates for 19 Ameshoff St, Braamfontein, Johannesburg
    const officeLocation = [-26.1951, 28.0369];
    
    // Initialize the map centered on Johannesburg
    const map = L.map('contact-map', {
        center: officeLocation,
        zoom: 15,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: true
    });
    
    // Add dark theme tile layer (same as threat intelligence)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Create custom office marker icon
    const officeIcon = L.divIcon({
        className: 'office-marker',
        html: `
            <div style="
                background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: white;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
                animation: officePulse 2s infinite;
            ">
                <i class="fas fa-building"></i>
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });
    
    // Add office marker
    const officeMarker = L.marker(officeLocation, { icon: officeIcon }).addTo(map);
    
    // Create detailed popup for office location
    const popupContent = `
        <div style="
            background: #2a3142;
            color: #ffffff;
            padding: 1.5rem;
            border-radius: 12px;
            min-width: 280px;
            border: 2px solid #00d4ff;
            font-family: 'Inter', sans-serif;
        ">
            <div style="
                text-align: center;
                border-bottom: 2px solid #00d4ff;
                padding-bottom: 1rem;
                margin-bottom: 1rem;
            ">
                <h3 style="margin: 0; color: #00d4ff; font-size: 1.3rem;">
                    <i class="fas fa-shield-alt" style="margin-right: 0.5rem;"></i>
                    Security Office
                </h3>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 0.75rem;">
                    <i class="fas fa-map-marker-alt" style="color: #ff4757; margin-right: 0.75rem; margin-top: 0.25rem; font-size: 1.1rem;"></i>
                    <div>
                        <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem;">Address:</strong>
                        <span style="color: #b8c5d6; line-height: 1.4;">19 Ameshoff St, Braamfontein<br>Johannesburg, 2001<br>Tech District, RSA</span>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 0.75rem;">
                    <i class="fas fa-clock" style="color: #f39c12; margin-right: 0.75rem; margin-top: 0.25rem; font-size: 1.1rem;"></i>
                    <div>
                        <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem;">Office Hours:</strong>
                        <span style="color: #b8c5d6; line-height: 1.4;">Mon-Fri: 8:00 AM - 6:00 PM<br>Weekend: Emergency Only</span>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 1rem;">
                    <i class="fas fa-phone" style="color: #27ae60; margin-right: 0.75rem; margin-top: 0.25rem; font-size: 1.1rem;"></i>
                    <div>
                        <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem;">Emergency Hotline:</strong>
                        <span style="color: #b8c5d6;">+27 (123) 456-SECURITY</span>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; border-top: 1px solid #3a4556; padding-top: 1rem;">
                <button onclick="getDirections()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    margin-right: 0.5rem;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    <i class="fas fa-route" style="margin-right: 0.5rem;"></i>Get Directions
                </button>
                <button onclick="copyAddress()" style="
                    background: transparent;
                    color: #00d4ff;
                    border: 2px solid #00d4ff;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#00d4ff'; this.style.color='#1a1f2e';" onmouseout="this.style.background='transparent'; this.style.color='#00d4ff';">
                    <i class="fas fa-copy" style="margin-right: 0.5rem;"></i>Copy Address
                </button>
            </div>
        </div>
    `;
    
    // Bind popup to marker
    officeMarker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'office-popup'
    });
    
    // Auto-open popup to show office information
    officeMarker.openPopup();
    
    // Add click event for directions
    officeMarker.on('click', () => {
        officeMarker.openPopup();
    });
    
    // Add office area circle
    const officeArea = L.circle(officeLocation, {
        color: '#00d4ff',
        fillColor: '#00d4ff',
        fillOpacity: 0.1,
        radius: 200,
        weight: 2
    }).addTo(map);
    
    // Add custom CSS for office map styling
    if (!document.querySelector('#contact-map-styles')) {
        const style = document.createElement('style');
        style.id = 'contact-map-styles';
        style.textContent = `
            @keyframes officePulse {
                0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4); }
                50% { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0, 212, 255, 0.6); }
                100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4); }
            }
            
            .office-popup .leaflet-popup-content-wrapper {
                background: #2a3142 !important;
                color: #ffffff !important;
                border-radius: 12px !important;
                border: 2px solid #00d4ff !important;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
            }
            
            .office-popup .leaflet-popup-tip {
                background: #2a3142 !important;
                border: 2px solid #00d4ff !important;
            }
            
            .office-popup .leaflet-popup-close-button {
                color: #00d4ff !important;
                font-size: 18px !important;
                font-weight: bold !important;
            }
            
            .office-popup .leaflet-popup-close-button:hover {
                color: #ffffff !important;
                background: #00d4ff !important;
                border-radius: 50% !important;
            }
            
            #contact-map {
                border-radius: 12px;
                overflow: hidden;
                border: 2px solid #3a4556;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            
            #contact-map .leaflet-control-zoom {
                background: #2a3142 !important;
                border: 2px solid #3a4556 !important;
                border-radius: 8px !important;
            }
            
            #contact-map .leaflet-control-zoom a {
                background: #2a3142 !important;
                color: #00d4ff !important;
                border-bottom: 1px solid #3a4556 !important;
                font-weight: bold !important;
            }
            
            #contact-map .leaflet-control-zoom a:hover {
                background: #3a4556 !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add office info overlay
    const info = L.control({ position: 'topleft' });
    
    info.onAdd = function() {
        const div = L.DomUtil.create('div', 'office-map-info');
        div.innerHTML = `
            <div style="
                background: rgba(42, 49, 66, 0.95);
                padding: 1rem;
                border-radius: 8px;
                color: #ffffff;
                min-width: 180px;
                border: 2px solid #00d4ff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
                <h4 style="margin: 0 0 0.5rem 0; color: #00d4ff; font-size: 1rem;">
                    <i class="fas fa-building" style="margin-right: 0.5rem;"></i>Security Office
                </h4>
                <div style="font-size: 0.85rem; color: #b8c5d6; line-height: 1.4;">
                    <div style="margin: 0.25rem 0;">📍 Braamfontein, JHB</div>
                    <div style="margin: 0.25rem 0;">🕒 Mon-Fri: 8AM-6PM</div>
                    <div style="margin: 0.25rem 0;">📞 24/7 Emergency</div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #8b97a8;">
                    Click marker for details
                </div>
            </div>
        `;
        return div;
    };
    
    info.addTo(map);
    
    // Store map reference
    window.contactMap = map;
}

function createContactMapFallback() {
    const mapContainer = document.getElementById('contact-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                height: 400px; 
                color: #b8c5d6;
                background: #2a3142;
                border-radius: 12px;
                border: 2px solid #3a4556;
                text-align: center;
                padding: 2rem;
            ">
                <div style="
                    background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
                ">
                    <i class="fas fa-building" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="color: #00d4ff; margin-bottom: 1rem; font-size: 1.3rem;">Security Office Location</h3>
                <div style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
                    <div style="margin: 0.5rem 0;"><strong>📍 Address:</strong></div>
                    <div style="color: #b8c5d6;">19 Ameshoff St, Braamfontein<br>Johannesburg, 2001, Tech District, RSA</div>
                    <div style="margin: 1rem 0 0.5rem 0;"><strong>🕒 Office Hours:</strong></div>
                    <div style="color: #b8c5d6;">Mon-Fri: 8:00 AM - 6:00 PM<br>Weekend: Emergency Only</div>
                    <div style="margin: 1rem 0 0.5rem 0;"><strong>📞 Emergency:</strong></div>
                    <div style="color: #b8c5d6;">+27 (123) 456-SECURITY</div>
                </div>
                <button onclick="getDirections()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-route" style="margin-right: 0.5rem;"></i>Get Directions
                </button>
            </div>
        `;
    }
}

function createWorldMap() {
    // This function is kept for backward compatibility
    // but now just calls the OpenStreetMap implementation
    createOpenStreetMap();
}

function createFallbackMap() {
    const mapContainer = document.getElementById('world-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #b8c5d6;">
                <h3 style="color: #00d4ff; margin-bottom: 1rem;">Global Threat Overview</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; width: 100%;">
                    <div style="text-align: center; background: #3a4556; padding: 1rem; border-radius: 8px;">
                        <div style="color: #ff3838; font-size: 1.5rem; font-weight: bold;">52</div>
                        <div>Asia-Pacific</div>
                    </div>
                    <div style="text-align: center; background: #3a4556; padding: 1rem; border-radius: 8px;">
                        <div style="color: #ff6b35; font-size: 1.5rem; font-weight: bold;">45</div>
                        <div>North America</div>
                    </div>
                    <div style="text-align: center; background: #3a4556; padding: 1rem; border-radius: 8px;">
                        <div style="color: #ff6b35; font-size: 1.5rem; font-weight: bold;">38</div>
                        <div>Europe</div>
                    </div>
                    <div style="text-align: center; background: #3a4556; padding: 1rem; border-radius: 8px;">
                        <div style="color: #f39c12; font-size: 1.5rem; font-weight: bold;">22</div>
                        <div>Africa</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Show continent details modal
function showContinentDetails(location) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--secondary-bg);
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        border: 2px solid ${location.color};
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        color: var(--text-primary);
    `;
    
    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <h2 style="color: #00d4ff; margin: 0;">${location.name} Security Status</h2>
            <div style="margin-top: 0.5rem; font-size: 1.125rem;">
                Threat Level: <span style="color: ${location.color}; font-weight: bold; text-transform: uppercase;">${location.level}</span>
            </div>
        </div>
        
        <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: var(--tertiary-bg); padding: 1rem; border-radius: 8px;">
                <h4 style="color: #00d4ff; margin: 0 0 0.5rem 0;">Active Threats</h4>
                <div style="font-size: 2rem; font-weight: bold; color: ${location.color};">${location.threats}</div>
            </div>
            
            <div style="background: var(--tertiary-bg); padding: 1rem; border-radius: 8px;">
                <h4 style="color: #00d4ff; margin: 0 0 0.5rem 0;">Recent Incidents</h4>
                <ul style="margin: 0; padding-left: 1rem; color: var(--text-secondary);">
                    ${location.incidents.map(incident => `<li style="margin: 0.25rem 0;">${incident}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="this.closest('[style*=\'position: fixed\']').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            ">Close Details</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Threat Alerts Functions
function loadThreatAlerts() {
    // Simulate loading live threat alerts
    threatAlertsData = [
        {
            id: 1,
            type: "critical",
            title: "Critical: New Ransomware Campaign Detected",
            description: "Advanced persistent threat targeting financial institutions globally.",
            time: "2 minutes ago",
            icon: "fas fa-exclamation-triangle"
        },
        {
            id: 2,
            type: "high",
            title: "High: Phishing Campaign Surge",
            description: "Increased phishing activity targeting corporate email accounts.",
            time: "15 minutes ago",
            icon: "fas fa-virus"
        },
        {
            id: 3,
            type: "medium",
            title: "Medium: Software Vulnerability Disclosed",
            description: "New CVE published affecting widely-used enterprise software.",
            time: "1 hour ago",
            icon: "fas fa-bug"
        }
    ];
    
    updateThreatAlertsDisplay();
    
    // Simulate real-time updates
    setInterval(updateThreatAlerts, 30000); // Update every 30 seconds
}

function updateThreatAlerts() {
    // Simulate new threat alerts
    const newAlert = {
        id: threatAlertsData.length + 1,
        type: Math.random() > 0.7 ? "critical" : Math.random() > 0.4 ? "high" : "medium",
        title: "New Threat Detected",
        description: "Automated threat detection system has identified a new security incident.",
        time: "Just now",
        icon: "fas fa-shield-alt"
    };
    
    threatAlertsData.unshift(newAlert);
    if (threatAlertsData.length > 10) {
        threatAlertsData.pop();
    }
    
    updateThreatAlertsDisplay();
}

function updateThreatAlertsDisplay() {
    const alertsContainer = document.querySelector('.alerts-container');
    if (alertsContainer) {
        alertsContainer.innerHTML = threatAlertsData.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">
                    <i class="${alert.icon}"></i>
                </div>
                <div class="alert-content">
                    <h4>${alert.title}</h4>
                    <p>${alert.description}</p>
                    <span class="alert-time">${alert.time}</span>
                </div>
            </div>
        `).join('');
    }
}

function loadMoreAlerts() {
    // Simulate loading more alerts
    console.log('Loading more threat alerts...');
    // In a real application, this would make an API call
}

// Incident Form Functions
function initializeIncidentForm() {
    const form = document.getElementById('incidentForm');
    if (form) {
        form.addEventListener('submit', handleIncidentSubmit);
    }
    
    // Initialize priority selector
    const priorityOptions = document.querySelectorAll('.priority-option');
    priorityOptions.forEach(option => {
        option.addEventListener('click', function() {
            priorityOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedPriority = this.dataset.priority;
        });
    });
}

async function handleIncidentSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = document.getElementById('submitSpinner');
    
    // Show loading state
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    try {
        const formData = {
            incidentType: document.getElementById('incidentType').value,
            reporterName: document.getElementById('reporterName')?.value || 'Anonymous',
            reporterEmail: document.getElementById('reporterEmail').value,
            priority: selectedPriority,
            description: document.getElementById('description').value,
            affectedSystems: document.getElementById('affectedSystems')?.value || 'Not specified',
            timestamp: new Date().toISOString(),
            status: 'pending',
            fileUrls: []
        };
        
        // Validate form
        if (!formData.incidentType || !formData.description || !formData.reporterEmail) {
            throw new Error('Please fill in all required fields.');
        }
        
        // Upload files if Firebase is available and files are selected
        if (window.storage && uploadedFiles.length > 0) {
            try {
                const { ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
                
                const uploadPromises = uploadedFiles.map(async (fileObj) => {
                    const fileRef = ref(window.storage, `incident-files/${Date.now()}-${fileObj.file.name}`);
                    const snapshot = await uploadBytes(fileRef, fileObj.file);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    return {
                        name: fileObj.file.name,
                        url: downloadURL,
                        size: fileObj.file.size,
                        type: fileObj.file.type
                    };
                });
                
                formData.fileUrls = await Promise.all(uploadPromises);
            } catch (uploadError) {
                console.warn('File upload failed, continuing without files:', uploadError);
            }
        }
        
        // Save to Firestore if available
        if (window.db) {
            try {
                const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
                formData.timestamp = serverTimestamp();
                await addDoc(collection(window.db, 'incident-reports'), formData);
            } catch (dbError) {
                console.warn('Database save failed, continuing with email submission:', dbError);
            }
        }
        
        // Generate ticket ID
        const ticketId = `INC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        
        // Send email notification via Formspree
        try {
            await fetch('https://formspree.io/f/xkgzaknk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    ticketId: ticketId,
                    _subject: `New Incident Report: ${ticketId}`,
                    _replyto: formData.reporterEmail
                })
            });
        } catch (emailError) {
            console.warn('Email notification failed:', emailError);
        }
        
        // Show ticket preview
        showTicketPreview(ticketId, formData);
        showToast(`Incident reported successfully! Ticket created: ${ticketId}`, 'success');
        
        // Reset form
        clearForm();
        clearFiles();
        
    } catch (error) {
        console.error('Error submitting incident:', error);
        showToast('Error submitting incident. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

function showTicketPreview(ticketId, formData) {
    const ticketPreview = document.getElementById('ticketPreview');
    const ticketIdElement = document.getElementById('ticketId');
    const ticketDetails = document.getElementById('ticketDetails');
    
    if (ticketPreview && ticketIdElement && ticketDetails) {
        ticketIdElement.textContent = ticketId;
        ticketDetails.innerHTML = `
            <div style="display: grid; gap: 0.5rem; margin-bottom: 1rem;">
                <div><strong>Type:</strong> ${formData.incidentType}</div>
                <div><strong>Priority:</strong> <span style="color: var(--threat-${formData.priority});">${formData.priority.toUpperCase()}</span></div>
                <div><strong>Reporter:</strong> ${formData.reporterEmail}</div>
                <div><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
                ${formData.fileUrls.length > 0 ? `<div><strong>Files:</strong> ${formData.fileUrls.length} attached</div>` : ''}
            </div>
            <div style="background: var(--surface-bg); padding: 1rem; border-radius: 6px;">
                <strong>Description:</strong><br>
                ${formData.description}
            </div>
        `;
        ticketPreview.style.display = 'block';
        ticketPreview.scrollIntoView({ behavior: 'smooth' });
    }
}

function clearForm() {
    const form = document.getElementById('incidentForm');
    if (form) {
        form.reset();
        // Reset priority selector
        document.querySelectorAll('.priority-option').forEach(opt => opt.classList.remove('selected'));
        const defaultPriority = document.querySelector('.priority-option[data-priority="medium"]');
        if (defaultPriority) {
            defaultPriority.classList.add('selected');
            selectedPriority = 'medium';
        }
        // Hide ticket preview
        const ticketPreview = document.getElementById('ticketPreview');
        if (ticketPreview) {
            ticketPreview.style.display = 'none';
        }
    }
}

// Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('securityForm');
    if (form) {
        form.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showToast('Security query submitted successfully! Our team will respond within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error submitting form. Please try again.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    });
}

// File Upload Functions
function initializeFileUpload() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => fileInput.click());
        
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
            showToast('File too large: ' + file.name + ' (Max 10MB)', 'error');
            return;
        }
        
        const fileObj = {
            file: file,
            id: Date.now() + Math.random(),
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type || 'unknown'
        };
        
        uploadedFiles.push(fileObj);
        displayUploadedFile(fileObj);
    });
}

function displayUploadedFile(fileObj) {
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    if (!uploadedFilesContainer) return;
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-info">
            <span>📄</span>
            <div>
                <div>${fileObj.name}</div>
                <small style="color: var(--text-muted);">${fileObj.size}</small>
            </div>
        </div>
        <button class="remove-file" onclick="removeFile(${fileObj.id})">
            ✕
        </button>
    `;
    uploadedFilesContainer.appendChild(fileItem);
}

function removeFile(fileId) {
    uploadedFiles = uploadedFiles.filter(file => file.id !== fileId);
    refreshUploadedFiles();
}

function clearFiles() {
    uploadedFiles = [];
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    const fileInput = document.getElementById('fileInput');
    if (uploadedFilesContainer) uploadedFilesContainer.innerHTML = '';
    if (fileInput) fileInput.value = '';
}

function refreshUploadedFiles() {
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    if (uploadedFilesContainer) {
        uploadedFilesContainer.innerHTML = '';
        uploadedFiles.forEach(displayUploadedFile);
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Chatbot Functions
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessageToChat(response, 'bot');
    }, 1000);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    const avatarIcon = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function askQuestion(questionKey) {
    const faq = faqDatabase[questionKey];
    if (faq) {
        addMessageToChat(faq.question, 'user');
        setTimeout(() => {
            addMessageToChat(faq.answer, 'bot');
        }, 1000);
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple keyword matching
    for (const [key, faq] of Object.entries(faqDatabase)) {
        const keywords = {
            'password-policy': ['password', 'reset', 'change', 'forgot', 'strong'],
            'phishing': ['phishing', 'email', 'spam', 'suspicious'],
            'vpn-access': ['vpn', 'remote', 'access', 'connect'],
            'data-breach': ['breach', 'incident', 'compromised', 'hack', 'data'],
            'multi-factor-authentication': ['mfa', '2fa', 'two-factor', 'authentication'],
            'report-virus': ['virus', 'malware', 'infected', 'trojan']
        };
        
        if (keywords[key] && keywords[key].some(keyword => message.includes(keyword))) {
            return faq.answer;
        }
    }
    
    // Default responses
    const defaultResponses = [
        "I understand you're asking about security. Could you be more specific? Try asking about passwords, phishing, VPN access, or data breaches.",
        "That's a great security question! For detailed assistance, please contact our security team at security@company.com or call our hotline.",
        "I'm here to help with common security questions. You can also use the quick question buttons below for faster answers."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Contact Page Functions
function initiateCall() {
    showToast('Connecting you to our security hotline...', 'info');
    window.open('tel:+15551235ecurity', '_self');
}

function openLiveChat() {
    showToast('Opening live chat window...', 'info');
    // Redirect to contact page if not already there
    if (!window.location.pathname.includes('contact.html')) {
        window.location.href = 'contact.html';
    }
}

function getDirections() {
    const address = "19 Ameshoff St, Braamfontein, Johannesburg, 2001";
    const mapsUrl = `https://www.google.com/maps/place/19+Ameshoff+St,+Braamfontein,+Johannesburg,+2001/@-26.190663,28.0347994,17z/data=!4m6!3m5!1s0x1e950c19945f0cd9:0x55afd081af485e1!8m2!3d-26.1906678!4d28.0373743!16s%2Fg%2F11v0zz4j3r?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// Copy office address to clipboard
function copyAddress() {
    const address = '19 Ameshoff St, Braamfontein, Johannesburg, 2001, Tech District, RSA';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => {
            showNotification('Address copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(address);
        });
    } else {
        fallbackCopyToClipboard(address);
    }
}

// Fallback copy function for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Address copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Could not copy address. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast') || createToastElement();
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

function createToastElement() {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
    return toast;
}

// Newsletter Functions
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!emailInput || !emailInput.value.trim()) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate newsletter subscription
    setTimeout(() => {
        showToast('Successfully subscribed to security updates!', 'success');
        emailInput.value = '';
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 1500);
}

// Download Functions - Updated to actually download files
function downloadPolicy(filename) {
    console.log(`Downloading policy: ${filename}`);
    showNotification(`Preparing ${filename} for download...`, 'info');
    
    // Create content for the policy document
    const policyContent = generatePolicyContent(filename);
    downloadFile(filename, policyContent, 'text/plain');
}

function downloadGuide(filename) {
    console.log(`Downloading guide: ${filename}`);
    showNotification(`Preparing ${filename} for download...`, 'info');
    
    // Create content for the guide document
    const guideContent = generateGuideContent(filename);
    downloadFile(filename, guideContent, 'text/plain');
}

function downloadInfographic(filename) {
    console.log(`Downloading infographic: ${filename}`);
    showNotification(`Preparing ${filename} for download...`, 'info');
    
    // Create content for the infographic
    const infographicContent = generateInfographicContent(filename);
    const actualFilename = filename.replace('.png', '.html');
    downloadFile(actualFilename, infographicContent, 'text/html');
}

function downloadBulletin(filename) {
    console.log(`Downloading bulletin: ${filename}`);
    showNotification(`Preparing ${filename} for download...`, 'info');
    
    // Create content for the bulletin
    const bulletinContent = generateBulletinContent(filename);
    downloadFile(filename, bulletinContent, 'text/plain');
}

// Universal download function
function downloadFile(filename, content, mimeType) {
    try {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showNotification(`${filename} downloaded successfully!`, 'success');
    } catch (error) {
        console.error('Download error:', error);
        showNotification(`Error downloading ${filename}. Please try again.`, 'error');
    }
}

// Function to handle dynamic resource downloads
function downloadResource(filename, title, type) {
    console.log(`Downloading resource: ${filename}`);
    showNotification(`Preparing ${title} for download...`, 'info');
    
    // Generate content based on resource type
    let content, mimeType, actualFilename = filename;
    
    switch (type) {
        case 'PDF':
            content = generateResourcePDFContent(title, filename);
            mimeType = 'text/plain';
            break;
        case 'Video':
            content = generateVideoPlaceholder(title);
            mimeType = 'text/html';
            actualFilename = filename.replace('.mp4', '.html');
            break;
        case 'Tool':
            content = generateToolContent(title);
            mimeType = 'text/plain';
            actualFilename = filename.replace('.zip', '.txt');
            break;
        case 'Guide':
        case 'Cheatsheet':
            content = generateGuideContent(filename.replace('.pdf', '.pdf'));
            mimeType = 'text/plain';
            break;
        default:
            content = `Resource: ${title}\n\nThis is a placeholder for ${filename}.\nContact the security team for the actual resource.`;
            mimeType = 'text/plain';
    }
    
    downloadFile(actualFilename, content, mimeType);
}

// Content generation functions
function generatePolicyContent(filename) {
    const policies = {
        'password-policy.pdf': `CYBERSECURITY POLICY DOCUMENT

PASSWORD POLICY

1. PURPOSE
This policy establishes the minimum requirements for passwords used to access organizational systems and data.

2. SCOPE
This policy applies to all employees, contractors, and third-party users who have access to organizational systems.

3. POLICY REQUIREMENTS

3.1 Password Complexity
• Minimum 12 characters in length
• Must contain at least one uppercase letter (A-Z)
• Must contain at least one lowercase letter (a-z)
• Must contain at least one number (0-9)
• Must contain at least one special character (!@#$%^&*)

3.2 Password Management
• Passwords must be changed every 90 days
• Cannot reuse the last 5 passwords
• Must not contain personal information
• Must not be based on dictionary words

3.3 Password Storage
• Use approved password managers
• Never store passwords in plain text
• Do not share passwords with others

4. COMPLIANCE
Violation of this policy may result in disciplinary action.

Document Version: 1.2
Effective Date: January 2025
Next Review: July 2025`,
        
        'mfa-policy.pdf': `CYBERSECURITY POLICY DOCUMENT

MULTI-FACTOR AUTHENTICATION POLICY

1. PURPOSE
This policy establishes requirements for multi-factor authentication (MFA) to enhance security.

2. SCOPE
MFA is required for all users accessing:
• Administrative systems
• Financial applications
• Customer data systems
• Remote access via VPN

3. APPROVED MFA METHODS
• SMS text messages
• Authenticator applications (Google Authenticator, Microsoft Authenticator)
• Hardware security keys
• Biometric authentication

4. IMPLEMENTATION
• MFA must be enabled within 30 days of account creation
• Users must have at least two MFA methods configured
• MFA bypass is prohibited except in emergency situations

5. COMPLIANCE
Regular audits will be conducted to ensure compliance.

Document Version: 1.1
Effective Date: January 2025
Next Review: July 2025`,
        
        'pam-policy.pdf': `CYBERSECURITY POLICY DOCUMENT

PRIVILEGED ACCESS MANAGEMENT POLICY

1. PURPOSE
This policy governs the management and monitoring of privileged accounts.

2. DEFINITIONS
Privileged accounts include:
• Administrator accounts
• Service accounts
• Database administrator accounts
• Network administrator accounts

3. REQUIREMENTS
• All privileged accounts must be approved by IT Security
• Regular access reviews are mandatory
• Privileged sessions must be monitored and recorded
• Just-in-time access principles must be applied

4. ACCESS CONTROLS
• Minimum privilege principle
• Time-bound access grants
• Approval workflows for access requests
• Automatic deprovisioning upon role changes

Document Version: 1.0
Effective Date: January 2025
Next Review: July 2025`,
        
        'data-classification.pdf': `CYBERSECURITY POLICY DOCUMENT

DATA CLASSIFICATION POLICY

1. DATA CLASSIFICATION LEVELS

PUBLIC: Information that can be freely shared
• Marketing materials
• Public announcements
• General company information

INTERNAL: Information for internal use only
• Internal procedures
• Employee directories
• General business plans

CONFIDENTIAL: Sensitive business information
• Financial data
• Strategic plans
• Customer lists

RESTRICTED: Highly sensitive information
• Personal data
• Trade secrets
• Legal documents

2. HANDLING REQUIREMENTS
Each classification level has specific handling, storage, and transmission requirements.

Document Version: 1.3
Effective Date: January 2025
Next Review: July 2025`,
        
        'data-retention.pdf': `CYBERSECURITY POLICY DOCUMENT

DATA RETENTION AND DISPOSAL POLICY

1. RETENTION PERIODS
• Financial records: 7 years
• Employee records: 7 years after termination
• Customer data: As per contractual requirements
• System logs: 1 year minimum

2. DISPOSAL REQUIREMENTS
• Secure deletion methods must be used
• Physical media must be destroyed or wiped
• Certificate of destruction required for sensitive data

3. COMPLIANCE
Regular audits ensure proper data lifecycle management.

Document Version: 1.1
Effective Date: January 2025
Next Review: July 2025`,
        
        'encryption-standards.pdf': `CYBERSECURITY POLICY DOCUMENT

ENCRYPTION STANDARDS POLICY

1. ENCRYPTION REQUIREMENTS

DATA AT REST:
• AES-256 encryption minimum
• Full disk encryption on all devices
• Database encryption for sensitive data

DATA IN TRANSIT:
• TLS 1.3 for web traffic
• VPN for remote access
• Encrypted email for sensitive communications

2. KEY MANAGEMENT
• Centralized key management system
• Regular key rotation
• Secure key storage and backup

3. APPROVED ALGORITHMS
• AES (Advanced Encryption Standard)
• RSA with minimum 2048-bit keys
• ECC (Elliptic Curve Cryptography)

Document Version: 1.2
Effective Date: January 2025
Next Review: July 2025`,
        
        'incident-response.pdf': `CYBERSECURITY POLICY DOCUMENT

INCIDENT RESPONSE PLAN

1. INCIDENT CLASSIFICATION

LOW: Minimal impact on operations
MEDIUM: Moderate impact, business continuity maintained
HIGH: Significant impact, potential data loss
CRITICAL: Severe impact, major business disruption

2. RESPONSE PROCEDURES

PHASE 1: IDENTIFICATION
• Detect and analyze potential incidents
• Classify incident severity
• Notify incident response team

PHASE 2: CONTAINMENT
• Isolate affected systems
• Prevent further damage
• Preserve evidence

PHASE 3: ERADICATION
• Remove threat from environment
• Patch vulnerabilities
• Update security controls

PHASE 4: RECOVERY
• Restore systems to normal operation
• Monitor for recurring issues
• Validate system integrity

PHASE 5: LESSONS LEARNED
• Conduct post-incident review
• Update procedures
• Provide additional training

3. CONTACT INFORMATION
Security Team: security@company.com
Emergency Line: +1 (555) 123-SECURITY

Document Version: 2.1
Effective Date: January 2025
Next Review: April 2025`,
        
        'business-continuity.pdf': `CYBERSECURITY POLICY DOCUMENT

BUSINESS CONTINUITY PLAN

1. OVERVIEW
This plan ensures business operations continue during and after cybersecurity incidents.

2. CRITICAL BUSINESS FUNCTIONS
• Customer service operations
• Financial transactions
• Data processing systems
• Communication systems

3. RECOVERY OBJECTIVES
• Recovery Time Objective (RTO): 4 hours
• Recovery Point Objective (RPO): 1 hour
• Maximum Tolerable Downtime: 24 hours

4. BACKUP AND RECOVERY
• Daily automated backups
• Offsite backup storage
• Regular recovery testing
• Hot standby systems for critical functions

5. COMMUNICATION PLAN
• Employee notification procedures
• Customer communication templates
• Media response guidelines
• Stakeholder update processes

Document Version: 1.4
Effective Date: January 2025
Next Review: June 2025`
    };
    
    return policies[filename] || `CYBERSECURITY POLICY DOCUMENT

${filename.replace('.pdf', '').replace(/-/g, ' ').toUpperCase()}

This is a sample policy document for ${filename}.

Please contact the security team for the complete version.

Document Version: 1.0
Effective Date: January 2025`;
}

function generateGuideContent(filename) {
    const guides = {
        'email-security-guide.pdf': `EMAIL SECURITY BEST PRACTICES GUIDE

1. IDENTIFYING PHISHING EMAILS

Red Flags to Watch For:
• Urgent language or threats
• Requests for personal information
• Suspicious sender addresses
• Unexpected attachments
• Generic greetings ("Dear Customer")
• Grammar and spelling errors
• Mismatched URLs

2. SAFE EMAIL PRACTICES

• Verify sender identity before clicking links
• Hover over links to see actual destination
• Don't download unexpected attachments
• Use email encryption for sensitive data
• Keep email client software updated
• Enable two-factor authentication

3. REPORTING SUSPICIOUS EMAILS

• Forward suspicious emails to security@company.com
• Mark as spam/phishing in your email client
• Do not reply to suspicious emails
• Report immediately if you clicked malicious links

4. SECURE EMAIL CONFIGURATION

• Use strong, unique passwords
• Enable automatic security updates
• Configure spam filters
• Use encrypted email services for sensitive communications

5. MOBILE EMAIL SECURITY

• Install email apps from official app stores only
• Use device lock screens
• Avoid accessing email on public Wi-Fi
• Enable remote wipe capabilities

Remember: When in doubt, contact the IT Security team!

Guide Version: 2.0
Last Updated: January 2025`,
        
        'remote-work-guide.pdf': `SECURE REMOTE WORK GUIDE

1. HOME NETWORK SECURITY

• Change default router passwords
• Enable WPA3 encryption on Wi-Fi
• Regularly update router firmware
• Use guest networks for visitors
• Disable WPS (Wi-Fi Protected Setup)
• Monitor connected devices regularly

2. VPN BEST PRACTICES

• Always connect to company VPN before accessing work resources
• Use only approved VPN software
• Never share VPN credentials
• Disconnect VPN when not needed
• Report VPN issues immediately

3. DEVICE SECURITY

• Keep operating systems updated
• Use endpoint protection software
• Enable automatic screen locks
• Encrypt hard drives
• Use secure cloud storage services
• Regular data backups

4. PHYSICAL SECURITY

• Work in private spaces when possible
• Use privacy screens in public
• Lock devices when stepping away
• Secure important documents
• Be aware of who can see your screen

5. VIDEO CONFERENCING SECURITY

• Use waiting rooms for meetings
• Don't share meeting links publicly
• Mute when not speaking
• Use virtual backgrounds when appropriate
• End meetings properly

6. DATA PROTECTION

• Use approved cloud services only
• Don't store work data on personal devices
• Follow data classification guidelines
• Secure disposal of printed materials

Guide Version: 1.5
Last Updated: January 2025`,
        
        'mobile-security-guide.pdf': `MOBILE DEVICE SECURITY GUIDE

1. DEVICE PROTECTION

• Use strong PINs, passwords, or biometrics
• Enable automatic device locking
• Install security updates promptly
• Use remote wipe capabilities
• Enable Find My Device features

2. APP SECURITY

• Download apps from official stores only
• Review app permissions carefully
• Keep apps updated
• Remove unused applications
• Avoid apps requesting excessive permissions

3. NETWORK SECURITY

• Avoid public Wi-Fi for sensitive activities
• Use VPN on untrusted networks
• Turn off auto-connect for Wi-Fi
• Disable Bluetooth when not needed
• Use cellular data for important work

4. DATA PROTECTION

• Enable device encryption
• Use secure cloud backup services
• Don't store sensitive data locally
• Use secure messaging apps
• Regular data cleanup

5. EMAIL AND MESSAGING

• Use official company email apps
• Enable email encryption
• Verify sender identity
• Don't click suspicious links
• Report phishing attempts

6. LOST OR STOLEN DEVICES

• Report immediately to IT Security
• Use remote wipe if available
• Change all account passwords
• Monitor accounts for suspicious activity
• File police report if necessary

Guide Version: 1.3
Last Updated: January 2025`,
        
        'cloud-security-guide.pdf': `CLOUD SECURITY GUIDE

1. APPROVED CLOUD SERVICES

• Microsoft 365
• Google Workspace
• Company-approved storage solutions
• Vetted SaaS applications
• Check with IT before using new services

2. ACCESS CONTROLS

• Use strong, unique passwords
• Enable multi-factor authentication
• Regularly review access permissions
• Use least privilege principles
• Monitor login activities

3. DATA CLASSIFICATION IN CLOUD

• Follow company data classification policy
• Don't store restricted data in unapproved services
• Use appropriate sharing settings
• Encrypt sensitive data before upload
• Regular access reviews

4. SECURE CONFIGURATION

• Review privacy settings
• Enable audit logging
• Configure appropriate retention policies
• Use approved integration tools
• Regular security assessments

5. SHARING AND COLLABORATION

• Use internal sharing when possible
• Set expiration dates for external shares
• Review shared file permissions regularly
• Don't share with personal accounts
• Use password protection for sensitive shares

6. INCIDENT RESPONSE

• Report suspicious activity immediately
• Don't attempt to investigate alone
• Preserve evidence when possible
• Follow company incident procedures
• Document all actions taken

Guide Version: 1.4
Last Updated: January 2025`
    };
    
    return guides[filename] || `CYBERSECURITY BEST PRACTICES GUIDE

${filename.replace('.pdf', '').replace(/-/g, ' ').toUpperCase()}

This is a sample guide document for ${filename}.

Please contact the security team for the complete version.

Guide Version: 1.0
Last Updated: January 2025`;
}

function generateInfographicContent(filename) {
    const infographics = {
        'password-strength.png': `<!DOCTYPE html>
<html>
<head>
    <title>Password Strength Checker</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; text-align: center; }
        .strength-meter { background: #16213e; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .weak { color: #ff4757; }
        .medium { color: #ffa726; }
        .strong { color: #2ed573; }
        .tip { background: #0f3460; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Strength Checker</h1>
        <div class="strength-meter">
            <h2>Password Requirements</h2>
            <p class="weak">❌ Weak: Less than 8 characters, common words</p>
            <p class="medium">⚠️ Medium: 8-11 characters, mixed case</p>
            <p class="strong">✅ Strong: 12+ characters, mixed case, numbers, symbols</p>
        </div>
        <div class="tip">
            <h3>Tips for Strong Passwords:</h3>
            <ul style="text-align: left;">
                <li>Use passphrases instead of passwords</li>
                <li>Include uppercase, lowercase, numbers, and symbols</li>
                <li>Avoid personal information</li>
                <li>Use unique passwords for each account</li>
                <li>Consider using a password manager</li>
            </ul>
        </div>
    </div>
</body>
</html>`,
        
        'phishing-red-flags.png': `<!DOCTYPE html>
<html>
<head>
    <title>Phishing Red Flags</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .flag { background: #16213e; padding: 15px; margin: 10px 0; border-radius: 10px; border-left: 5px solid #ff4757; }
        .safe { border-left-color: #2ed573; }
        h1 { text-align: center; color: #00d4ff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚩 Phishing Red Flags</h1>
        <div class="flag">
            <h3>❌ Urgent Language</h3>
            <p>"Act now!", "Immediate action required", "Account will be closed"</p>
        </div>
        <div class="flag">
            <h3>❌ Generic Greetings</h3>
            <p>"Dear Customer", "Dear User" instead of your actual name</p>
        </div>
        <div class="flag">
            <h3>❌ Suspicious Links</h3>
            <p>URLs that don't match the supposed sender or look suspicious</p>
        </div>
        <div class="flag">
            <h3>❌ Unexpected Attachments</h3>
            <p>Files you weren't expecting, especially .exe, .zip, or .doc files</p>
        </div>
        <div class="flag">
            <h3>❌ Request for Personal Info</h3>
            <p>Asking for passwords, SSN, credit card numbers via email</p>
        </div>
        <div class="flag safe">
            <h3>✅ What to Do</h3>
            <p>Forward to security@company.com, mark as spam, don't click anything!</p>
        </div>
    </div>
</body>
</html>`,
        
        'incident-response-steps.png': `<!DOCTYPE html>
<html>
<head>
    <title>Incident Response Steps</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .step { background: #16213e; padding: 20px; margin: 15px 0; border-radius: 10px; border-left: 5px solid #00d4ff; }
        .step-number { background: #00d4ff; color: #1a1a2e; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
        h1 { text-align: center; color: #00d4ff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛡️ Incident Response Steps</h1>
        <div class="step">
            <span class="step-number">1</span>
            <strong>IDENTIFY</strong><br>
            Detect and analyze the potential security incident
        </div>
        <div class="step">
            <span class="step-number">2</span>
            <strong>CONTAIN</strong><br>
            Isolate affected systems to prevent spread
        </div>
        <div class="step">
            <span class="step-number">3</span>
            <strong>ERADICATE</strong><br>
            Remove the threat and patch vulnerabilities
        </div>
        <div class="step">
            <span class="step-number">4</span>
            <strong>RECOVER</strong><br>
            Restore systems and validate integrity
        </div>
        <div class="step">
            <span class="step-number">5</span>
            <strong>LEARN</strong><br>
            Conduct post-incident review and improve
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 18px; color: #00d4ff;">
            📞 Emergency: +1 (555) 123-SECURITY
        </div>
    </div>
</body>
</html>`,
        
        'data-classification.png': `<!DOCTYPE html>
<html>
<head>
    <title>Data Classification Guide</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .classification { padding: 20px; margin: 15px 0; border-radius: 10px; }
        .public { background: #2ed573; color: #000; }
        .internal { background: #ffa726; color: #000; }
        .confidential { background: #ff6b6b; color: #fff; }
        .restricted { background: #ff4757; color: #fff; }
        h1 { text-align: center; color: #00d4ff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗂️ Data Classification Levels</h1>
        <div class="classification public">
            <h2>🟢 PUBLIC</h2>
            <p>Information that can be freely shared with anyone</p>
            <small>Examples: Marketing materials, press releases, public announcements</small>
        </div>
        <div class="classification internal">
            <h2>🟡 INTERNAL</h2>
            <p>Information for internal use only</p>
            <small>Examples: Internal procedures, employee directories, business plans</small>
        </div>
        <div class="classification confidential">
            <h2>🟠 CONFIDENTIAL</h2>
            <p>Sensitive business information requiring protection</p>
            <small>Examples: Financial data, strategic plans, customer information</small>
        </div>
        <div class="classification restricted">
            <h2>🔴 RESTRICTED</h2>
            <p>Highly sensitive information with strict access controls</p>
            <small>Examples: Personal data, trade secrets, legal documents</small>
        </div>
    </div>
</body>
</html>`
    };
    
    return infographics[filename] || `<!DOCTYPE html>
<html>
<head><title>${filename}</title></head>
<body style="font-family: Arial; background: #1a1a2e; color: #fff; padding: 20px; text-align: center;">
    <h1>Cybersecurity Infographic</h1>
    <p>This is a sample infographic for ${filename}</p>
    <p>Contact the security team for the complete version.</p>
</body>
</html>`;
}

function generateBulletinContent(filename) {
    return `CYBERSECURITY BULLETIN

${filename.replace('.pdf', '').replace(/-/g, ' ').toUpperCase()}

This is a sample bulletin document for ${filename}.

Please contact the security team for the complete version.

Bulletin Version: 1.0
Issue Date: January 2025`;
}

function generateResourcePDFContent(title, filename) {
    const resourceContents = {
        'cybersecurity-best-practices-guide.pdf': `CYBERSECURITY BEST PRACTICES GUIDE

1. ACCESS CONTROL
• Use strong, unique passwords for all accounts
• Enable multi-factor authentication where available
• Regularly review and update access permissions
• Implement least privilege principles

2. DATA PROTECTION
• Classify data according to sensitivity levels
• Encrypt sensitive data both at rest and in transit
• Regular backups with tested restore procedures
• Secure disposal of sensitive information

3. NETWORK SECURITY
• Keep firewalls properly configured and updated
• Use VPNs for remote access
• Monitor network traffic for suspicious activity
• Segregate critical systems from general networks

4. EMPLOYEE AWARENESS
• Regular security training and awareness programs
• Phishing simulation exercises
• Clear incident reporting procedures
• Security policy acknowledgment and compliance

5. INCIDENT RESPONSE
• Develop and maintain incident response plans
• Regular testing and updating of procedures
• Clear communication channels during incidents
• Post-incident review and improvement processes

6. COMPLIANCE AND GOVERNANCE
• Regular security assessments and audits
• Compliance with relevant regulations and standards
• Security governance framework
• Risk management and mitigation strategies

Version: 2.0 | Last Updated: January 2025`
    };
    
    return resourceContents[filename] || `CYBERSECURITY RESOURCE

${title}

This is a sample resource document.
Contact the security team for the complete version.

Version: 1.0
Date: January 2025`;
}

function generateVideoPlaceholder(title) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; padding: 20px; text-align: center; }
        .video-placeholder { background: #16213e; padding: 40px; border-radius: 10px; margin: 20px auto; max-width: 600px; }
        .play-icon { font-size: 4rem; color: #00d4ff; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="video-placeholder">
        <div class="play-icon">▶️</div>
        <h1>${title}</h1>
        <p>This is a placeholder for the video content.</p>
        <p>The actual video would be available through the security training portal.</p>
        <p>Duration: Approximately 15-30 minutes</p>
        <p>Format: MP4, HD Quality</p>
        <br>
        <p style="color: #00d4ff;">Contact the security team for access to the actual video content.</p>
    </div>
</body>
</html>`;
}

function generateToolContent(title) {
    return `SECURITY TOOL: ${title}

DESCRIPTION:
This is a placeholder for the security tool.

INSTALLATION:
1. Extract the tool files
2. Run setup or installation script
3. Configure according to your environment
4. Run initial security scan

USAGE:
1. Launch the tool
2. Configure scan parameters
3. Run security assessment
4. Review results and recommendations

SUPPORT:
Contact the security team for:
- Installation assistance
- Configuration guidance
- Result interpretation
- Troubleshooting

Version: 1.0
Date: January 2025

NOTE: This is a sample tool description. 
Contact security@company.com for the actual tool download.`;
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#00d4ff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(notificationStyles);

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.loadMoreAlerts = loadMoreAlerts;
window.clearForm = clearForm;
window.clearFiles = clearFiles;
window.removeFile = removeFile;
window.sendChatMessage = sendChatMessage;
window.askQuestion = askQuestion;
window.initiateCall = initiateCall;
window.openLiveChat = openLiveChat;
window.getDirections = getDirections;
window.downloadPolicy = downloadPolicy;
window.downloadGuide = downloadGuide;
window.downloadInfographic = downloadInfographic;
window.downloadBulletin = downloadBulletin;
window.showContinentDetails = showContinentDetails;

// ===== TEAM MATE 2 INTEGRATION - Resource Library & Calendar Functionality =====

// Initialize policies page with Team mate 2 functionality
function initializePoliciesPage() {
    // Check if we're on the policies page
    if (window.location.pathname.includes('policies.html') || document.getElementById('resource-cards-container')) {
        initializeResourceLibrary();
        initializeEventsCalendar();
        initializeAddEventForm(); // Initialize the add event form
    }
}

// Resource Library Functionality
function initializeResourceLibrary() {
    var resourcesContainer = document.getElementById('resource-cards-container');
    var filterButtons = document.querySelectorAll('.filter-btn');
    var allResources = [];

    if (!resourcesContainer) return;

    // Check if Firebase functions are available
    if (typeof window.firebaseFunctions !== 'undefined' && typeof window.firebaseFunctions.fetchResources !== 'undefined') {
        // Fetch real resources from Firebase
        window.firebaseFunctions.fetchResources()
            .then(function(resources) {
                allResources = resources;
                renderResources(allResources);
            })
            .catch(function(error) {
                console.error("Resources error:", error);
                // Fallback to demo resources
                allResources = getDemoResources();
                renderResources(allResources);
            });
    } else {
        console.log('Firebase not available, using demo resources');
        // Use demo resources when Firebase is not available
        allResources = getDemoResources();
        renderResources(allResources);
    }

    // Function to render resources based on filter
    function renderResources(resourcesToRender) {
        resourcesContainer.innerHTML = ''; // Clear loader
        if (resourcesToRender.length === 0) {
            resourcesContainer.innerHTML = '<p class="no-resources">No resources found for this category.</p>';
            return;
        }
        resourcesToRender.forEach(function(resource) {
            var resourceElement = document.createElement('div');
            resourceElement.className = 'resource-card';
            resourceElement.setAttribute('data-type', resource.type);
            resourceElement.innerHTML = `
                <i class="fas ${resource.icon}"></i>
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <button class="download-btn" onclick="downloadResource('${resource.downloadUrl}', '${resource.title}', '${resource.type}')">Download <i class="fas fa-download"></i></button>
            `;
            resourcesContainer.appendChild(resourceElement);
        });
    }

    // Add event listeners for filter buttons
    if (filterButtons) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');

                var filterType = this.getAttribute('data-filter');
                var filteredResources = allResources;

                if (filterType !== 'all') {
                    filteredResources = allResources.filter(resource => resource.type === filterType);
                }

                renderResources(filteredResources);
            });
        });
    }
}

// Events Calendar Functionality
function initializeEventsCalendar() {
    var calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // Check if Firebase functions and FullCalendar are available
    if (typeof window.firebaseFunctions !== 'undefined' && typeof FullCalendar !== 'undefined') {
        window.firebaseFunctions.fetchCalendarEvents()
            .then(function(events) {
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    // Map events for FullCalendar
                    events: events.map(function(event) {
                        // Assign colors based on priority
                        var eventColor = getEventColor(event.priority || 'medium');
                        return {
                            id: event.id,
                            title: event.title,
                            start: event.date,
                            allDay: true,
                            backgroundColor: eventColor.bg,
                            borderColor: eventColor.border,
                            extendedProps: {
                                description: event.description || '',
                                priority: event.priority || 'medium',
                                type: event.type || 'general'
                            }
                        };
                    }),
                    // Handle event clicks
                    eventClick: function(info) {
                        showEventDetails(info.event);
                    },
                    // Handle date clicks to add new events
                    dateClick: function(info) {
                        openAddEventModalWithDate(info.dateStr);
                    },
                    // Dark theme styling
                    themeSystem: 'standard'
                });
                calendar.render();
            })
            .catch(function(error) {
                console.error("Calendar error:", error);
                // Show demo events with local storage support
                initializeDemoCalendarWithLocal(calendarEl);
            });
    } else {
        console.log('Firebase or FullCalendar not available, using demo calendar with local storage');
        // Initialize with demo events and local storage
        initializeDemoCalendarWithLocal(calendarEl);
    }
}

// Demo Calendar for when Firebase is not available
function initializeDemoCalendar(calendarEl) {
    if (typeof FullCalendar !== 'undefined') {
        var demoEvents = [
            {
                id: 'demo1',
                title: 'Cybersecurity Awareness Training',
                start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#00d4ff',
                borderColor: '#0099cc'
            },
            {
                id: 'demo2',
                title: 'Incident Response Drill',
                start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#ff6b6b',
                borderColor: '#ff5252'
            },
            {
                id: 'demo3',
                title: 'Security Policy Review',
                start: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#4ecdc4',
                borderColor: '#26a69a'
            }
        ];

        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: demoEvents,
            eventClick: function(info) {
                showEventDetails(info.event);
            },
            // Handle date clicks to add new events
            dateClick: function(info) {
                openAddEventModalWithDate(info.dateStr);
            }
        });
        calendar.render();
    } else {
        calendarEl.innerHTML = '<p class="calendar-error">Calendar library not loaded. Please refresh the page.</p>';
    }
}

// Show event details in a modal or alert
function showEventDetails(event) {
    const message = `Event: ${event.title}\nDate: ${event.start.toLocaleDateString()}\nClick OK to learn more about this event.`;
    if (confirm(message)) {
        // In a real application, this could open a detailed event page
        console.log('Opening event details for:', event.id);
    }
}

// Get event colors based on priority
function getEventColor(priority) {
    const colors = {
        low: { bg: '#27ae60', border: '#229954' },
        medium: { bg: '#f39c12', border: '#e67e22' },
        high: { bg: '#ff6b35', border: '#e55100' },
        critical: { bg: '#ff3838', border: '#d32f2f' }
    };
    return colors[priority] || colors.medium;
}

// Modal functions for adding events
function openAddEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'flex';
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').value = today;
        // Focus on title field
        setTimeout(() => {
            document.getElementById('eventTitle').focus();
        }, 100);
    }
}

function openAddEventModalWithDate(dateStr) {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'flex';
        // Set the clicked date
        document.getElementById('eventDate').value = dateStr;
        // Focus on title field
        setTimeout(() => {
            document.getElementById('eventTitle').focus();
        }, 100);
    }
}

function closeAddEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        document.getElementById('addEventForm').reset();
    }
}

// Handle form submission for adding events
function initializeAddEventForm() {
    const form = document.getElementById('addEventForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const eventData = {
                title: formData.get('eventTitle'),
                description: formData.get('eventDescription'),
                date: formData.get('eventDate'),
                time: formData.get('eventTime'),
                type: formData.get('eventType'),
                priority: formData.get('eventPriority'),
                createdBy: 'User' // In a real app, this would be the logged-in user
            };
            
            // Validate required fields
            if (!eventData.title || !eventData.date) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Event...';
            submitBtn.disabled = true;
            
            // Try to add to Firebase, fallback to local storage
            if (typeof window.firebaseFunctions !== 'undefined' && window.firebaseFunctions.addCalendarEvent) {
                window.firebaseFunctions.addCalendarEvent(eventData)
                    .then(function(eventId) {
                        showNotification('Event added successfully!', 'success');
                        closeAddEventModal();
                        // Refresh calendar
                        setTimeout(() => {
                            initializeEventsCalendar();
                        }, 500);
                    })
                    .catch(function(error) {
                        console.error('Error adding event:', error);
                        // Fallback to local storage
                        addEventToLocalStorage(eventData);
                    })
                    .finally(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback to local storage when Firebase is not available
                addEventToLocalStorage(eventData);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Fallback function to add events to local storage
function addEventToLocalStorage(eventData) {
    try {
        let localEvents = JSON.parse(localStorage.getItem('cybersecurity_events') || '[]');
        eventData.id = 'local_' + Date.now();
        eventData.createdAt = new Date().toISOString();
        localEvents.push(eventData);
        localStorage.setItem('cybersecurity_events', JSON.stringify(localEvents));
        
        showNotification('Event added to local calendar!', 'success');
        closeAddEventModal();
        
        // Refresh calendar with local events
        setTimeout(() => {
            initializeEventsCalendar();
        }, 500);
    } catch (error) {
        console.error('Error saving to local storage:', error);
        showNotification('Failed to add event', 'error');
    }
}

// Function to load local events when Firebase is not available
function loadLocalEvents() {
    try {
        const localEvents = JSON.parse(localStorage.getItem('cybersecurity_events') || '[]');
        return localEvents;
    } catch (error) {
        console.error('Error loading local events:', error);
        return [];
    }
}

// Enhanced demo calendar with local events
function initializeDemoCalendarWithLocal(calendarEl) {
    if (typeof FullCalendar !== 'undefined') {
        // Combine demo events with local events
        var demoEvents = [
            {
                id: 'demo1',
                title: 'Cybersecurity Awareness Training',
                start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#00d4ff',
                borderColor: '#0099cc'
            },
            {
                id: 'demo2',
                title: 'Incident Response Drill',
                start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#ff6b6b',
                borderColor: '#ff5252'
            },
            {
                id: 'demo3',
                title: 'Security Policy Review',
                start: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                backgroundColor: '#4ecdc4',
                borderColor: '#26a69a'
            }
        ];
        
        // Add local events
        const localEvents = loadLocalEvents();
        const localCalendarEvents = localEvents.map(function(event) {
            const eventColor = getEventColor(event.priority || 'medium');
            return {
                id: event.id,
                title: event.title,
                start: event.date,
                allDay: true,
                backgroundColor: eventColor.bg,
                borderColor: eventColor.border,
                extendedProps: {
                    description: event.description || '',
                    priority: event.priority || 'medium',
                    type: event.type || 'general',
                    isLocal: true
                }
            };
        });
        
        const allEvents = [...demoEvents, ...localCalendarEvents];
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: allEvents,
            eventClick: function(info) {
                showEventDetails(info.event);
            },
            dateClick: function(info) {
                openAddEventModalWithDate(info.dateStr);
            }
        });
        calendar.render();
    } else {
        calendarEl.innerHTML = '<p class="calendar-error">Calendar library not loaded. Please refresh the page.</p>';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1001;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .notification-success { background: #27ae60; }
            .notification-error { background: #e74c3c; }
            .notification-info { background: #3498db; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('addEventModal');
    if (modal && e.target === modal) {
        closeAddEventModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAddEventModal();
    }
});

// Demo Resources for when Firebase is not available
function getDemoResources() {
    return [
        {
            id: 'demo1',
            title: 'Cybersecurity Best Practices Guide',
            type: 'PDF',
            downloadUrl: 'cybersecurity-best-practices-guide.pdf',
            description: 'Comprehensive guide covering essential cybersecurity practices for organizations.',
            icon: 'fa-file-pdf'
        },
        {
            id: 'demo2',
            title: 'Incident Response Training Video',
            type: 'Video',
            downloadUrl: 'incident-response-training.mp4',
            description: 'Step-by-step video guide for handling cybersecurity incidents effectively.',
            icon: 'fa-video'
        },
        {
            id: 'demo3',
            title: 'Security Assessment Tool',
            type: 'Tool',
            downloadUrl: 'security-assessment-tool.zip',
            description: 'Automated tool for conducting preliminary security assessments.',
            icon: 'fa-tools'
        },
        {
            id: 'demo4',
            title: 'Password Policy Template',
            type: 'Guide',
            downloadUrl: 'password-policy-template.pdf',
            description: 'Template for creating comprehensive password policies in your organization.',
            icon: 'fa-book'
        },
        {
            id: 'demo5',
            title: 'Phishing Detection Cheatsheet',
            type: 'Cheatsheet',
            downloadUrl: 'phishing-detection-cheatsheet.pdf',
            description: 'Quick reference guide for identifying and handling phishing attempts.',
            icon: 'fa-layer-group'
        },
        {
            id: 'demo6',
            title: 'Network Security Fundamentals',
            type: 'PDF',
            downloadUrl: 'network-security-fundamentals.pdf',
            description: 'Essential concepts and practices for securing network infrastructure.',
            icon: 'fa-file-pdf'
        },
        {
            id: 'demo7',
            title: 'Social Engineering Awareness',
            type: 'Video',
            downloadUrl: 'social-engineering-awareness.mp4',
            description: 'Educational video about recognizing and preventing social engineering attacks.',
            icon: 'fa-video'
        },
        {
            id: 'demo8',
            title: 'Vulnerability Scanner',
            type: 'Tool',
            downloadUrl: 'vulnerability-scanner.zip',
            description: 'Tool for identifying security vulnerabilities in network systems.',
            icon: 'fa-tools'
        }
    ];
}

// Update the main initialize function to include policies page initialization
function initializeAppWithTeammate2() {
    // Call original initialization
    if (typeof initializeApp === 'function') {
        initializeApp();
    }
    
    // Initialize Team mate 2 functionality
    initializePoliciesPage();
}

// Export new functions for global access
window.initializePoliciesPage = initializePoliciesPage;
window.initializeResourceLibrary = initializeResourceLibrary;
window.initializeEventsCalendar = initializeEventsCalendar;
window.showEventDetails = showEventDetails;
window.downloadResource = downloadResource;

// Call the enhanced initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure Firebase scripts are loaded
    setTimeout(initializePoliciesPage, 500);
});

// ============================================
// TRAINING MODULE FUNCTIONS (Team mate 3 Integration)
// ============================================

// Training module global variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let trainingQuizzes = [];
let trainingUserId = null;
let isTrainingAuthReady = false;

// Training Initialization
function initializeTraining() {
    console.log('Training: Initializing training module...');
    
    // Check if we're on the training page
    if (!window.location.pathname.includes('training.html')) {
        console.log('Training: Not on training page, skipping initialization.');
        return;
    }
    
    // Initialize auth state
    if (window.firebaseFunctions) {
        isTrainingAuthReady = true;
        trainingUserId = 'anonymous_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Initialize training components
    initializeTrainingStats();
    initializeTrainingCards();
    initializeTrainingModals();
    initializeLeaderboard();
    fetchTrainingData();
    
    console.log('Training: Initialization complete.');
}

// Initialize training statistics animation
function initializeTrainingStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Animate counting numbers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                let finalValue = parseInt(target.getAttribute('data-target'));
                
                // Handle NaN cases
                if (isNaN(finalValue)) {
                    // Try to parse from text content
                    const textContent = target.textContent.trim().replace(/[^0-9.]/g, '');
                    finalValue = parseInt(textContent) || 0;
                    
                    // Set reasonable defaults if still no value
                    if (finalValue === 0) {
                        finalValue = 100; // Default value
                    }
                }
                
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate counter numbers
function animateCounter(element, target) {
    // Validate target parameter
    if (isNaN(target) || target === undefined || target === null) {
        // Try to get from data-target attribute
        const dataTarget = element.getAttribute('data-target');
        if (dataTarget && !isNaN(parseFloat(dataTarget))) {
            target = parseFloat(dataTarget);
        } else {
            // Provide fallback based on element context
            if (element.textContent && !isNaN(parseFloat(element.textContent))) {
                target = parseFloat(element.textContent);
            } else {
                target = 100; // Generic fallback
            }
        }
    }
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
        element.classList.add('animate');
    }, 30);
}

// Initialize training cards and load data
function initializeTrainingCards() {
    const trainingGrid = document.getElementById('training-cards-grid');
    if (!trainingGrid) return;
    
    // Show loading state
    showTrainingLoading(true);
    
    // Load training programs
    setTimeout(() => {
        loadTrainingPrograms();
    }, 1000);
}

// Load training programs
function loadTrainingPrograms() {
    const trainingGrid = document.getElementById('training-cards-grid');
    if (!trainingGrid) return;
    
    // Use Firebase function if available, otherwise fallback to static data
    if (window.firebaseFunctions && window.firebaseFunctions.fetchTrainingPrograms) {
        window.firebaseFunctions.fetchTrainingPrograms()
            .then(programs => {
                renderTrainingCards(programs);
                showTrainingLoading(false);
            })
            .catch(error => {
                console.error('Training: Error loading programs:', error);
                loadStaticPrograms();
            });
    } else {
        loadStaticPrograms();
    }
}

// Load static training programs (fallback)
function loadStaticPrograms() {
    const programs = [
        {
            id: 'phishing',
            title: 'Phishing Awareness Insights',
            description: 'Learn about the latest phishing techniques and how to recognize them through expert insights and real-world examples.',
            type: 'phishing',
            progress: 0,
            buttonText: 'View Insights',
            link: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'
        },
        {
            id: 'ransomware',
            title: 'Ransomware Defense Guide',
            description: 'Access comprehensive resources about ransomware prevention, detection, and response strategies.',
            type: 'ransomware',
            progress: 0,
            buttonText: 'Access Guide',
            link: 'https://www.cisa.gov/stopransomware'
        },
        {
            id: 'hygiene',
            title: 'Cyber Hygiene Best Practices',
            description: 'Discover essential security practices for password management, software updates, and safe browsing habits.',
            type: 'hygiene',
            progress: 0,
            buttonText: 'Read Practices',
            link: 'https://www.cisa.gov/sites/default/files/publications/Cyber%20Hygiene%20Services%20-%20Fact%20Sheet_S508C.pdf'
        },
        {
            id: 'quiz',
            title: 'Security Knowledge Assessment',
            description: 'Test your cybersecurity knowledge with comprehensive quizzes and compete on the global leaderboard.',
            type: 'quiz',
            progress: 85,
            buttonText: 'Take Assessment'
        }
    ];
    
    renderTrainingCards(programs);
    showTrainingLoading(false);
}

// Render training cards
function renderTrainingCards(programs) {
    const trainingGrid = document.getElementById('training-cards-grid');
    if (!trainingGrid) return;
    
    trainingGrid.innerHTML = '';
    
    programs.forEach(program => {
        const card = document.createElement('div');
        card.className = 'training-card';
        card.setAttribute('data-type', program.type);
        
        // Only show progress for quiz cards
        const progressHTML = program.type === 'quiz' ? `
            <div class="training-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${program.progress}%"></div>
                </div>
                <div class="progress-text">Progress: ${program.progress}%</div>
            </div>
        ` : '';
        
        card.innerHTML = `
            <h3 class="training-card-title">${program.title}</h3>
            <p class="training-card-description">${program.description}</p>
            ${progressHTML}
            <button class="training-card-button" data-type="${program.type}" data-id="${program.id}">
                ${program.buttonText}
            </button>
        `;
        
        trainingGrid.appendChild(card);
        
        // Add click event listener
        const button = card.querySelector('.training-card-button');
        button.addEventListener('click', () => handleTrainingCardClick(program));
    });
}

// Handle training card click
function handleTrainingCardClick(program) {
    console.log('Training: Card clicked:', program.title);
    
    if (program.type === 'quiz') {
        // Keep quiz functionality for assessments
        openQuizModal();
    } else if (program.link) {
        // Open external links for insights/resources
        window.open(program.link, '_blank');
    } else {
        // Fallback to modal for cards without links
        openModuleModal(program);
    }
}

// Initialize training modals
function initializeTrainingModals() {
    // Quiz modal
    const quizModal = document.getElementById('quiz-modal');
    const closeQuizBtn = document.getElementById('close-quiz-modal-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const prevBtn = document.getElementById('prev-question-btn');
    const submitBtn = document.getElementById('submit-quiz-btn');
    
    if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', closeQuizModal);
    }
    
    if (quizModal) {
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) closeQuizModal();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitQuiz);
    }
    
    // Module modal
    const moduleModal = document.getElementById('module-modal');
    const closeModuleBtn = document.getElementById('close-module-modal-btn');
    
    if (closeModuleBtn) {
        closeModuleBtn.addEventListener('click', closeModuleModal);
    }
    
    if (moduleModal) {
        moduleModal.addEventListener('click', (e) => {
            if (e.target === moduleModal) closeModuleModal();
        });
    }
}

// Open quiz modal
function openQuizModal() {
    const quizModal = document.getElementById('quiz-modal');
    if (!quizModal) return;
    
    console.log('Training: Opening quiz modal...');
    
    // Load quizzes if not already loaded
    if (trainingQuizzes.length === 0) {
        if (window.firebaseFunctions && window.firebaseFunctions.fetchQuizzes) {
            window.firebaseFunctions.fetchQuizzes()
                .then(quizzes => {
                    trainingQuizzes = quizzes;
                    if (trainingQuizzes.length > 0) {
                        startQuiz(trainingQuizzes[0]);
                    } else {
                        showQuizError('No quizzes available.');
                    }
                })
                .catch(error => {
                    console.error('Training: Error loading quizzes:', error);
                    loadStaticQuiz();
                });
        } else {
            loadStaticQuiz();
        }
    } else {
        startQuiz(trainingQuizzes[0]);
    }
    
    quizModal.style.display = 'flex';
}

// Helper function to start a quiz
function startQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    userAnswers = {};
    renderQuizQuestion();
}

// Load static quiz (fallback)
function loadStaticQuiz() {
    trainingQuizzes = [{
        id: 'cybersecurity-basics',
        title: 'Cybersecurity Fundamentals Quiz',
        questions: [
            {
                question: 'What is the most effective way to protect against phishing attacks?',
                options: [
                    'Install antivirus software',
                    'Verify sender identity before clicking links',
                    'Use strong passwords',
                    'Enable firewall protection'
                ],
                correctAnswerIndex: 1
            },
            {
                question: 'Which of the following is a sign of a ransomware attack?',
                options: [
                    'Slow computer performance',
                    'Files suddenly encrypted with unusual extensions',
                    'Frequent pop-up advertisements',
                    'Automatic software updates'
                ],
                correctAnswerIndex: 1
            },
            {
                question: 'What should you do if you suspect a security breach?',
                options: [
                    'Continue working normally',
                    'Restart your computer',
                    'Immediately report to IT security team',
                    'Delete suspicious files'
                ],
                correctAnswerIndex: 2
            }
        ]
    }];
    
    if (trainingQuizzes.length > 0) {
        startQuiz(trainingQuizzes[0]);
    }
}

// Close quiz modal
function closeQuizModal() {
    const quizModal = document.getElementById('quiz-modal');
    if (quizModal) {
        quizModal.style.display = 'none';
    }
}

// Open module modal
function openModuleModal(program) {
    const moduleModal = document.getElementById('module-modal');
    const moduleTitle = document.getElementById('module-title');
    const moduleDescription = document.getElementById('module-description');
    
    if (!moduleModal || !moduleTitle || !moduleDescription) return;
    
    moduleTitle.innerHTML = `<i class="fas fa-graduation-cap"></i> ${program.title}`;
    
    let content = `<p>${program.description}</p>`;
    
    // Add specific content based on module type
    switch (program.type) {
        case 'phishing':
            content += `
                <h4>Learning Objectives:</h4>
                <ul>
                    <li>Identify common phishing tactics and techniques</li>
                    <li>Recognize suspicious email indicators</li>
                    <li>Implement best practices for email security</li>
                    <li>Report and respond to phishing attempts</li>
                </ul>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p><strong>Difficulty:</strong> Intermediate</p>
            `;
            break;
        case 'ransomware':
            content += `
                <h4>Simulation Scenarios:</h4>
                <ul>
                    <li>Email-based ransomware delivery</li>
                    <li>Drive-by download attacks</li>
                    <li>Network propagation methods</li>
                    <li>Recovery and mitigation strategies</li>
                </ul>
                <p><strong>Duration:</strong> 45 minutes</p>
                <p><strong>Difficulty:</strong> Advanced</p>
            `;
            break;
        case 'hygiene':
            content += `
                <h4>Best Practices Covered:</h4>
                <ul>
                    <li>Strong password creation and management</li>
                    <li>Multi-factor authentication setup</li>
                    <li>Software update procedures</li>
                    <li>Safe browsing and download practices</li>
                </ul>
                <p><strong>Duration:</strong> 20 minutes</p>
                <p><strong>Difficulty:</strong> Beginner</p>
            `;
            break;
    }
    
    moduleDescription.innerHTML = content;
    moduleModal.style.display = 'flex';
}

// Close module modal
function closeModuleModal() {
    const moduleModal = document.getElementById('module-modal');
    if (moduleModal) {
        moduleModal.style.display = 'none';
    }
}

// Render quiz question
function renderQuizQuestion() {
    const questionContainer = document.getElementById('quiz-question-container');
    const nextBtn = document.getElementById('next-question-btn');
    const prevBtn = document.getElementById('prev-question-btn');
    const submitBtn = document.getElementById('submit-quiz-btn');
    
    if (!questionContainer || !currentQuiz || !currentQuiz.questions[currentQuestionIndex]) {
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <div class="quiz-content">
            <p style="color: #b8c5d6; margin-bottom: 1rem;">Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</p>
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <label class="quiz-option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}">
                        <input type="radio" name="quiz-option" value="${index}" 
                               ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners to options
    const options = questionContainer.querySelectorAll('input[name="quiz-option"]');
    options.forEach(option => {
        option.addEventListener('change', (e) => {
            userAnswers[currentQuestionIndex] = parseInt(e.target.value);
            // Update visual selection
            questionContainer.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            e.target.closest('.quiz-option').classList.add('selected');
        });
    });
    
    // Update button visibility
    if (prevBtn) {
        prevBtn.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    }
    
    if (nextBtn) {
        nextBtn.style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'block' : 'none';
    }
    
    if (submitBtn) {
        submitBtn.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'block' : 'none';
    }
}

// Next question
function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        renderQuizQuestion();
    }
}

// Previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuizQuestion();
    }
}

// Submit quiz
function submitQuiz() {
    const score = calculateQuizScore();
    const total = currentQuiz.questions.length;
    
    showQuizResults(score, total);
    saveQuizScore(score, total);
}

// Calculate quiz score
function calculateQuizScore() {
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] !== undefined && userAnswers[index] === question.correctAnswerIndex) {
            score++;
        }
    });
    return score;
}

// Show quiz results
function showQuizResults(score, total) {
    const questionContainer = document.getElementById('quiz-question-container');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question-btn');
    const prevBtn = document.getElementById('prev-question-btn');
    const submitBtn = document.getElementById('submit-quiz-btn');
    
    if (!feedback) return;
    
    const percentage = Math.round((score / total) * 100);
    let resultMessage = 'Needs Improvement';
    
    if (percentage >= 80) {
        resultMessage = 'Excellent!';
    } else if (percentage >= 60) {
        resultMessage = 'Good Job!';
    }
    
    feedback.innerHTML = `
        <h3 style="color: #00d4ff; margin-bottom: 1rem;">Quiz Complete!</h3>
        <div style="font-size: 2rem; margin-bottom: 1rem; color: ${percentage >= 60 ? '#27ae60' : '#ff4757'}">
            ${score} / ${total}
        </div>
        <div style="font-size: 1.2rem; margin-bottom: 1.5rem; color: #ffffff;">
            ${percentage}% - ${resultMessage}
        </div>
        <div class="quiz-results">
            ${currentQuiz.questions.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correctAnswerIndex;
                return `
                    <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <strong>Q${index + 1}:</strong> ${question.question}<br>
                        <small>Your answer: ${question.options[userAnswers[index]] || 'No answer'}</small><br>
                        <small>Correct answer: ${question.options[question.correctAnswerIndex]}</small>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    feedback.style.display = 'block';
    questionContainer.style.display = 'none';
    
    // Hide all navigation buttons
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
}

// Save quiz score
function saveQuizScore(score, total) {
    console.log('Training: Quiz score to save:', score, '/', total);
    
    // Use Firebase function if available
    if (window.firebaseFunctions && window.firebaseFunctions.saveQuizScore) {
        window.firebaseFunctions.saveQuizScore(trainingUserId, score, total, currentQuiz.id)
            .then(scoreId => {
                console.log('Training: Quiz score saved successfully:', scoreId);
                updateLeaderboard(score, total);
            })
            .catch(error => {
                console.error('Training: Error saving quiz score:', error);
                updateLeaderboard(score, total); // Still update leaderboard locally
            });
    } else {
        console.log('Training: Firebase not available, score saved locally only');
        updateLeaderboard(score, total);
    }
}

// Initialize leaderboard
function initializeLeaderboard() {
    loadLeaderboard();
}

// Load leaderboard data
function loadLeaderboard() {
    const leaderboardContent = document.getElementById('leaderboard-content');
    if (!leaderboardContent) return;
    
    // Show loading
    showLeaderboardLoading(true);
    
    // Use Firebase function if available
    if (window.firebaseFunctions && window.firebaseFunctions.fetchLeaderboard) {
        window.firebaseFunctions.fetchLeaderboard(4)
            .then(data => {
                renderLeaderboard(data);
                showLeaderboardLoading(false);
            })
            .catch(error => {
                console.error('Training: Error loading leaderboard:', error);
                loadStaticLeaderboard();
            });
    } else {
        // Fallback to static data
        setTimeout(() => {
            loadStaticLeaderboard();
        }, 1500);
    }
}

// Load static leaderboard (fallback)
function loadStaticLeaderboard() {
    const mockData = [
        { rank: 1, name: 'Treasure Mashabane', department: 'IT Security', score: 9, total: 10, percentage: 90 },
        { rank: 2, name: 'Rebafenyi Mudau', department: 'Security Operations', score: 8, total: 10, percentage: 80 },
        { rank: 3, name: 'Ditshego Kgwadi', department: 'Security Awareness', score: 7, total: 10, percentage: 70 },
        { rank: 4, name: 'Thabo Mavundla', department: 'Cybersecurity Engineering', score: 6, total: 10, percentage: 60 }
    ];
    
    renderLeaderboard(mockData);
    showLeaderboardLoading(false);
}

// Render leaderboard
function renderLeaderboard(data) {
    const leaderboardContent = document.getElementById('leaderboard-content');
    if (!leaderboardContent) return;
    
    leaderboardContent.innerHTML = data.map(entry => {
        const completion = entry.completion || `${entry.percentage || 0}%`;
        const displayScore = entry.total ? `${entry.score}/${entry.total}` : entry.score;
        
        return `
            <tr>
                <td>${entry.rank}</td>
                <td>${entry.name}</td>
                <td>${entry.department}</td>
                <td style="color: #00d4ff; font-weight: 600;">${displayScore}</td>
                <td style="color: #27ae60; font-weight: 600;">${completion}</td>
            </tr>
        `;
    }).join('');
}

// Update leaderboard with new score
function updateLeaderboard(score, total) {
    // In a real implementation, this would update the leaderboard data
    console.log('Training: Leaderboard updated with score:', score, '/', total);
    showNotification(`Quiz completed! Score: ${score}/${total}`, 'success');
}

// Show/hide training loading
function showTrainingLoading(show) {
    const loading = document.getElementById('training-modules-loading');
    const error = document.getElementById('training-modules-error');
    
    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }
    
    if (error) {
        error.style.display = 'none';
    }
}

// Show/hide leaderboard loading
function showLeaderboardLoading(show) {
    const loading = document.getElementById('leaderboard-loading');
    const error = document.getElementById('leaderboard-error');
    
    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }
    
    if (error) {
        error.style.display = 'none';
    }
}

// Fetch training data
function fetchTrainingData() {
    console.log('Training: Fetching training data...');
    
    // Load quizzes for the quiz modal
    if (window.firebaseFunctions && window.firebaseFunctions.fetchQuizzes) {
        window.firebaseFunctions.fetchQuizzes()
            .then(quizzes => {
                trainingQuizzes = quizzes;
                console.log('Training: Quizzes loaded:', trainingQuizzes.length);
            })
            .catch(error => {
                console.error('Training: Error pre-loading quizzes:', error);
            });
    }
}

// Show quiz error
function showQuizError(message) {
    const questionContainer = document.getElementById('quiz-question-container');
    if (questionContainer) {
        questionContainer.innerHTML = `
            <div style="text-align: center; color: #ff4757; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Export training functions to global scope
window.initializeTraining = initializeTraining;
window.openQuizModal = openQuizModal;
window.closeQuizModal = closeQuizModal;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitQuiz = submitQuiz;

// ============================================
// END TRAINING MODULE FUNCTIONS
// ============================================