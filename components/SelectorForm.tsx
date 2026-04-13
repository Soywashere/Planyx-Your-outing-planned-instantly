"use client";

import { useState } from "react";

const MOODS = ["Solo", "Date", "Friends", "Family"];
const BUDGETS = ["Under ₹500", "₹500–₹1000", "₹1000–₹2000", "Above ₹2000"];
const TIMES = ["Morning", "Evening", "Night", "Full Day"];

const MOOD_ICONS: Record<string, string> = {
    Solo: "🎧", Date: "💑", Friends: "👯", Family: "🏠",
};
const TIME_ICONS: Record<string, string> = {
    Morning: "🌅", Evening: "🌆", Night: "🌙", "Full Day": "☀️",
};

interface Props {
    onGenerate: (mood: string, budget: string, time: string) => void;
    loading: boolean;
}

export default function SelectorForm({ onGenerate, loading }: Props) {
    const [mood, setMood] = useState("Friends");
    const [budget, setBudget] = useState("₹500–₹1000");
    const [time, setTime] = useState("Evening");

    return (
        <div className="space-y-6">
            <Section label="Who's going?">
                {MOODS.map((m) => (
                    <Chip key={m} label={`${MOOD_ICONS[m]} ${m}`} selected={mood === m} onClick={() => setMood(m)} />
                ))}
            </Section>

            <Section label="Budget per person">
                {BUDGETS.map((b) => (
                    <Chip key={b} label={b} selected={budget === b} onClick={() => setBudget(b)} />
                ))}
            </Section>

            <Section label="Time of day">
                {TIMES.map((t) => (
                    <Chip key={t} label={`${TIME_ICONS[t]} ${t}`} selected={time === t} onClick={() => setTime(t)} />
                ))}
            </Section>

            <button
                onClick={() => onGenerate(mood, budget, time)}
                disabled={loading}
                className="w-full py-4 bg-black text-white rounded-2xl font-semibold text-base hover:bg-neutral-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Planning your outing..." : "✨ Plan My Outing"}
            </button>
        </div>
    );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="text-sm font-medium text-neutral-500 mb-2">{label}</p>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selected
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                }`}
        >
            {label}
        </button>
    );
}