import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import useFetch from '../../../Hooks/useFetch'
import Carousal from '../../../Components/corousel/Carousal'

const Trending = () => {
    const [endpoint , setEndPoint] = useState("day")

    // api 
    const {data , loading} = useFetch(`/trending/all/${endpoint}`)

    //control for switch tab
    const onTabChange = (tab) => {
        setEndPoint(tab === "Day" ? "day" : "week");
    };
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            {/* dyanmic component */}
            <SwitchTabs  data={["Day" , "Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousal data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending