const API_BASE = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "http://localhost:5000/api";

export const FALLBACK_BLOGS = [
  {
    _id: "sample-1",
    title: "Migrating Legacy PLC-5 and SLC 500 to ControlLogix Systems",
    slug: "migrating-legacy-plc-5-to-controllogix",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    content: `### Overview of Legacy PLC Modernization

As industrial automation evolves, legacy control platforms such as Allen-Bradley PLC-5 and SLC 500 face obsolescence, scarcity of spare parts, and lack of modern networking interfaces like EtherNet/IP. Modernizing your manufacturing plant with Rockwell Automation ControlLogix and CompactLogix provides unprecedented processing speed, scalable I/O, integrated motion, and robust cybersecurity.

---

### Key Advantages of Migration

1. **Enhanced Throughput & Performance:**
   Modern PACs execute logic loops and motion trajectories significantly faster, improving line speeds and cycle consistency.

2. **Native EtherNet/IP Connectivity:**
   Eliminate outdated Data Highway Plus (DH+) and Remote I/O networks with high-speed Gigabit industrial Ethernet.

3. **Integrated Safety (GuardLogix):**
   Combine machine control and functional safety (SIL 2 / SIL 3) into a single unified controller architecture.

4. **Streamlined Diagnostics:**
   Advanced tag-based structures and Studio 5000 environment reduce downtime during faults.

---

### Best Practices for Seamless Execution

- **Phased I/O Conversion:** Use 1492 conversion wiring systems to retain existing field wiring while upgrading the rack and controller.
- **Tag Aliasing & Structuring:** Modernize addresses into descriptive User Defined Data Types (UDTs).
- **Comprehensive Factory Acceptance Testing (FAT):** Simulate operations with digital twins before physical cutover.

Contact Smartfix Automation for turnkey migration consultation, panel rewiring, and on-site commissioning across India.`,
    published: true,
    author: { name: "Smartfix Engineering Team" },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Rockwell Automation",
    readTime: "4 min read"
  },
  {
    _id: "sample-2",
    title: "Implementing TIA Portal & Siemens S7-1500 for Fast-Moving Packaging Lines",
    slug: "siemens-s7-1500-tia-portal-packaging-automation",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    content: `### High-Performance Packaging Automation

In fast-paced packaging, bottling, and material handling plants, microsecond synchronization across multi-axis servo drives and optical inspection cameras is critical to eliminating bottlenecks.

Siemens SIMATIC S7-1500 PLCs combined with SINAMICS S120 drives and TIA Portal V18+ offer the ultimate engineering platform for high-speed motion control.

---

### Core Technology Stack

- **PROFINET IRT (Isochronous Real-Time):** Deterministic sub-millisecond communication between PLC and servo drives.
- **SIMOTICS S-1FK7 / 1FT7 Servomotors:** Ultra-dynamic response for cartoners, form-fill-seal, and pick-and-place robots.
- **PackML / OMAC Standard:** Standardized state models (Starting, Execute, Holding, Aborting) simplifying operator training and MES integration.

---

### How Smartfix Delivers Value

Smartfix Automation specializes in custom motion profiles, electronic camming, synchronized gearing, and WinCC Comfort Panel HMI development to optimize your packaging line uptime.`,
    published: true,
    author: { name: "Smartfix Automation Team" },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Siemens Integration",
    readTime: "5 min read"
  },
  {
    _id: "sample-3",
    title: "Essential Guidelines for Industrial Machine Safety: SIL 2 / SIL 3 and Cat 4 Architecture",
    slug: "industrial-machine-safety-sil2-sil3-cat4-guide",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    content: `### Prioritizing Personnel Safety & Compliance

Modern industrial safety is no longer about isolated emergency stop buttons wired directly to power contactors. Standards like ISO 13849-1 and IEC 62061 mandate Performance Levels (PL) and Safety Integrity Levels (SIL) based on hazard risk assessments.

---

### Integrated Safety Controllers vs. Hardwired Relays

Traditional safety relays become cumbersome as machine complexity grows. Integrated safety controllers like **GuardLogix** and **Siemens Fail-Safe S7-1500F**:

- Allow safety code and standard automation logic to run in the same chassis with partitioned safety task memory.
- Offer safety over network via CIP Safety and PROFIsafe.
- Dramatically reduce panel space and multi-conductor safety wiring.
- Provide descriptive safety fault diagnostics directly to the HMI screen.

Smartfix Automation performs full safety loop audits, electrical wiring compliance checks, and validation testing for manufacturing plants.`,
    published: true,
    author: { name: "Safety Systems Specialist" },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Machine Safety",
    readTime: "6 min read"
  }
];

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
    const res = await fetch(`${API_BASE}/blogs`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to create blog");
    }
    return data;
  },

  async updateBlog(id, blogData) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    const data = await res.json();
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
