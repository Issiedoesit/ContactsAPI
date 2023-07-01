import React, { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Template from '../elements/Templates/Template'
import { LuMailPlus, LuPhoneCall} from 'react-icons/lu'
import ModalWrap from '../elements/Modal/ModalWrap'
import AddContactModal from './Modals/AddContactModal'

const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetcher = async (url) => axios.get(url)

    const {data, error} = useSWR(`${import.meta.env.VITE_BASE_URL}/`, fetcher)

    if (!data) return <div className='text-white h-screen flex items-center justify-center'>Loading ...</div>

    console.log(data);

  return (
    <Template handleAddContact={()=>setIsModalOpen(true)}>
        <div className='text-white'>
            <h2 className={`text-xl font-bold`}>All Contacts</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 py-10`}>
                {data && data.data.contacts.length > 0 && data.data.contacts.map((contact, idx)=>{
                    return <div key={idx} className={`bg-white px-4 py-4 rounded-lg col-span-1 drop-shadow-md`}>
                        <div><img src={contact.dp} alt={contact.name} className={`w-40`} /></div>
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
                    </div>
                })}
            </div>
        </div>
        <ModalWrap id={`addContactModal`} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
            <AddContactModal />
        </ModalWrap>
    </Template>
  )
}

export default Home