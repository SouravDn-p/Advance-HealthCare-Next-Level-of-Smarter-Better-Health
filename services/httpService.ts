// Note: This service is not currently used in the application as we're using RTK Query for API calls
// This is kept for reference but may need to be updated to work with Redux state if needed

class HttpService {
  private baseUrl: string;
  private refreshTokenPromise: Promise<string | null> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // In a real implementation, you would get the access token from Redux store
  // For now, this is a placeholder that returns null
  private getAccessToken(): string | null {
    // This would need to be implemented to get the token from Redux state
    // For example, using a store accessor or by passing the token as a parameter
    return null;
  }

  // Refresh token - placeholder implementation
  private async refreshAccessToken(): Promise<string | null> {
    // In a real implementation, you would use RTK Query mutations or direct API calls
    // to refresh the token using the refresh token from Redux state
    return null;
  }

  // Make an authenticated request
  async authenticatedRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const accessToken = this.getAccessToken();
    
    // Add authorization header
    const headers = new Headers(options.headers);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    
    const config: RequestInit = {
      ...options,
      headers,
    };

    let response = await fetch(`${this.baseUrl}${endpoint}`, config);

    // If unauthorized, try to refresh token
    if (response.status === 401) {
      // Prevent multiple concurrent refresh requests
      if (!this.refreshTokenPromise) {
        this.refreshTokenPromise = this.refreshAccessToken();
      }
      
      const newAccessToken = await this.refreshTokenPromise;
      this.refreshTokenPromise = null;
      
      if (newAccessToken) {
        // Retry the request with the new token
        const retryHeaders = new Headers(options.headers);
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
        
        const retryConfig: RequestInit = {
          ...options,
          headers: retryHeaders,
        };
        
        response = await fetch(`${this.baseUrl}${endpoint}`, retryConfig);
      }
    }

    return response;
  }

  // GET request
  async get(endpoint: string, options: RequestInit = {}): Promise<Response> {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "GET",
    });
  }

  // POST request
  async post(
    endpoint: string,
    data: any,
    options: RequestInit = {}
  ): Promise<Response> {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(
    endpoint: string,
    data: any,
    options: RequestInit = {}
  ): Promise<Response> {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint: string, options: RequestInit = {}): Promise<Response> {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
export default new HttpService(API_BASE_URL);