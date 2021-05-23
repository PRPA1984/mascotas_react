import { Pet } from "./petsService";



export default function Search() {
    const [pets, setPets] = useState<Pet[]>([])
    const [petName, setPetName] = useState("")

    function searchPet(){

    }

    function petProfile(){

    }
    if (pets) {
        return (
            <GlobalContent>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" onChange={setPetName()} placeholder="Insert pet name">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={searchPet()}>Search</button>
                    </div>
                </div>
            </GlobalContent >
            
        )
    }
    else{
        return (
            <GlobalContent>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" onChange={setPetName()} placeholder="Insert pet name">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={searchPet()}>Search</button>
                    </div>
                </div>
                <table id="mascotas" className="table">
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
                            <button onClick={petProfile()}>Pet Profile</button>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </GlobalContent >
        )
    }
}