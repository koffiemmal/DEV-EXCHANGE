import style from "../Layouts/HeaderFooter.module.css";
import {
  Home,
  Menu,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Copyright,
  User,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContextProvider";
import { useContext } from "react";
import axios from "../../Api/axios";

const HeaderFooter = () => {
  let id_user = localStorage.getItem("id_user");

  let { auth, setAuth } = useContext(UserContext) || {};

  const stockAccessToken = localStorage.getItem('accessToken')


  useEffect(() => {
    if (stockAccessToken && auth.token !== stockAccessToken) {
      setAuth({ ...auth, token: stockAccessToken });
    }
  }, [auth, setAuth, stockAccessToken]);

 
  
  let identifiant = { id_user: id_user };
  
  let [compteur, setCompteur] = useState(0);
  
  let [images, setImages] = useState();
  
  let removeAST = () => {
    localStorage.removeItem("id_user");
    localStorage.removeItem("accessToken");
   
    navigate("/");
    setCompteur(compteur + 1);
  };
  
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {
    axios
      .post("/user/selection", identifiant)
      .then((res) => {
        setUserInfo(res.data);
       
      })
      .catch((error) => {
        console.log(error);
      });
    }, [id_user, compteur]);
    
    useEffect(() => {
    
    axios("/getImages").then((res) => {
   
    });
  }, []);

 
  
  const navigate = useNavigate();
  
  let handleClickCategories = () => {
    navigate("/Categories");
  };
  let handleClickHome = () => {
    navigate("/");
  };
  let handelClickConnexion = () => {
    navigate("/Connexion");
  };
  let handleclickProfile = () => {
    navigate("/Profile");
  };
  let handleclickAdd = () => {
    navigate("/addPost");
  };

  let handleRemoveSearch=()=>{
    if(localStorage.getItem('recherche')===""){

    }
    else{
      localStorage.removeItem('recherche')
     
    }
 
  }
  
  let [search,setSearch]=useState("")
  


  return (
    <div>
      <header>
        <div className={style.logo}>
          {/*   <img src={'http://localhost:4000/images/'+userInfo.photo_user} alt="Profile" /> */}
        </div>

        <div className={style.AcceuilCategories}>
          <button onClick={handleClickHome}>
            {<Home color="white" size={40} />}
          </button>
          <button onClick={handleClickCategories}>
            {<Menu color="white" size={40} />}
          </button>
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

        <div className={style.connexion}>
          {userInfo ? (
            <section className={style.userPlace}>
              <article className={style.photo_user}>
                <img
                  src={"http://localhost:5000/images/" + userInfo.photo_user}
                  alt="Photo de l'utilisateur"
                />
              </article>
              <p className={style.nom_user}>{userInfo.pseudo_user}</p>
              <ul className={style.menuderoulant}>
                <li>
                  <Menu size={40} />
                  <ul className={style.dropdown}>
                    <li>
                      <button
                        className={style.libutton}
                        onClick={handleclickProfile}
                      >
                        {<User />}My profile
                      </button>
                    </li>
                    <li>
                      <button
                        className={style.libutton}
                        onClick={handleclickAdd}
                      >
                        {<PlusCircle />}Add post
                      </button>
                    </li>
                    <li>
                      <button className={style.libutton} onClick={removeAST}>
                        {<LogOut />}deconnexion
                      </button>{" "}
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          ) : (
            <button
              className={style.connexionbtn}
              onClick={handelClickConnexion}
            >
              Sign In
            </button>
          )}

          {/* <ul className={style.menuderoulant}>
              <li><Menu size={40}/> 
        <ul className={style.dropdown}>
<li><button className={style.libutton} onClick={handleclickProfile}>{<User/>}My profile</button></li>
<li><button className={style.libutton} onClick={handleclickAdd}>{<PlusCircle/>}Add post</button></li>
<li><button className={style.libutton}>{<LogOut/>}deconnexion</button> </li>
        </ul>
        </li>
        </ul> */}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className={style.social}>
          <section className={style.social_1}>
            <div className={style.logoFooter}></div>
            <div>
              <p>
                messanjunior08@gmail.com <br /> devFrontjunior@gmail.com
              </p>
            </div>
            <div className={style.mediaSocial}>
              <button>{<Twitter size={30} />}</button>
              <button>{<Linkedin size={30} />}</button>
              <button>{<Facebook size={30} />}</button>
              <button>{<Instagram size={30} />}</button>
            </div>
          </section>
          <section className={style.footerSectionSocial}>
            <ul>
              <li>
                <h2>Support</h2>
              </li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </section>
          <section className={style.footerSectionSocial}>
            <ul>
              <li>
                <h2>Support</h2>
              </li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </section>
          <section className={style.footerSectionSocial}>
            <ul>
              <li>
                <h2>Support</h2>
              </li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </section>
          <section className={style.footerSectionSocial}>
            <ul>
              <li>
                <h2>Support</h2>
              </li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </section>
        </div>
        <hr />
        <div className={style.copyright}>
          <h4> Copyright {<Copyright />} 2023 - pullo All rights reserved </h4>
        </div>
      </footer>
    </div>
  );
};
export default HeaderFooter;
