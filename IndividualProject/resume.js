/**
 * Main JavaScript file for John Doe's CV Website
 * This file handles interactive elements, animations, and dark mode functionality.
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FLOATING NAVIGATION AND DARK MODE TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    const navButtons = document.querySelectorAll('.floating-nav-button');
    
    // Function to switch theme
    function switchTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Save preference to localStorage
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Save preference to localStorage
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Event listener for theme toggle
    themeToggle.addEventListener('click', switchTheme);
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    // If user has previously chosen a theme, apply it
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        // Check if user prefers dark mode based on system settings
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Handle navigation button clicks
    navButtons.forEach(button => {
        if (button.classList.contains('theme-toggle')) return;
        
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                if (page === 'resume') {
                    window.location.href = './resume.html';
                } else if (page === 'bestprac') {
                    window.location.href = './bestprac.html';
                }
            }
        });
    });
    
    // ===== PROFILE PICTURE ANIMATION =====
    const profilePicture = document.getElementById('profile-picture');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll events for animations
    function handleScrollAnimations() {
        // Profile picture animation
        if (profilePicture && isInViewport(profilePicture) && !profilePicture.classList.contains('visible')) {
            profilePicture.classList.add('visible');
        }
        
        // Animate timeline items when they come into view
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('animated');
                item.style.animation = 'fadeInUp 0.8s ease forwards';
                item.style.opacity = '0';
            }
        });
        
        // Animate skill categories when they come into view
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            if (isInViewport(category) && !category.classList.contains('animated')) {
                category.classList.add('animated');
                category.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
                category.style.opacity = '0';
            }
        });
    }
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger once on load to check for elements already in viewport
    handleScrollAnimations();
    
    // ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // ===== TECH ICONS HOVER EFFECT =====
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.querySelector('i').style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.querySelector('i').style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        });
    });
    
    // ===== REDIRECT BUTTON EFFECT =====
    const redirectButton = document.querySelector('.redirect-button');
    
    redirectButton.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'translateX(5px)';
    });
    
    redirectButton.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'translateX(0)';
    });
    
    // ===== TYPING EFFECT FOR HERO SECTION =====
    // This is a simple implementation of a typing effect
    // For more complex typing effects, consider using libraries like Typed.js
    
    function setupTypingEffect() {
        const texts = document.querySelectorAll('.animated-text, .animated-text-delay');
        
        texts.forEach(text => {
            const originalText = text.textContent;
            const originalHTML = text.innerHTML;
            
            // Skip if we've already processed this element
            if (text.getAttribute('data-original-text')) return;
            
            text.setAttribute('data-original-text', originalText);
            text.innerHTML = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    text.textContent += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    text.innerHTML = originalHTML; // Restore any HTML that might have been in the original
                }
            }, 100);
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.querySelector('.back-to-top');

    // Function to show/hide the back-to-top button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners for back-to-top button
    window.addEventListener('scroll', toggleBackToTop);
    backToTopButton.addEventListener('click', scrollToTop);

    // Initial check to show/hide the button on page load
    toggleBackToTop();
    
    // Start typing effect after a short delay
    setTimeout(setupTypingEffect, 500);
});