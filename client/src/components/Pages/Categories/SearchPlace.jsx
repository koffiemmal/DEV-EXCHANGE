
import style from "../Categories/Categories.module.css";
import {
  Menu,
  SlidersHorizontalIcon,
} from "lucide-react";


import axios from "../../../Api/axios";


import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchPlace =()=>{
    let [categorie, setcategorie] = useState();
    let [publications, setPUblications] = useState();
  
    let [mostPubli,setMost] = useState()

    let [compteur,setCompteur] = useState(1)

    
  
   /*  const { id_categorie } = useParams(); */


   let search = localStorage.getItem('recherche')

  
    useEffect(() => {
      axios
        .get("/user/AllCategories")
        .then((res) => {
        
          setcategorie(res.data);
        })
        .catch((er) => {
          console.log(er);
        });
  
     
      axios("/getImages").then((res) => {
      
      });
  
  
   
          axios.get("/user/getmostPUblicatores")
          .then((res) => {
            setMost(res.data)
            })
            .catch((er) => {
              console.log(er);
            });
  
            axios.post("/user/getforsearch",{search})
    .then((res)=>{
    
     setPUblications(res.data)
     
      
    })
    .catch((error)=>{
      console.log(error)
    })
    },[]);

  
    return (
      <div className={style.Categories}>
        <div className={style.categorie}>
          <div className={style.forums}>
            <section className={style.titre}>
              <h2>CATEGORIES</h2>
              {<Menu />}
            </section>
            <section className={style.listeCategories}>
              {categorie &&
                categorie.map((categories, index) => {
                  return (
                    <section key={index}>
                      <article className={style.logocategoriesimages}>
                        <img
                          src={
                            "http://localhost:5000/images/" +
                            categories.photo_categorie
                          }
                          alt=""
                        />
                      </article>
                      <article className={style.logonom}>
                        <p>{categories.nom_categorie}</p>
                      </article>
                      <button className={style.buttonplus}>
                        {" "}
                        <Link to={`${categories.id_categorie}`}>
                          {" "}
                          <SlidersHorizontalIcon />{" "}
                        </Link>{" "}
                      </button>
                    </section>
                  );
                })}
            
            </section>
          </div>
          <div className={style.mostPopular}>
            <h2>most popular</h2>
          {mostPubli && mostPubli.map((most,index)=>{
              return(
                  <section key={index}>
                  <article className={style.photo}>
                  <img
                          src={
                            "http://localhost:5000/images/" +
                            most.photo_user
                          }
                          alt=""
                        />
                  </article>
                  <article className={style.nom_userpoupular}>
                   <h3>{most.nom_user}</h3>
                  </article>
                </section>
              )
          })}
          
          </div>
        </div>
        <div className={style.publications}>
    
  
          <div className={style.Allpost2}>
            {publications &&
              publications.map((publication, index) => {
                return (
                 
                  <article className={style.postArticle} key={index}>
                    <section className={style.images_article}>
                      <img
                        src={
                          "http://localhost:5000/images/" +
                          publication.photo_publication
                        }
                        alt=""
                      />
                    </section>
                    <section className={style.informations_article}>
                      <section className={style.photo}>
                        <img
                          src={
                            "http://localhost:5000/images/" +
                            publication.photo_user
                          }
                          alt=""
                        />
                      </section>
                      <section className={style.nom_user}>
                        <p>{publication.nom_user}</p>
                      </section>
  
                      <section className={style.Date}>
                        <article>
                          <p>{publication.date_publication}</p>
                        </article>
                      </section>
                    </section>
                    <section className={style.description_article}>
                      <p>{publication.description_publication}</p>
                    </section>
                    <button
                      className={
                        style.voirplus
                      } 
                    >
                      <Link to={`${publication.id_publication}`}>Voir PLus</Link>
                    </button>
                  </article>
                
                );
              })}
          </div>
          <br />
        </div>
      </div>
    );
}

export default SearchPlace