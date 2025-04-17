

// Form submission handling
document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmation(); // Show confirmation modal and message
    // Clear the textarea after submission
    event.target.querySelector('textarea').value = '';
});

// Show confirmation modal and message
function showConfirmation() {
    showConfirmationModal();
    showConfirmationMessage();
}

// Show the confirmation modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = "block"; // Display the modal

    // Close the confirmation modal when the user clicks the close button
    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        modal.style.display = "none"; // Hide the modal
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });
}

// Display confirmation message inside the form
function showConfirmationMessage() {
    const form = document.getElementById('recommendationForm');
    const confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = 'Thank you for your recommendation!';
    confirmationMessage.style.color = '#4CAF50'; // Green for success
    form.appendChild(confirmationMessage);

    // Remove confirmation message after 3 seconds
    setTimeout(() => {
        confirmationMessage.remove();
    }, 3000);
}

// Scroll animations
const sections = document.querySelectorAll('section');

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function revealSectionsSequentially() {
    sections.forEach((section, index) => {
        setTimeout(() => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        }, index * 200); // Delay each section by 200ms
    });
}

function checkScroll() {
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

// Navigation smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 5; // Add offset
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth' // Smooth scrolling
        });
    });
});

// Home link functionality
document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({ top: 0, behavior: 'instant' }); // Scroll to the top instantly
});

// When page loads, animate in order
window.addEventListener('load', revealSectionsSequentially);
// On scroll, still reveal if not already visible
window.addEventListener('scroll', checkScroll);

// Intersection Observer for section visibility
const observerOptions = {
    root: null, // viewport
    threshold: 0.5, // trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after visible
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});



document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = this.querySelector('input[type="text"]');
    const recommendationInput = this.querySelector('textarea');
    
    const name = nameInput.value;
    const recommendation = recommendationInput.value;

    const newRecommendation = document.createElement('li');
    newRecommendation.innerHTML = `
        <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>
        <strong>${name}:</strong>
        <p>"${recommendation}"</p>
    `;

    document.getElementById('recommendationList').appendChild(newRecommendation);

    nameInput.value = '';
    recommendationInput.value = '';

    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';

    modal.querySelector('.close-btn').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});