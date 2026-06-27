/**
 * REST API Client - fetch wrapper with JWT support
 */
const FSApi = {
  getToken() {
    return sessionStorage.getItem('fs_jwt_token');
  },

  setToken(token) {
    if (token) sessionStorage.setItem('fs_jwt_token', token);
    else sessionStorage.removeItem('fs_jwt_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async request(endpoint, options = {}) {
    const url = `${FSStore.getApiBase()}${endpoint}`;
    const headers = { 'Content-Type': 'application/json', ...options.headers };

    const token = this.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  },

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${FSStore.getApiBase()}/upload`;
    const headers = {};
    const token = this.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { method: 'POST', headers, body: formData });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data.data.url;
  },

  // Auth
  login(username, password) {
    return this.post('/auth/login', { username, password });
  },

  verifyAuth() {
    return this.get('/auth/verify');
  },

  // Products
  getProducts() {
    return this.get('/products');
  },

  getProduct(id) {
    return this.get(`/products/${id}`);
  },

  createProduct(data) {
    return this.post('/products', data);
  },

  updateProduct(id, data) {
    return this.put(`/products/${id}`, data);
  },

  deleteProduct(id) {
    return this.delete(`/products/${id}`);
  },

  // Orders
  getOrders() {
    return this.get('/orders');
  },

  createOrder(data) {
    return this.post('/orders', data);
  },

  updateOrderStatus(id, status) {
    return this.patch(`/orders/${id}/status`, { status });
  },

  deleteOrder(id) {
    return this.delete(`/orders/${id}`);
  },

  // Settings
  getSettings() {
    return this.get('/settings');
  },

  updateSettings(settings) {
    return this.put('/settings', settings);
  },

  // Customers
  getCustomers() {
    return this.get('/customers');
  },

  mapProductToFrontend(apiProduct) {
    const base = FSStore.getSocketUrl();
    let image = apiProduct.image || '';
    if (image && !image.startsWith('http') && !image.startsWith('data:') && !image.startsWith('pf/')) {
      image = image.startsWith('/') ? `${base}${image}` : `${base}/${image}`;
    }

    return {
      id: apiProduct.id,
      title_ar: apiProduct.name,
      title_en: apiProduct.name_en || apiProduct.name,
      vendor: apiProduct.vendor || 'F&S Fragrances',
      price: apiProduct.price,
      currency_ar: 'جنيه',
      currency_en: 'EGP',
      image,
      badge_ar: apiProduct.badge_ar,
      badge_en: apiProduct.badge_en,
      desc_ar: apiProduct.description,
      desc_en: apiProduct.description_en || apiProduct.description,
      notes_ar: apiProduct.notes_ar || { top: '-', mid: '-', base: '-' },
      notes_en: apiProduct.notes_en || { top: '-', mid: '-', base: '-' },
      stock_quantity: apiProduct.stock_quantity ?? 0,
      in_stock: apiProduct.in_stock ?? (apiProduct.stock_quantity > 0),
    };
  },
};

window.FSApi = FSApi;
