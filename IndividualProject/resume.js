/**
 * Main JavaScript file for John Doe's CV Website
 * This file handles interactive elements, animations, and dark mode functionality.
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE TOGGLE =====
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Save preference to localStorage
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Save preference to localStorage
        }
    }
    
    // Event listener for theme switch
    toggleSwitch.addEventListener('change',switchTheme, false);
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    // If user has previously chosen a theme, apply it
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    } else {
        // Check if user prefers dark mode based on system settings
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        }
    }
    
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
        if (isInViewport(profilePicture) && !profilePicture.classList.contains('visible')) {
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
    
    // Start typing effect after a short delay
    setTimeout(setupTypingEffect, 500);
});