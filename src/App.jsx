import { Routes, Route, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home.jsx";
import Bases from "./pages/Bases.jsx";

const pageAnim = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex gap-4">
          <Brand />
          <Nav to="/" label="Accueil" />
          <Nav to="/bases" label="Bases" />
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/bases" element={<Page><Bases /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
function Page({ children }) {
  return <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>{children}</motion.div>;
}
function Nav({ to, label }) {
  return (
    <NavLink to={to} className={({ isActive }) =>
      "px-2 py-1 rounded hover:bg-zinc-900 " + (isActive ? "bg-zinc-900" : "")
    }>{label}</NavLink>
  );
}
function Brand() { return <span className="mr-4 font-semibold">LoL Guide</span>; }
