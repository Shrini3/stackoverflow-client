import { Outlet } from "react-router-dom"
import LeftSideBar from "../pages/LeftSideBar"
import RightSideBar from "../pages/RightSideBar"
export default function Home() {
    return (
        <main className="homepage">
            <LeftSideBar/>
            <section className="homepage-maindiv">
                <Outlet />
            </section>
            <RightSideBar/>
        </main>
    )
}