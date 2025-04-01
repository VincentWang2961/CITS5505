/**
 * Main JavaScript file for Vincent's Portfolio Website
 * This file handles interactive elements, animations, dark mode functionality,
 * local storage for user selections, and AJAX requests.
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
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('backToTop');

    // Function to show/hide the back-to-top button based on scroll position
    function handleBackToTopVisibility() {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
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
    
    // Initialize back to top button visibility
    handleBackToTopVisibility();
    
    // ===== TYPING EFFECT FOR HERO SECTION =====
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

    // ===== FUNCTION TO CHECK IF ELEMENT IS IN VIEWPORT =====
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== CV PAGE SPECIFIC FUNCTIONS =====
    // Check if we're on the resume page
    const isResumePage = window.location.pathname.includes('resume.html') || 
                         document.querySelector('.profile-picture');

    if (isResumePage) {
        const profilePicture = document.getElementById('profile-picture');

        // Function to handle scroll events for animations specific to resume page
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
        
        window.addEventListener('scroll', handleResumeScrollAnimations);
        
        // Trigger once on load to check for elements already in viewport
        handleResumeScrollAnimations();

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
        
        if (redirectButton) {
            redirectButton.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'translateX(5px)';
            });
            
            redirectButton.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'translateX(0)';
            });
        }

        // ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // ===== BEST PRACTICES PAGE SPECIFIC FUNCTIONS =====
    // Check if we're on the best practices page
    const isBestPracPage = window.location.pathname.includes('bestprac.html') || 
                           document.querySelector('.practice-checkbox');
                           
    if (isBestPracPage) {
        // ===== PRACTICE ITEMS INTERACTION =====
        const practiceItems = document.querySelectorAll('.practice-item');
        const practiceCheckboxes = document.querySelectorAll('.practice-checkbox');
        const totalPractices = practiceCheckboxes.length;
        const practiceCategories = document.querySelectorAll('.practices-category');
        
        // Set the total practices count in the summary
        document.getElementById('total-practices').textContent = totalPractices;
        
        // Function to toggle practice item details
        function togglePracticeDetails(e) {
            // Check if the click came from the checkbox or its container
            if (e.target.closest('.checkbox-container')) {
                return; // Do nothing if checkbox was clicked
            }
            
            // Get the practice item containing the clicked header
            const practiceItem = this.closest('.practice-item');
            practiceItem.classList.toggle('active');
        }
        
        // Add click event to all practice headers
        document.querySelectorAll('.practice-header').forEach(header => {
            header.addEventListener('click', togglePracticeDetails);
        });
        
        // ===== CHECKBOX STATE MANAGEMENT =====
        // Load saved checkbox states from localStorage
        function loadCheckboxStates() {
            practiceCheckboxes.forEach(checkbox => {
                const id = checkbox.getAttribute('data-id');
                const isChecked = localStorage.getItem(`practice-${id}`) === 'true';
                checkbox.checked = isChecked;
            });
            
            // Update summary after loading saved states
            updateSummary();
        }
        
        // Save checkbox state to localStorage when changed
        function saveCheckboxState(e) {
            const id = this.getAttribute('data-id');
            localStorage.setItem(`practice-${id}`, this.checked);
            
            // Prevent the practice item from toggling when clicking the checkbox
            e.stopPropagation();
            
            // Update summary after checkbox change
            updateSummary();
        }
        
        // Add change event to all checkboxes
        practiceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', saveCheckboxState);
            
            // Prevent clicks on checkbox from triggering parent events
            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
        
        // Load saved states on page load
        loadCheckboxStates();
        
        // ===== SUMMARY SECTION =====
        const progressRingCircle = document.querySelector('.progress-ring-circle');
        const practicesCountElement = document.getElementById('practices-count');
        const percentageElement = document.getElementById('percentage');
        const successMessageElement = document.getElementById('success-message');
        const rewardContainerElement = document.getElementById('reward-container');
        
        // Success criteria: 15 out of 20 practices (75%)
        const successThreshold = 15;
        
        // Function to update the summary section
        function updateSummary() {
            // Count checked checkboxes
            const checkedCount = document.querySelectorAll('.practice-checkbox:checked').length;
            
            // Update count display
            const practicesCountElement = document.getElementById('practices-count');
            const totalPractices = document.querySelectorAll('.practice-checkbox').length;
            practicesCountElement.textContent = checkedCount;
            
            // Calculate percentage
            const percentage = Math.round((checkedCount / totalPractices) * 100);
            document.getElementById('percentage').textContent = `${percentage}%`;
            
            // Update progress ring
            const circle = document.querySelector('.progress-ring-circle');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
            
            // Check if success criteria is met (15 out of 20)
            const successThreshold = 15;
            const successMessage = document.getElementById('success-message');
            const rewardContainer = document.getElementById('reward-container');
            
            if (checkedCount >= successThreshold) {
                successMessage.classList.remove('hidden');
                rewardContainer.classList.remove('hidden');
                setTimeout(() => {
                    rewardContainer.classList.add('visible');
                }, 100);
                
                // Only fetch new animal if container wasn't visible before
                if (!rewardContainer.classList.contains('visible')) {
                    fetchCuteAnimal();
                }
            } else {
                successMessage.classList.add('hidden');
                rewardContainer.classList.remove('visible');
                setTimeout(() => {
                    rewardContainer.classList.add('hidden');
                }, 800);
            }
        }
        
        // ===== CUTE ANIMAL REWARD FEATURE =====
        const rewardImageElement = document.getElementById('reward-image');
        const newRewardButton = document.getElementById('new-reward-btn');
        
        // Function to fetch a cute animal image using AJAX
        function fetchCuteAnimal() {
            // Show loading state
            rewardImageElement.src = 'https://via.placeholder.com/400x300?text=Loading...';
            
            // Use the Dog CEO API for cute dog images
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Update image source with the fetched dog image
                    rewardImageElement.src = data.message;
                    rewardImageElement.alt = 'Cute dog reward';
                })
                .catch(error => {
                    console.error('Error fetching cute animal:', error);
                    // Fallback image in case of error
                    rewardImageElement.src = 'https://via.placeholder.com/400x300?text=Could+not+load+image';
                    rewardImageElement.alt = 'Error loading cute animal';
                });
        }
        
        // Event listener for the "Get Another Cute Animal" button
        newRewardButton.addEventListener('click', fetchCuteAnimal);
    }
});