document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = ""; 
  
    try {
      const response = await fetch("http://api.olegdubynets.fr/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        messageDiv.textContent = "Login successful!";
        messageDiv.className = "success";
  
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        console.log(data.token);
  
        
        setTimeout(() => {
          window.location.href = "http://olegdubynets.fr/pages/gestion.html"; 
        }, 1000);
      } else {
        const errorData = await response.json();
        messageDiv.textContent = errorData.error || "Login failed!";
        messageDiv.className = "error";
      }
    } catch (error) {
      messageDiv.textContent = "An error occurred. Please try again.";
      messageDiv.className = "error";
      console.error("Error during login:", error);
    }
  });
  