import axios from 'axios';

// API Configuration - Load from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fixfinder-backend-zrn7.onrender.com/api';
// Increased timeout for Render free tier (cold starts can take 30-60 seconds)
// Production: 60000ms (60s), Development: 30000ms (30s)
const DEFAULT_TIMEOUT = import.meta.env.VITE_NODE_ENV === 'production' ? 60000 : 30000;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || String(DEFAULT_TIMEOUT));
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Debug logging
console.log('API Configuration:', {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  nodeEnv: NODE_ENV
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // For Clerk authentication, we don't need to manually add tokens
    // Clerk handles authentication automatically
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Provide better error messages for timeout errors
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      console.error('⏱️ Request timeout:', {
        url: error.config?.url,
        timeout: API_TIMEOUT,
        message: `Request took longer than ${API_TIMEOUT}ms. This is common on Render free tier due to cold starts.`
      });
    }
    return Promise.reject(error);
  }
);

// API Service Classes
export class ServicesAPI {
  static async getAllServices() {
    const response = await api.get('/services');
    return response.data;
  }

  static async getServiceById(serviceId) {
    const response = await api.get(`/services/${serviceId}`);
    return response.data;
  }

  static async createService(serviceData) {
    const response = await api.post('/services', serviceData);
    return response.data;
  }

  static async updateService(serviceId, serviceData) {
    const response = await api.put(`/services/${serviceId}`, serviceData);
    return response.data;
  }

  static async deleteService(serviceId) {
    const response = await api.delete(`/services/${serviceId}`);
    return response.data;
  }
}

export class BookingsAPI {
  static async getAllBookings() {
    const response = await api.get('/bookings');
    return response.data;
  }

  static async getBookingById(bookingId) {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  }

  static async createBooking(bookingData) {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  }

  static async getClientBookings(clientId) {
    const response = await api.get(`/bookings/client/${clientId}`);
    return response.data;
  }

  static async getProviderBookings(providerId) {
    const response = await api.get(`/bookings/provider/${providerId}`);
    return response.data;
  }

  static async updateBookingStatus(bookingId, status) {
    const response = await api.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  }

  // Public endpoint to update booking status (for handyman dashboard)
  static async updateBookingStatusPublic(bookingId, status, fee, clerkUserId) {
    const response = await api.patch(`/bookings/${bookingId}/status-public`, { status, fee, clerkUserId });
    return response.data;
  }

  // Public endpoint to update booking status (for client dashboard)
  static async updateBookingStatusClient(bookingId, status, clerkUserId) {
    const response = await api.patch(`/bookings/${bookingId}/status-client`, { status, clerkUserId });
    return response.data;
  }

  // General method to update booking data
  static async updateBooking(bookingId, bookingData) {
    const response = await api.put(`/bookings/${bookingId}`, bookingData);
    return response.data;
  }
}

export class AuthAPI {
  static async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

  static async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  static async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  static async refreshToken() {
    const response = await api.post('/auth/refresh');
    return response.data;
  }

  static async verifyToken() {
    const response = await api.get('/auth/verify');
    return response.data;
  }

  static async verifyUserRole(userId) {
    const response = await api.get(`/auth/verify-role/${userId}`);
    return response.data;
  }
}

export class UsersAPI {
  static async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  }

  static async updateProfile(userData) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  }

  static async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export class ReviewsAPI {
  static async getReviews(serviceId) {
    const url = serviceId ? `/reviews?serviceId=${serviceId}` : '/reviews';
    const response = await api.get(url);
    return response.data;
  }

  static async createReview(reviewData) {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  }

  static async updateReview(reviewId, reviewData) {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  }

  static async deleteReview(reviewId) {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  }
}

export class NotificationsAPI {
  static async getNotifications() {
    const response = await api.get('/notifications');
    return response.data;
  }

  static async markAsRead(notificationId) {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  }

  static async markAllAsRead() {
    const response = await api.patch('/notifications/read-all');
    return response.data;
  }

  static async deleteNotification(notificationId) {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  }
}

export class HandymanAPI {
  static async registerHandyman(handymanData) {
    const response = await api.post('/handyman/register', handymanData);
    return response.data;
  }

  static async getHandymanProfile() {
    const response = await api.get('/handyman/profile');
    return response.data;
  }

  static async updateHandymanProfile(profileData) {
    const response = await api.put('/handyman/profile', profileData);
    return response.data;
  }

  static async getAllHandymen() {
    const response = await api.get('/handyman/all');
    return response.data;
  }

  static async getServiceProvidersByServiceId(serviceId) {
    const response = await api.get(`/handyman/service/${serviceId}`);
    return response.data;
  }

  static async getAvailableServices() {
    const response = await api.get('/handyman/services');
    return response.data;
  }

  // Get service provider profile by Clerk userId
  static async getServiceProviderByUserId(userId) {
    const response = await api.get(`/handyman/profile/${userId}`);
    return response.data;
  }

  // Get bookings assigned to a specific service provider
  static async getProviderBookings(providerId) {
    const response = await api.get(`/bookings/provider/${providerId}`);
    return response.data;
  }

  // Get bookings for a service provider using their Clerk userId
  static async getProviderBookingsByClerkUserId(clerkUserId) {
    const response = await api.get(`/bookings/provider-clerk/${clerkUserId}`);
    return response.data;
  }

  // Get bookings for a service provider using their database ID directly
  static async getProviderBookingsByDatabaseId(providerDatabaseId) {
    const response = await api.get(`/bookings/provider-db/${providerDatabaseId}`);
    return response.data;
  }

  static async getUserChats(userId, userType) {
    const response = await api.get(`/chat/user?userId=${userId}&userType=${userType}`);
    return response.data;
  }
}

export class ClientAPI {
  static async createClient(clientData) {
    const response = await api.post('/clients', clientData);
    return response.data;
  }

  static async getClientByUserId(userId) {
    const response = await api.get(`/clients/${userId}`);
    return response.data;
  }

  static async updateClientProfile(userId, profileData) {
    const response = await api.put(`/clients/${userId}`, profileData);
    return response.data;
  }

  static async getAllClients() {
    const response = await api.get('/clients');
    return response.data;
  }

  static async getUserChats(userId, userType) {
    const response = await api.get(`/chat/user?userId=${userId}&userType=${userType}`);
    return response.data;
  }

  // Check if user is registered as handyman using Clerk metadata
  static isUserHandyman(user) {
    try {
      // Try different ways to access metadata
      const publicMetadata = user?.publicMetadata;
      const unsafeMetadata = user?.unsafeMetadata;
      
      // Check if user has handyman metadata - try both locations
      const userType = publicMetadata?.userType || unsafeMetadata?.userType;
      const isHandyman = publicMetadata?.isHandyman || unsafeMetadata?.isHandyman;
      
      return userType === 'handyman' && isHandyman === true;
    } catch (error) {
      // If check fails, user is not a handyman
      return false;
    }
  }
}

export class ChatAPI {
  // Get chat messages for a specific booking
  static async getChatMessages(bookingId) {
    const response = await api.get(`/chat/${bookingId}/messages`);
    return response.data;
  }

  // Send a message via API (fallback when WebSocket is not available)
  static async sendMessage(data) {
    const response = await api.post('/chat/send', data);
    return response.data;
  }

  // Get all chats for a user
  static async getUserChats(userId, userType) {
    const response = await api.get(`/chat/user?userId=${userId}&userType=${userType}`);
    return response.data;
  }

  // Mark messages as read
  static async markMessagesAsRead(bookingId, userId, userType) {
    const response = await api.post(`/chat/${bookingId}/mark-read`, {
      userId,
      userType
    });
    return response.data;
  }
}

export class StripeAPI {
  // Create a Stripe Express account for a service provider
  static async createProviderAccount(userId) {
    const response = await api.post('/stripe/create-provider-account', { userId });
    return response.data;
  }

  // Get provider's Stripe account status
  static async getProviderAccountStatus(userId) {
    const response = await api.get(`/stripe/provider-account/${userId}`);
    return response.data;
  }

  // Create a checkout session for a booking
  static async createCheckoutSession(bookingId) {
    const response = await api.post('/stripe/create-checkout-session', { bookingId });
    return response.data;
  }

  // Get payment details by booking ID
  static async getPaymentByBookingId(bookingId) {
    const response = await api.get(`/stripe/payment/booking/${bookingId}`);
    return response.data;
  }

  // Get all payments for current provider (handyman)
  static async getMyPayments() {
    const response = await api.get('/stripe/payments/my');
    return response.data;
  }

  // Create a refund for a payment
  static async createRefund(paymentId, amount, reason) {
    const response = await api.post(`/stripe/refund/${paymentId}`, { amount, reason });
    return response.data;
  }
}

export class ReviewAPI {
  static async createReview(reviewData) {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  }

  static async getProviderReviews(providerId) {
    const response = await api.get(`/reviews/provider/${providerId}`);
    return response.data;
  }

  static async getBookingReview(bookingId) {
    const response = await api.get(`/reviews/booking/${bookingId}`);
    return response.data;
  }
}

// Export the main api instance for custom requests
export { api };
export default api;

// Export types for better TypeScript support
export class CallAPI {
  /**
   * Get access token for Twilio voice calls
   */
  static async getAccessToken(userType) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await api.get('/calls/token', {
      params: { userType },
      headers: {
        'X-User-ID': user.id,
        'X-User-Type': userType || 'user',
      },
    });
    return response.data;
  }

  /**
   * Get contact information for the other party in a booking
   */
  static async getContactNumber(bookingId, userType) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await api.get(`/calls/contact/${bookingId}`, {
      headers: {
        'X-User-ID': user.id,
        'X-User-Type': userType,
      },
    });
    return response.data;
  }

  /**
   * Initiate a call
   */
  static async initiateCall(bookingId, userType) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await api.post('/calls/initiate', {
      bookingId,
    }, {
      headers: {
        'X-User-ID': user.id,
        'X-User-Type': userType,
      },
    });
    return response.data;
  }

  /**
   * Get call history for a booking
   */
  static async getCallHistory(bookingId, userType) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await api.get(`/calls/history/${bookingId}`, {
      headers: {
        'X-User-ID': user.id,
        'X-User-Type': userType,
      },
    });
    return response.data;
  }

  /**
   * Helper to get current user (from Clerk)
   * This is handled by the components using useUser hook
   */
  static async getCurrentUser() {
    return null; // Components will pass user info in headers
  }
}

