import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Navbar"

function MainLayout() {
  return (
    <div className="bg-gray-100">
        <header className="h-[110px] bg-white shadow-sm">
            <Navbar />
        </header>
        <main className="h-screen mx-[100px] my-10">
            <Outlet />
        </main>
    </div>
  )
}

export default MainLayout