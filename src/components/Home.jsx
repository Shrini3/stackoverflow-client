import LeftSideBar from "../pages/LeftSideBar"
import RightSideBar from "../pages/RightSideBar"
export default function Home() {
    return (
        <main className="homepage">
            <LeftSideBar/>
            <RightSideBar/>
        </main>
    )
}