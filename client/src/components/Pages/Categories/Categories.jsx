import style from '../Categories/Categories.module.css'
import { Menu, ThumbsDown, ThumbsUp, User,SlidersHorizontalIcon } from 'lucide-react';
/* import Carousel from 'nuka-carousel'; */
import axios from '../../../Api/axios';

import logo from '../../assets/8220185645_dd4c773717-removebg-preview.png'
import { useNavigate ,Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
const Categories = () =>{
    const navigate = useNavigate()
    let [categorie,setcategorie] =useState()

    let [lastPublication,setLastPublication] = useState()

    let [allpublication,setAllpublication]=useState()

    let [mostPubli,setMost] = useState()

    let handleClikDEscription=()=>{
        navigate('/Description');
    }
    useEffect(()=>{
        axios.get('/user/AllCategories')
        .then((res)=>{
            
            setcategorie(res.data)
        })
        .catch((er)=>{
            console.log(er)
        })
        
            // Effectue une requête GET vers le backend pour récupérer la liste des images
            axios('/getImages')
            .then((res)=>{
             
            })
            axios.get("/user/getLastPublication")
            .then((res)=>{
                setLastPublication(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

            axios.get("/user/getallPUblication")
            .then((res)=>{
               
                setAllpublication(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
            axios.get("/user/getmostPUblicatores")
            .then((res) => {
              setMost(res.data)
              })
              .catch((er) => {
                console.log(er);
              });
        
    },[])

    
    
 
 

    return(
        <div className={style.Categories}>

           <div className={style.categorie}>
            <div className={style.forums}>
                <section className={style.titre}><h2>CATEGORIES</h2>{<Menu/>}</section>
                <section className={style.listeCategories}>
                    {categorie && categorie.map((categories,index)=>{
                     
                        return(
                            <section key={index}>
                    <article className={style.logocategoriesimages}><img src={'http://localhost:5000/images/'+categories.photo_categorie} alt="" /></article>
                    <article className={style.logonom}><p>{categories.nom_categorie}</p></article>
                    <button className={style.buttonplus}> <Link to={`${categories.id_categorie}`}> <SlidersHorizontalIcon/> </Link> </button>
                   </section>
                        )
                    })}
                  {/*  <section>
                    <article className={style.logocategories}><img src={logo} alt="" /></article>
                    <article className={style.logonom}><p>HTML 5</p></article>
                    
                   </section> */}
                    
                  
                </section>
            </div>
            <div className={style.mostPopular}>
                <h2>most popular</h2>
              
               {/*  <section>
               <Carousel slideIndex={0} cellSpacing={50} slidesToShow={3} autoplay={true} speed={500} >
                        <article><h2>html</h2></article>
                        <article><h3>ccc</h3></article>
                        <article><h2>html</h2></article>
                        <article><h3>ccc</h3></article>      <article><h2>html</h2></article>
                        <article><h3>ccc</h3></article>
                    </Carousel> 
                </section> */}
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
           {lastPublication && lastPublication.map((last,index)=>{
            return(
                <div className={style.newspost} key={index} >
     
                <section className={style.images}>
                <img src={'http://localhost:5000/images/'+last.photo_publication} alt="" />
                </section>
                <section className={style.informations}>
                  <section className={style.TitleAndDate}>
                    <section className={style.Title}><h2>{last.titre_publication}</h2></section>
                    <section className={style.Date}>
                        <article><p>{last.date_publication}</p></article>
                    </section>
                  </section>
                  <section className={style.Description}><p>{last.description_publication}</p></section>
                  <section className={style.UserAndJaime}>
                    <section className={style.UserInformations}>
                        <section className={style.photo}> <img src={'http://localhost:5000/images/'+last.photo_user} alt="" /></section>
                        <section className={style.nom_user}><h3>{last.nom_user}</h3></section>
    
                    </section>
                   
                   <section>
                   <button className={style.voirplus}><Link to={`${last.id_categorie}`}>Voir PLus</Link></button>
                   </section>
                    <section className={style.Like}>
                    <section className={style.jaime}>
                        <button><ThumbsUp/></button>
                        <article><p>12</p></article>
                    </section>
                    <section className={style.nonjaime}>
                    <button><ThumbsDown/></button>
                        <article><p>12</p></article>
                    </section>
                    </section>
                  </section>
                </section>
           
                </div>
            )
           })}
            <div className={style.Allpost}>


           {allpublication && allpublication.map((publications,index)=>{
            return(
              
                <article className={style.postArticle} key={index}>
                <section className={style.images_article}>  <img src={'http://localhost:5000/images/'+publications.photo_publication} alt="" /></section>
                <section className={style.informations_article}>
                <section className={style.photo}> <img src={'http://localhost:5000/images/'+publications.photo_user} alt="" /></section>
                <section className={style.nom_user}><p>{publications.nom_user}</p></section>
               
                <section className={style.Date}>
                    <article><p>{publications.date_publication}</p></article>
                </section>
                </section>
                <section className={style.description_article}><p>{publications.description_publication}</p></section>
                <button className={style.voirplus} ><Link to={`${publications.id_categorie}`}>Voir PLus</Link></button>
            </article>
            
            )
           })}
          
    
              
            </div>
            <br />
           </div>

        </div>
    )
}
export default Categories;
   