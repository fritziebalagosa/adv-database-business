   // Get the modal
   const modal = document.getElementById("productModal");
    
   // Get the button that opens the modal
   const quickViewBtn = document.getElementById("quickViewBtn");
   
   // Get the <span> element that closes the modal
   const closeBtn = document.getElementById("closeModal");
   
   // When the user clicks the button, open the modal 
   quickViewBtn.onclick = function() {
       modal.style.display = "block";
       document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
   }
   
   // When the user clicks on <span> (x), close the modal
   closeBtn.onclick = function() {
       modal.style.display = "none";
       document.body.style.overflow = "auto"; // Restore scrolling
   }
   
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
           document.body.style.overflow = "auto"; // Restore scrolling
       }
   }
   
   // Make thumbnails change the main image
   const thumbnails = document.querySelectorAll('.thumbnail');
   const mainImage = document.querySelector('.main-image');
   
   thumbnails.forEach(thumbnail => {
       thumbnail.addEventListener('click', function() {
           mainImage.src = this.src;
       });
   });
   
   // Toggle favorite button
   const favoriteBtn = document.querySelector('.favorite-button');
   favoriteBtn.addEventListener('click', function() {
       if (this.textContent === '♡') {
           this.textContent = '♥';
           this.style.color = '#ff4d4d';
       } else {
           this.textContent = '♡';
           this.style.color = '#333';
       }
   });