const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function postVehicle(payload){ /* ...same as earlier... */ 
  const res = await fetch(`${API_BASE}/api/vehicles`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const data = await res.json(); if(!res.ok) throw new Error(data.message||'Failed to add vehicle'); return data; }
export async function searchAvailable(params){
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/vehicles/available?${q}`);
  const data = await res.json(); if(!res.ok) throw new Error(data.message||'Search failed'); return data; }
export async function createBooking(payload){
  const res = await fetch(`${API_BASE}/api/bookings`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const data = await res.json(); if(!res.ok) throw new Error(data.message||'Booking failed'); return data; }
