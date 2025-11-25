'use client'

import Link from 'next/link'
import { Button } from "@mui/material"
import { BsPersonFill, BsMap } from "react-icons/bs"
import { LuBrain } from "react-icons/lu"

export default function LandingPage() {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <section
          style={{
            padding: "80px 20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <h1
            style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}
          >
            Discover Your Perfect Destination
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "3rem", opacity: 0.9 }}>
            Personalized tourism recommendations based on your preferences
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              sx={{
                padding: "12px 32px",
                bgcolor: "white",
                color: "#667eea",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/destinations"
              variant="outlined"
              sx={{
                padding: "12px 32px",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#f0f0f0",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Explore Now
            </Button>
          </div>
        </section>

        <section
          style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "3rem",
              color: "#333",
            }}
          >
            Why Choose Us?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                padding: "2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                <BsPersonFill />
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                Personalized
              </h3>
              <p style={{ color: "#666", lineHeight: 1.6 }}>
                Get recommendations tailored to your preferences
              </p>
            </div>
            <div
              style={{
                padding: "2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                <BsMap />
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                Interactive Maps
              </h3>
              <p style={{ color: "#666", lineHeight: 1.6 }}>
                Explore destinations with integrated maps
              </p>
            </div>
            <div
              style={{
                padding: "2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                <LuBrain />
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "#667eea",
                }}
              >
                Smart Algorithm
              </h3>
              <p style={{ color: "#666", lineHeight: 1.6 }}>
                Content-based filtering for accurate suggestions
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
