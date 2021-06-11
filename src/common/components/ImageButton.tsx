import React, { useState } from "react"
import { Image } from "../../pets/petsService"


export default function ImageButton(props:{image:Image, onButtonClick: (image: Image) => void, buttonString: string}) {
    const [open,setOpen] = useState(false)

    const handleShowDialog = () => {
      setOpen(!open)
    }
    return (
        <div>
            <img src={props.image.src} height="100"/>
            <button className="btn" onClick={() => props.onButtonClick(props.image)}>{props.buttonString}</button>
        </div>
    )
}