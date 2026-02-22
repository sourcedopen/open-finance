export interface EmiResult {
    emi: number
    totalInterest: number
    totalPayment: number
    monthlyBreakdown: MonthlyBreakdown[]
}

export interface MonthlyBreakdown {
    month: number
    emi: number
    principal: number
    interest: number
    balance: number
}

export function useEmiCalculator() {
    /**
     * Calculate EMI using the standard formula:
     * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
     * Where:
     *   P = Principal loan amount
     *   r = Monthly interest rate (annual rate / 12 / 100)
     *   n = Number of months (tenure)
     */
    function calculateEmi(principal: number, annualRate: number, tenureMonths: number): EmiResult {
        if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
            return { emi: 0, totalInterest: 0, totalPayment: 0, monthlyBreakdown: [] }
        }

        const monthlyRate = annualRate / 12 / 100
        const n = tenureMonths

        const emi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1)

        const totalPayment = emi * n
        const totalInterest = totalPayment - principal

        // Generate monthly amortization schedule
        const monthlyBreakdown: MonthlyBreakdown[] = []
        let balance = principal

        for (let month = 1; month <= n; month++) {
            const interestPart = balance * monthlyRate
            const principalPart = emi - interestPart
            balance = balance - principalPart

            monthlyBreakdown.push({
                month,
                emi: Math.round(emi * 100) / 100,
                principal: Math.round(principalPart * 100) / 100,
                interest: Math.round(interestPart * 100) / 100,
                balance: Math.max(0, Math.round(balance * 100) / 100),
            })
        }

        return {
            emi: Math.round(emi * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
            totalPayment: Math.round(totalPayment * 100) / 100,
            monthlyBreakdown,
        }
    }

    /**
     * Compare balance transfer scenario
     */
    function compareBalanceTransfer(
        loanAmount: number,
        currentRoi: number,
        currentTenure: number,
        newRoi: number,
        newTenure: number,
        exitCharge: number,
        processingCharge: number,
    ) {
        const current = calculateEmi(loanAmount, currentRoi, currentTenure)
        const newLoan = calculateEmi(loanAmount, newRoi, newTenure)

        const currentTotalCost = current.totalPayment
        const newTotalCost = newLoan.totalPayment + exitCharge + processingCharge
        const savings = currentTotalCost - newTotalCost

        return {
            current,
            newLoan,
            exitCharge,
            processingCharge,
            currentTotalCost: Math.round(currentTotalCost * 100) / 100,
            newTotalCost: Math.round(newTotalCost * 100) / 100,
            savings: Math.round(savings * 100) / 100,
            isTransferBeneficial: savings > 0,
        }
    }

    return {
        calculateEmi,
        compareBalanceTransfer,
    }
}
