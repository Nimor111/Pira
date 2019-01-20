const loginPage = `
<div id="login-content">
  <h1>Login</h1>
  <div class="error">
    <span class="close-error" onclick="hideErrorMessage(this.parentElement)">&times;</span>
    <strong>Error: </strong>Invalid email or password!
  </div>
  <form id="login-form">
    <label for="login-email">Email</label>
    <input type="text" name="login-email" id="login-email" placeholder="Enter email here..." />
    <label for="login-password">Password</label>
    <input type="password" name="login-password" id="login-password" placeholder="Enter password here..." />
    <button type="submit" id="login-button" class="modal-footer">Login</button>
  </form>
</div>
<script>
  const loginButton = document.getElementById("login-form");
  loginButton.addEventListener("submit", event => {
    event.preventDefault();
    login();
  });
</script>
`;
