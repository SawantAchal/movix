import React from 'react'
import './CirculeRating.scss'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CirculeRating = ({rating}) => {
  return (
    <div className="circleRating">
        <CircularProgressbar value={rating} maxValue={10} text={rating} styles={buildStyles({pathColor:rating < 5 ? "red" : rating < 7 ? "orange" : "green", })} />
    </div>
  )
}

export default CirculeRating