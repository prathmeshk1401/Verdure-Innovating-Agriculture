// Simple test script to verify backend is working
const API_BASE = "http://localhost:5000";

async function testBackend() {
    try {
        console.log("Testing backend connection...");
        
        // Test basic connection
        const healthRes = await fetch(`${API_BASE}/`);
        const healthText = await healthRes.text();
        console.log("Health check:", healthText);
        
        // Test signup endpoint
        const signupData = {
            username: "Test User",
            email: "test@example.com",
            password: "test123"
        };
        
        console.log("Testing signup endpoint...");
        const signupRes = await fetch(`${API_BASE}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupData),
        });
        
        console.log("Signup response status:", signupRes.status);
        const signupResult = await signupRes.json();
        console.log("Signup response:", signupResult);
        
    } catch (error) {
        console.error("Backend test failed:", error);
    }
}

testBackend();
