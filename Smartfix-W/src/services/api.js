const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchWithTimeout = async (url, options = {}, timeout = 20000) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The server took too long to respond. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const readResponse = async (response) => {
  const responseText = await response.text();
  try {
    return responseText ? JSON.parse(responseText) : {};
  } catch {
    return {
      message: response.ok
        ? "The server returned an invalid response"
        : `Request failed with status ${response.status}`,
    };
  }
};



const getAuthHeaders = () => {
  const token = localStorage.getItem("smartfix_auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Authentication: checks backend database, with safe development fallback
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }
      if (data.token) {
        localStorage.setItem("smartfix_auth_token", data.token);
        localStorage.setItem("smartfix_auth_user", JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      // If backend is not running or network failed, allow default admin credentials
      if (
        err.message.includes("fetch") ||
        err.message.includes("Network") ||
        err.message.includes("Failed to fetch") ||
        err.name === "TypeError"
      ) {
        if (
          email.trim().toLowerCase() === "admin@smartfixautomation.com" &&
          password === "admin123"
        ) {
          const fallbackData = {
            token: "smartfix_local_jwt_token_2026",
            user: {
              id: "admin-default-id",
              name: "Admin",
              email: "admin@smartfixautomation.com",
              role: "admin"
            }
          };
          localStorage.setItem("smartfix_auth_token", fallbackData.token);
          localStorage.setItem("smartfix_auth_user", JSON.stringify(fallbackData.user));
          return fallbackData;
        } else {
          throw new Error("Invalid email or password");
        }
      }
      throw err;
    }
  },

  logout() {
    localStorage.removeItem("smartfix_auth_token");
    localStorage.removeItem("smartfix_auth_user");
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem("smartfix_auth_user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("smartfix_auth_token"));
  },

  // Public Blogs
  async getPublicBlogs() {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      if (data.blogs && data.blogs.length > 0) {
        return data.blogs;
      }
      return FALLBACK_BLOGS;
    } catch (err) {
      return FALLBACK_BLOGS;
    }
  },

  async getBlogBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.blog) return data.blog;
      }
    } catch (err) {}
    const found = FALLBACK_BLOGS.find((b) => b.slug === slug);
    if (found) return found;
    throw new Error("Blog post not found");
  },

  // Admin Blogs
  async getAdminBlogs() {
    try {
      const res = await fetch(`${API_BASE}/blogs/admin/all`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Failed to fetch admin blogs");
      const data = await res.json();
      return data.blogs || [];
    } catch (err) {
      return FALLBACK_BLOGS;
    }
  },

  async createBlog(blogData) {
    const res = await fetchWithTimeout(`${API_BASE}/blogs`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    const data = await readResponse(res);
    if (!res.ok) {
      throw new Error(data.message || "Failed to create blog");
    }
    return data;
  },

  async updateBlog(id, blogData) {
    const res = await fetchWithTimeout(`${API_BASE}/blogs/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    const data = await readResponse(res);
    if (!res.ok) {
      throw new Error(data.message || "Failed to update blog");
    }
    return data;
  },

  async deleteBlog(id) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete blog");
    }
    return data;
  }
};
