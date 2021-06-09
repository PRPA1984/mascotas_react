import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { loadPet, Pet } from "./petsService"
import React from "react"
import GlobalContent from "../common/components/GlobalContent"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import DangerLabel from "../common/components/DangerLabel"
import ImagePopupOnClick from "../common/components/ImagePopupOnClick"


export default function PetProfile(props: RouteComponentProps<{ id: string }>){

    const [pet, setPet] = useState<Pet>()

    const errorHandler = useErrorHandler()

    const loadingPet = async (id:string) => {
        setPet(await loadPet(id))
    }
    useEffect(() => {
        try {
            void loadingPet(props.match.params.id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
      }, [])

    if (pet) {
        return (
            <GlobalContent>
            <FormTitle>{`Perfil de ${pet.name}`}</FormTitle>
            <Form>
                <ImagePopupOnClick image={pet.profilePicture?.src ? pet.profilePicture.src : "/assets/favicon.png"} width="100" height="100"/>
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input className="form-control" id="birthDate" value={pet.birthDate} disabled />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <input className="form-control" id="description" value={pet.description} disabled />
                </div>
                <div className="form-group">
                    {pet.uploadedPictures?.map((image,index) => {
                        return(
                            // eslint-disable-next-line react/jsx-key
                            <ImagePopupOnClick image={image.src} width="300" height="300"/>
                        )
                    })}
                </div>
            </Form>
          </GlobalContent>
        )
    }
    else if(errorHandler.errorMessage){
        return(
            <GlobalContent>
                <DangerLabel message = {errorHandler.errorMessage} />
            </GlobalContent>
        )
    }
    else {
        return (
            <img src="/assets/loading.gif" alt="loading..." />
        )
    }
}