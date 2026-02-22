export interface FdResult {
    maturityAmount: number
    totalInterest: number
    effectiveYield: number
    yearlyBreakdown: FdYearlyBreakdown[]
}

export interface FdYearlyBreakdown {
    year: number
    openingBalance: number
    interestEarned: number
    closingBalance: number
}

export type CompoundingFrequency = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'

const frequencyMap: Record<CompoundingFrequency, number> = {
    monthly: 12,
    quarterly: 4,
    'half-yearly': 2,
    yearly: 1,
}

export function useFdCalculator() {
    /**
     * Calculate FD maturity with compound interest.
     * Formula: A = P × (1 + r/n)^(n × t)
     *   P = principal
     *   r = annual rate / 100
     *   n = compounding frequency per year
     *   t = time in years
     */
    function calculateFd(
        principal: number,
        annualRate: number,
        tenureMonths: number,
        compounding: CompoundingFrequency = 'quarterly',
    ): FdResult {
        if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
            return { maturityAmount: 0, totalInterest: 0, effectiveYield: 0, yearlyBreakdown: [] }
        }

        const r = annualRate / 100
        const n = frequencyMap[compounding]
        const totalYears = tenureMonths / 12

        // Overall maturity
        const maturityAmount = principal * Math.pow(1 + r / n, n * totalYears)
        const totalInterest = maturityAmount - principal

        // Effective annual yield
        const effectiveYield = (Math.pow(1 + r / n, n) - 1) * 100

        // Year-by-year breakdown
        const yearlyBreakdown: FdYearlyBreakdown[] = []
        const fullYears = Math.floor(totalYears)
        const fractionalYear = totalYears - fullYears

        let balance = principal

        for (let year = 1; year <= fullYears; year++) {
            const opening = balance
            const closing = opening * Math.pow(1 + r / n, n)
            const interestEarned = closing - opening
            balance = closing

            yearlyBreakdown.push({
                year,
                openingBalance: Math.round(opening * 100) / 100,
                interestEarned: Math.round(interestEarned * 100) / 100,
                closingBalance: Math.round(closing * 100) / 100,
            })
        }

        // Handle fractional year (e.g., 18 months = 1 full year + 0.5 year)
        if (fractionalYear > 0) {
            const opening = balance
            const periods = n * fractionalYear
            const closing = opening * Math.pow(1 + r / n, periods)
            const interestEarned = closing - opening

            yearlyBreakdown.push({
                year: fullYears + 1,
                openingBalance: Math.round(opening * 100) / 100,
                interestEarned: Math.round(interestEarned * 100) / 100,
                closingBalance: Math.round(closing * 100) / 100,
            })
        }

        return {
            maturityAmount: Math.round(maturityAmount * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
            effectiveYield: Math.round(effectiveYield * 100) / 100,
            yearlyBreakdown,
        }
    }

    return { calculateFd }
}
