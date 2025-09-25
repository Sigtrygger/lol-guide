import Toc from "../../components/Toc"

export default function WaveManagement() {
    return (
        <div className="page with-aside">
            <article>
                <h2>Principes clés</h2>
                <p>…</p>

                <h2>Freeze</h2>
                <h3>Quand le faire</h3>
                <p>…</p>
                <h3>Comment le tenir</h3>
                <p>…</p>

                <h2>Slow Push</h2>
                <h3>Setups</h3>
                <p>…</p>
                <h3>Transitions objectifs</h3>
                <p>…</p>

                <h2>Fast Push</h2>
                <p>…</p>
            </article>

            <aside>
                <Toc selector="article h2, article h3" title="Sur cette page" offset={80} />
            </aside>
        </div>
    )
}
