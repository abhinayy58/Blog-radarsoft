import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import BlogDescription from "./pages/BlogDescription";
const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDescription />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
