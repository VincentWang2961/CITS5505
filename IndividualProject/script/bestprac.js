/**
 * Best Practices Page Functionality
 * 
 * This script handles:
 * - Interactive checklist of best practices with expandable details
 * - Local storage persistence of user progress
 * - Dynamic progress visualization with circle chart
 * - Reward feature that shows cute dog pictures when progress threshold is met
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // ===== PAGE DETECTION ===== //
    // Check if we're on the best practices page before initializing
    const isBestPracPage = document.querySelector('.practice-checkbox') !== null;
                           
    if (isBestPracPage) {
        // ===== CONSTANTS AND VARIABLES ===== //
        const practiceCheckboxes = document.querySelectorAll('.practice-checkbox');
        const totalPractices = practiceCheckboxes.length;
        const successThreshold = 15; // Number of practices required for reward
        
        // Set the total practices count in the summary
        document.getElementById('total-practices').textContent = totalPractices;
        
        // ===== PRACTICE ITEMS INTERACTION ===== //
        
        // Function to toggle practice item details
        const togglePracticeDetails = (event) => {
            // Prevent toggling if checkbox or its container was clicked
            if (event.target.closest('.checkbox-container')) {
                return;
            }
            
            const practiceItem = event.currentTarget.closest('.practice-item');
            practiceItem.classList.toggle('active');
        };
        
        // Add click event to all practice headers
        document.querySelectorAll('.practice-header').forEach(header => {
            header.addEventListener('click', togglePracticeDetails);
        });
        
        // ===== CHECKBOX STATE MANAGEMENT ===== //
        
        // Load saved checkbox states from localStorage
        const loadCheckboxStates = () => {
            practiceCheckboxes.forEach(checkbox => {
                const id = checkbox.getAttribute('data-id');
                const isChecked = localStorage.getItem(`practice-${id}`) === 'true';
                checkbox.checked = isChecked;
            });
            
            // Update summary after loading saved states
            updateSummary();
        };
        
        // Save checkbox state to localStorage when changed
        const saveCheckboxState = function(event) {
            const id = this.getAttribute('data-id');
            localStorage.setItem(`practice-${id}`, this.checked);
            
            // Prevent event propagation
            event.stopPropagation();
            
            // Update summary after checkbox change
            updateSummary();
        };
        
        // Add change event to all checkboxes
        practiceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', saveCheckboxState);
            
            // Prevent clicks on checkbox from triggering parent events
            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
        
        // ===== SUMMARY SECTION ===== //
        
        // Function to update the summary section
        const updateSummary = () => {
            // Count checked checkboxes
            const checkedCount = document.querySelectorAll('.practice-checkbox:checked').length;
            
            // Update count display
            const practicesCountElement = document.getElementById('practices-count');
            practicesCountElement.textContent = checkedCount;
            
            // Calculate percentage
            const percentage = Math.round((checkedCount / totalPractices) * 100);
            document.getElementById('percentage').textContent = `${percentage}%`;
            
            // Update progress ring
            updateProgressRing(percentage);
            
            // Check if success criteria is met
            const successMessage = document.getElementById('success-message');
            const rewardContainer = document.getElementById('reward-container');
            
            if (checkedCount >= successThreshold) {
                successMessage.classList.remove('hidden');
                
                if (rewardContainer.classList.contains('hidden')) {
                    rewardContainer.classList.remove('hidden');
                    setTimeout(() => {
                        rewardContainer.classList.add('visible');
                        fetchCuteAnimal(); // Only fetch if container wasn't visible before
                    }, 100);
                }
            } else {
                successMessage.classList.add('hidden');
                rewardContainer.classList.remove('visible');
                setTimeout(() => {
                    rewardContainer.classList.add('hidden');
                }, 500);
            }
        };
        
        // ===== PROGRESS VISUALIZATION ===== //
        // Function to update the progress ring
        const updateProgressRing = (percentage) => {
            const circle = document.querySelector('.progress-ring-circle');
            if (!circle) return;
            
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            
            // Calculate offset based on percentage
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        };
        
        // ===== CUTE ANIMAL REWARD FEATURE ===== //
        
        // Function to fetch cute animal image from API
        const fetchCuteAnimal = () => {
            // Show loading state
            const rewardImage = document.getElementById('reward-image');
            rewardImage.src = ''; // Clear current image
            rewardImage.alt = 'Loading cute animal...';
            
            // Use the Dog CEO API for cute dog images
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.message) {
                        rewardImage.src = data.message;
                        rewardImage.alt = 'Cute dog as a reward';
                    } else {
                        throw new Error('Invalid API response');
                    }
                })
                .catch(error => {
                    console.error('Error fetching cute animal:', error);
                    // Use fallback image on error
                    rewardImage.src = './images/fallback-dog.jpg'; 
                    rewardImage.alt = 'Cute animal (fallback image)';
                });
        };
        
        // Add event listener to the "Get Another Cute Animal" button
        const newRewardBtn = document.getElementById('new-reward-btn');
        if (newRewardBtn) {
            newRewardBtn.addEventListener('click', fetchCuteAnimal);
        }
        
        // ===== INITIALIZATION ===== //
        loadCheckboxStates();
    }
});
