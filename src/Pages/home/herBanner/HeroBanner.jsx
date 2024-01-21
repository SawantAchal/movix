import React, { useEffect, useState } from 'react'
import './HeroBanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../Hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../Components/LazyLoadImage/Img'
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background , setBackground] = useState("")
  const [query , setQuery] = useState("")
  const navigate = useNavigate()

  const {url} = useSelector((state) => state.home)

  //getting data and loading from custom hook . also pass url for upcoming movies
  const {data , loading} = useFetch('/movie/upcoming')

  const serachQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  //to change background of banner 
  useEffect(() => {
    const bg =url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  } , [data])

  return (
    <div className='heroBanner'>
      {/* condition if loading state is false then show below div */}
      {/* div is use to image for banner */}
      {!loading &&
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      }
      <div className="opacity-layer">

      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className='title'>Welcome.</span>
          <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input type="text" placeholder='Search for a movie or TV show.....' onKeyUp={serachQueryHandler} onChange={(e) => setQuery(e.target.value)}/>
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner