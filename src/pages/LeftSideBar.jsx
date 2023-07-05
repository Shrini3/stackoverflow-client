import {NavLink} from "react-router-dom"
export default function LeftSideBar() {
    return (
        <div className="left-sidebar">
        <section className="left-sidebar-1">
            <NavLink to="/"
             className={({isActive}) => isActive ? "active-link" : null}
            >Home</NavLink>
            <p>PUBLIC</p>
            <section className="left-sidebar-2">
                <NavLink to="/questions"
                 className={({isActive}) => isActive ? "active-link" : null}
                >Questions</NavLink>
                <NavLink to="/tags"
                 className={({isActive}) => isActive ? "active-link" : null}
                >Tags</NavLink>
                <NavLink to="/users"
                 className={({isActive}) => isActive ? "active-link" : null}
                >Users</NavLink>
            </section>
        </section>
        </div>
    )
}