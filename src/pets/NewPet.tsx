import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome, useForceUpdate } from "../common/utils/Tools"
import "../styles.css"
import { deletePet, loadPet, newPet, savePet } from "./petsService"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormWarnButton from "../common/components/FormWarnButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import ImageUpload from "../common/components/ImageUpload"
import ImageButton from "../common/components/ImageButton"
import { Image } from "./petsService"

export default function NewPet(props: RouteComponentProps<{ id: string }>) {
  const [profilePicture, setProfilePicture] = useState<Image | null>(null)
  const [pictures, setPictures] = useState<Image[]>([])
  const [birthDate, setBirthDate] = useState("")
  const [description, setDescription] = useState("")
  const [petId, setPetId] = useState("")
  const [name, setName] = useState("")

  const forceUpdate = useForceUpdate()
  const errorHandler = useErrorHandler()

  const loadPetById = async (id: string) => {
    if (id) {
      try {
        const result = await loadPet(id)
        setBirthDate(result.birthDate)
        setPetId(result.id)
        setName(result.name)
        setDescription(result.description)
        result.profilePicture ? setProfilePicture(result.profilePicture) : setProfilePicture(null)
        result.pictures ? setPictures(result.pictures) : setPictures([])
      } catch (error) {
        errorHandler.processRestValidations(error)
      }
    }
  }

  const changeProfilePicture = (image: string) => {
    setProfilePicture({src: image, id: ""})
  }
  const deleteClick = async () => {
    if (petId) {
      try {
        await deletePet(petId)
        props.history.push("/pets")
      } catch (error) {
        errorHandler.processRestValidations(error)
      }
    }
  }

  const saveClick = async () => {
    errorHandler.cleanRestValidations()
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
    }

    if (errorHandler.hasErrors()) {
      return
    }

    try {
      if (petId) {
        await savePet({ id: petId, name, birthDate, description, profilePicture, pictures })
      } else {
        await newPet({ name, birthDate, description, profilePicture, pictures })
      }
      props.history.push("/pets")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }
  const addImageToPictures = (image:string) => {
    const auxArray:Image[] = pictures
    const newPic = {src: image, id: ""}
    auxArray.push(newPic)
    setPictures(auxArray)
    forceUpdate()
  }

  const deleteImageFromPictures = (image: Image) => {
    const auxArray:Image[] = pictures
    const index = auxArray.indexOf(image)
    if (index !== -1) auxArray.splice(index, 1)
    setPictures(auxArray)
    forceUpdate()
  }

  const petPictures = () => {
    const auxPictures:any = []
    const deleteMessage = "Delete"
    if (pictures) {
        for (let i = 0; i < pictures?.length + 1; i++) {
            if(i === 0){
              auxPictures[i] = <tr key={i}>
                                    <td><ImageUpload src={"/assets/plus.png"} onChange={addImageToPictures}/></td>
                                    {pictures[i]   ? <td><ImageButton image={pictures[i]} buttonString={deleteMessage} onButtonClick = {deleteImageFromPictures}/></td> : null}
                                    {pictures[i+1]   ? <td><ImageButton image={pictures[i+1]} buttonString={deleteMessage} onButtonClick = {deleteImageFromPictures}/></td> : null}
                                </tr>
            }
            else if(i % 3 === 0){
                auxPictures[i] = <tr key={i}>
                                    {pictures[i-1]   ? <td><ImageButton image={pictures[i-1]} buttonString={deleteMessage} onButtonClick = {deleteImageFromPictures}/></td> : null}
                                    {pictures[i]   ? <td><ImageButton image={pictures[i]} buttonString={deleteMessage} onButtonClick = {deleteImageFromPictures}/></td> : null}
                                    {pictures[i+1]   ? <td><ImageButton image={pictures[i+1]} buttonString={deleteMessage} onButtonClick = {deleteImageFromPictures}/></td> : null}
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

  useEffect(() => {
    const id = props.match.params.id
    if (id) {
      void loadPetById(id)
    }
  }, [])

  return (
    <GlobalContent>
      <FormTitle>Edición de Mascota</FormTitle>

      <Form>

        <ImageUpload
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={profilePicture?.src ? profilePicture.src : "/assets/favicon.png"}
          onChange={changeProfilePicture}
        />
        <FormInput
          label="Nombre"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          errorHandler={errorHandler}
        />

        <FormInput
          label="Descripción"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          errorHandler={errorHandler}
        />

        <FormInput
          label="Fecha de Nacimiento"
          name="birthDate"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          errorHandler={errorHandler}
        />
        <div className="form-group">
          {petPictures()}
        </div>
        <DangerLabel message={errorHandler.errorMessage} />

        <FormButtonBar>
          <FormAcceptButton label="Guardar" onClick={saveClick} />

          <FormWarnButton
            hidden={!petId}
            label="Eliminar"
            onClick={deleteClick}
          />
          <FormButton label="Cancelar" onClick={() => goHome(props)} />
        </FormButtonBar>
      </Form>
    </GlobalContent>
  )
}
