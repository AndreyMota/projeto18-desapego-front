import { useState } from "react";
import UserContext from "./contexts/userContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
/* import HomePage from "./pages/Home/HomePage";
import AddBook from "./pages/AddBook";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import HistoryPage from "./pages/HistoryPage"; */
import Reader from "./components/Header";
import MyProds from "./pages/MyProducts";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
        <Reader />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="my-products" element={<MyProds />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App