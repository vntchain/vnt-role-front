import React from 'react'
import './Banner.scss'

export default function Banner(props){
  const { title, image } = props
  return (
    <div className="banner">
      <div className="banner__cont">
        <h2>{title}</h2>
        <img src={image} alt="image"/>
      </div>
    </div>
  )
}