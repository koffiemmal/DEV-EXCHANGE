import { Eye, EyeOff, User, CheckCheckIcon } from "lucide-react";
import style from "../../Pages/SignIN/Signin.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../Api/axios";

const Signin = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  let [path, setPath] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res.data);
        setPath(res.data.path);
        Setphoto_user(res.data);
      })
      .catch((er) => console.log(er));
  };
  axios("/getImages").then((res) => {
    console.log(res.data);
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  let [nom_user, SetNomuser] = useState("");

  let [prenom_user, Setprenom_user] = useState("");

  let [pseudo_user, Setpseudo_user] = useState("");

  let [photo_user, Setphoto_user] = useState("");

  let [email_user, Setemail_user] = useState("");

  let [password_user, Setpassword_user] = useState("");

  return (
    <div className={style.mainInscription}>
      <div className={style.formulaire}>
        <span className={style.title}> Creez un Compte</span> <br />
        <span className={style.titleplus}>
          Veuillez remplir ce formulaire pour <br />
          Creer un Compte
        </span>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            let inscription = {
              nom_user,
              prenom_user,
              pseudo_user,
              photo_user,
              email_user,
              password_user,
            };
            console.log(inscription);
            console.log(pseudo_user);

            axios
              .post("/user/inscription", inscription)
              .then((res) => {
                console.log(res);
                navigate("/Connexion");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <table>
            <tbody>
              <tr>
                <td className={style.nom_pseudo}>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Entrer votre Nom"
                    required
                    onInput={(e) => {
                      SetNomuser(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Entrer votre prenom"
                    required
                    onInput={(e) => {
                      Setprenom_user(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Entrer Votre pseudo(Nom utilisateur)"
                    required
                    onInput={(e) => {
                      Setpseudo_user(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className={style.selectfile}>
                  <article className={style.photoUtilisateur}>
                    {photo_user ? (
                      <img src={"http://localhost:5000/images/" + photo_user} />
                    ) : (
                      <span>
                        <User />
                      </span>
                    )}
                  </article>
                  <input
                    className={style.filess}
                    /* onChange={onImageChange} */ onInput={(e) =>
                      setFile(e.target.files[0])
                    }
                    type="file"
                    required
                    name=""
                    id=""
                    onChange={upload}
                  />
                 {/*  <button  className={style.buttonvalider} onClick={upload}>
                    {<CheckCheckIcon color="white" size={30} />}
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    required
                    placeholder="Entrer votre Email"
                    onInput={(e) => {
                      Setemail_user(e.target.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Entrer votre mot de passe"
                    onInput={(e) => {
                      Setpassword_user(e.target.value);
                    }}
                  />
                  <button
                    className={style.showPassword}
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <button className={style.submit} type="submit">
                    S'inscire
                  </button>{" "}
                  <br />
                  <br />
                  <p>
                    Vous avez deja un compte{" "}
                    {<NavLink to={"/Connexion"}>Se Connectez</NavLink>}{" "}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className={style.images}></div>
    </div>
  );
};
export default Signin;
