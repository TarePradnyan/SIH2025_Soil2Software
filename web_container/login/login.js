document.addEventListener('DOMContentLoaded', () => {
    const phoneForm = document.getElementById('phoneForm');
    const otpForm = document.getElementById('otpForm');
    const phoneInput = document.getElementById('phone');
    const otpInput = document.getElementById('otp');
    const phoneError = document.getElementById('phoneError');
    const otpError = document.getElementById('otpError');

    // Handle Phone Number Form Submission
    phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneNumber = phoneInput.value;
        if (!validatePhoneNumber(phoneNumber)) {
            phoneError.textContent = 'Please enter a valid 10-digit number.';
            phoneError.style.visibility = 'visible';
            return;
        }

        phoneError.style.visibility = 'hidden';
        
        // In a real application, this would be an API call to a backend
        // to send the OTP via SMS service (e.g., Twilio, Firebase)
        console.log(`Sending OTP to ${phoneNumber}`);
        alert('OTP sent successfully!');
        
        // Show the OTP form and hide the phone form
        phoneForm.classList.add('hidden');
        otpForm.classList.remove('hidden');
        otpInput.focus();
    });

    // Handle OTP Form Submission
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = otpInput.value;
        if (!validateOtp(otp)) {
            otpError.textContent = 'Please enter a valid 6-digit OTP.';
            otpError.style.visibility = 'visible';
            return;
        }

        otpError.style.visibility = 'hidden';

        // In a real application, this would be an API call to the backend
        // to verify the OTP.
        // For simplicity, we'll just check if it's "123456"
        if (otp === '123456') {
            console.log('OTP verified. Login successful!');
            alert('Login successful! Redirecting to dashboard...');
            // Redirect to the dashboard page after successful login
            window.location.href = 'index.html'; 
        } else {
            otpError.textContent = 'OTP is Incorrect. Please try again.';
            otpError.style.visibility = 'visible';
        }
    });

    // Simple validation functions
    function validatePhoneNumber(number) {
        // Regex to check for a 10-digit number
        const regex = /^\d{10}$/;
        return regex.test(number);
    }

    function validateOtp(otp) {
        // Regex to check for a 6-digit number
        const regex = /^\d{6}$/;
        return regex.test(otp);
    }
});