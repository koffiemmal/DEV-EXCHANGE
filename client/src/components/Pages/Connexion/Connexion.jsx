import { Eye, EyeOff } from "lucide-react";
import style from "../Connexion/Conexion.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../../Api/axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Context/UserContextProvider";

const Connexion = () => {
  const navigate = useNavigate();

  let [email_user, setemmailuser] = useState("");
  let [password_user, Setpassword_user] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  let { auth, setAuth } = useContext(UserContext) || {};


  return (
    <div className={style.mainInscription}>
      <div className={style.formulaire}>
        <span className={style.title}> Se Connectez</span> <br />
        <span className={style.titleplus}>
          Veuillez vous connectez pour avoir acces a votre compte
        </span>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            let connexion = { email_user, password_user };

            axios
              .post("/user/connexion", connexion)
              .then((res) => {
                console.log(res.data);

                localStorage.setItem("id_user", res.data.id_user_id);

                localStorage.setItem("accessToken", res.data.accessToken);

              /*   setAuth({...auth,token:res.data.accessToken});  */
                
   
                
                navigate("/");


              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Entrer votre Email"
                    onInput={(e) => {
                      setemmailuser(e.target.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type={showPassword ? "text" : "password"}
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
                    Se Connectez
                  </button>{" "}
                  <br />
                  <br />
                  <p>
                    Vous n'avez pas de compte{" "}
                    {<NavLink to={"/Inscription"}>S'inscrire</NavLink>}{" "}
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

export default Connexion;
