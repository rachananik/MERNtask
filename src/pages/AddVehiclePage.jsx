import React, { useState } from 'react'
import { postVehicle } from '../api'

export default function AddVehiclePage(){
  const [name, setName] = useState('')
  const [capacityKg, setCapacityKg] = useState('')
  const [tyres, setTyres] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e){
    e.preventDefault(); setLoading(true); setMsg('')
    try{ const v = await postVehicle({ name, capacityKg:Number(capacityKg), tyres:Number(tyres) });
      setMsg(`Created vehicle: ${v.name} (#${v._id})`); setName(''); setCapacityKg(''); setTyres('') }
    catch(err){ setMsg(err.message) } finally { setLoading(false) }
  }
  return (<section><h2>Add Vehicle</h2>
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:420 }}>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
      <input placeholder="Capacity (KG)" type="number" value={capacityKg} onChange={e=>setCapacityKg(e.target.value)} required/>
      <input placeholder="Tyres" type="number" value={tyres} onChange={e=>setTyres(e.target.value)} required/>
      <button disabled={loading}>{loading?'Saving...':'Add Vehicle'}</button>
    </form>
    {msg && <p style={{ marginTop:8 }}>{msg}</p>}
  </section>)
}
