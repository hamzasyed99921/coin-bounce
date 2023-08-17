import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Base from './components/Layouts/Base';
import Crypto from './pages/Crypto/Crypto';
import Protected from './components/Protected/Protected';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import SignUp from './pages/SignUp/SignUp';
import Blogs from './pages/Blogs/Blogs';
import SubmitBlog from './pages/SubmitBlog/SubmitBlog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';

function App() {

  
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className="App">
       <BrowserRouter>
      <Base >
        <Routes>
          <Route  path="/" element={<Home/>} />
          {/* <Route  path="/crypto" element={<Crypto/>} /> */}
          <Route  path="/blogs" element={ <Protected isAuth={isAuth}><Blogs/></Protected>} />
          <Route  path="/blog/:id" element={ <Protected isAuth={isAuth}><BlogDetails/></Protected>} />
          <Route  path="/blog-update/:id" element={ <Protected isAuth={isAuth}><UpdateBlog/></Protected>} />
          <Route  path="/submit" element={ <Protected isAuth={isAuth}><SubmitBlog/></Protected>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/signup" element={<SignUp/>} />
          <Route path="/*" element={<PageNotFound />}/>
        </Routes>
      </Base>
    </BrowserRouter>
    </div>
  );
}

export default App;
