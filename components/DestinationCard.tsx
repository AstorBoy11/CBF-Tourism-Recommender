'use client';

import { Star, MapPin, Clock } from 'lucide-react';

interface Destination {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string;  // comma-separated
  lokasi: string;
  rating: number;
  harga: number;
  durasi: number;
  fasilitas: string;  // comma-separated
  imageUrl?: string;
  score?: number;
  tags?: string;  // comma-separated
}

interface DestinationCardProps {
  destination: Destination;
  onClick: () => void;
  matchScore?: number;
}

export const DestinationCard = ({ destination, onClick, matchScore }: DestinationCardProps) => (
  <div 
    onClick={onClick} 
    className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="relative h-40 sm:h-48 bg-slate-200 overflow-hidden">
      {destination.imageUrl ? (
        <img 
          src={destination.imageUrl} 
          alt={destination.nama} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
          <MapPin className="text-slate-400" size={48} />
        </div>
      )}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
        <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm text-slate-800">
          {destination.kategori[0] || 'Destinasi'}
        </span>
        {matchScore !== undefined && matchScore > 0 && (
          <span className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${
            matchScore > 80 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {matchScore}% Match
          </span>
        )}
      </div>
    </div>
    <div className="p-3 sm:p-4 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {destination.nama}
        </h3>
        <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
          <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
          {destination.rating.toFixed(1)}
        </div>
      </div>
      <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 flex-1">{destination.deskripsi}</p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {destination.kategori.split(',').slice(0, 3).map((kat, idx) => (
          <span key={idx} className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-full">
            #{kat.trim()}
          </span>
        ))}
      </div>
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 flex justify-between text-[10px] sm:text-xs text-slate-500">
        <span className="truncate flex items-center gap-1"><MapPin size={12} /> {destination.lokasi}</span>
        <span className="shrink-0 ml-2 flex items-center gap-1"><Clock size={12} /> {destination.durasi}h</span>
      </div>
    </div>
  </div>
);
