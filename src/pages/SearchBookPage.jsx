import React, { useState } from 'react'
import { searchAvailable, createBooking } from '../api'

export default function SearchBookPage(){
  const [capacityRequired, setCapacityRequired] = useState('')
  const [fromPincode, setFromPincode] = useState('')
  const [toPincode, setToPincode] = useState('')
  const [startTime, setStartTime] = useState('')
  const [results, setResults] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function search(e){
    e.preventDefault(); setLoading(True=false); setMsg(''); setResults(null)
    setLoading(true)
    try{
      const data = await searchAvailable({ capacityRequired, fromPincode, toPincode, startTime })
      setResults(data); if(!data.vehicles.length) setMsg('No vehicles available for this window.')
    }catch(err){ setMsg(err.message) } finally { setLoading(false) }
  }

  async function book(vehicleId){
    setMsg('')
    try{
      const booking = await createBooking({ vehicleId, fromPincode, toPincode, startTime, customerId:'DEMO-CUSTOMER-1' })
      setMsg(`✅ Booking confirmed: #${booking._id}`)
    }catch(err){ setMsg(`❌ ${err.message}`) }
  }

  return (<section><h2>Search & Book</h2>
    <form onSubmit={search} style={{ display:'grid', gap:8, maxWidth:520 }}>
      <input placeholder="Capacity Required (KG)" type="number" value={capacityRequired} onChange={e=>setCapacityRequired(e.target.value)} required/>
      <input placeholder="From Pincode" value={fromPincode} onChange={e=>setFromPincode(e.target.value)} required/>
      <input placeholder="To Pincode" value={toPincode} onChange={e=>setToPincode(e.target.value)} required/>
      <input placeholder="Start Date & Time (ISO)" value={startTime} onChange={e=>setStartTime(e.target.value)} required/>
      <button disabled={loading}>{loading?'Searching...':'Search Availability'}</button>
    </form>
    {msg && <p style={{ marginTop:8 }}>{msg}</p>}
    {results && (<div style={{ marginTop:16 }}>
      <p>Estimated Ride Duration (hours): <b>{results.estimatedRideDurationHours}</b></p>
      <ul style={{ listStyle:'none', padding:0, display:'grid', gap:8 }}>
        {results.vehicles.map(v => (
          <li key={v._id} style={{ border:'1px solid #ddd', borderRadius:8, padding:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div><b>{v.name}</b></div>
                <div>Capacity: {v.capacityKg} kg</div>
                <div>Tyres: {v.tyres}</div>
              </div>
              <button onClick={()=>book(v._id)}>Book Now</button>
            </div>
          </li>
        ))}
      </ul>
    </div>)}
  </section>)
}
