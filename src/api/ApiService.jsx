import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const ApiService = {
  registerUser: async (data, token) => {
    try {
      await axios.post(
        `${BASE_URL}/register`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getUsers: async () => {
    try {
      return await axios.get(`${BASE_URL}/users`);
    } catch (error) {
      throw new Error(error);
    }
  },
  createRequest: async (data, token) => {
    try {
      await axios.post(
        `${BASE_URL}/create`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchNotifications: async (userId) => {
    try {
      return await axios.get(`${BASE_URL}/notification/${userId}`);
    } catch (error) {}
  },
  updateFcm: async (userId, token) => {
    try {
      return await axios.put(`${BASE_URL}/fcm`, {
        uid: userId,
        fcmToken: token,
      });
    } catch (error) {}
  },
  fetchRequest: async (userId) => {
    return await axios.get(`${BASE_URL}/user/requests/${userId}`);
  },
  fetchUserRequests: async () => {
    try {
      return await axios.get(`${BASE_URL}/requests`);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }
      throw new Error(error.message);
    }
  },
  createResponse: async (requestId, status) => {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  completeRequest: async (requestId, status, data) => {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status: status,
        data: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  readNotification: async (notificationId) => {
    try {
      await axios.put(`${BASE_URL}/notification/${notificationId}`);
    } catch (error) {}
  },
};

export default ApiService;
