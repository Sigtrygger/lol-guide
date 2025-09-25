import React, { useEffect, useMemo, useState } from "react"

/**
 * Table of Contents (auto)
 * Scanne les <h2>/<h3> (configurable), génère des ancres s'il en manque,
 * observe la section active et applique .is-active au lien courant.
 *
 * Props:
 * - selector?: string (défaut: 'main h2, main h3')
 * - offset?: number (pixels top offset pour le scroll; ex: header fixe)
 * - title?: string (titre du bloc)
 * - scope?: Element | null (si tu veux limiter le scan à un conteneur précis)
 */
export default function Toc({ selector = "main h2, main h3", offset = 80, title = "Sommaire", scope = null }) {
    const [items, setItems] = useState([])
    const [activeId, setActiveId] = useState(null)

    // slugify simple
    const slug = (txt) =>
        txt.toLowerCase()
            .replace(/[\s]+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-+/g, "-")
            .replace(/^\-+|\-+$/g, "")

    useEffect(() => {
        const root = scope || document
        const heads = Array.from(root.querySelectorAll(selector))

        const mapped = heads.map(h => {
            if (!h.id) {
                h.id = slug(h.textContent || "section")
            }
            return {
                id: h.id,
                text: h.textContent || "",
                level: h.tagName.toLowerCase(), // "h2" | "h3" ...
            }
        })
        setItems(mapped)

        // Scroll spy
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: `-${offset + 1}px 0px -60% 0px`, // déclenche un peu avant le top
                threshold: [0, 1.0],
            }
        )
        heads.forEach((h) => obs.observe(h))
        return () => obs.disconnect()
    }, [selector, offset, scope])

    const onClick = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.history.replaceState(null, "", `#${id}`)
        window.scrollTo({ top, behavior: "smooth" })
    }

    const hasItems = items.length > 0
    const depth = useMemo(() => {
        // calcule indentation (h2 = 0, h3 = 1, h4 = 2…)
        const min = Math.min(...items.map(i => Number(i.level.replace("h", ""))))
        return (lvl) => Number(lvl.replace("h", "")) - min
    }, [items])

    if (!hasItems) return null

    return (
        <aside className="toc">
            <div className="toc-title">{title}</div>
            <nav aria-label="Table of contents">
                <ul className="toc-list">
                    {items.map((it) => (
                        <li
                            key={it.id}
                            className={`toc-item ${activeId === it.id ? "is-active" : ""}`}
                            style={{ paddingLeft: `${depth(it.level) * 16}px` }}
                        >
                            <a href={`#${it.id}`} onClick={(e) => onClick(e, it.id)}>
                                {it.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
