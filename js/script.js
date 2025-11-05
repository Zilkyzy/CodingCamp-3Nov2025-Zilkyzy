// Menunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Meminta nama pengguna dan menampilkan pesan selamat datang
    const userName = prompt('Masukkan nama Anda:');
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (userName && userName.trim() !== '') {
        welcomeMessage.textContent = `Hi ${userName}, Welcome To Website`;
    }
    
    // Toggle menu hamburger untuk mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Menutup menu saat link diklik (untuk mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Form validation dan handling
    const messageForm = document.getElementById('message-form');
    const formResult = document.getElementById('form-result');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrorMessages();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message-text').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name === '') {
            displayError('name-error', 'Nama harus diisi');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            displayError('email-error', 'Email harus diisi');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('email-error', 'Format email tidak valid');
            isValid = false;
        }
        
        // Phone validation
        if (phone === '') {
            displayError('phone-error', 'Nomor telepon harus diisi');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            displayError('phone-error', 'Nomor telepon hanya boleh berisi angka');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            displayError('message-error', 'Pesan harus diisi');
            isValid = false;
        }
        
        // If form is valid, display results
        if (isValid) {
            displayFormResults(name, email, phone, message);
            messageForm.reset();
        }
    });
    
    // Fungsi untuk membersihkan pesan error
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
    }
    
    // Fungsi untuk menampilkan pesan error
    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Fungsi untuk validasi format email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fungsi untuk validasi nomor telepon (hanya angka)
    function isValidPhone(phone) {
        const phoneRegex = /^\d+$/;
        return phoneRegex.test(phone);
    }
    
    // Fungsi untuk menampilkan hasil form
    function displayFormResults(name, email, phone, message) {
        const currentTime = new Date().toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        formResult.innerHTML = `
            <h3>Terima kasih telah menghubungi kami!</h3>
            <p>Berikut adalah detail pesan Anda:</p>
            <div class="result-item">
                <span class="result-label">Waktu:</span> ${currentTime}
            </div>
            <div class="result-item">
                <span class="result-label">Nama:</span> ${name}
            </div>
            <div class="result-item">
                <span class="result-label">Email:</span> ${email}
            </div>
            <div class="result-item">
                <span class="result-label">Telepon:</span> ${phone}
            </div>
            <div class="result-item">
                <span class="result-label">Pesan:</span> ${message}
            </div>
        `;
    }
    
    // Smooth scroll untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menambahkan placeholder untuk gambar banner jika tidak ada
    const bannerImg = document.querySelector('.company-banner');
    if (bannerImg && !bannerImg.style.backgroundImage.includes('banner.jpg')) {
        bannerImg.style.background = 'linear-gradient(135deg, #3498db, #8e44ad)';
    }
});