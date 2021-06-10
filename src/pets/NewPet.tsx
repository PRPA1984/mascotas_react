import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
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
import FormImageUpload from "../common/components/FormImageUpload"
import ImageUpload from "../common/components/ImageUpload"
import ImageButton from "../common/components/ImageDeleteOnClick"
import { Image } from "./petsService"
import ImagePopupOnClick from "../common/components/ImagePopupOnClick"


export default function NewPet(props: RouteComponentProps<{ id: string }>) {
  const [profilePicture, setProfilePicture] = useState<Image | null>(null)
  const [pictures, setPictures] = useState<Image[]>([])
  const [birthDate, setBirthDate] = useState("")
  const [description, setDescription] = useState("")
  const [petId, setPetId] = useState("")
  const [name, setName] = useState("")

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
  }

  const deleteImageFromPictures = (image: Image) => {
    const auxArray:Image[] = pictures
    const index = auxArray.indexOf(image)
    if (index !== -1) auxArray.splice(index, 1)
    setPictures(auxArray)
  }

  useEffect(() => {
    const id = props.match.params.id
    if (id) {
      void loadPetById(id)
    }
  }, [])

  return (
    <GlobalContent>
      <FormTitle>Nueva Mascota</FormTitle>

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

        <ImageUpload
          src={"/assets/plus.png"}
          onChange={addImageToPictures}
        />

        <div className="form-group">
            {pictures?.map((image,index) => {
                return(
                    // eslint-disable-next-line react/jsx-key
                    <div>
                      <ImageButton image={image} buttonString="X" onButtonClick = {deleteImageFromPictures}/> 
                    </div>
                )
            })}
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
