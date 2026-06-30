function isAuthenticated() {
    return FSApi.isAuthenticated();
}

function ensureAuthenticated() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

function logout() {
    FSApi.setToken(null);
    window.location.href = 'login.html';
}

const STATUS_LABELS = {
    pending: { ar: 'قيد الانتظار', en: 'Pending', class: 'status-new' },
    processing: { ar: 'قيد التجهيز', en: 'Processing', class: 'status-unshipped' },
    delivered: { ar: 'تم التسليم', en: 'Delivered', class: 'status-shipped' },
};

let ordersCache = [];
let customersCache = [];
let currentProductImage = '';
const imgPrefix = '../';

let apiProducts = [];

async function refreshProductsFromAPI() {
    try {
        apiProducts = [];
        if (typeof FSApi !== 'undefined' && typeof FSApi.getProducts === 'function') {
            const response = await FSApi.getProducts();
            const payload = response?.data ?? response;
            const list = Array.isArray(payload)
                ? payload
                : (payload?.products || payload?.items || payload?.data || []);

            const mapped = (Array.isArray(list) ? list : []).map(p => {
                return (typeof FSApi.mapProductToFrontend === 'function')
                    ? FSApi.mapProductToFrontend(p)
                    : p;
            });
            apiProducts = mapped;
        }
    } catch (err) {
        console.error("Failed to load products from API:", err);
        apiProducts = [];
    }
}

function getProducts() {
    return apiProducts;
}

async function loadOrders() {
    const container = document.getElementById('orders-list');
    try {
        const response = await FSApi.getOrders();
        ordersCache = response.data || [];
    } catch (err) {
        console.error('Failed to load orders:', err.message);
        ordersCache = [];
    } finally {
        // Always update UI — never leave "جاري التحميل" stuck
        if (ordersCache.length === 0 && container) {
            container.innerHTML = '<p class="empty-state">لا توجد طلبات بعد.</p>';
            const count = document.getElementById('orders-count');
            if (count) count.innerText = '0';
        } else {
            renderOrders();
        }
    }
}

async function loadCustomers() {
    try {
        const response = await FSApi.getCustomers();
        customersCache = response.data || [];
    } catch (err) {
        console.error('Failed to load customers:', err.message);
        customersCache = [];
    } finally {
        renderCustomers();
    }
}

async function loadAdminProducts() {
    try {
        await refreshProductsFromAPI();
    } catch (err) {
        console.error('Failed to load products:', err.message);
        apiProducts = [];
    } finally {
        renderAdminProducts();
    }
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        await FSApi.updateOrderStatus(orderId, newStatus);
        await loadOrders();
    } catch (err) {
        alert(err.message || 'فشل تحديث حالة الطلب');
    }
}

async function deleteOrder(orderId) {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) return;
    try {
        await FSApi.deleteOrder(orderId);
        await loadOrders();
    } catch (err) {
        alert(err.message || 'فشل حذف الطلب');
    }
}

async function deleteProductAdmin(id) {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
        await FSApi.deleteProduct(id);
        await loadAdminProducts();
    } catch (err) {
        alert(err.message || 'فشل حذف المنتج');
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        currentProductImage = e.target.result;
        const preview = document.getElementById('image-preview');
        if (preview) {
            preview.src = currentProductImage;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
    event.target.dataset.file = 'pending';
    event.target.pendingFile = file;
}

function openProductForm(id = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    const preview = document.getElementById('image-preview');
    currentProductImage = '';

    if (id) {
        const p = getProducts().find(item => item.id === id);
        if (!p) return;
        title.innerText = 'تعديل منتج';
        form.prod_id.value = p.id;
        form.prod_name_ar.value = p.title_ar;
        form.prod_name_en.value = p.title_en;
        form.prod_price.value = p.price;
        form.prod_stock.value = p.stock_quantity ?? 0;
        form.prod_desc_ar.value = p.desc_ar;
        form.prod_desc_en.value = p.desc_en;
        form.prod_status.value = p.is_active !== undefined ? String(p.is_active) : "1";
        currentProductImage = p.image;
        if (preview) {
            preview.src = p.image || '';
            preview.style.display = 'block';
        }
    } else {
        title.innerText = 'إضافة منتج جديد';
        form.reset();
        form.prod_id.value = '';
        form.prod_status.value = "1";
        if (preview) { preview.src = ''; preview.style.display = 'none'; }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

async function saveProductAdmin(event) {
    event.preventDefault();
    const form = event.target;
    const idVal = form.prod_id.value;
    const imageInput = document.getElementById('admin-image-input');

    let imageUrl = currentProductImage;
    if (imageInput?.pendingFile) {
        try {
            imageUrl = await FSApi.uploadImage(imageInput.pendingFile);
        } catch {
            alert('فشل رفع الصورة. حاول مرة أخرى.');
            return;
        }
    }

    if (!imageUrl && !idVal) {
        alert('يرجى اختيار صورة للمنتج أولاً.');
        return;
    }

    const payload = {
        name: form.prod_name_ar.value,
        name_en: form.prod_name_en.value,
        price: parseFloat(form.prod_price.value),
        stock_quantity: parseInt(form.prod_stock.value, 10) || 0,
        description: form.prod_desc_ar.value,
        description_en: form.prod_desc_en.value,
        image: imageUrl,
        vendor: 'F&S Fragrances',
        is_active: parseInt(form.prod_status.value, 10),
    };

    try {
        if (idVal) {
            await FSApi.updateProduct(parseInt(idVal, 10), payload);
        } else {
            await FSApi.createProduct(payload);
        }

        document.getElementById('product-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
        await loadAdminProducts();
        alert('✅ تم الحفظ بنجاح!');
    } catch (err) {
        alert(err.message || 'فشل حفظ المنتج');
    }
}

function renderAdminProducts() {
    const container = document.getElementById('admin-products-list');
    if (!container) return;

    const all = getProducts();
    container.innerHTML = all.map(p => {
        const stockClass = p.stock_quantity <= 0 ? 'stock-out' : 'stock-in';
        const stockText = p.stock_quantity <= 0 ? 'Out Of Stock' : `متبقي: ${p.stock_quantity}`;
        const isActive = p.is_active !== 0;
        const statusText = isActive ? 'نشط' : 'غير نشط';
        const statusColor = isActive ? '#2ecc71' : '#ff4d4d';
        return `
        <div class="admin-prod-card" onclick="openProductForm(${p.id})" style="cursor: pointer;">
            <img src="${p.image || ''}" width="50" onerror="this.src='https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=200'">
            <div class="info">
                <strong>${p.title_ar}</strong>
                <span>${p.price} جنيه</span>
                <div style="margin-top: 4px; display: flex; gap: 8px; align-items: center;">
                    <small class="${stockClass}">${stockText}</small>
                    <span style="background: ${statusColor}; color: #000; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">${statusText}</span>
                </div>
            </div>
            <div class="btns">
                <button class="edit-btn" onclick="event.stopPropagation(); openProductForm(${p.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="del-btn" onclick="event.stopPropagation(); deleteProductAdmin(${p.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    }).join('');
}

function renderOrders() {
    const container = document.getElementById('orders-list');
    const count = document.getElementById('orders-count');
    if (count) count.innerText = ordersCache.length;

    if (!container) return;
    if (ordersCache.length === 0) {
        container.innerHTML = '<p class="empty-state">لا توجد طلبات بعد.</p>';
        return;
    }

    container.innerHTML = ordersCache.map(order => {
        const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
        const itemsHtml = (order.items || []).map(item => `
            <div class="order-item">
                <strong>${item.product_name || item.product_name_en || 'منتج'}</strong>
                <span>${item.quantity} × ${item.price} جنيه</span>
            </div>
        `).join('');

        const date = order.created_at
            ? new Date(order.created_at).toLocaleString('ar-EG')
            : '';

        return `
            <div class="order-card">
                <div class="order-meta">
                    <span>طلب #${order.id}</span>
                    <span>${date}</span>
                </div>
                <div class="order-info">
                    <p><strong>الاسم:</strong> ${order.customer_name}</p>
                    <p><strong>الهاتف:</strong> ${order.phone}</p>
                    <p><strong>العنوان:</strong> ${order.address}</p>
                </div>
                <div class="order-items">${itemsHtml}</div>
                <div class="order-total">الإجمالي: ${order.total_price} جنيه</div>
                <div class="order-status-row">
                    <span class="order-status-badge ${statusInfo.class}">
                        <i class="fa-solid fa-clock"></i> ${statusInfo.ar}
                    </span>
                </div>
                <div class="order-actions">
                    <button type="button" class="order-action-btn order-action-ship" onclick="updateOrderStatus(${order.id}, 'processing')">
                        <i class="fa-solid fa-box"></i> Processing
                    </button>
                    <button type="button" class="order-action-btn order-action-ship" onclick="updateOrderStatus(${order.id}, 'delivered')">
                        <i class="fa-solid fa-check"></i> Delivered
                    </button>
                    <button type="button" class="order-action-btn order-action-unship" onclick="updateOrderStatus(${order.id}, 'pending')">
                        <i class="fa-solid fa-clock"></i> Pending
                    </button>
                    <button type="button" class="order-action-btn order-action-delete" onclick="deleteOrder(${order.id})">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            </div>`;
    }).join('');
}

function renderCustomers() {
    const container = document.getElementById('customers-list');
    const count = document.getElementById('customers-count');
    if (count) count.innerText = customersCache.length;
    if (!container) return;

    if (customersCache.length === 0) {
        container.innerHTML = '<p class="empty-state">لا يوجد عملاء بعد.</p>';
        return;
    }

    container.innerHTML = customersCache.map(c => `
        <div class="order-card">
            <div class="order-info">
                <p><strong>${c.name}</strong></p>
                <p><strong>الهاتف:</strong> ${c.phone}</p>
                <p><strong>العنوان:</strong> ${c.address}</p>
                <p><small>${new Date(c.created_at).toLocaleString('ar-EG')}</small></p>
            </div>
        </div>
    `).join('');
}

function injectProductUI() {
    const main = document.querySelector('main.container, main.admin-main');
    if (!main || document.getElementById('products-section')) return;

    const section = document.createElement('section');
    section.className = 'admin-section';
    section.id = 'products-section';
    section.style.marginTop = '40px';
    section.innerHTML = `
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h2><i class="fa-solid fa-box"></i> إدارة المنتجات</h2>
            <button class="btn btn-gold" onclick="openProductForm()">
                <i class="fa-solid fa-plus"></i> إضافة منتج
            </button>
        </div>
        <div id="admin-products-list" class="admin-products-grid"></div>

        <div id="product-modal" class="admin-full-screen">
            <div class="modal-fullscreen-content">
                <form id="product-form" onsubmit="saveProductAdmin(event)" class="mobile-edit-form">
                    <div class="modal-header-sticky">
                        <div class="header-actions-left">
                            <button type="button" class="back-btn" onclick="document.getElementById('product-modal').classList.remove('active'); document.body.style.overflow='auto';">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                            <span id="modal-title">تعديل المنتج</span>
                        </div>
                        <button type="submit" class="save-btn-top">حفظ</button>
                    </div>
                    <div class="modal-body-scroll">
                        <input type="hidden" name="prod_id">
                        <div class="form-group"><label>اسم المنتج (عربي)</label><input type="text" name="prod_name_ar" required></div>
                        <div class="form-group"><label>اسم المنتج (EN)</label><input type="text" name="prod_name_en" required></div>
                        <div class="form-group"><label>السعر</label><input type="number" name="prod_price" step="0.01" required></div>
                        <div class="form-group"><label>الكمية المتوفرة (Stock)</label><input type="number" name="prod_stock" min="0" value="0" required></div>
                        <div class="form-group"><label>الوصف (عربي)</label><textarea name="prod_desc_ar" required></textarea></div>
                        <div class="form-group"><label>الوصف (EN)</label><textarea name="prod_desc_en" required></textarea></div>
                        <div class="form-group">
                            <label>حالة المنتج</label>
                            <select name="prod_status" style="width:100%; padding:14px; background:#151515; border:1px solid #222; color:#fff; border-radius:12px; font-size:15px; cursor:pointer;">
                                <option value="1">نشط (يظهر في المتجر)</option>
                                <option value="0">غير نشط (مخفي)</option>
                            </select>
                        </div>
                        <div class="form-group image-upload-section">
                            <label>صورة المنتج</label>
                            <div class="custom-file-upload" onclick="document.getElementById('admin-image-input').click()">
                                <i class="fa-solid fa-camera"></i>
                                <span>تغيير الصورة</span>
                            </div>
                            <input type="file" id="admin-image-input" accept="image/*" onchange="handleImageUpload(event)" style="display:none;">
                            <img id="image-preview" src="" style="width:100%; max-height:250px; object-fit:contain; border-radius:10px; display:none; margin-top:15px; background:#000;">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    main.appendChild(section);

    const customersSection = document.createElement('section');
    customersSection.className = 'admin-section';
    customersSection.id = 'customers-section';
    customersSection.style.marginTop = '40px';
    customersSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fa-solid fa-users"></i> العملاء</h2>
            <span id="customers-count">0</span>
        </div>
        <div id="customers-list" class="orders-list"></div>
    `;
    main.appendChild(customersSection);

    const settingsSection = document.createElement('section');
    settingsSection.className = 'admin-section';
    settingsSection.id = 'settings-section';
    settingsSection.style.marginTop = '40px';
    settingsSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fa-solid fa-gears"></i> التحكم في العروض والإعدادات</h2>
        </div>
        <div class="admin-panel full-width" style="background:#1a1a1a; padding:20px; border-radius:12px; border:1px solid #333; margin-top:15px; margin-bottom: 50px;">
            <form id="settings-form" onsubmit="saveSettingsAdmin(event)">
                <div class="form-group" style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <input type="checkbox" id="sett-offer-enabled" name="offer_enabled" style="width: auto; transform: scale(1.3); cursor: pointer;">
                    <label for="sett-offer-enabled" style="margin: 0; font-size: 14px; cursor: pointer;">تفعيل العرض الترويجي (Offer)</label>
                </div>
                <div class="form-group">
                    <label>نوع العرض</label>
                    <select id="sett-offer-type" name="offer_type" style="width: 100%; padding: 14px; background: #151515; border: 1px solid #222; color: #fff; border-radius: 12px; font-size: 15px;">
                        <option value="banner">شريط علوي (Top Banner)</option>
                        <option value="popup">نافذة منبثقة (Popup)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>نص العرض (عربي)</label>
                    <input type="text" id="sett-offer-text-ar" name="offer_text_ar" required>
                </div>
                <div class="form-group">
                    <label>نص العرض (EN)</label>
                    <input type="text" id="sett-offer-text-en" name="offer_text_en" required>
                </div>
                <button type="submit" class="btn btn-gold" style="width: 100%; padding: 12px; border-radius: 25px; font-weight: bold; border: none; cursor: pointer;">حفظ الإعدادات</button>
            </form>
        </div>
    `;
    main.appendChild(settingsSection);

    injectAdminStyles();
}

function injectAdminStyles() {
    if (document.getElementById('admin-dynamic-styles')) return;
    const style = document.createElement('style');
    style.id = 'admin-dynamic-styles';
    style.innerHTML = `
        .admin-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 15px; }
        .admin-prod-card { background: #1a1a1a; padding: 10px; border-radius: 12px; border: 1px solid #333; text-align: center; }
        .admin-prod-card img { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
        .admin-prod-card .info strong { display: block; font-size: 14px; color: #fff; margin-bottom: 4px; }
        .admin-prod-card .info span { color: #d4af37; font-weight: bold; }
        .admin-prod-card .info small { display: block; margin-top: 4px; font-size: 12px; }
        .admin-prod-card .info small.stock-in { color: #2ecc71; }
        .admin-prod-card .info small.stock-out { color: #e74c3c; }
        .admin-prod-card .btns { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
        .admin-prod-card .btns button { background: #222; border: 1px solid #444; color: #fff; width: 35px; height: 35px; border-radius: 50%; }
        .admin-prod-card .edit-btn { color: #d4af37; }
        .admin-prod-card .del-btn { color: #ff4d4d; }
        .order-action-delete { background: #dc3545 !important; color: #fff !important; }
        .admin-full-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 9999; transform: translateY(100%); transition: transform 0.3s ease-in-out; visibility: hidden; }
        .admin-full-screen.active { transform: translateY(0); visibility: visible; }
        .modal-header-sticky { position: sticky; top: 0; background: #111; padding: 12px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; z-index: 100; }
        .header-actions-left { display: flex; align-items: center; gap: 12px; }
        .back-btn { background: none; border: none; color: #fff; font-size: 20px; padding: 5px; }
        #modal-title { font-size: 16px; font-weight: bold; color: #fff; }
        .save-btn-top { background: #d4af37; color: #000; border: none; padding: 8px 20px; border-radius: 25px; font-weight: bold; font-size: 14px; }
        .modal-body-scroll { height: calc(100vh - 60px); overflow-y: auto; padding: 20px; background: #0a0a0a; color: #fff; }
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 13px; color: #d4af37; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 14px; background: #151515; border: 1px solid #222; color: #fff; border-radius: 12px; font-size: 15px; }
        .form-group textarea { height: 120px; }
        .custom-file-upload { background: #151515; border: 1px dashed #d4af37; padding: 30px; text-align: center; border-radius: 10px; color: #d4af37; cursor: pointer; }
        .custom-file-upload i { font-size: 30px; display: block; margin-bottom: 10px; }
    `;
    document.head.appendChild(style);
}

function setupAdminNavigation() {
    document.querySelectorAll('.app-bottom-nav .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                document.querySelectorAll('.app-bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

async function loadSettings() {
    try {
        const response = await FSApi.getSettings();
        const settings = response.data || {};
        const offerEnabled = document.getElementById('sett-offer-enabled');
        const offerType = document.getElementById('sett-offer-type');
        const offerTextAr = document.getElementById('sett-offer-text-ar');
        const offerTextEn = document.getElementById('sett-offer-text-en');
        if (offerEnabled) offerEnabled.checked = settings.offer_enabled === 'true' || settings.offer_enabled === true;
        if (offerType) offerType.value = settings.offer_type || 'banner';
        if (offerTextAr) offerTextAr.value = settings.offer_text_ar || '';
        if (offerTextEn) offerTextEn.value = settings.offer_text_en || '';
    } catch (err) {
        console.error('Failed to load settings:', err.message);
    }
}

async function saveSettingsAdmin(event) {
    event.preventDefault();
    const form = event.target;
    const settings = {
        offer_enabled: form.offer_enabled.checked ? 'true' : 'false',
        offer_type: form.offer_type.value,
        offer_text_ar: form.offer_text_ar.value,
        offer_text_en: form.offer_text_en.value,
    };
    try {
        await FSApi.updateSettings(settings);
        alert('✅ تم حفظ الإعدادات بنجاح!');
    } catch (err) {
        alert(err.message || 'فشل حفظ الإعدادات');
    }
}

// HTTP Polling — replaces WebSocket (not supported on Vercel Serverless)
function startPolling() {
    // Poll for new orders every 15 seconds
    setInterval(async () => {
        try {
            await loadOrders();
        } catch (err) {
            console.warn('[Polling] Failed to refresh orders:', err.message);
        }
    }, 15000);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Step 1: Check local token exists before making a network call
    ensureAuthenticated();

    // Step 2: Verify token with server — on failure show error instead of silent loop
    try {
        await FSApi.verifyAuth();
    } catch (err) {
        console.error('[Admin] verifyAuth failed:', err?.message || err);
        // If 401/403, clear token and redirect cleanly
        FSApi.setToken(null);
        window.location.href = 'login.html';
        return;
    }

    // Step 3: Build UI structure
    injectProductUI();
    setupAdminNavigation();

    // Step 4: Load all data — each function handles its own errors + UI update in finally
    await Promise.all([
        loadOrders(),
        loadAdminProducts(),
        loadCustomers(),
        loadSettings()
    ]);

    // Step 5: Start HTTP polling for orders every 15s (replaces WebSocket)
    startPolling();

    document.getElementById('logout-btn')?.addEventListener('click', logout);
});
