const registerPage = `
<div id="login-content">
  <h1>Register</h1>
  <div class="error">
    <span class="close-error" onclick="hideErrorMessage(this.parentElement)">&times;</span>
    <strong>Error: </strong>Invalid email or password!
  </div>
  <form id="register-form">
    <label for="register-email">Email</label>
    <input type="text" name="register-email" id="register-email" placeholder="Enter email here..." />
    <label for="register-username">Username</label>
    <input type="text" name="register-username" id="register-username" placeholder="Enter username here..." />
    <label for="register-password">Password</label>
    <input type="password" name="register-password" id="register-password" placeholder="Enter password here..." />
  </form>
  <button type="submit" id="register-button" class="modal-footer">Register</button>
</div>
<script>
  const registerButton = document.getElementById("register-button");
  registerButton.addEventListener("click", register);
  document.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      registerButton.click();
    }
  });
</script>
`;
