"use client";

import { useState } from "react";
import SelectorForm from "@/components/SelectorForm";
import PlanCard from "@/components/PlanCard";
import { Plan } from "@/types/plan";

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(mood: string, budget: string, time: string) {
    setLoading(true);
    setError("");
    setPlans([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, budget, time }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPlans(data.plans);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Planyx ✦</h1>
          <p className="text-neutral-500 mt-1">Your outing, planned instantly.</p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 p-5 shadow-sm mb-6">
          <SelectorForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {loading && (
          <div className="text-center py-12 space-y-2">
            <div className="text-3xl animate-bounce">🗺️</div>
            <p className="text-neutral-500 text-sm">Finding the best spots for you...</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm text-center py-4">{error}</p>
        )}

        {plans.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
              {plans.length} plans ready
            </p>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
            <button
              onClick={() => setPlans([])}
              className="w-full py-3 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              ← Start over
            </button>
          </div>
        )}
      </div>
    </main>
  );
}