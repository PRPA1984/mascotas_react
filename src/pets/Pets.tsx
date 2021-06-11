import React, { useState, useEffect } from "react"
import { Pet, loadPets, savePet, changePetPrivacy } from "./petsService"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome, useForceUpdate } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"

export default function Pets(props: RouteComponentProps) {
  const [pets, setPets] = useState<Pet[]>([])

  const errorHandler = useErrorHandler()

  const forceUpdate = useForceUpdate()

  const loadCurrentPets = async () => {
    try {
      const result = await loadPets()
      setPets(result)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  const editPetClick = (petId: string) => {
    props.history.push("/editPet/" + petId)
  }

  const newPetClick = () => {
    props.history.push("/editPet")
  }

  const goToPetProfile = (id: string) => {
    props.history.push(`/pets/${id}`)
  }

  const changePrivacy = async (pet: Pet) => {
    try {
      await changePetPrivacy(pet.id)
      const auxPets = pets.map((petElement, index) => {
        if (petElement.id === pet.id){
          petElement.visibility = !petElement.visibility
        }
        return petElement
      })
      setPets(auxPets)
      forceUpdate()
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }
  useEffect(() => {
    void loadCurrentPets()
  }, [])

  return (
    <GlobalContent>
      <FormTitle>Mascotas</FormTitle>
      <table id="mascotas" className="table">
        <thead>
          <tr>
            <th> Nombre </th>
            <th> Descripción </th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, i) => {
            return (
              <tr key={i}>
                <td>{pet.name}</td>
                <td>{pet.description}</td>
                <td>
                  <div className="form-check form-switch">
                    {pet.visibility ? <input className="form-check-input" type="checkbox" onChange={() => changePrivacy(pet)} checked/> : <input className="form-check-input" type="checkbox" onChange={() => changePrivacy(pet)}/>}
                    <label className="form-check-label">Public</label>
                  </div>
                </td>
                <td className="text">
                  <img
                    src="/assets/edit.png"
                    alt=""
                    onClick={() => editPetClick(pet.id)}
                  />
                </td>
                <td>
                  <img
                    src="/assets/favicon.png"
                    alt=""
                    height="30"
                    width="30"
                    onClick={() => goToPetProfile(pet.id)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <DangerLabel message={errorHandler.errorMessage} />
      <FormButtonBar>
        <FormAcceptButton label="Nueva Mascota" onClick={newPetClick} />
        <FormButton label="Cancelar" onClick={() => goHome(props)} />
      </FormButtonBar>
    </GlobalContent>
  )
}
