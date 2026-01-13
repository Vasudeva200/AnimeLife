document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECTIONS ---
    const loginModal = document.getElementById('modalOverlay');
    const registerModal = document.getElementById('registerModalOverlay');
    const forgotModal = document.getElementById('forgotModalOverlay');
    const accountBtn = document.getElementById('accountBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.querySelector('.logout');

    // --- 2. MODAL HELPER FUNCTIONS ---
    const closeAllModals = () => {
        loginModal?.classList.remove('show');
        registerModal?.classList.remove('show');
        forgotModal?.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    const openModal = (modal) => {
        closeAllModals();
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    // --- 3. ACCOUNT POPUP LOGIC (main.html & popular.html) ---
    if (accountBtn && dropdownMenu) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            console.log("Account Popup Toggled");
        });

        // Close popup when clicking anywhere else
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && e.target !== accountBtn) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // --- 4. LOGIN SUBMIT & REDIRECT ---
    const loginSubmitBtn = document.getElementById('loginBtn');
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', () => {
            const email = document.querySelector('input[type="email"]').value;
            const password = document.querySelector('input[type="password"]').value;

            if (email.trim() !== "" && password.trim() !== "") {
                window.location.href = "main.html";
            } else {
                alert("Please enter your credentials.");
            }
        });
    }

    // --- 5. LOGOUT LOGIC ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // --- 6. MODAL NAVIGATION & TRIGGERS (index.html) ---
    // Open Login
    document.getElementById('signInBtn')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('watchNowBtn')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('searchBtn')?.addEventListener('click', () => openModal(loginModal));

    // Swap Modals
    document.querySelector('.register-text a')?.addEventListener('click', () => openModal(registerModal));
    document.querySelector('.forgot-link')?.addEventListener('click', () => openModal(forgotModal));
    document.getElementById('backToLogin')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('backToLoginFromForgot')?.addEventListener('click', () => openModal(loginModal));

    // Close Modals
    document.getElementById('closeBtn')?.addEventListener('click', closeAllModals);
    document.getElementById('closeRegBtn')?.addEventListener('click', closeAllModals);
    document.getElementById('closeForgotBtn')?.addEventListener('click', closeAllModals);

    // Close on background click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal || e.target === forgotModal) {
            closeAllModals();
        }
    });

    // Password Toggle
    const togglePass = document.getElementById('togglePass');
    const passInput = document.getElementById('passInput');
    if (togglePass && passInput) {
        togglePass.addEventListener('click', () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            togglePass.classList.toggle('fa-eye-slash');
        });
    }
});

// Add this to your existing index.js inside DOMContentLoaded
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    // This ensures that when you are on wishlist.html, 
    // the 'active' class is handled if you haven't set it in HTML
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Add this inside the "Logic for Login Page" section in your index.js
const triggerLinks = document.querySelectorAll('.trigger-login');
triggerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only show modal if user is NOT logged in (on index.html)
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            e.preventDefault();
            modalOverlay.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if we are on the landing page (where the login modal exists)
            // and the user is clicking a restricted link
            const isLandingPage = !!modalOverlay;
            const targetHref = link.getAttribute('href');

            if (isLandingPage && targetHref !== 'main.html#share-target') {
                e.preventDefault(); // Stop navigation
                modalOverlay.classList.add('show'); // Show login instead
                document.body.style.overflow = 'hidden';
            }
        });

        // AUTO-ACTIVE CLASS: Highlights the current page link
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});