const API_URL = import.meta.env.VITE_API_URL;

const api = {
  // ==================== AUTH ====================

  auth: {
    signup: (data) =>
      fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }),

    login: (data) =>
      fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }),

    me: () =>
      fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      }),

    logout: () =>
      fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      }),
  },

  // ==================== TASKS ====================

  tasks: {
    get: () =>
      fetch(`${API_URL}/tasks`, {
        method: "GET",
        credentials: "include",
      }),

    create: (data) =>
      fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }),

    delete: (id) =>
      fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      }),
  },
};

export default api;

