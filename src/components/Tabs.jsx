import React, { useEffect, useId, useRef, useState } from "react"

/**
 * Tabs component
 * Props:
 * - tabs: Array<{ id?: string, label: string, content: ReactNode }>
 * - defaultTabId?: string
 * - onChange?: (tabId: string) => void
 *
 * Usage:
 * const tabs = [
 *   { id: "intro", label: "Intro", content: <p>…</p> },
 *   { id: "tips",  label: "Tips",  content: <Tips /> },
 * ]
 * <Tabs tabs={tabs} defaultTabId="intro" />
 */
export default function Tabs({ tabs = [], defaultTabId, onChange }) {
    const autoId = useId()
    const [activeId, setActiveId] = useState(defaultTabId || tabs[0]?.id || "tab-0")
    const listRef = useRef(null)

    const getId = (i, tab) => tab.id || `tab-${i}`
    const panelId = (id) => `${id}-panel`

    useEffect(() => {
        if (!tabs.length) return
        if (!tabs.some(t => (t.id || `tab-${tabs.indexOf(t)}`) === activeId)) {
            setActiveId(getId(0, tabs[0]))
        }
    }, [tabs]) // eslint-disable-line react-hooks/exhaustive-deps

    const activate = (id) => {
        setActiveId(id)
        onChange?.(id)
    }

    const onKeyDown = (e) => {
        const items = Array.from(listRef.current?.querySelectorAll('[role="tab"]') || [])
        const idx = items.findIndex(el => el.getAttribute("data-id") === activeId)
        const clamp = (n) => (n + items.length) % items.length

        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown": {
                e.preventDefault()
                const next = items[clamp(idx + 1)]
                next?.focus()
                activate(next?.getAttribute("data-id"))
                break
            }
            case "ArrowLeft":
            case "ArrowUp": {
                e.preventDefault()
                const prev = items[clamp(idx - 1)]
                prev?.focus()
                activate(prev?.getAttribute("data-id"))
                break
            }
            case "Home":
                e.preventDefault()
                items[0]?.focus()
                activate(items[0]?.getAttribute("data-id"))
                break
            case "End":
                e.preventDefault()
                items[items.length - 1]?.focus()
                activate(items[items.length - 1]?.getAttribute("data-id"))
                break
            case " ":
            case "Enter":
                e.preventDefault()
                break
            default:
                break
        }
    }

    return (
        <div className="tabs">
            <div
                className="tabs-list"
                role="tablist"
                aria-label={`Tabs-${autoId}`}
                ref={listRef}
                onKeyDown={onKeyDown}
            >
                {tabs.map((tab, i) => {
                    const id = getId(i, tab)
                    const selected = id === activeId
                    return (
                        <button
                            key={id}
                            role="tab"
                            className={`tab ${selected ? "is-active" : ""}`}
                            aria-selected={selected}
                            aria-controls={panelId(id)}
                            id={id}
                            data-id={id}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => activate(id)}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {tabs.map((tab, i) => {
                const id = getId(i, tab)
                const hidden = id !== activeId
                return (
                    <div
                        key={id}
                        role="tabpanel"
                        id={panelId(id)}
                        aria-labelledby={id}
                        hidden={hidden}
                        className="tab-panel"
                    >
                        {!hidden && tab.content}
                    </div>
                )
            })}
        </div>
    )
}
