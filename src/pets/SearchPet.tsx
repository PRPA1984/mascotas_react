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

            petSearch = <table id="mascotas" className="table">
                            <thead>
                            <tr>
                                <th> Nombre </th>
                                <th> Descripción </th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {pets.map((pet, i) => {
                                return (
                                <tr key={i}>
                                    <td>{pet.name}</td>
                                    <td>{pet.description}</td>
                                    <button onClick={() => goToPetProfile(pet.id)}>Pet Profile</button>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
        } catch (error) {
            errorHandler.processRestValidations(error)
            petSearch = <DangerLabel message={errorHandler.errorMessage} />
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
            {petSearch}
        </GlobalContent >
    )
}