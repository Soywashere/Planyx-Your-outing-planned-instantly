export interface TimelineStop {
    time: string;
    place: string;
    activity: string;
    rating: string;
    area: string;
}

export interface Plan {
    id: number;
    badge: string;
    title: string;
    reason: string;
    costRange: string;
    timeline: TimelineStop[];
}