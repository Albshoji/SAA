import {Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import AdmMenu from "./pages/adm/AdmMenu.jsx";
import EditContact from "./pages/adm/EditContact.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import EditBlogPost from "./pages/EditBlogPost.jsx";
import RegisterAdm from "./pages/adm/RegisterAdm.jsx";
import BazarPage from "./pages/BazarPage.jsx";
import Login from "./pages/Login.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path="blog" element={<BlogPage/>}/>
                <Route path="blog/:id" element={<BlogPost/>}/>
                <Route path="bazar" element={<BazarPage/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>

            <Route path="*" element={<NotFound/>}/>

            <Route path="/admin" element={<Layout/>}>
                <Route index element={<AdmMenu/>}/>
                <Route path="blog/:id?" element={<EditBlogPost/>}/>

                <Route path="editarcontato" element={<EditContact/>}/>
                <Route path="cadastro" element={<RegisterAdm/>}/>
            </Route>

        </Routes>
    );
}

export default App
