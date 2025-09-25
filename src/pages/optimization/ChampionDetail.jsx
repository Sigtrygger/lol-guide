import { useParams } from "react-router-dom"
import data from "../../data/champions.json"

export default function ChampionDetail() {
    const { slug } = useParams()
    const champ = data.find(c => c.slug === slug)

    if (!champ) return <p>Champion not found.</p>

    return (
        <article>
            <h2>{champ.name} — {champ.role}</h2>

            <h3>Core Build</h3>
            <ul>{champ.builds.core.map(i => <li key={i}>{i}</li>)}</ul>

            <h3>Situational</h3>
            <ul>{champ.builds.situational.map(i => <li key={i}>{i}</li>)}</ul>

            <h3>Combos</h3>
            <ul>{champ.combos.map(c => <li key={c}>{c}</li>)}</ul>

            <h3>Tips</h3>
            <ul>{champ.tips.map(t => <li key={t}>{t}</li>)}</ul>
        </article>
    )
}
