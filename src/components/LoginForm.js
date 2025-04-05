import React from 'react';
function LoginForm() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" placeholder="Type your username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Type your password" />
      </div>
      <div className="forgot-row">
        <a href="#forgot">Forgot password?</a>
      </div>
      <button type="submit" className="login-btn">LOGIN</button>
    </form>
  );
}

export default LoginForm;
