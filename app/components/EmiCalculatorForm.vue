<script setup lang="ts">
const { calculateEmi } = useEmiCalculator()

// Form state
const loanAmount = ref<number>(1500000)
const roi = ref<number>(9.5)
const tenure = ref<number>(240)

// Computed result
const result = computed(() => {
  return calculateEmi(loanAmount.value, roi.value, tenure.value)
})

// Format currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
        EMI Calculator
      </h1>
      <p class="text-base-content/60 mt-2 text-lg">
        Calculate your monthly EMI and view a detailed amortization schedule.
      </p>
    </div>

    <!-- Input + Summary Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

      <!-- Input Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-secondary gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Loan Details
          </h2>

          <div class="form-control mt-4">
            <label class="label" for="emiLoanAmount">
              <span class="label-text font-medium">Loan Amount (₹)</span>
            </label>
            <input
              id="emiLoanAmount"
              v-model.number="loanAmount"
              type="number"
              min="0"
              step="10000"
              placeholder="e.g., 1500000"
              class="input input-bordered input-secondary w-full"
            />
          </div>

          <div class="form-control mt-3">
            <label class="label" for="emiRoi">
              <span class="label-text font-medium">Rate of Interest (% p.a.)</span>
            </label>
            <input
              id="emiRoi"
              v-model.number="roi"
              type="number"
              min="0"
              max="50"
              step="0.1"
              placeholder="e.g., 9.5"
              class="input input-bordered input-secondary w-full"
            />
          </div>

          <div class="form-control mt-3">
            <label class="label" for="emiTenure">
              <span class="label-text font-medium">Tenure (months)</span>
            </label>
            <input
              id="emiTenure"
              v-model.number="tenure"
              type="number"
              min="1"
              max="360"
              step="1"
              placeholder="e.g., 240"
              class="input input-bordered input-secondary w-full"
            />
          </div>
        </div>
      </div>

      <!-- Results Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body justify-center">
          <h2 class="card-title text-accent gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Results
          </h2>

          <div v-if="result.emi > 0" class="mt-4 space-y-5">
            <!-- EMI Highlight -->
            <div class="bg-gradient-to-br from-secondary/20 to-accent/10 rounded-2xl p-6 text-center">
              <div class="text-sm text-base-content/50 uppercase tracking-wider font-semibold mb-1">Monthly EMI</div>
              <div class="text-4xl font-extrabold text-secondary">{{ formatCurrency(result.emi) }}</div>
            </div>

            <!-- Breakdown -->
            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <tbody>
                  <tr>
                    <td class="font-medium">Principal Amount</td>
                    <td class="text-right text-lg">{{ formatCurrency(loanAmount) }}</td>
                  </tr>
                  <tr>
                    <td class="font-medium">Total Interest</td>
                    <td class="text-right text-lg text-warning">{{ formatCurrency(result.totalInterest) }}</td>
                  </tr>
                  <tr class="font-bold">
                    <td>Total Payment</td>
                    <td class="text-right text-lg text-accent">{{ formatCurrency(result.totalPayment) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Visual ratio bar -->
            <div>
              <div class="flex justify-between text-xs text-base-content/50 mb-1">
                <span>Principal</span>
                <span>Interest</span>
              </div>
              <div class="flex h-4 rounded-full overflow-hidden bg-base-300">
                <div
                  class="bg-secondary transition-all duration-500"
                  :style="{ width: `${(loanAmount / result.totalPayment) * 100}%` }"
                />
                <div
                  class="bg-warning transition-all duration-500"
                  :style="{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }"
                />
              </div>
              <div class="flex justify-between text-xs text-base-content/50 mt-1">
                <span>{{ ((loanAmount / result.totalPayment) * 100).toFixed(1) }}%</span>
                <span>{{ ((result.totalInterest / result.totalPayment) * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="flex flex-col items-center justify-center py-10 text-base-content/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm">Enter loan details to see your EMI</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Amortization Schedule -->
    <AmortizationTable
      v-if="result.emi > 0"
      :breakdown="result.monthlyBreakdown"
      color="secondary"
      title="Amortization Schedule"
    />
  </div>
</template>
