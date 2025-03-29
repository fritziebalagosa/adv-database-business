// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Edit Profile Modal Functionality
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const saveProfileBtn = document.getElementById('save-profile');
    const profileUpload = document.getElementById('profile-upload');
    const profilePreview = document.getElementById('profile-preview');
    
    // Open modal
    editProfileBtn.addEventListener('click', function() {
        // Populate form with current values
        document.getElementById('name').value = document.getElementById('profile-name').textContent;
        document.getElementById('email').value = document.getElementById('profile-email').textContent;
        document.getElementById('contact').value = document.getElementById('profile-contact').textContent;
        profilePreview.src = document.getElementById('profile-image').src;
        
        // Show modal
        editProfileModal.classList.add('active');
    });
    
    // Handle file upload and preview
    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Close modal functions
    function closeModal() {
        editProfileModal.classList.remove('active');
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelEditBtn.addEventListener('click', closeModal);
    
    
    // Save profile changes
    saveProfileBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        
        // Update profile information
        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-email').textContent = email;
        document.getElementById('profile-contact').textContent = contact;
        document.getElementById('profile-image').src = profilePreview.src;
        
        // Show success message (could be enhanced with a toast notification)
        alert('Profile updated successfully!');
        
        // Close modal
        closeModal();
    });
    
    // Close modal when clicking outside
    editProfileModal.addEventListener('click', function(event) {
        if (event.target === editProfileModal) {
            closeModal();
        }
    }); 

    // Order Details Modal Functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const orderDetailsModal = document.getElementById('order-details-modal');
    const closeOrderDetailsBtn = document.getElementById('close-order-details');
    
    // Order data (in a real app, this would come from a database)
    const orderData = {
        '0203150305': {
            title: 'Chocolate Cake',
            price: '₱1,799.50',
            status: 'To Pay',
            statusClass: 'status-to-pay',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            action: 'PAY NOW'
        },
        '0203150306': {
            title: 'Strawberry Cheesecake',
            price: '₱2,125.00',
            status: 'Processing',
            statusClass: 'status-processing',
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            action: 'TRACK'
        },
        '0203150307': {
            title: 'Red Velvet Cupcakes',
            price: '₱1,437.50',
            status: 'Completed',
            statusClass: 'status-completed',
            image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            action: 'REVIEW'
        },
        '0203150308': {
            title: 'Vanilla Birthday Cake',
            price: '₱1,999.50',
            status: 'Processing',
            statusClass: 'status-processing',
            image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            action: 'TRACK'
        }
    };
    
    // Open order details modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order');
            const order = orderData[orderId];
            
            if (order) {
                document.getElementById('order-details-title').textContent = order.title;
                document.getElementById('order-details-price').textContent = order.price;
                document.getElementById('order-details-id').textContent = orderId;
                document.getElementById('order-details-image').src = order.image;
                document.getElementById('order-details-action').textContent = order.action;
                
                const statusElement = document.getElementById('order-details-status');
                statusElement.textContent = order.status;
                statusElement.className = 'order-details-status ' + order.statusClass;
                
                orderDetailsModal.classList.add('active');
            }
        });
    });
    
    // Close order details modal
    closeOrderDetailsBtn.addEventListener('click', function() {
        orderDetailsModal.classList.remove('active');
    });
    
    // Close order details modal when clicking outside
    orderDetailsModal.addEventListener('click', function(event) {
        if (event.target === orderDetailsModal) {
            orderDetailsModal.classList.remove('active');
        }
    });
});


// Function to load profile data from localStorage
function loadProfileData() {
    const savedData = localStorage.getItem('profileData');

    if (savedData) {
        const profileData = JSON.parse(savedData);

        // Ensure all elements get their data
        document.getElementById('profile-name').textContent = profileData.name || "User Name";
        document.getElementById('profile-email').textContent = profileData.email || "user@example.com";
        document.getElementById('profile-contact').textContent = profileData.contact || "000-000-0000";

        // Only update image if valid
        document.getElementById('profile-image').src = profileData.image && profileData.image !== "undefined"
            ? profileData.image
            : "default-profile.png"; // Set default image if empty

        console.log("Profile loaded:", profileData);  // Debugging log
    } else {
        document.getElementById('profile-image').src = "default-profile.png"; // Set default if no saved data
    }
}

document.addEventListener("DOMContentLoaded", loadProfileData);

        
// Run this as soon as possible
function saveProfileData() {
    const profileImage = document.getElementById('profile-image').src;

    const profileData = {
        name: document.getElementById('profile-name').textContent || "",
        email: document.getElementById('profile-email').textContent || "",
        contact: document.getElementById('profile-contact').textContent || "",
        image: profileImage.includes("blob") ? "" : profileImage  // Prevents temporary images from being stored
    };

    localStorage.setItem('profileData', JSON.stringify(profileData));
    console.log("Profile saved:", profileData);  // Debugging log
}




// This function will run when the page loads
saveProfileBtn.addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    
    // Update profile display
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-email').textContent = email;
    document.getElementById('profile-contact').textContent = contact;
    document.getElementById('profile-image').src = profilePreview.src;

    // Save updated data
    saveProfileData();

    console.log("Profile updated & saved!");  // Debugging log

    // Close modal
    closeModal();
});


profileUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-image').src = e.target.result;
            document.getElementById('profile-preview').src = e.target.result; // Ensure both update

            saveProfileData();  // Save immediately after updating
            console.log("Profile image updated!");
        };
        reader.readAsDataURL(file);
    }
});

