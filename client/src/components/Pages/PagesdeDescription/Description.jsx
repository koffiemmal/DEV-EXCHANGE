import style from "../PagesdeDescription/Description.module.css";
import {
  LucideCornerDownLeft,
  LucideMessageSquarePlus,
  User,
} from "lucide-react";
import image from "../../assets/coup-moyen-homme-travaillant-ordinateur.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../Api/axios";
const Description = () => {
  const navigate = useNavigate();
  let handleClickCategories = () => {
    navigate("/Categories");
  };

  let id_user = localStorage.getItem("id_user");

  let [contenu_commentaire, setContenuCommentaire] = useState("");

  let [description, setDEscription] = useState();

  const { id_categorie, id_publication } = useParams();

  let [compteurDeChangement, setCompteurDeChangement] = useState(0);

  let [commentaires, setCommentaires] = useState();

  

  useEffect(() => {
    axios
      .post("/user/getpublicationDescription", { id_publication })
      .then((res) => {
        setDEscription(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("/user/getCommentairesSpecifyPublications", { id_publication })
      .then((res) => {
       
        setCommentaires(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [compteurDeChangement]);

  return (
    <div className={style.mainDescription}>
      <button className={style.return} onClick={handleClickCategories}>
        <LucideCornerDownLeft />
      </button>
      {description &&
        description.map((descrpit, index) => {
          return (
            <section className={style.elementmainDescription} key={index}>
              <article className={style.titre}>
                <p>{descrpit.titre_publication}</p>
              </article>
              <article className={style.descriptionImages}>
                <img
                  src={
                    "http://localhost:5000/images/" + descrpit.photo_publication
                  }
                  alt=""
                />
              </article>
              <article className={style.description}>
                <p>{descrpit.description_publication}</p>
              </article>

              <hr />

              <section className={style.commentaires}>
                <div className={style.formualireCommentaires}>
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      let newCommentaire = {
                        id_publication,
                        id_user,
                        contenu_commentaire,
                      };
                      setCompteurDeChangement(compteurDeChangement+1)
                     
                      axios
                        .post("/user/insertComment", newCommentaire)
                        .then((res) => {
                        
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="    |Entrer un Commentaire..."
                      onInput={(e) => {
                        setContenuCommentaire(e.target.value);
                      }}
                    ></textarea>{" "}
                    <br />
                    <button
                      type="submit"
                      
                      className={style.submit}
                    >
                      Commenter{" "}
                      <LucideMessageSquarePlus color="black" size={30} />{" "}
                    </button>
                  </form>
                </div>
                <div className={style.listesCommentaires}>
                  {commentaires &&
                    commentaires.map((comment, index) => {
                      return (
                        <section key={index} className={style.comment}>
                          <article className={style.nom_user}>
                            <article className={style.userprofile}>
                              <img
                                src={
                                  "http://localhost:5000/images/" +
                                  comment.photo_user
                                }
                                alt=""
                              />
                            </article>
                            <span className={style.username}>
                              {comment.nom_user}
                            </span>
                          </article>
                          <article className={style.moncommentaires}>
                            <p>{comment.contenu_commentaire}</p>
                          </article>
                        </section>
                      );
                    })}
                </div>
              </section>
            </section>
          );
        })}
    </div>
  );
};
export default Description;
