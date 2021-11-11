import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useTest(pageNumber,nameOfChannel) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();
    const [hasMore, setHasMore] = useState(false);
  
    
    useEffect(() => {
        setIsLoading(true)

        axios({
          method: 'GET',
          url: `http://localhost:5000/channels/${nameOfChannel}/allnews`,
          params: { page: pageNumber,limit: 10 },
          
        }).then(res => {
            setData(data => {
            return [...new Set([...data, ...res.data.result])]
          })
          setHasMore(res.data.result.length > 0)
          setIsLoading(false)
        }).catch(e => {
         
          setIsError(true);
          setError(e.response.data)
        })
       
      }, [nameOfChannel, pageNumber])
    
    return {
        isLoading, data, isError, hasMore, error
    }
}

export default useTest
