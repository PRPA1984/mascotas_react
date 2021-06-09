import React, { useState } from "react"
import { Image } from "../../pets/petsService"
import "./ImageDeleteOnClick.css"


export default function ImageButton(props:{image:Image, onButtonClick: (image: Image) => void, buttonString: string}) {
    const [open,setOpen] = useState(false)

    const handleShowDialog = () => {
      setOpen(!open)
    }
    return (
        <div className="container">
            <img src={props.image.src}/>
            <button className="btn" onClick={() => props.onButtonClick(props.image)}></button>
        </div>
    )
}