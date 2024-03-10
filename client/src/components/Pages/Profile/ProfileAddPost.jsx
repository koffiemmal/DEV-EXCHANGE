import { PlusCircle,DeleteIcon } from "lucide-react";
import style from "../Profile/Addpost.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../Api/axios";
import { CheckCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileAddPost = () => {
  let id_users = localStorage.getItem("id_user");

  const [photo_publication, setPhoto_publication] = useState("");

  let [categorie, setcategorie] = useState("");

  /* let [id_user,setId_user]=useState()

    setId_user(id_user)*/


  console.log(id_users);

  let [titre_publication, settitrepublication] = useState("");

  let [description_publication, setdescription_publication] = useState("");

  let [id_categorie, setid_categorie] = useState("");

  let [compteur, setCompteur] = useState(0);

  const [file, setFile] = useState();

  let [publications, setPUblications] = useState();

  let [path, setPath] = useState();


  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res.data);
        setPath(res.data.path);
        setPhoto_publication(res.data);
      })
      .catch((er) => console.log(er));
    };
    console.log(photo_publication)

    console.log(file)
  

  useEffect(() => {
    axios
      .get("/user/AllCategories")
      .then((res) => {
      
        setcategorie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios.post("/user/getPUblicationsforuser",{id_user:id_users})
      .then((res)=>{
        setPUblications(res.data)
       
      })
      .catch((error)=>{
        console.log(error)
      })

  }, [compteur]);

  const navigate = useNavigate();
  let handleClickAddpost = () => {
    navigate("/addpost");
  };
  let handleClickprofile = () => {
    navigate("/Profile");
  };
  console.log(id_categorie);
  return (
    <div className={style.mainAddPost}>
      <section className={style.buttonProfile}>
        <button className={style.myprofile} onClick={handleClickprofile}>
          MON PROFILE
        </button>

        <button onClick={handleClickAddpost} className={style.addnewpost}>
          AJOUTER UN POST
        </button>
      </section>

      <section className={style.TitreAdd}>
        <h1>Ajouter un nouveau post</h1>
      </section>

      <form
        action=""
        onSubmit={(e) => {
          upload()
          e.preventDefault();

          let newpublication = {
            id_categorie,
            id_user: id_users,
            titre_publication,
            description_publication,
            photo_publication:photo_publication,
          };
          setCompteur(compteur+1)

          console.log(newpublication);

          axios
            .post("/user/addpublication", newpublication)
            .then((res) => {
              console.log(res);
              navigate('/Categories')
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <section className={style.titrepost}>
          <input
            type="text"
            placeholder="Entrer le titre du post"
            onInput={(e) => {
              settitrepublication(e.target.value);
            }}
          />
        </section>

        <section className={style.choixCategorie}>
          <label htmlFor="">Choix categories du post</label>

          <select
            name=""
            id=""
            onChange={(e) => {
              setid_categorie(e.target.value);
            }}
          >
            <option value=""></option>

            {categorie &&
              categorie.map((cat, index) => {
                return (
                  <option key={index} value={cat.id_categorie}>
                    {cat.nom_categorie}
                  </option>
                );
              })}
          </select>
        </section>

        <section className={style.commentairepost}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Entrer la description"
            onInput={(e) => {
              setdescription_publication(e.target.value);
            }}
          ></textarea>

          <h2 className={style.text}>ajouter une image</h2>

          <input
                    className={style.filess}
                    /* onChange={onImageChange} */ onInput={(e) =>
                      
                      setFile(e.target.files[0])
                     /*  upload() */
                    
                      
                    
                    }
                    type="file"
                    required
                    name=""
                    id=""
                  onChange={upload}
                  />
           
        </section>

        <section className={style.btnCommenter}>
          <button  onClick={upload} type="submit">
            Ajouter <PlusCircle size={30} color="black" />{" "}
          </button>
        </section>
      </form>
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
                 {/*  <button className={style.deletebtn}
                  onClick={()=>{
                   let id = {id_publication:publication.id_publication}
                   console.log(id)
                   axios.delete("/user/delete",id)
                   .then((res)=>{
                    console.log(res)
                   })
                   .catch((error)=>{
                    console.log(error)
                   })

                  }}
                  >
                 <DeleteIcon size={30} color="white"/>        
                         </button> */}
                </article>
              
              );
            })}
        </div>
    </div>
  );
};
export default ProfileAddPost;

/*  */
