import Tabs from "../../components/Tabs"

export default function Tilt() {
    const tabs = [
        { id: "prevent", label: "Prévention", content: <p>Respiration, routine, limites…</p> },
        { id: "in-game", label: "Pendant la game", content: <p>Reset mental, tempo, pings…</p> },
        { id: "post", label: "Après la game", content: <p>Review, pause, objectifs…</p> },
    ]

    return (
        <section className="page">
            <h2>Gestion du tilt</h2>
            <Tabs tabs={tabs} defaultTabId="prevent" />
        </section>
    )
}
