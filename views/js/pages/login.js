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
  </form>
  <button type="submit" id="login-button" class="modal-footer">Login</button>
</div>
<script>
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", login);
  document.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      loginButton.click();
    }
  });
</script>
`;
