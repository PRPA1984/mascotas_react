import React, { useState } from "react"
import "./ImageDeleteOnClick.css"


export default function ImageButton(props:{image:Image, onButtonClick: (image: Image) => void, buttonString: string}) {
    const [open,setOpen] = useState(false)

    const handleShowDialog = () => {
      setOpen(!open)
    }
    return (
        <div class="container">
            <img src={props.image.src}>
            <button class="btn" onClick={props.onButtonClick(props.image)}>{buttonString}</button>
        </div>
    )
  }