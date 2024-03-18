import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { RecoilRoot } from "recoil";
import { Write } from "./pages/Write";
import { Profile } from "./pages/Profile";
import { UpdateBlog } from "./pages/UpdateBlog";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/profile/update/:slug" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
