def clamp(
    value: float,
    minimum: float = 0,
    maximum: float = 100
) -> float:
    return max(minimum, min(value, maximum))


def calculate_saturation_score(
    direct_competitors: int,
    high_similarity: int,
    total_results: int,
    source_count: int,
):
    """
    Calculate market saturation from research signals.

    Higher saturation score = more competitive market.
    Higher market gap score = more opportunity.
    """

    competitor_density = clamp(
        (direct_competitors / 10) * 100
    )

    similarity_pressure = clamp(
        (high_similarity / max(direct_competitors, 1)) * 100
    )

    if total_results > 0:
        relevance_density = (
            direct_competitors / total_results
        ) * 100
    else:
        relevance_density = 0

    relevance_density = clamp(relevance_density)

    source_coverage = clamp(
        (source_count / 3) * 100
    )

    saturation_score = (
        competitor_density * 0.45
        + similarity_pressure * 0.30
        + relevance_density * 0.15
        + source_coverage * 0.10
    )

    saturation_score = round(
        clamp(saturation_score),
        1
    )

    market_gap_score = round(
        100 - saturation_score,
        1
    )

    confidence_score = (
        min(direct_competitors / 5, 1) * 50
        + min(source_count / 3, 1) * 30
        + min(total_results / 10, 1) * 20
    )

    confidence_score = round(
        clamp(confidence_score),
        1
    )

    if saturation_score < 25:
        saturation_level = "Low"

    elif saturation_score < 50:
        saturation_level = "Moderate"

    elif saturation_score < 75:
        saturation_level = "High"

    else:
        saturation_level = "Very High"

    return {
        "saturation_score": saturation_score,
        "saturation_level": saturation_level,
        "competition_density": round(
            competitor_density,
            1
        ),
        "similarity_score": round(
            similarity_pressure,
            1
        ),
        "market_gap_score": market_gap_score,
        "confidence_score": confidence_score,
        "relevant_competitors": direct_competitors,
        "high_similarity_competitors": high_similarity,
    }


def calculate_opportunity_score(
    scoring: dict
) -> dict:
    """
    Convert saturation metrics into a build opportunity score.

    Higher score = stronger opportunity.
    """

    market_gap = float(
        scoring.get("market_gap_score", 0)
    )

    competition = float(
        scoring.get("competition_density", 0)
    )

    similarity = float(
        scoring.get("similarity_score", 0)
    )

    confidence = float(
        scoring.get("confidence_score", 0)
    )

    opportunity_score = (
        market_gap * 0.45
        + (100 - competition) * 0.20
        + (100 - similarity) * 0.15
        + confidence * 0.20
    )

    opportunity_score = round(
        clamp(opportunity_score),
        1
    )

    if opportunity_score >= 71:

        verdict = "BUILD"
        opportunity_level = "Strong Opportunity"

    elif opportunity_score >= 51:

        verdict = "BUILD WITH DIFFERENTIATION"
        opportunity_level = (
            "Promising, but differentiation matters"
        )

    elif opportunity_score >= 31:

        verdict = "BUILD ONLY IF DIFFERENTIATED"
        opportunity_level = "Difficult market"

    else:

        verdict = "DON'T BUILD"
        opportunity_level = "Weak Opportunity"

    scoring["opportunity_score"] = opportunity_score
    scoring["opportunity_level"] = opportunity_level
    scoring["build_verdict"] = verdict

    return scoring