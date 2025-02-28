document.addEventListener('DOMContentLoaded', function() {
    // Animation pour la compression des sacs
    const animationContainer = document.getElementById('compressionAnimation');
    
    function createCompressionAnimation() {
        // Créer l'élément SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 300 300');
        svg.style.width = '100%';
        svg.style.height = '100%';
        
        // Créer le sac
        const bag = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bag.setAttribute('x', '75');
        bag.setAttribute('y', '50');
        bag.setAttribute('width', '150');
        bag.setAttribute('height', '200');
        bag.setAttribute('rx', '10');
        bag.setAttribute('fill', '#3970b9');
        
        // Créer les éléments à l'intérieur du sac
        const items = [];
        const colors = ['#f44336', '#4CAF50', '#FFC107', '#9C27B0', '#FF5722', '#2196F3'];
        
        for (let i = 0; i < 10; i++) {
            const item = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const x = Math.random() * 130 + 85;
            const y = Math.random() * 180 + 60;
            const r = Math.random() * 15 + 5;
            
            item.setAttribute('cx', x);
            item.setAttribute('cy', y);
            item.setAttribute('r', r);
            item.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
            
            items.push({ element: item, x, y, r });
        }
        
        // Créer le logo WinRAR
        const logo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        logo.setAttribute('x', '150');
        logo.setAttribute('y', '150');
        logo.setAttribute('text-anchor', 'middle');
        logo.setAttribute('fill', '#fff');
        logo.setAttribute('font-size', '24');
        logo.setAttribute('font-weight', 'bold');
        logo.textContent = 'RARSac';
        
        // Ajouter tous les éléments au SVG
        svg.appendChild(bag);
        items.forEach(item => svg.appendChild(item.element));
        svg.appendChild(logo);
        
        // Ajouter le SVG au conteneur
        animationContainer.appendChild(svg);
        
        // Animation de compression
        let expanded = true;
        let animationInProgress = false;
        
        function toggleCompression() {
            if (animationInProgress) return;
            
            animationInProgress = true;
            const duration = 1000; // ms
            const startTime = Date.now();
            
            function animate() {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                if (expanded) {
                    // Compresser
                    const newWidth = 150 - (progress * 50);
                    bag.setAttribute('width', newWidth);
                    bag.setAttribute('x', 75 + (150 - newWidth) / 2);
                    
                    items.forEach(item => {
                        const factor = 1 - (progress * 0.5);
                        const newX = 150 + (item.x - 150) * factor;
                        const newY = item.y;
                        const newR = item.r * factor;
                        
                        item.element.setAttribute('cx', newX);
                        item.element.setAttribute('cy', newY);
                        item.element.setAttribute('r', newR);
                    });
                } else {
                    // Décompresser
                    const newWidth = 100 + (progress * 50);
                    bag.setAttribute('width', newWidth);
                    bag.setAttribute('x', 75 + (150 - newWidth) / 2);
                    
                    items.forEach(item => {
                        const factor = 0.5 + (progress * 0.5);
                        const newX = 150 + (item.x - 150) * factor;
                        const newY = item.y;
                        const newR = item.r * factor;
                        
                        item.element.setAttribute('cx', newX);
                        item.element.setAttribute('cy', newY);
                        item.element.setAttribute('r', newR);
                    });
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    expanded = !expanded;
                    animationInProgress = false;
                }
            }
            
            animate();
        }
        
        // Démarrer l'animation en boucle
        setInterval(toggleCompression, 3000);
    }
    
    createCompressionAnimation();
    
    // Animation des boutons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Checkout modal functionality
    const buyButton = document.getElementById('buyButton');
    const checkoutModal = document.getElementById('checkoutModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const checkoutForm = document.getElementById('checkoutForm');
    const giftCodeElement = document.getElementById('giftCode');
    const closeConfirmation = document.getElementById('closeConfirmation');
    
    // Open checkout modal
    buyButton.addEventListener('click', function() {
        checkoutModal.style.display = 'block';
    });
    
    // Close modals when clicking on X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
        if (event.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Generate random Amazon gift card code
    function generateRandomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        
        // Format: XXXX-XXXXXX-XXXX
        for (let i = 0; i < 4; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        code += '-';
        
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        code += '-';
        
        for (let i = 0; i < 4; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return code;
    }
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Generate and display gift card code
        const giftCode = generateRandomCode();
        giftCodeElement.textContent = giftCode;
        
        // Hide checkout modal and show confirmation
        checkoutModal.style.display = 'none';
        confirmationModal.style.display = 'block';
    });
    
    // Scroll to product section
    window.scrollToProduct = function() {
        document.getElementById('product-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };
});