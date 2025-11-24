import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // TODO: Implement login logic with API
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(18, 24, 106, 0.1) 0%, rgba(10, 88, 147, 0.1) 100%)",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "450px",
            width: "100%",
            position: "relative",
          }}
        >
          <BsArrowLeftCircleFill
            onClick={() => navigate("/")}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              fontSize: "32px",
              cursor: "pointer",
              color: "#1976d2",
            }}
          />

          <h1
            style={{
              color: "#333",
              textAlign: "center",
              marginBottom: 3,
              fontSize: "2rem",
              marginTop: 4,
            }}
          >
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", marginBottom: "8px", color: "#555" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", marginBottom: "8px", color: "#555" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ padding: "12px", marginTop: "10px" }}
            >
              Login
            </Button>

            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#666",
              }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
