import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Youtube({ id, title }) {
    return (
        <div className="video">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: "100%", aspectRatio: "16/9", border: "0" }}
            />
            <p>{title}</p>
        </div>
    )
}

export default function ChampionDetail() {
    const { slug } = useParams()
    const [champ, setChamp] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        import(`../../data/champions/${slug}.json`)
            .then(mod => setChamp(mod.default))
            .catch(() => setError("Champion non trouvé"))
    }, [slug])

    if (error) return <p>{error}</p>
    if (!champ) return <p>Chargement…</p>

    return (
        <article>
            <h2>{champ.name} — {champ.role}</h2>

            <section>
                <h3>Core Build</h3>
                <ul>{champ.builds.core.map(i => <li key={i}>{i}</li>)}</ul>

                <h4>Situational</h4>
                <ul>{champ.builds.situational.map(i => <li key={i}>{i}</li>)}</ul>
            </section>

            <section>
                <h3>Tips</h3>
                <ul>{champ.tips.map(t => <li key={t}>{t}</li>)}</ul>
            </section>

            <section>
                <h3>Combos</h3>
                <ul>{champ.combos.map(c => <li key={c}>{c}</li>)}</ul>
            </section>

            {champ.videos?.length > 0 && (
                <section>
                    <h3>Vidéos</h3>
                    {champ.videos.map(v => (
                        <Youtube key={v.youtubeId} id={v.youtubeId} title={v.title} />
                    ))}
                </section>
            )}
        </article>
    )
}
