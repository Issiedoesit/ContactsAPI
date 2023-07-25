import React, { useState, useRef, useCallback } from 'react'
import { BeatLoader } from 'react-spinners'
import useBookSearch from '../../hooks/useBookSearch'
import Template from '../elements/Templates/Template'
import BookPreview from '../../widgets/BookPreview'

const Books = () => {

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {books, loading, error, hasMore} =  useBookSearch(query, pageNumber, setPageNumber)

    
    const observer = useRef()

    const lastBookElement = useCallback(node => {

        // console.log(node);
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
                {books.length == 0 && !query && !loading && !error && <div className={`py-4`}>Enter text to begin searching</div>}
                {books.length == 0 && query && !loading && !error && <div className={`py-4`}>Your search "{query}" returned 0 results</div>}
                {books.length > 0 && books.map((book, idx) => {
                    if(books.length == idx + 1) {
                        return <BookPreview key={idx} ref={lastBookElement} book={book} />
                    }else{
                        return <BookPreview key={idx} book={book} />
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