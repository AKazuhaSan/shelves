import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import ScanISBN from "./API/ScanISBN";

export default function App() {
  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/scan" element={<ScanISBN/>}/>
      </Routes>
    </BrowserRouter>
  )
}