import { Outlet, NavLink } from "react-router-dom"

export default function MainLayout() {
    return (
        <div className="app">
            <header className="header">
                <h1>LoL Guide</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/fundamentals">Fundamentals</NavLink>
                    <NavLink to="/lane-jungle">How to Lane/Jungle</NavLink>
                    <NavLink to="/macro">Macro</NavLink>
                    <NavLink to="/optimization">Optimization</NavLink>
                    <NavLink to="/how-to-improve">How to Improve</NavLink>
                    <NavLink to="/external-resources">Resources</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}
