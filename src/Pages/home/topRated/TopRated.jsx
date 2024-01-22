import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import useFetch from '../../../Hooks/useFetch'
import Carousal from '../../../Components/corousel/Carousal'

const TopRated = () => {
    const [endpoint , setEndPoint] = useState("movie")

    // api 
    const {data , loading} = useFetch(`/${endpoint}/top_rated`)

    //control for switch tab
    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    };
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            {/* dyanmic component */}
            <SwitchTabs  data={["Movies" , "TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousal data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated