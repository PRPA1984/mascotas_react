import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Pet {
  id: string
  name: string
  birthDate: string
  description: string
  visibility?: boolean
  profilePicture?: Image | null
  pictures?: Image[]
}

export interface Image {
  src: string,
  id: string
}

export async function loadPets(): Promise<Pet[]> {
  return (await axios.get(environment.backendUrl + "/v1/pet")).data as Pet[]
}

export async function loadPet(id: string): Promise<Pet> {
  return (await axios.get(environment.backendUrl + "/v1/pet/" + id)).data as Pet
}

export async function newPet(payload: {
  name: string
  birthDate: string
  description: string
  profilePicture: Image | null
  pictures: Image[]

}): Promise<Pet> {
  return (await axios.post(environment.backendUrl + "/v1/pet", payload))
    .data as Pet
}

export async function savePet(payload: Pet): Promise<Pet> {
  return (
    await axios.post(environment.backendUrl + "/v1/pet/" + payload.id, payload)
  ).data as Pet
}

export async function deletePet(id: string): Promise<void> {
  await axios.delete(environment.backendUrl + "/v1/pet/" + id)
}

export async function changePetPrivacy(id: string): Promise<void>{
  await axios.post(environment.backendUrl + `/v1/pet/${id}/changePrivacy`)
}
export async function searchPetsByName(search: string) :Promise<Pet[]>{
  return (await axios.get(environment.backendUrl + "/v1/pet/search", { params: { search } })).data as Pet[]
}
