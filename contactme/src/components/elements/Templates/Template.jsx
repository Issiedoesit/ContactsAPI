import React from 'react'
import Nav from '../../navigations/Nav/Nav'
import PlusButton from '../Buttons/PlusButton'

const Template = ({children, handleAddContact, showNewContact}) => {
  return (
    <div className=' h-full w-full text-white flex flex-col'>
        <Nav />
        <div className='min-h-screen h-full px-8 py-10'>
            {children}
        </div>
        {showNewContact && <PlusButton handleClick={handleAddContact} />}
    </div>
  )
}

export default Template