/**
 * Text Animation Effects
 * 
 * This script handles:
 * - Character-by-character typing animation effect
 * - Animated text display for hero sections
 * - Preservation of original HTML formatting after animation
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    // ===== TYPING EFFECT FOR HERO SECTION ===== //
    function setupTypingEffect() {
        // Select all text elements that should be animated
        const texts = document.querySelectorAll('.animated-text, .animated-text-delay');
        
        texts.forEach(text => {
            // Store the original text and HTML for later use
            const originalText = text.textContent;
            const originalHTML = text.innerHTML;
            
            // Skip if already processed this element
            if (text.getAttribute('data-original-text')) return;
            
            // Prepare the element for animation
            text.setAttribute('data-original-text', originalText);
            text.innerHTML = '';
            text.style.visibility = 'visible';
            
            // ===== CHARACTER-BY-CHARACTER ANIMATION ===== //
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    // Add one character at a time
                    text.textContent += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    // Restore any HTML that might have been in the original
                    clearInterval(typeInterval);
                    text.innerHTML = originalHTML;
                }
            }, 50); // 50ms delay between characters for natural typing effect
        });
    }
    
    // ===== ANIMATION INITIALIZATION ===== //
    // Start typing effect after a short delay to ensure DOM is ready
    setTimeout(setupTypingEffect, 100);
});
