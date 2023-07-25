import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Template from '../elements/Templates/Template'
import { LuMailPlus, LuPhoneCall, LuTrash} from 'react-icons/lu'
import ModalWrap from '../elements/Modal/ModalWrap'
import AddContactModal from './Modals/AddContactModal'
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal'

const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDelModalOpen, setIsDelModalOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteDetails, setDeleteDetails] = useState({})

    const fetcher = async (url) => axios.get(url)

    const {data, error, mutate} = useSWR(`${import.meta.env.VITE_BASE_URL}/`, fetcher)

    // if (!data) return <Template><div className='text-white h-screen flex items-center justify-center'>Loading ...</div></Template>

    // console.log(data);

    const deleteContact = (contact) => {
        setDeleteDetails({...contact})
        setIsDelModalOpen(true)
    }

    useEffect(() => {
        if(confirmDelete){
            try {
                axios.delete(`${import.meta.env.VITE_BASE_URL}/${deleteDetails._id}`)
                .then((res)=>{
                    // console.log('res => ', res);
                    mutate()
                    // setConfirmDelete(false)
                    setIsDelModalOpen(false)
                    setDeleteDetails({})
                })
                .catch((err) => {
                    console.error('Axios Error => ', err);
                })
            } catch (error) {
                console.log('Catch Error => ', error);
            }
        }
        // console.log(confirmDelete);

    
      return () => {
        setConfirmDelete(false)
      }
    }, [confirmDelete])
    

  return (
    <Template handleAddContact={()=>setIsModalOpen(true)} showNewContact>
        <div className='text-white'>
            <h2 className={`text-xl font-bold`}>All Contacts</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-x-10 gap-y-5 py-10`}>
                {data && data.data.contacts.length > 0 && data.data.contacts.map((contact, idx)=>{
                    return <div key={idx} className={`bg-white px-4 py-4 rounded-lg col-span-1 drop-shadow-md relative`}>
                        <div><img src={contact.dp} alt={contact.name} className={`w-40 aspect-square object-contain`} /></div>
                        <div className='py-5'>
                            <h3 className={`text-slate-950 font-semibold text-lg`}>{contact.name}</h3>

                            <a href={`mailto:${contact.email}`} className={`py-1 flex gap-4 items-center text-slate-950`}>
                                <LuMailPlus />
                                <p>{contact.email}</p>
                            </a>
                            <a href={`tel:${contact.phone}`} className={`py-1 flex gap-4 items-center text-slate-950`}>
                                <LuPhoneCall />
                                <p>{contact.phone}</p>
                            </a>
                        </div>
                        <button type='button' onClick={()=>deleteContact(contact)} title={` delete ${contact._id}`} className={`absolute bottom-4 right-4 z-20`}>
                            <LuTrash className={`text-red-500`} />
                        </button>
                    </div>
                })}
            </div>
        </div>
        <ModalWrap id={`addContactModal`} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
            <AddContactModal mutate={mutate} setIsModalOpen={setIsModalOpen} />
        </ModalWrap>
        <ConfirmDeleteModal id={'confirmDeleteModal'} deleteDetails={deleteDetails} modalState={isDelModalOpen} closeModal={()=>setIsDelModalOpen(false)} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />
    </Template>
  )
}

export default Home