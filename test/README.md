# Test Files Documentation

## Overview
File test ini dibuat untuk menguji fungsionalitas komponen, halaman, utilities, dan context di project Tourism Recommender System berbasis Next.js.

## Test Structure

### 1. Components Tests
- **DestinationModal.test.jsx**: Test untuk komponen modal detail destinasi
  - Render nama dan lokasi destinasi
  - Menampilkan rating dengan benar
  - Menampilkan category badge
  - Render deskripsi lengkap
  - Menampilkan semua fasilitas
  - Menampilkan jam operasional dan harga
  - Render destinasi serupa
  - Handle null destination

- **Navbar.test.jsx**: Test untuk komponen navigasi
  - Render brand name
  - Render semua navigation links
  - Render login button
  - Toggle mobile menu
  - Accessibility (aria-label)

### 2. Pages Tests
- **HomePage.test.jsx**: Test untuk halaman utama
  - Render page tanpa error
  - Menampilkan heading welcome
  - Link navigasi ke dashboard

- **DestinationsPage.test.jsx**: Test untuk halaman daftar destinasi
  - Render daftar destinasi
  - Search input functionality
  - Category filter buttons
  - Handle search input
  - Open modal saat klik View Details
  - Display ratings
  - Show images

### 3. Utils Tests
- **cosineSimilarity.test.js**: Test untuk utility perhitungan cosine similarity
  - Identical vectors (result = 1)
  - Orthogonal vectors (result = 0)
  - Opposite vectors (result = -1)
  - Different magnitudes
  - Zero vectors
  - Empty vectors

### 4. Context Tests
- **AuthContext.test.jsx**: Test untuk authentication context
  - Default unauthenticated state
  - Context consumption oleh child components

## Running Tests

### Run all tests:
\`\`\`bash
npm test
\`\`\`

### Run tests in watch mode:
\`\`\`bash
npm run test:watch
\`\`\`

### Run specific test file:
\`\`\`bash
npm test -- test/components/DestinationModal.test.jsx
\`\`\`

## Test Coverage
Untuk melihat coverage report, Anda bisa menambahkan script di package.json:
\`\`\`json
"test:coverage": "jest --config=test/test.config.js --coverage"
\`\`\`

## Dependencies
- **jest**: Testing framework
- **@testing-library/react**: React testing utilities
- **@testing-library/jest-dom**: Custom jest matchers
- **jest-environment-jsdom**: DOM environment untuk testing

## Notes
- Semua test menggunakan mocking untuk dependencies eksternal (next/link, components)
- Test fokus pada functionality dan user interaction
- Accessibility testing sudah termasuk (aria-labels, roles)
