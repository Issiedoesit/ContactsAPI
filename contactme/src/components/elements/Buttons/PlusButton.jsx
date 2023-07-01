import React from 'react'
import {LuEdit} from 'react-icons/lu'

const PlusButton = ({id, handleClick}) => {
  return (
    <button id={"plusButton"} className={`fixed bottom-5 right-4 flex items-center gap-3 bg-white px-3 py-3 rounded-lg drop-shadow-lg text-slate-950 font-semibold`}>
        <LuEdit />
        New Contact
    </button>
  )
}

export default PlusButton