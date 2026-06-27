/**
 * Socket.io Real-Time Client
 */
const FSSocket = {
  socket: null,
  listeners: {},

  connect() {
    if (typeof io === 'undefined') {
      console.warn('Socket.io not loaded');
      return null;
    }

    if (this.socket) return this.socket;

    this.socket = io(FSStore.getSocketUrl(), {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('Real-time connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Real-time disconnected');
    });

    return this.socket;
  },

  joinStorefront() {
    this.connect()?.emit('join:storefront');
  },

  joinAdmin() {
    this.connect()?.emit('join:admin');
  },

  on(event, callback) {
    this.connect();
    this.socket.on(event, callback);
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },

  off(event, callback) {
    this.socket?.off(event, callback);
  },

  initStorefront(onProductChange) {
    this.joinStorefront();

    ['product:created', 'product:updated', 'product:deleted', 'stock:updated'].forEach((event) => {
      this.on(event, () => {
        if (typeof onProductChange === 'function') onProductChange();
      });
    });
  },

  initAdmin(handlers = {}) {
    this.joinAdmin();

    if (handlers.onProductChange) {
      ['product:created', 'product:updated', 'product:deleted', 'stock:updated'].forEach((event) => {
        this.on(event, handlers.onProductChange);
      });
    }

    if (handlers.onOrderCreated) this.on('order:created', handlers.onOrderCreated);
    if (handlers.onOrderUpdated) this.on('order:updated', handlers.onOrderUpdated);
    if (handlers.onOrderDeleted) this.on('order:deleted', handlers.onOrderDeleted);
  },
};

window.FSSocket = FSSocket;
