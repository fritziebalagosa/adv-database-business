//ICON js

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('profile-dropdown');
    const iconWrapper = dropdown.querySelector('.icon-wrapper');
    
    // Toggle dropdown when clicking on the icon
    iconWrapper.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});