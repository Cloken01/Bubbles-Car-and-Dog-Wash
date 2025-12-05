// script.js

// This event handler runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');
    const nameInput = document.getElementById('customerName');
    const emailInput = document.getElementById('customerEmail');
    const serviceSelect = document.getElementById('serviceType');
    const dateInput = document.getElementById('visitDate');
    const timeInput = document.getElementById('visitTime');
    const feedback = document.getElementById('formFeedback');
    const serviceInfo = document.getElementById('serviceInfo');
    const namePreview = document.getElementById('namePreview');
    const resetButton = document.getElementById('resetButton');

    // Only run this logic on pages that actually have the form
    if (form) {
        // --- SUBMIT EVENT LISTENER ---
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // stop actual submit for this project

            let valid = true;

            // simple validation
            [nameInput, emailInput, serviceSelect, dateInput, timeInput].forEach((input) => {
                if (!input.value) {
                    input.classList.add('is-invalid');
                    valid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                feedback.className = 'alert alert-danger';
                feedback.textContent = 'Please fill out all required fields.';
                feedback.classList.remove('d-none');
                return;
            }

            // If valid, show success message
            feedback.className = 'alert alert-success';
            feedback.textContent = `Thank you, ${nameInput.value}! Your ${serviceSelect.options[serviceSelect.selectedIndex].text} request has been recorded.`;
            feedback.classList.remove('d-none');

            // Optionally clear the form AFTER showing success
            form.reset();
            namePreview.textContent = 'Customer';
            serviceInfo.textContent = 'Select a service to see more details here.';
        });

        // --- RESET BUTTON EVENT LISTENER ---
        if (resetButton) {
            resetButton.addEventListener('click', function () {
                // Clear validation styles and feedback
                [nameInput, emailInput, serviceSelect, dateInput, timeInput].forEach((input) => {
                    input.classList.remove('is-invalid');
                });
                feedback.classList.add('d-none');
                namePreview.textContent = 'Customer';
                serviceInfo.textContent = 'Select a service to see more details here.';
            });
        }
    }

    // --- SERVICE SELECT CHANGE EVENT LISTENER ---
    if (serviceSelect && serviceInfo) {
        serviceSelect.addEventListener('change', function () {
            switch (serviceSelect.value) {
                case 'basic-wash':
                    serviceInfo.textContent = 'Basic Wash: Quick exterior clean with spot-free rinse.';
                    break;
                case 'deluxe-wash':
                    serviceInfo.textContent = 'Deluxe Wash: Exterior, underbody rinse, and clear coat protection.';
                    break;
                case 'carpet-vacuum':
                    serviceInfo.textContent = 'Carpet Shampoo & Vacuum: Deep clean for interior carpets and mats.';
                    break;
                case 'dog-wash':
                    serviceInfo.textContent = 'Self-Service Dog Wash: Warm water, shampoo, and dryers included.';
                    break;
                default:
                    serviceInfo.textContent = 'Select a service to see more details here.';
            }
        });
    }

    // --- NAME INPUT EVENT LISTENER (live preview) ---
    if (nameInput && namePreview) {
        nameInput.addEventListener('input', function () {
            const value = nameInput.value.trim();
            namePreview.textContent = value ? value : 'Customer';
        });
    }
});
