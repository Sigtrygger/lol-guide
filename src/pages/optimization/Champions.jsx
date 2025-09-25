import { useState } from "react"
import { Link } from "react-router-dom"
import champions from "../../data/champions.index.json"

export default function Champions() {
    const [query, setQuery] = useState("")

    const filtered = champions.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <section>
            <h2>Champions Optimization</h2>
            <input
                type="text"
                placeholder="Rechercher un champion…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ margin: "1rem 0", padding: ".5rem", width: "100%" }}
            />

            <ul>
                {filtered.map(c => (
                    <li key={c.slug}>
                        <Link to={`/optimization/champions/${c.slug}`}>
                            {c.name} — {c.role}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
