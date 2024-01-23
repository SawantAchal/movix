import React, { useEffect, useState } from 'react'
import './SearchResult.scss'
import { useParams } from 'react-router-dom';
import {fetchDataFromApi} from '../../utils/api.js'
import Spinner from '../../Components/spinner/Spinner.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../Components/movieCard/MovieCard.jsx';
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper.jsx'

const SearchResult = () => {
  const [data , setData] = useState(null)
  const [pageNum , setPageNum] = useState(1)
  const [loading , setLoading] = useState(false)
  const {query} = useParams()

  //to fetch data using api
  const fetchInitialData = () =>{
    setLoading(true)
    // endpoint
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) =>{
      setData(res)
      // to show next page data
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  // for next page
  const fetchNextPageData = () =>{
    fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`).then((res) =>{
      if(data?.results) {
        setData({
          ...data, results: [...data?.results, ...res.results]
        })
      }else{
        setData(res)
      }
      setPageNum((prev) => prev +1)
    })
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData()
  } ,[query])

  return (
    <div className='searchResultsPage'>
      {
        loading && <Spinner initial={true}/>
      }
      {
        !loading && (
          <ContentWrapper>
            {
              data?.results?.length > 0 ? (
                <>
                  <div className="pageTitle">
                    {
                      `search${data?.total_results> 1 ? 'results' : 'result'} of '${query}'`
                    }
                  </div>
                  <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner/> }>
                    {
                      data?.results.map((item , index)=>{
                        if (item.media_type === 'person') return;
                          return(
                            <MovieCard key={index} data={item} fromSearch={true}/>
                          )
                      })
                    }
                  </InfiniteScroll>
                </>
              ):
              (
                <span className="resultNotFound">
                  Sorry, Result Not Found!
                </span>
              )
            }
          </ContentWrapper>
        )
      }
    </div>
  )
}
export default SearchResult