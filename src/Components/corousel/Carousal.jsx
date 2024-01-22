import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";
import './Carousal.scss'
import dayjs from "dayjs";

const Carousal = ({data , loading}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home)
    const navigate = useNavigate()

    const navigation = (direction) => {

    }

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
                    <div className="carouselItems">
                        {
                            data?.map((item) => {
                                //img url
                                const posterurl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                                return(
                                    <div key={item.id} className="carouselItem" >
                                        <div className="posterBlock">
                                            <Img src={posterurl} />
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