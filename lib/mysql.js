// lib/mysql.js - MySQL Database Connection
import mysql from 'mysql2/promise'

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_cbf',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// Helper function to execute queries
export async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return { data: results, error: null }
  } catch (error) {
    console.error('Database query error:', error)
    return { data: null, error: error.message }
  }
}

// Helper to get single row
export async function queryOne(sql, params = []) {
  const { data, error } = await query(sql, params)
  if (error) return { data: null, error }
  return { data: data && data.length > 0 ? data[0] : null, error: null }
}

// Helper to generate UUID
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Helper to parse JSON fields safely
export function parseJsonField(field) {
  if (!field) return null
  if (typeof field === 'object') return field
  try {
    return JSON.parse(field)
  } catch {
    return null
  }
}

// Helper to format destination response
export function formatDestination(dest) {
  if (!dest) return null
  return {
    ...dest,
    gallery_images: parseJsonField(dest.gallery_images),
    operating_hours: parseJsonField(dest.operating_hours),
    contact_info: parseJsonField(dest.contact_info),
    facilities: parseJsonField(dest.facilities),
    tags: parseJsonField(dest.tags),
    accessibility_features: parseJsonField(dest.accessibility_features),
  }
}

// Helper to format user preferences
export function formatPreferences(prefs) {
  if (!prefs) return null
  return {
    ...prefs,
    favorite_categories: parseJsonField(prefs.favorite_categories),
    preferred_activities: parseJsonField(prefs.preferred_activities),
    dietary_restrictions: parseJsonField(prefs.dietary_restrictions),
    accessibility_needs: parseJsonField(prefs.accessibility_needs),
    notification_settings: parseJsonField(prefs.notification_settings),
  }
}

export default pool
