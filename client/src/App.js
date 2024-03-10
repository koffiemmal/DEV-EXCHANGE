import "./App.css";
import { UserContextProvider } from "./components/Context/UserContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderFooter from "./components/Layouts/HeaderFooter";
import Acceuil from "./components/Pages/Acceuil/Acceuil";
import Categories from "./components/Pages/Categories/Categories";
import Description from "./components/Pages/PagesdeDescription/Description";
import Connexion from "./components/Pages/Connexion/Connexion";
import Signin from "./components/Pages/SignIN/Signin";
import Profile from "./components/Pages/Profile/Profile";
import ProfileAddPost from "./components/Pages/Profile/ProfileAddPost";
import AddCategories from "./components/Pages/AJoutCategories/AddCategories";
import ProtectedRoute from "./components/Pages/ProtectedRoute/ProtectedRoute";
import CategoriesIndex from "./components/Pages/Categories/Categories copy";
import SearchPlace from "./components/Pages/Categories/SearchPlace";
function App() {
  return (
    <BrowserRouter>
  {/*   <UserContextProvider> */}
          <UserContextProvider>
      <Routes>
        <Route path="/" element={<HeaderFooter />}>
          <Route index element={<Acceuil />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Signin />} />

  
          <Route path="/Profile" element={<Profile />} />
          <Route path="addPost" element={<ProfileAddPost />} />

          <Route path="addPost/:id_publication" element={<Description/>}/>



          <Route path="/Categories" element={<Categories />} />

          <Route  path="/search" element={<SearchPlace/>} />

          <Route path="/search/:id_publication" element={<ProtectedRoute/>}>

<Route index element={<Description/>}/>

          </Route>
          
         
          <Route
            path="/Categories/:id_categorie/:id_publication"
            element={<ProtectedRoute />}
            >

<Route index element={<Description/>}/>

          </Route>
 
          <Route
            path="Categories/:id_categorie"
            element={<CategoriesIndex />}
            />

          <Route path="Add" element={<AddCategories />} />

          


         
        </Route>
      </Routes>

</UserContextProvider>

    </BrowserRouter>
  );
}

export default App;
