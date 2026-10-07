"use client"

import ProgressRing from "./ProgressRing"

interface MarketValidationProps {
    scoring: {
        saturation_score?: number
        saturation_level?: string
        opportunity_score?: number
        verdict?: string
        opportunity_verdict?: string
        competition_density?: number
        similarity_score?: number
        market_gap_score?: number
        confidence_score?: number
        relevant_competitors?: number
        high_similarity_competitors?: number
    }
}

const MarketValidation = ({ scoring }: MarketValidationProps) => {
    const opportunityScore = scoring.opportunity_score ?? 0

    const verdict =
        scoring.verdict ||
        scoring.opportunity_verdict ||
        "UNKNOWN"

    return (
        <div className="border-t border-[#30363d] pt-4 space-y-5">
            <div className="text-center">
                <h2 className="text-sm font-semibold tracking-wide text-[#f0f6fc]">
                    MARKET VALIDATION
                </h2>

                <p className="mt-3 text-sm font-medium text-[#f0f6fc]">
                    Overall opportunity
                </p>

                <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-[#8b949e]">
                    Based on competition, market gap, similarity and research confidence.
                </p>
            </div>

            <ProgressRing
                label="Opportunity Score"
                description="Overall opportunity based on market gap, competition, similarity and research confidence."
                value={opportunityScore}
                size="lg"
                verdict={verdict}
            />

            <div className="border-t border-[#30363d] pt-5">
                <div className="grid grid-cols-2 gap-6">
                    <ProgressRing
                        label="Market Gap"
                        description="How much room exists for a differentiated product."
                        value={scoring.market_gap_score ?? 0}
                    />

                    <ProgressRing
                        label="Competition"
                        description="How crowded the market is with competing products."
                        value={scoring.competition_density ?? 0}
                    />

                    <ProgressRing
                        label="Similarity"
                        description="How closely existing products match your idea."
                        value={scoring.similarity_score ?? 0}
                    />

                    <ProgressRing
                        label="Confidence"
                        description="Strength and coverage of the research evidence."
                        value={scoring.confidence_score ?? 0}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 border-t border-[#30363d] pt-4 text-xs text-[#8b949e]">
                <span>
                    Direct competitors:{" "}
                    <span className="font-medium text-[#f0f6fc]">
                        {scoring.relevant_competitors ?? 0}
                    </span>
                </span>

                <span>
                    High similarity:{" "}
                    <span className="font-medium text-[#f0f6fc]">
                        {scoring.high_similarity_competitors ?? 0}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default MarketValidation