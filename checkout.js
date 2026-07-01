const cartKey = 'oud_cart';

function loadCart() {
    return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

function calculateCartTotal(cartItems) {
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    let total = 0;
    let remaining = totalQty;
    while (remaining > 0) {
        if (remaining >= 3) { total += 1350; remaining -= 3; }
        else if (remaining >= 2) { total += 950; remaining -= 2; }
        else { total += 499; remaining -= 1; }
    }
    return total;
}

function renderCheckoutItems() {
    const cart = loadCart();
    const container = document.getElementById('checkout-items');
    const totalEl = document.getElementById('checkout-total');

    if (!container || !totalEl) return;
    if (!cart.length) {
        container.innerHTML = '<p class="empty-state">سلة التسوق فارغة. الرجاء إضافة منتجات ثم العودة لإتمام الطلب.</p>';
        totalEl.innerText = '0 جنيه';
        return;
    }

    const total = calculateCartTotal(cart);
    container.innerHTML = cart.map(item => {
        const displayName = item.title_ar || item.title_en;
        return `
            <div class="checkout-item">
                <div style="flex:1;">
                    <strong>${displayName}</strong>
                    <p>${item.qty} × ${item.price} ${item.currency_ar || 'جنيه'}</p>
                </div>
                <span style="font-weight:bold;">${item.price * item.qty} ${item.currency_en || 'EGP'}</span>
            </div>
        `;
    }).join('');
    totalEl.innerText = `${total.toLocaleString()} جنيه`;
}

async function sendOrderDirectly(orderPayload) {
    const botToken = '8263752644:AAHJx4sYM5ociQn7_16ckL1UbA9UiFoNzds';
    const chatId = '8633966933';
    const text = `📦 أوردر جديد:\nالاسم: ${orderPayload.customer_name}\nالهاتف: ${orderPayload.phone}\nالعنوان: ${orderPayload.address}\n\n${JSON.stringify(orderPayload, null, 2)}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
    });
}

async function handleCheckout(event) {
    event.preventDefault();
    const cart = loadCart();
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const messageEl = document.getElementById('checkout-message');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    if (!cart.length) {
        if (messageEl) messageEl.innerText = 'سلة التسوق فارغة. لا يمكن إتمام الطلب.';
        return;
    }

    if (!name || !phone || !address) {
        if (messageEl) messageEl.innerText = 'يرجى ملء الاسم والهاتف والعنوان.';
        return;
    }

    // ✅ Block submission: stop the event and exit early when any validation fails
    event.preventDefault();
    event.stopPropagation();

    // Validation: name (>=3 chars), phone (exactly 11 digits)
    if (name.length < 3) {
        if (messageEl) messageEl.innerText = '❌ الاسم الكامل يجب ألا يقل عن 3 أحرف.';
        return;
    }
    // Phone: digits only, exactly 11 digits (allow spaces/dashes visually but strip them)
    const phoneDigitsOnly = phone.replace(/[\s\-]/g, '');
    if (!/^\d{11}$/.test(phoneDigitsOnly)) {
        if (messageEl) messageEl.innerText = '❌ رقم الهاتف يجب أن يتكون من 11 رقماً بالضبط.';
        return;
    }
    if (address.length < 5) {
        if (messageEl) messageEl.innerText = '❌ يرجى إدخال عنوان كامل وصحيح (5 أحرف على الأقل).';
        return;
    }

    const total = calculateCartTotal(cart);
    const orderPayload = {
        customer_name: name,
        phone: phoneDigitsOnly,
        address,
        total_price: total,
        items: cart.map(item => ({
            product_id: item.id,
            quantity: item.qty,
            price: item.price,
        })),
    };

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'جاري إرسال الطلب...';
    }

    try {
        await sendOrderDirectly(orderPayload);

        localStorage.removeItem(cartKey);
        sessionStorage.setItem('last_order', JSON.stringify(orderPayload));

        if (messageEl) {
            messageEl.innerHTML = '<strong>تم استلام طلبك بنجاح!</strong> جاري توجيهك لصفحة ملخص الطلب...';
        }
        document.getElementById('checkout-form')?.reset();

        setTimeout(() => {
            window.location.href = 'order-success.html';
        }, 1500);
    } catch (err) {
        if (messageEl) messageEl.innerText = err.message || 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'تأكيد الطلب';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutItems();
    document.getElementById('checkout-form')?.addEventListener('submit', handleCheckout);

    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});
