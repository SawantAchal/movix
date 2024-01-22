import React from 'react'
import './Details.scss'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {
  const {mediaType , id} = useParams()
  // api call for banner
  //api for video of movie or tv shoe
  const {data , loading } = useFetch(`/${mediaType}/${id}/videos`);
  //api for cast in movie
  const {data:credits , loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      {/* to show only trailer we pass [0] it means first video */}
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details