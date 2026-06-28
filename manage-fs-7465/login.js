function isAuthenticated() {
    return typeof FSApi !== 'undefined' && FSApi.isAuthenticated();
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorEl = document.getElementById('login-error');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'جاري الدخول...';
    }

    try {
        const response = await FSApi.login(username, password);
        FSApi.setToken(response.data.token);
        window.location.href = 'admin.html';
    } catch {
        if (errorEl) errorEl.innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'دخول';
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (isAuthenticated()) {
        try {
            await FSApi.verifyAuth();
            window.location.href = 'admin.html';
        } catch {
            FSApi.setToken(null);
        }
    }
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
});
