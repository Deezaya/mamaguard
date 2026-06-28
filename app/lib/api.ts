/**
 * MamaGuard API Utility
 * Handles communication with the backend service.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://mamaguard.onrender.com";

class ApiService {
  private overrideToken: string | null = null;

  /**
   * Set an override token (useful when token from context differs from localStorage)
   */
  setToken(token: string | null) {
    this.overrideToken = token;
  }

  /**
   * Helper for fetch requests with automatic JSON handling and Auth headers.
   */
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Get token - prioritize override token from context, then fallback to localStorage
    let token = this.overrideToken;
    
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("mamaguard_token");
    }

    // Debug logging
    if (!token) {
      console.warn(`[API] No token found for endpoint: ${endpoint}`);
    } else {
      console.log(`[API] Token found (length: ${token.length}), calling: ${endpoint}`);
      console.log(`[API] Using ${this.overrideToken ? "context" : "localStorage"} token`);
    }

    const headers: any = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Always add Bearer token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      console.log(`[API] Full Authorization header: ${headers["Authorization"].substring(0, 80)}...`);
    }

    console.log(`[API] Request to ${endpoint} with Authorization header:`, !!headers["Authorization"]);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if the response is actually JSON before parsing
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON API Response:", text);
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      console.error("API Error Response Data:", data);

      // Handle the case where the server returns a 500 or 404 with no detail
      if (!data) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // If 'detail' is an array of validation errors (standard FastAPI/Pydantic format)
      if (Array.isArray(data.detail)) {
        const messages = data.detail.map((err: any) => {
          const loc = err.loc ? err.loc.join(".") : "unknown";
          return `${loc}: ${err.msg}`;
        });
        throw new Error(messages.join(" | "));
      }

      // If 'detail' is an object (standard FastAPI detail format)
      if (typeof data.detail === "object" && data.detail !== null) {
        throw new Error(JSON.stringify(data.detail));
      }

      throw new Error(data.detail || data.message || "Something went wrong");
    }

    return data;
  }

  // Health Check
  async health() {
    return this.request("/health");
  }

  async healthCheck() {
    return this.request("/");
  }

  // Authentication
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    name: string;
    phone: string;
    password: string;
    gestational_history?: object;
    known_risk_factors?: object;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
  }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request("/auth/me");
  }

  // Video Analysis (NEW APPROACH - replaces streaming)
  async analyzeVideo(videoBlob: Blob) {
    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(videoBlob);
      reader.onload = async () => {
        try {
          // Extract base64 part (remove "data:video/mp4;base64," prefix)
          const base64Video = (reader.result as string).split(",")[1];
          
          console.log(`[API] Uploading video (${base64Video.length} bytes base64)`);

          const result = await this.request("/api/vitallens/analyze-video", {
            method: "POST",
            body: JSON.stringify({
              video: base64Video,
              format: "mp4",
            }),
          });

          console.log("[API] Video analysis complete:", result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
    });
  }

  // Streaming & Vitals (DEPRECATED - kept for reference only)
  async startStreaming(options = { process_signals: true, model: "pos" }) {
    return this.request("/api/vitallens/stream/start", {
      method: "POST",
      body: JSON.stringify(options),
    });
  }

  async processFrame(sessionId: string, frameBase64: string, timestamp: number) {
    return this.request("/api/vitallens/stream/process-frame", {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        frame: frameBase64,
        timestamp: timestamp,
      }),
    });
  }

  async stopStreaming(sessionId: string) {
    return this.request("/api/vitallens/stream/stop", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId }),
    });
  }

  async getStreamStatus(sessionId: string) {
    return this.request(`/api/vitallens/stream/status/${sessionId}`);
  }

  // Checklist & Risk Assessment
  async submitDangerSigns(sessionId: string, responses: any) {
    return this.request(`/api/scans/${sessionId}/checklist`, {
      method: "POST",
      body: JSON.stringify(responses),
    });
  }

  async getRiskAssessment(sessionId: string) {
    return this.request(`/api/scans/${sessionId}/risk-score`);
  }

  async getScanSummary(sessionId: string) {
    return this.request(`/api/scans/${sessionId}/summary`);
  }

  async getAllScans() {
    return this.request("/api/scans");
  }

  // Hospitals & Care Providers
  async findHospitals(latitude: number, longitude: number, radiusMeters: number = 5000) {
    return this.request(
      `/hospitals/nearby?lat=${latitude}&lon=${longitude}&radius=${radiusMeters}`
    );
  }
}

export const api = new ApiService();
