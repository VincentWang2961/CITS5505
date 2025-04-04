/**
 * Sidebar Navigation and Theme Management
 * 
 * This script handles:
 * - Floating navigation between pages
 * - Dark/light theme toggle and persistence
 * - Back-to-top button functionality 
 * - Viewport detection utility for animations
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {

    // ===== FUNCTION TO CHECK IF ELEMENT IS IN VIEWPORT ===== //
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Make isInViewport available globally for other scripts
    window.isInViewport = isInViewport;

    // ===== FLOATING NAVIGATION BUTTONS ===== //
    const navButtons = document.querySelectorAll('.floating-nav-button');

    // Handle navigation button clicks
    navButtons.forEach(button => {
        if (button.classList.contains('theme-toggle')) return;
        
        button.addEventListener('click', function(e) {
            // Get the target page name from the data-page attribute
            const page = this.getAttribute('data-page');
            if (page) {
                // Check if the button is already active (current page)
                if (this.classList.contains('active')) {
                    // If we're already on this page, prevent navigation
                    e.preventDefault();
                    return;
                }
                
                // Navigate to the selected page
                if (page === 'resume') {
                    window.location.href = './resume.html';
                } else if (page === 'bestprac') {
                    window.location.href = './bestprac.html';
                }
            }
        });
    });
    
    // ===== DARK MODE TOGGLE ===== //
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Function to switch theme between light and dark and save the preference in local storage
    function switchTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Event listener for theme toggle
    themeToggle.addEventListener('click', switchTheme);
    
    // Check for saved user preference, default to light theme
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    
    // If user has previously chosen a theme, apply it
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // ===== BACK TO TOP BUTTON ===== //
    const backToTopButton = document.getElementById('backToTop');

    // Function to show or hide the button based on scroll position
    function handleBackToTopVisibility() {
        // Show button after scrolling 300px
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Add scroll event listener for back to top button
    window.addEventListener('scroll', handleBackToTopVisibility);
    
    // Back to top button click event
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects to match the floating-nav-button behavior
    backToTopButton.addEventListener('mouseenter', function() {
        // No need to add hover effects in JavaScript as we handle this in CSS
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        // No need to add hover effects in JavaScript as we handle this in CSS
    });
    
    // Initialize back to top button visibility
    handleBackToTopVisibility();
});