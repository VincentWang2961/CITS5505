/**
 * Resume Page Interactions
 * 
 * This script handles:
 * - Scroll-based animations for profile picture, timeline items and skills
 * - Interactive effects for tech icons on hover
 * - Smooth scrolling for internal links
 * - Redirect button hover effects
 * - Random profile picture selection
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // ===== VIEWPORT DETECTION UTILITY ===== //
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== PAGE DETECTION ===== //
    // Check if we're on the resume page before initializing resume-specific features
    const isResumePage = window.location.pathname.includes('resume.html') || document.querySelector('.profile-picture');

    if (isResumePage) {
        const profilePicture = document.getElementById('profile-picture');
        
        // ===== RANDOM PROFILE PICTURE ===== //
        if (profilePicture) {
            // Generate a random number between 0 and 5 (inclusive)
            const randomNumber = Math.floor(Math.random() * 6);
            // Set the src to the random mouse image
            profilePicture.src = `./img/mouse${randomNumber}.jpeg`;
        }
        
        // ===== SCROLL ANIMATIONS FOR RESUME PAGE ===== //
        function handleResumeScrollAnimations() {
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
        
        // ===== EVENT LISTENERS ===== //
        // Trigger animations on scroll
        window.addEventListener('scroll', handleResumeScrollAnimations);
        
        // Trigger once on load to check for elements already in viewport
        handleResumeScrollAnimations();

        // ===== TECH ICONS HOVER EFFECT ===== //
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.querySelector('i').style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            });
            
            icon.addEventListener('mouseleave', function() {
                this.querySelector('i').style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            });
        });
        
        // ===== REDIRECT BUTTON EFFECT ===== //
        const redirectButton = document.querySelector('.redirect-button');
        
        if (redirectButton) {
            redirectButton.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'translateX(5px)';
            });
            
            redirectButton.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'translateX(0)';
            });
        }

        // ===== SMOOTH SCROLLING FOR INTERNAL LINKS ===== //
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
});
