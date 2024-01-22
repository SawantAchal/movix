import React, { useRef } from "react";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill,} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import './Carousal.scss'
import dayjs from "dayjs";
import CirculeRating from "../circuleRating/CirculeRating";
import Genres from "../genres/Genres";

const Carousal = ({data , loading , endpoint}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home)
    const navigate = useNavigate()

    const navigation = (direction) => {
        const container = carouselContainer.current;
        // to move Carousal
        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior:'smooth',
        })
    }

    // created method for do not repeat the class for sKItem
    const sKItem = () => {
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill  className="carouselLeftNav arrow" onClick={() => navigation('left')}/>
            <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation('right')}/>
            {
                !loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {
                            data?.map((item) => {
                                //img url
                                const posterurl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                                return(
                                    <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                        <div className="posterBlock">
                                            <Img src={posterurl} />
                                            <CirculeRating rating={item.vote_average.toFixed(1)}/>
                                            <Genres data={item.genre_ids.slice(0,2)}/>
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">{item.title || item.name}</span>
                                            <span className="date">{dayjs(item.release_Date).format("MMM D , YYYY")}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {sKItem()}
                        {sKItem()}
                        {sKItem()}
                        {sKItem()}
                        {sKItem()}
                        {sKItem()}
                    </div>
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Carousal