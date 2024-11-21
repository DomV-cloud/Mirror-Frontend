import { useState } from "react";
import { useAuth } from "../../Components/Hooks/useAuth";

function LoginPage() {
  const { login, error, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e : any) => {
    e.preventDefault();
    await login(email, password);
  };

  if (user) {
    return <div>Welcome, {user.firstName} {user.lastName}!</div>;
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginPage;
