/**
 * Main JavaScript file for Web Development Best Practices Page
 * This file handles interactive elements, animations, dark mode functionality,
 * local storage for user selections, and AJAX requests for the reward feature.
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
    toggleSwitch.addEventListener('change', switchTheme, false);
    
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
    
    // ===== PRACTICE ITEMS INTERACTION =====
    const practiceItems = document.querySelectorAll('.practice-item');
    const practiceCheckboxes = document.querySelectorAll('.practice-checkbox');
    const totalPractices = practiceCheckboxes.length;
    
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
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation(); // Stop event from bubbling up
            saveCheckboxState.call(this, e);
        });

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
    
    // ===== ANIMATION ON SCROLL =====
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
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const practiceCategories = document.querySelectorAll('.practices-category');
        practiceCategories.forEach((category, index) => {
            const rect = category.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInView && !category.classList.contains('visible')) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    category.classList.add('visible');
                }, index * 200);
            }
        });
    }
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger once on load to check for elements already in viewport
    handleScrollAnimations();
    
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

    // Add event listeners to checkboxes
    document.querySelectorAll('.practice-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSummary);
    });

    // Call updateSummary on page load
    document.addEventListener('DOMContentLoaded', updateSummary);
});