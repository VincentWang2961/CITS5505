/**
 * Easter Egg Implementation - Konami Code
 * 
 * This script handles:
 * - Detection of the classic Konami code sequence (↑ ↑ ↓ ↓ ← → ← → B A)
 * - Revealing the hidden "Story" section when the code is entered correctly
 * - Visual feedback when the code is successfully entered
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // ===== KONAMI CODE DETECTION ===== //
    // Define the Konami code sequence
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    
    // Track the current position in the sequence
    let konamiPosition = 0;
    
    // Reference to the story element to be revealed
    const storyElement = document.querySelector('.reference-item:nth-child(2)');
    
    // Hide the story by default
    if (storyElement) {
        storyElement.style.display = 'none';
    }

    // Function to handle keydown events and check for the Konami code
    function checkKonamiCode(e) {
        // Get the key pressed (normalize to lowercase for b and a)
        const key = e.key.toLowerCase();
        
        // Check if the key matches the expected key in the sequence
        const expectedKey = konamiCode[konamiPosition].toLowerCase();
        
        if (key === expectedKey) {
            // Move to the next position in the sequence
            konamiPosition++;
            
            // Check if the full sequence has been entered
            if (konamiPosition === konamiCode.length) {
                // Reset position for potential future attempts
                konamiPosition = 0;
                
                // Reveal the story with animation
                revealStory();
            }
        } else {
            // Reset position if wrong key pressed
            konamiPosition = 0;
        }
    }
    
    // ===== STORY REVEAL ANIMATION ===== //
    function revealStory() {
        // Show the story element if it exists
        if (storyElement) {
            // Make sure the element is visible
            storyElement.style.display = 'block';
            
            // Add a temporary highlight effect
            storyElement.classList.add('konami-revealed');
            
            // Create and show a congratulation message
            const message = document.createElement('div');
            message.className = 'konami-message';
            message.innerHTML = '<i class="fas fa-star"></i> Secret Story Unlocked! <i class="fas fa-star"></i>';
            
            document.body.appendChild(message);
            
            // Remove the message after a few seconds
            setTimeout(() => {
                message.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 1000);
            }, 3000);
            
            // Remove the highlight effect after animation completes
            setTimeout(() => {
                storyElement.classList.remove('konami-revealed');
            }, 2000);
        }
    }
    
    // Add keyboard event listener to detect the Konami code
    document.addEventListener('keydown', checkKonamiCode);
});
