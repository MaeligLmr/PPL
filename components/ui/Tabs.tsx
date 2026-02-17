'use client'

import { ReactNode } from 'react'

export type TabItem = {
    key: string
    label: string
    content: ReactNode
}

type TabsProps = {
    items: TabItem[]
    activeKey: string
    onChange: (key: string) => void
}

export default function Tabs({ items, activeKey, onChange }: TabsProps) {
    return (
        <div className="tabs-container">
            {/* Navigation des onglets */}
            <div className="tabs-nav">
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={`tab-button ${activeKey === item.key ? 'tab-button--active' : ''}`}
                        onClick={() => onChange(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Contenu de l'onglet actif */}
            <div className="tab-content">
                {items.find(item => item.key === activeKey)?.content}
            </div>
        </div>
    )
}
