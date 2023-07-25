import React, { useState, useRef, useCallback } from 'react'
import { BeatLoader } from 'react-spinners'
import useBookSearch from '../../hooks/useBookSearch'
import Template from '../elements/Templates/Template'
import {PiSmileyXEyesFill} from 'react-icons/pi'

const Books = () => {

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {books, loading, error, hasMore} =  useBookSearch(query, pageNumber)

    
    const observer = useRef()

    const lastBookElement = useCallback(node => {

        if(loading) return
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {

            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })

        if(node) observer.current.observe(node)
    }, [loading, hasMore])


  return (
    <Template>
        <input type="search" name="books" id="books" className={`text-slate-950 w-full py-2 px-4`} value={query} onChange={(e) => setQuery(e.target.value)} />

        <div className='py-4 text-white'>
            <div className="flex flex-col gap-4">
                {books.length > 0 && books.map((book, idx) => {
                    if(books.length == idx + 1) {
                        return <div key={idx} ref={lastBookElement} className={`py-2 hover:bg-gray-500`} >{book.title}</div>
                    }else{
                        return <div key={idx} className={`py-2 hover:bg-gray-500 flex gap-4`} >
                            {book.isbn && book.isbn.length > 0 ? <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`} alt={book.title} className={`bg-slate-500 w-14 h-20 border-b-8 border-b-blue-500`} /> : <div className={`bg-slate-500 w-14 h-20 border-b-8 border-b-blue-500 flex items-center justify-center`}><PiSmileyXEyesFill color={'yellow'} /></div>}
                            {book.title}
                        </div>
                    }
                })}
            </div>
            {loading && <div><BeatLoader color='white' /></div>}
            {error && <div>Error</div>}
        </div>
    </Template>
  )
}

export default Books