import style from '../Acceuil/Acceuil.module.css'
import axios from '../../../Api/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Acceuil =()=>{

    const navigate = useNavigate()

    let [search,setSearch]=useState("")


  let handleRemoveSearch=()=>{
    if(localStorage.getItem('recherche')===""){

    }
    else{
      localStorage.removeItem('recherche')
     
    }
 
  }

return(

   <div className={style.Acceuil}>

    <div className={style.titre}>
<h1>Welcome to my <br />
forums app of <br /> developper web <br />DevExChange

    </h1>
    </div>
    <div className={style.recherche}>
    <form action="" onSubmit={(e)=>{
            e.preventDefault()
            axios.post("/user/getforsearch",{search})
    .then((res)=>{
      console.log(res)
      localStorage.setItem('recherche',search)
       navigate('search')
       window.location.reload();
    })
    .catch((error)=>{
      console.log(error)
    })
          }}>


          <input
            type="search"
            name=""
            id=""
            placeholder="Entrez votre recherche"
            onInput={(e)=>{
              setSearch(e.target.value)

            }}
            required
          />
          <button  onClick={handleRemoveSearch}  type="submit">recherche</button>
          </form>

    </div>


   </div>

)

}

export default Acceuil