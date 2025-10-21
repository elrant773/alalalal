// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add specific animations for stat cards
            if (entry.target.classList.contains('stat-card')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.stat-card, .chart-container, .insight-item, .app-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});

// Animate number counters
function animateCounter(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    const originalText = numberElement.textContent;
    
    // Only animate if it's a percentage or time number
    if (originalText.includes('%') || originalText.includes('h')) {
        const value = parseFloat(originalText);
        const suffix = originalText.replace(/[0-9.]/g, '');
        
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = start + (value - start) * easeOut;
            
            if (suffix === '%') {
                numberElement.textContent = Math.round(currentValue) + suffix;
            } else {
                numberElement.textContent = currentValue.toFixed(1) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Re-trigger animations if needed
    const animatedElements = document.querySelectorAll('.stat-card, .chart-container, .insight-item, .app-card');
    animatedElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});