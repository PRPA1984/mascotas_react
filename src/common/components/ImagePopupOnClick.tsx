import React, { useState } from "react"


export default function ImagePopupOnClick(props:{image:string, width:string, height:string}) {
    const [open,setOpen] = useState(false)

    const handleShowDialog = () => {
      setOpen(!open)
    }
    return (
        <div>
            <img
            src={props.image}
            width={props.width}
            height={props.height}
            onClick={handleShowDialog}
            />
            {open ? (
            <div className="modal fade" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <img src={props.image}/>
                </div>
              </div>
            </div>
          </div>
            ): null}
        </div>
    )
  }