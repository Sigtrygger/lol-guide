import data from "../../data/champions.json"
import { Link } from "react-router-dom"

export default function Champions() {
    return (
        <section>
            <h2>Champions Optimization</h2>
            <input placeholder="Search..." onChange={() => { }} />
            <ul>
                {data.map(c => (
                    <li key={c.slug}>
                        <Link to={`/optimization/champions/${c.slug}`}>{c.name}</Link> — {c.role}
                    </li>
                ))}
            </ul>
        </section>
    )
}
