import React from 'react'
import ModalWrap from '../../elements/Modal/ModalWrap'

const ConfirmDeleteModal = ({id, modalState, closeModal, confirmDelete, setConfirmDelete, deleteDetails}) => {
  return (
    <ModalWrap id={id} modalState={modalState} handleModal={closeModal}>
        <div className={`bg-white m-auto relative rounded-lg py-8 px-5 md:py-8 z-50 w-[95%] max-w-sm h-fit`}>
            <h2 className='text-xl md:text-2xl text-slate-950 font-semibold text-center'>Delete contact</h2>

            <div className={`pt-4`}>
                <p className={`text-slate-950 font-medium text-sm`}>Are you sure you want to delete this contact? 
                <span className={`block pt-2 font-bold`}>{deleteDetails.name}</span></p>
    

                <div className={`pt-6 flex justify-end items-center w-full gap-4`}>
                    <button type='button' onClick={()=>setConfirmDelete(true)} className={`bg-green-500 text-slate-100 disabled:bg-slate-500 rounded-lg px-3 py-1.5 hover:drop-shadow-lg hover:ring-2 hover:ring-green-500 hover:ring-offset-1 transition-all duration-300 ease-in-out  `}>
                        Delete
                    </button>
                    <button type='button' onClick={closeModal} className={`bg-red-500 text-slate-100 disabled:bg-slate-500 rounded-lg px-3 py-1.5 hover:drop-shadow-lg hover:ring-2 hover:ring-red-500 hover:ring-offset-1 transition-all duration-300 ease-in-out  `}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </ModalWrap>
  )
}

export default ConfirmDeleteModal