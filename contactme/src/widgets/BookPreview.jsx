import React, { forwardRef } from 'react'
import {PiSmileyXEyesFill} from 'react-icons/pi'


const BookPreview = ({ book, ...props }, ref) => {
    return (
        <div {...props} ref={ref}  className={`py-2 hover:bg-gray-500 flex gap-4 cursor-pointer`} >
            {book.isbn && book.isbn.length > 0 ? <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`} alt={book.title} className={`bg-slate-500 w-14 h-20 border-b-8 border-b-blue-500`} /> : <div className={`bg-slate-500 w-14 h-20 border-b-8 border-b-blue-500 flex items-center justify-center`}><PiSmileyXEyesFill color={'yellow'} /></div>}
            {book.title}
        </div>
    )
}

export default forwardRef(BookPreview)