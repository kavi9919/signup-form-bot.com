function appendMessage(sender, message) {
    const chatlogs = document.getElementById("chatlogs");
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  
    // Check if the sender is the bot and add typing animation
    if (sender === "bot") {
      messageDiv.innerHTML = `<span class="typing-animation"></span>`;
      chatlogs.appendChild(messageDiv);
  
      setTimeout(() => {
        messageDiv.innerHTML = message; 
        chatlogs.scrollTop = chatlogs.scrollHeight;
      }, 800);
    } else {
      messageDiv.textContent = message;
      chatlogs.appendChild(messageDiv);
      chatlogs.scrollTop = chatlogs.scrollHeight;
    }
  }
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^\+94\d{9}$/;
    return phonePattern.test(phoneNumber);
  }
  
  function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput === "") return;
  
    appendMessage("user", userInput);
  
    if (userInput.toLowerCase() === "restart") {
      localStorage.clear();
      document.getElementById("chatlogs").innerHTML = "";
      appendMessage("bot", "Hi there! What's your name?");
      document.getElementById("userInput").value = "";
      return;
    }
  
    if (!localStorage.name) {
      localStorage.name = userInput;
      appendMessage("bot", `Hello, ${userInput}! Please enter your email address.`);
    } else if (!localStorage.email) {
      if (!validateEmail(userInput)) {
        appendMessage("bot", "Oops! Invalid email address. Please enter a valid email.");
      } else {
        localStorage.email = userInput;
        appendMessage("bot", "Great! Now, please enter your phone number in +94XXXXXXXXX format.");
      }
    } else if (!localStorage.phoneNumber) {
      if (!validatePhoneNumber(userInput)) {
        appendMessage("bot", "Oops! Invalid phone number. Please enter a valid phone number in +94XXXXXXXXX format.");
      } else {
        localStorage.phoneNumber = userInput;
        appendMessage("bot", "Thank you! We have received your information. Type 'restart' to start a new conversation.");
      }
    }
  
    document.getElementById("userInput").value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.name) {
      appendMessage("bot", "Hi there! What's your name?");
    } else {
      document.getElementById("chatlogs").innerHTML = "";
      localStorage.clear();
      appendMessage("bot", "Chat has been restarted. Please enter your name.");
    }
  });
  