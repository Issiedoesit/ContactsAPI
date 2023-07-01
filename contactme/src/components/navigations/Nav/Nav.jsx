import React from 'react'
import { NavLink } from 'react-router-dom'
import NavData from '../../../data/NavData'

const Nav = () => {
  return (
    <nav className='w-full px-3 py-4 bg-white text-slate-950 flex items-center gap-10'>
        <h2 className='font-bold text-2xl'>Contact<span className='font-mono'>me</span></h2>
        <ul className='flex items-center gap-4'>
            {NavData.map((data, idx)=>{
                return  <li key={idx}><NavLink to={data.path} end={data.path == '/'} className={({isActive}) => (isActive ? "bg-slate-950 text-white px-3 py-2 font-medium hover:drop-shadow-md transition-all duration-300 ease-in-out rounded-lg" : "bg-transparent px-3 py-2 font-medium hover:bg-slate-200 hover:drop-shadow-md transition-all duration-300 ease-in-out rounded-lg" )} >{data.name}</NavLink></li>
            })}
        </ul>
    </nav>
  )
}

export default Nav