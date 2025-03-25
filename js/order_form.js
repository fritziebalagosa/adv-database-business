function goBack() {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        window.location.href = './index.html'; // Ensure the fallback path is correct relative to the current file
    }
}


  // Select options functionality
  document.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', function() {
        // Find parent option group
        const optionGroup = this.closest('.option-group');
        
        // Remove selected class from siblings
        const siblings = Array.from(optionGroup.querySelectorAll('.option-item'));
        siblings.forEach(sibling => {
            sibling.classList.remove('selected');
            sibling.querySelector('.option-item-check')?.remove();
        });
        
        // Add selected class and check mark
        this.classList.add('selected');
        if (!this.querySelector('.option-item-check')) {
            const check = document.createElement('div');
            check.className = 'option-item-check';
            check.textContent = '✓';
            this.appendChild(check);
        }
        
        updateTotal();
    });
});

// Calculate and update total
function updateTotal() {
    let basePrice = 750; // Default price for 6-inch matcha cake
    
    // Get selected size
    const selectedSize = document.querySelector('.option-group:nth-child(1) .option-item.selected');
    if (selectedSize) {
        const priceText = selectedSize.querySelector('.option-item-price').textContent;
        basePrice = parseInt(priceText.replace(/[^\d]/g, ''));
    }
    
    // Add decoration price
    const selectedDecoration = document.querySelector('.option-group:nth-child(2) .option-item.selected');
    if (selectedDecoration) {
        const priceText = selectedDecoration.querySelector('.option-item-price').textContent;
        if (priceText.includes('+')) {
            basePrice += parseInt(priceText.replace(/[^\d]/g, ''));
        }
    }
    
    // Multiply by quantity
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    let total = basePrice * quantity;
    
    // Add delivery fee if selected
    if (document.querySelector('input[name="delivery-method"]:checked').value === 'delivery') {
        total += 150;
    }
    
    // Update total display
    document.querySelector('.total-price').textContent = '₱' + total.toLocaleString();
}

// Add event listeners for delivery method
document.querySelectorAll('input[name="delivery-method"]').forEach(input => {
    input.addEventListener('change', updateTotal);
});

// Add event listeners for action buttons
document.querySelector('.order-btn').addEventListener('click', function() {
    document.querySelector('.checkout-btn').click();
});

document.querySelector('.cart-btn').addEventListener('click', function() {
    alert('Matcha Cake added to cart!');
});

// Initialize
updateTotal();

// Form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Order submitted successfully! Thank you for your purchase.');
});

// Set minimum date to today
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;
document.getElementById('date').min = todayStr;

