import { useEffect, useState } from "react"
import logo from "../assets/loading.gif"
import { RouteComponentProps } from "react-router-dom"
import { loadPet, Pet } from "./petsService"
import React from "react"
import GlobalContent from "../common/components/GlobalContent"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import { ErrorHandler, useErrorHandler } from "../common/utils/ErrorHandler"
import DangerLabel from "../common/components/DangerLabel"


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
                <div className="form-group">
                    <img src={pet.profilePicture} alt="" height="100"/>
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input className="form-control" id="birthDate" value={pet.birthDate} disabled />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <input className="form-control" id="name" value={pet.description} disabled />
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
            <img src={logo} alt="loading..." />
        )
    }
}