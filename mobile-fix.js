/**
 * Setup Mobile-Friendly Input Handlers
 * Solução definitiva para iOS e Android
 */
function setupMobileInputHandlers() {
    setTimeout(() => {
        // Seleciona todos os containers de opções
        const allOptions = document.querySelectorAll('.radio-option, .checkbox-option');

        allOptions.forEach(container => {
            const input = container.querySelector('input[type="radio"], input[type="checkbox"]');
            if (!input) return;

            // Remove listeners anteriores
            const newContainer = container.cloneNode(true);
            container.parentNode.replaceChild(newContainer, container);
            
            const newInput = newContainer.querySelector('input[type="radio"], input[type="checkbox"]');
            
            // Handler unificado para click e touch
            const handleInteraction = (e) => {
                // Se clicou diretamente no input, deixa comportamento padrão
                if (e.target === newInput) {
                    return;
                }
                
                // Previne comportamento padrão
                e.preventDefault();
                e.stopPropagation();
                
                // Força a mudança de estado
                if (newInput.type === 'radio') {
                    // Desmarca todos os radios do mesmo grupo primeiro
                    const radioGroup = document.querySelectorAll(`input[name="${newInput.name}"]`);
                    radioGroup.forEach(r => r.checked = false);
                    
                    // Marca o selecionado
                    newInput.checked = true;
                } else if (newInput.type === 'checkbox') {
                    newInput.checked = !newInput.checked;
                }
                
                // Dispara eventos para validação
                newInput.dispatchEvent(new Event('change', { bubbles: true }));
                newInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Feedback visual
                newContainer.style.opacity = '0.7';
                setTimeout(() => {
                    newContainer.style.opacity = '1';
                }, 150);
            };
            
            // Adiciona listeners
            newContainer.addEventListener('click', handleInteraction);
            newContainer.addEventListener('touchend', handleInteraction, { passive: false });
            
            // Força cursor pointer
            newContainer.style.cursor = 'pointer';
            newContainer.style.userSelect = 'none';
            newContainer.style.webkitUserSelect = 'none';
            
            // Remove delay de tap no iOS
            newContainer.style.webkitTapHighlightColor = 'rgba(255,255,255,0.1)';
            newContainer.style.touchAction = 'manipulation';
        });
        
        console.log('✅ Mobile handlers configurados:', allOptions.length, 'elementos');
    }, 200);
}

// Auto-executa quando formulário é renderizado
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                const hasForm = Array.from(mutation.addedNodes).some(node => 
                    node.id === 'recruitmentForm' || 
                    (node.querySelector && node.querySelector('#recruitmentForm'))
                );
                if (hasForm) {
                    setupMobileInputHandlers();
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
