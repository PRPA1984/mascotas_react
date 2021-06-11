import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { loadPet, Pet } from "./petsService"
import React from "react"
import GlobalContent from "../common/components/GlobalContent"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import DangerLabel from "../common/components/DangerLabel"


export default function PetProfile(props: RouteComponentProps<{ id: string }>){

    const [pet, setPet] = useState<Pet>()

    const errorHandler = useErrorHandler()

    const petPictures = () => {
        const auxPictures:any = []
        if (pet?.pictures) {
            for (let i = 0; i < pet?.pictures?.length; i++) {
                if(i % 3 === 0){
                    auxPictures[i] = <tr key={i}>
                                        {pet?.pictures[i]   ? <td><img src={pet?.pictures[i].src} width="300" height="300"/></td> : null}
                                        {pet?.pictures[i+1] ? <td><img src={pet?.pictures[i+1].src} width="300" height="300"/></td> : null}
                                        {pet?.pictures[i+2] ? <td><img src={pet?.pictures[i+2].src} width="300" height="300"/></td> : null}
                                    </tr>
                }
            }
        }
        return (
            <table id="mascotas" className="table">
            <thead>
            <tr>
                <th/>
                <th/>
                <th/>
            </tr>
            </thead>
            <tbody>
            {auxPictures}
            </tbody>
            </table>
        )
    }

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
                <img src={pet.profilePicture ? pet.profilePicture.src : "/assets/favicon.png"} width="150" height="150"/>
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input className="form-control" id="birthDate" value={pet.birthDate} disabled />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <input className="form-control" id="description" value={pet.description} disabled />
                </div>
                <div className="form-group">
                    {petPictures()}
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

function pictures(pictures: any) {
    throw new Error("Function not implemented.")
}
