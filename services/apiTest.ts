// Simple API test function
export async function testLoginAPI() {
  try {
    const response = await fetch("YOUR_API_BASE_URL/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "advance@gmail.com",
        password: "123456"
      }),
    });
    
    const data = await response.json();
    console.log("Login API Response:", data);
    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    return null;
  }
}