const database = require("../config/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer  = require('multer')
/* const upload = multer({ dest: 'uploads/' }) */
require("dotenv").config();



exports.inscription = (req, res) => {
 

        
        let inscription_user = "insert into utilisateurs (nom_user,prenom_user,pseudo_user,photo_user,email_user,password_user) VALUES(?,?,?,?,?,?);"
        bcrypt.hash(req.body.password_user, 5)
        .then((hash) => {
            database.query(inscription_user, [req.body.nom_user, req.body.prenom_user, req.body.pseudo_user, req.body.photo_user, req.body.email_user, hash], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({error: "erreur lors de l'inscription"});
                } else {
                    console.log(req.body);
                    res.status(201).json({hash: hash});
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };



exports.connexion=(req,res)=>{
    let rechercheutilisateur = "SELECT * FROM utilisateurs WHERE email_user = ?";
    
    database.query(rechercheutilisateur,[req.body.email_user],(error,result)=>{
        if(error){
            res.status(500).json(error)
            return;
        }

        if(result.length>0){

            bcrypt.compare(req.body.password_user, result[0].password_user )
            .then((valid)=>{
                if(valid){
                    let id_user_id = result[0].id_user
                    let accessToken = jwt.sign(
                        {id_user:result[0].id_user},
                        "12345678",
                        {expiresIn:"72h"}
                    );
                    res.status(200).json({accessToken,id_user_id});
                }
                else{
                    res.status(200).json({error:"Mot de passe ou email incorrect"})
                }

                
            })
            .catch((error)=>{
                console.log(error)
                res.status(500).json({error :"erreur lors de la comparaison"});
            });
        
}else{
    res.status(404).json({error:"Utilsateur introuvable"})
}
    });
};

exports.selection = (req,res)=>{
    const sql = 'SELECT * FROM utilisateurs where id_user=?;'
    database.query(sql,[req.body.id_user],(error,result)=>{
        if(error){
            res.status(403).json({error:"l'id n'ait pas parvenu"})
        }
        else{
            res.status(203).json(result[0])
        }
    })
}

exports.modifications =(req,res)=>{
   let  requetes = "UPDATE utilisateurs set nom_user =? prenom_user=? pseudo_user=? photo_user=? email_user = ? where id_user = ? ;"
    database.query(requetes,[req.body.nom_user,req.body.prenom_user,req.body.pseudo_user,req.body.photo_user,req.body.email_user,req.body.id_user],(error,result)=>{
        if(error){
            res.status(403).json({error:"l'id n'ait pas parvenu"})
        }
        else{
            res.status(203).json(result)
        }
    })
  
   
}
exports.touuser =(req,res)=>{
    let requetssss = "select * from utilisateurs"
    database.query(requetssss,(error,result)=>{
        if(error){
            res.status(403).json({error:"non la "})
        }
        else{
            res.status(203).json(result)
        }
    })
}

exports.AjoutCategories =(req,res)=>{
    let sql = "insert into categories (nom_categorie,photo_categorie) VALUES(?,?);"

    database.query(sql,[req.body.nom_categorie,req.body.photo_categorie],(error,result)=>{
        if(error){
            res.status(403).json({erreur:"categorie non ajouter"})
        }
        else{
            res.status(201).json(result)
        }
    })
}

exports.AllCategories =(req,res)=>{
    let sql = "select * from categories;"
    database.query(sql,(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
            res.status(203).json(result)
        }
    })
}

exports.addpublication =(req,res)=>{

    let sql = "insert into publication(id_categorie,id_user,titre_publication,description_publication,photo_publication) VALUES(?,?,?,?,?);"

    database.query(sql,[req.body.id_categorie,req.body.id_user,req.body.titre_publication,req.body.description_publication,req.body.photo_publication],(error,result)=>{
        if(error){
            res.status(403).json(error)
            
        }
        else{
            res.status(203).json(result)
            
        }
    })
}

exports.getPublicationspecify = (req,res)=>{

    let sql = "select publication.*,categories.*, utilisateurs.* from publication join categories on publication.id_categorie = categories.id_categorie join utilisateurs ON publication.id_user = utilisateurs.id_user where categories.id_categorie = ?;"

    database.query(sql,[req.body.id_categorie],(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
            res.status(203).json(result)
        }
    })

}

exports.getpublicationDescription =(req,res)=>{
    let sql = "select * from publication where id_publication = ?;"

    database.query(sql,[req.body.id_publication],(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
            //console.log("Resultat de la requete : ", result[0].description);
            res.status(201).send(result)
            
        }
    })
}

exports.insertComment =(req,res)=>{
    let sql = "INSERT INTO commentaires (id_publication,id_user,contenu_commentaire) VALUES(?,?,?)"

    database.query(sql,[req.body.id_publication,req.body.id_user,req.body.contenu_commentaire],(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
          
            res.status(201).send(result)
            
        }
    })
}

exports.getCommentairesSpecifyPublications =(req,res)=>{
    let sql ="SELECT publication.*,utilisateurs.*,commentaires.* from commentaires join utilisateurs on commentaires.id_user = utilisateurs.id_user join publication  on commentaires.id_publication = publication.id_publication WHERE publication.id_publication = ? ORDER BY id_commentaire desc LIMIT 100 ;"
    database.query(sql,[req.body.id_publication],(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
          
            res.status(201).send(result)
            
        }
    })
}

exports.getLastPublication =(req,res)=>{
    let sql = "SELECT publication.*, utilisateurs.* FROM publication JOIN utilisateurs ON publication.id_user = utilisateurs.id_user order by publication.date_publication desc limit 1;"
    database.query(sql,(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
          
            res.status(201).send(result)
            
        }
        
    })
}
exports.getallPUblication = (req,res)=>{
    let sql = "SELECT publication.*, utilisateurs.* FROM publication  JOIN utilisateurs ON publication.id_user = utilisateurs.id_user ORDER BY id_publication desc   LIMIT 100"
    database.query(sql,(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
          
            res.status(201).send(result)
            
        }
})}

exports.getmostPUblicatores =(req,res)=>{
    let sql = "SELECT utilisateurs.*, COUNT(publication.id_publication) AS nombre_publications FROM utilisateurs JOIN publication ON utilisateurs.id_user = publication.id_user GROUP BY utilisateurs.id_user ORDER BY nombre_publications DESC LIMIT 5;"
    database.query(sql,(error,result)=>{
        if(error){
            res.status(403).json(error)
        }
        else{
          
            res.status(201).send(result)
            
        }
    })}

/* exports.getforsearch = (req,res)=>{
    let sql = "SELECT * FROM publication WHERE description_publication LIKE '%?%'"
    database.query(sql,[req.body.search],(error,result)=>{
        if(error){
            res.status(403).json(error)
            console.log(error)
        }
        else{
          
            res.status(201).send(result)
            console.log(result)
            
        }

    })
} */
exports.getforsearch = (req, res) => {
    let sql = "SELECT publications.*, utilisateurs.* FROM publication AS publications JOIN utilisateurs ON utilisateurs.id_user = publications.id_user WHERE publications.description_publication LIKE ? ORDER BY DATE_FORMAT(publications.date_publication, '%d/%m/%Y') DESC;"
    // Note: Utilisez le paramètre de recherche avec le caractère joker % pour correspondre à n'importe quelle partie de la description.
    let searchQuery = `%${req.body.search}%`;
    database.query(sql, [searchQuery], (error, result) => {
        if (error) {
            res.status(403).json(error);
           /*  console.log(error); */
        } else {
            res.status(201).send(result);
            console.log(result);
        }
    })};

    exports.getPUblicationsforuser=(req,res)=>{
        let sql = "SELECT publications.*, utilisateurs.* FROM publication AS publications JOIN utilisateurs ON utilisateurs.id_user = publications.id_user WHERE utilisateurs.id_user=?;"

        database.query(sql,[req.body.id_user],(error,result)=>{
            if (error) {
                res.status(403).json(error);
               /*  console.log(error); */
            } else {
                res.status(201).send(result);
               /*  console.log(result); */
            }
        })
    }