/**
 * Typing effect script for the animated text elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== TYPING EFFECT FOR HERO SECTION ===== //
    function setupTypingEffect() {
        const texts = document.querySelectorAll('.animated-text, .animated-text-delay');
        
        texts.forEach(text => {
            const originalText = text.textContent;
            const originalHTML = text.innerHTML;
            
            // Skip if already processed this element
            if (text.getAttribute('data-original-text')) return;
            
            // Clear the text content at the start
            text.setAttribute('data-original-text', originalText);
            text.innerHTML = '';
            text.style.visibility = 'visible';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    text.textContent += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    // Restore any HTML that might have been in the original
                    clearInterval(typeInterval);
                    text.innerHTML = originalHTML;
                }
            }, 50);
        });
    }
    
    // Start typing effect after a short delay
    setTimeout(setupTypingEffect, 100);
});
