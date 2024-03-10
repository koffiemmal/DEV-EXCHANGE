import style from "./Profiile.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../Api/axios";
import { CheckCheckIcon, User } from "lucide-react";
const Profile = () => {
  let id_user = localStorage.getItem("id_user");

  let identifiant = { id_user: id_user };

  const [userInfo, setUserInfo] = useState({});

  let [nom_user, SetNomuser] = useState("");

  let [prenom_user, Setprenom_user] = useState("");

  let [pseudo_user, Setpseudo_user] = useState("");

  let [photo_user, Setphoto_user] = useState("");

  let [email_user, Setemail_user] = useState("");

  let [password_user, Setpassword_user] = useState("");

  let [images, setImages] = useState("");

  let [categorie, setcategorie] = useState("");

  let [path, setPath] = useState();

  console.log(userInfo.photo_user);

  const [file, setFile] = useState();


  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res.data.path);
        setPath(res.data.path);
        Setphoto_user(res.data.path);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    axios
      .get("/user/AllCategories")
      .then((res) => {
        console.log(res.data);
        setcategorie(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  useEffect(() => {
    axios
      .post("/user/selection", identifiant)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios("/getImages").then((res) => {
        console.log(res.data);
      });
     
  }, [id_user]);

  if (images == "") {
    console.log("images est null");
  } else {
    console.log("images non null");
  }

  let preneurimages;

  console.log(userInfo.nom_user);

  const navigate = useNavigate();
  let handleClickAddpost = () => {
    navigate("/addpost");
  };
  return (
    <div className={style.mainProfile}>
      <section className={style.buttonProfile}>
        <button className={style.myprofile}>MON PROFILE</button>
        <button onClick={handleClickAddpost} className={style.addnewpost}>
          AJOUTER UN POST
        </button>
      </section>
      <section>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (images == "") {
              preneurimages = userInfo.photo_user;
            } else {
              preneurimages = images;
            }
            let modifications = {
              nom_user,
              prenom_user,
              pseudo_user,
              photo_user: preneurimages,
              email_user,
              id_user: userInfo.id_user,
            };

            axios
              .post("/user/modifications", modifications)
              .then((res) => {
                console.log(res);
              })
              .catch((er) => {
                console.log(er);
              });

            console.log(modifications);
          }}
        >
          <section className={style.sauvegarde}>
            <article>
              <h1>Mon profile </h1>
              
            </article>
       {/*      <button className={style.btnsvgd} type="submit">
              Sauvegarder
            </button> */}
          </section>
          <section className={style.namezone}>
            <article>
              <h2>Nom</h2>
            </article>
            <article className={style.listinput}>
              <input
                type="text"
                placeholder={userInfo.nom_user}
               value={userInfo.nom_user}
              />
              <input
                type="text"
                placeholder={userInfo.prenom_user}
               value={userInfo.prenom_user}
              />
            </article>
          </section>
          <section className={style.namezone}>
            <article>
              <h2>Pesudo</h2>
            </article>
            <article className={style.listinput2}>
              <input
                type="text"
                placeholder={userInfo.pseudo_user}
               value={userInfo.pseudo_user}
              />
            </article>
          </section>
          <section className={style.namezone}>
            <article>
              <h2>photoUtilisateur</h2>
            </article>
            <article className={style.listinput}>
              <article className={style.photoimages}>
              <img
                  src={"http://localhost:5000/images/" + userInfo.photo_user}
                  alt="Photo de l'utilisateur"
                />
              </article>
             {/*  <input
                type="file"
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.files == "") {
                    setImages(userInfo.photo_user);
                  } else {
                    setFile(e.target.files[0]);
                  }
                }}
              /> */}
              {/* <button className={style.buttonvalider} onClick={upload}>
                {<CheckCheckIcon color="white" size={30} />}
              </button> */}
            </article>
          </section>

          <section className={style.namezone}>
            <article>
              <h2>Email</h2>
            </article>
            <article className={style.listinput3}>
              <input
                type="text"
                placeholder={userInfo.email_user}
               value={userInfo.email_user}
              />
            </article>
          </section>
        </form>
      </section>
    </div>
  );
};
export default Profile;
