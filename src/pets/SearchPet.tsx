import React from "react"
import { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { Pet, searchPetsByName } from "./petsService"



export default function Search(props : RouteComponentProps) {
    const [pets, setPets] = useState<Pet[]>([])
    const [petName, setPetName] = useState("")
    const errorHandler = useErrorHandler()

    let petSearch = null

    const searchPets = async () => {
        try {
            setPets(await searchPetsByName(petName))
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const goToPetProfile = (id: string) => {
        props.history.push(`/pets/${id}`)
    }
    return (
        <GlobalContent>
            <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(event) => setPetName(event.target.value)} placeholder="Insert pet name"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => searchPets()}>Search</button>
                </div>
            </div>
            <table id="mascotas" className="table">
                            <thead>
                            <tr>
                                <th/>
                                <th> Nombre </th>
                                <th> Descripción </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {pets.map((pet, i) => {
                                return (
                                <tr key={i}>
                                    {pet.profilePicture? <img
                                    src={pet.profilePicture?.src}
                                    alt=""
                                    height="50"
                                    width="50"
                                    />: null}
                                    <td>{pet.name}</td>
                                    <td>{pet.description}</td>
                                    <img
                                    src="/assets/favicon.png"
                                    alt=""
                                    height="30"
                                    width="30"
                                    onClick={() => goToPetProfile(pet.id)}
                                    />
                                </tr>
                                )
                            })}
                            </tbody>
            </table>
            <DangerLabel message={errorHandler.errorMessage} />
        </GlobalContent >
    )
}