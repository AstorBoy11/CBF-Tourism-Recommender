'use client'

import { useState } from 'react'
import { FaStar, FaTimes, FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa'

export default function DestinationModal({ destination, onClose }) {
  if (!destination) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <FaTimes className="text-gray-600 text-xl" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{destination.name}</h2>
            <div className="flex items-center gap-2 text-white mt-2">
              <FaMapMarkerAlt />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Rating & Category */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="font-bold text-lg">{destination.rating}</span>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {destination.category}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Tentang Destinasi</h3>
            <p className="text-gray-700 leading-relaxed">{destination.description}</p>
          </div>

          {/* Facilities */}
          {destination.facilities && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Fasilitas</h3>
              <ul className="grid grid-cols-2 gap-2">
                {destination.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Operating Hours & Price */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {destination.operatingHours && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-blue-500 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Jam Operasional</h4>
                  <p className="text-gray-700">{destination.operatingHours}</p>
                </div>
              </div>
            )}
            {destination.price && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FaTicketAlt className="text-blue-500 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Harga Tiket</h4>
                  <p className="text-gray-700">{destination.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Google Maps */}
          {destination.latitude && destination.longitude && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Lokasi di Peta</h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${destination.latitude},${destination.longitude}&zoom=15`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Similar Recommendations */}
          {destination.similar && destination.similar.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Destinasi Serupa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {destination.similar.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <FaStar />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
