// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Highlight
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    // Smooth Scroll Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Active Section Highlight
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Doctor Search Feature
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search doctors by name or specialty...';
    searchInput.className = 'doctor-search';
    
    const gallerySection = document.querySelector('.gallery-section');
    gallerySection.insertBefore(searchInput, gallerySection.querySelector('.gallery-container'));

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const doctorCards = document.querySelectorAll('.doctor-card');

        doctorCards.forEach(card => {
            const doctorName = card.querySelector('h3').textContent.toLowerCase();
            const doctorSpecialty = card.querySelector('p').textContent.toLowerCase();
            
            if (doctorName.includes(searchTerm) || doctorSpecialty.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Appointment Booking Modal
    const modalHTML = `
        <div id="appointmentModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Book Appointment</h2>
                <form id="appointmentForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <input type="tel" placeholder="Phone Number" required>
                    <input type="date" required>
                    <select required>
                        <option value="">Select Time Slot</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (2PM - 5PM)</option>
                        <option value="evening">Evening (6PM - 9PM)</option>
                    </select>
                    <textarea placeholder="Additional Notes"></textarea>
                    <button type="submit">Book Appointment</button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add Book Appointment buttons to doctor cards
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Book Appointment';
        bookButton.className = 'book-appointment-btn';
        card.querySelector('.doctor-info').appendChild(bookButton);
    });

    // Modal Functionality
    const modal = document.getElementById('appointmentModal');
    const bookButtons = document.querySelectorAll('.book-appointment-btn');
    const closeBtn = document.querySelector('.close');

    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Appointment request submitted! We will contact you shortly.');
        modal.style.display = 'none';
        this.reset();
    });

    // Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-card');
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
}); 