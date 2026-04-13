import { Plan, TimelineStop } from "@/types/plan";

const BADGE_COLORS: Record<string, string> = {
    "Best Pick": "bg-amber-100 text-amber-800",
    "Chill Vibe": "bg-blue-100 text-blue-800",
    "Hidden Gem": "bg-emerald-100 text-emerald-800",
};

function getBadgeColor(badge: string): string {
    if (BADGE_COLORS[badge]) {
        return BADGE_COLORS[badge];
    }
    return "bg-neutral-100 text-neutral-600";
}

function getMapsUrl(place: string, area: string): string {
    const query = encodeURIComponent(place + " " + area + " Delhi");
    return "https://www.google.com/maps/search/?api=1&query=" + query;
}

interface PlanCardProps {
    plan: Plan;
}

interface StopRowProps {
    stop: TimelineStop;
}

function StopRow({ stop }: StopRowProps) {
    return (
        <div className="flex gap-3 items-start">
            <div className="text-xs font-mono text-neutral-400 pt-0.5 w-14 shrink-0">
                {stop.time}
            </div>
            <div className="flex-1">
                <a
                    href={getMapsUrl(stop.place, stop.area)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-800 hover:text-blue-600 transition-colors"
                >
                    {stop.place} ↗
                </a>
                <p className="text-xs text-neutral-400 mt-0.5">
                    {stop.activity} · {stop.rating} · {stop.area}
                </p>
            </div>
        </div>
    );
}

export default function PlanCard({ plan }: PlanCardProps) {
    return (
        <div className="bg-white rounded-3xl border border-neutral-100 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <span
                        className={
                            "text-xs font-semibold px-2.5 py-1 rounded-full " +
                            getBadgeColor(plan.badge)
                        }
                    >
                        {plan.badge}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                        {plan.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-0.5">
                        {plan.reason}
                    </p>
                </div>
                <div className="shrink-0 text-right">
                    <p className="text-xs text-neutral-400">Est. cost</p>
                    <p className="text-base font-bold text-neutral-800">
                        {plan.costRange}
                    </p>
                </div>
            </div>

            <div className="border-t border-neutral-100" />

            <div className="space-y-3">
                {plan.timeline.map((stop, i) => (
                    <StopRow key={i} stop={stop} />
                ))}
            </div>
        </div>
    );
}