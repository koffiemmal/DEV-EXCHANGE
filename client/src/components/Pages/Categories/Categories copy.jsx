import style from "../Categories/Categories.module.css";
import {
  Menu,
  ThumbsDown,
  ThumbsUp,
  User,
  SlidersHorizontalIcon,
} from "lucide-react";
/* import Carousel from 'nuka-carousel'; */

import axios from "../../../Api/axios";

import logo from "../../assets/8220185645_dd4c773717-removebg-preview.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const CategoriesIndex = () => {
  const navigate = useNavigate();
  let [categorie, setcategorie] = useState();
  let [publications, setPUblications] = useState();

  let handleClikDEscription = () => {
    navigate("/Description");
  };

  const [photo_categorie,setPhotocategorie]=useState("")

  let [mostPubli,setMost] = useState()

  const { id_categorie } = useParams();

  useEffect(() => {
    axios
      .get("/user/AllCategories")
      .then((res) => {
      
        setcategorie(res.data);
      })
      .catch((er) => {
        console.log(er);
      });

    // Effectue une requête GET vers le backend pour récupérer la liste des images
    axios("/getImages").then((res) => {
    
    });

    axios
      .post("/user/getPublicationspecify", { id_categorie })
      .then((res) => {
        setPUblications(res.data);
       
        setPhotocategorie(res.data[0].photo_categorie)
      })
      .catch((er) => {
        console.log(er);
      });

        axios.get("/user/getmostPUblicatores")
        .then((res) => {
          setMost(res.data)
          })
          .catch((er) => {
            console.log(er);
          });


  }, []);

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
      
<div className={style.photoDelaCategorie}>
    <article> <img
                      src={
                        "http://localhost:5000/images/" +
                       photo_categorie
                      }
                      alt=""
                    /></article>
</div>

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
                    } /* onClick={handleClikDEscription} */
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
};
export default CategoriesIndex;
