import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", { fullName, email, password, confirmPassword });
    navigate("/login");
  };

  const backgroundStyle = {
    background:
      "linear-gradient(135deg, rgba(18, 24, 106, 0.1) 0%, rgba(10, 88, 147, 0.1) 100%)",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    width: "100%",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Box sx={backgroundStyle}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px",
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

            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: 3, marginTop: 3 }}
            >
              Create Account
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%" }}
            >
              <Typography variant="body2" sx={{ mb: 0.5, color: "#555" }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                size="small"
                sx={{ mt: 0, mb: 2 }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, color: "#555" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
                sx={{ mt: 0, mb: 2 }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, color: "#555" }}>
                Password
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="small"
                sx={{ mt: 0, mb: 2 }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, color: "#555" }}>
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                size="small"
                sx={{ mt: 0, mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  padding: "12px",
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                Register
              </Button>

              <Box sx={{ marginTop: 2 }}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Already have an account?{" "}
                  <Link
                    component="a"
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                    sx={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    Login here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default RegisterPage;
