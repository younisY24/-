function showProductInfo(productName) {
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `معلومات ${productName}`;
    modal.classList.add('show');
    
    // Add animation to button
    event.target.style.transform = 'scale(0.9)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 200);
}

function closeProductInfo() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('show');
}

function orderProduct(page) {
    // Navigate to specific product page
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

// Close modal when clicking outside
document.getElementById('infoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProductInfo();
    }
});

// Add smooth scroll behavior
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

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard support for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductInfo();
    }
});