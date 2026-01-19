/**
 * Setup Mobile-Friendly Input Handlers
 * Forces checkboxes and radios to respond to label clicks on mobile
 */
function setupMobileInputHandlers() {
    // Wait for DOM to be ready
    setTimeout(() => {
        const allOptions = document.querySelectorAll('.radio-option, .checkbox-option');

        allOptions.forEach(container => {
            const input = container.querySelector('input[type="radio"], input[type="checkbox"]');

            if (!input) return;

            // Remove default behavior and handle manually
            container.style.cursor = 'pointer';

            // Add click handler to the entire container
            container.addEventListener('click', (e) => {
                // Don't prevent default if clicking directly on input
                if (e.target === input) return;

                e.preventDefault();
                e.stopPropagation();

                if (input.type === 'radio') {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            // Add touch handler for better mobile support
            container.addEventListener('touchend', (e) => {
                // Don't prevent if touching the input directly
                if (e.target === input) return;

                e.preventDefault();
                e.stopPropagation();

                if (input.type === 'radio') {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, { passive: false });
        });
    }, 150);
}
