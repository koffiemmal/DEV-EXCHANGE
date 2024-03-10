import { useState } from "react"
import axios from "../../../Api/axios"
import {CheckCheckIcon } from'lucide-react'
import style from"../AJoutCategories/add.module.css"


const AddCategories=()=>{
    let [nom_categorie,setNomCategorie]=useState("")
    let [photo_categorie,setphotoCategorie]=useState("")
    const [file, setFile] = useState();

    let [path,setPath]=useState()

    

    const upload =()=>{
        const formData = new FormData()
        formData.append('file',file)
        axios.post('/upload',formData)
        .then(res=>{
            console.log(res.data)
            setPath(res.data.path)
            setphotoCategorie(res.data)
            
        })
        .catch(er=> console.log(er))
    }

    return(

        <div className={style.mainAdd}>
            <form action="" onSubmit={e=>{
                e.preventDefault()
                let newCategories = {nom_categorie,photo_categorie}
                console.log(newCategories)
                axios.post("/user/AjoutCategories",newCategories)
                .then((res)=>{
                    console.log(res)
                })
                .catch((er)=>{
                    console.log(er)
                })
            }}>
               <table>
                <tbody>
                    <tr>
                        <td>
                        <label htmlFor="">NOm categorie</label> <br />
                <input type="text" onInput={(e)=>{
                    setNomCategorie(e.target.value)
                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="">Photo categories logo</label> <br />
                            <input type="file" name="" id="" onChange={(e)=>setFile(e.target.files[0])} />
                            <button  onClick={upload}>{<CheckCheckIcon color="white" size={30}/> }</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Valider</button>
                        </td>
                    </tr>
                </tbody>
               </table>
            </form>
        </div>


    )
}

export default AddCategories