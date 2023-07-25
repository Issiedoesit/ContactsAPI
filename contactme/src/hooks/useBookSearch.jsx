import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useBookSearch = (query, pageNumber) => {

    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: "GET",
            url: "https://openlibrary.org/search.json",
            params: { q:query, page:pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then((res) => {
            console.log(res.data);
            setBooks((prevBooks)=>{
                return [...new Set([...prevBooks, ...res.data.docs])]
                // return [...new Set([...prevBooks, ...res.data.docs.map(books => books)])]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        })
        .catch((err) => {
            if (axios.isCancel(err)) return
            console.error(err);
            setError(true)
        })

        // console.log("Books => ", books.length > 0 && books);

    
      return () => {
            cancel()
      }
    }, [query, pageNumber])
    

  return {
      books,
      setBooks,
      loading,
      setLoading,
      error,
      setError,
      hasMore,
      setHasMore
  }
}

export default useBookSearch