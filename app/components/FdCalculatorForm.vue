<script setup lang="ts">
import type { CompoundingFrequency } from '~/composables/useFdCalculator'

const { calculateFd } = useFdCalculator()

// Form state
const principal = ref<number>(500000)
const roi = ref<number>(7.1)
const tenureMonths = ref<number>(60)
const compounding = ref<CompoundingFrequency>('quarterly')

const compoundingOptions: { label: string; value: CompoundingFrequency }[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Half-Yearly', value: 'half-yearly' },
  { label: 'Yearly', value: 'yearly' },
]

// Computed result
const result = computed(() => {
  return calculateFd(principal.value, roi.value, tenureMonths.value, compounding.value)
})

// Show breakdown
const showBreakdown = ref(false)

// Format currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

// Tenure display helper
const tenureDisplay = computed(() => {
  const y = Math.floor(tenureMonths.value / 12)
  const m = tenureMonths.value % 12
  const parts: string[] = []
  if (y > 0) parts.push(`${y} year${y > 1 ? 's' : ''}`)
  if (m > 0) parts.push(`${m} month${m > 1 ? 's' : ''}`)
  return parts.join(' ') || '0 months'
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
        FD Interest Calculator
      </h1>
      <p class="text-base-content/60 mt-2 text-lg">
        Calculate your Fixed Deposit maturity amount and interest earned.
      </p>
    </div>

    <!-- Input + Results Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

      <!-- Input Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-accent gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Deposit Details
          </h2>

          <div class="form-control mt-4">
            <label class="label" for="fdPrincipal">
              <span class="label-text font-medium">Deposit Amount (₹)</span>
            </label>
            <input
              id="fdPrincipal"
              v-model.number="principal"
              type="number"
              min="0"
              step="10000"
              placeholder="e.g., 500000"
              class="input input-bordered input-accent w-full"
            />
          </div>

          <div class="form-control mt-3">
            <label class="label" for="fdRoi">
              <span class="label-text font-medium">Rate of Interest (% p.a.)</span>
            </label>
            <input
              id="fdRoi"
              v-model.number="roi"
              type="number"
              min="0"
              max="20"
              step="0.1"
              placeholder="e.g., 7.1"
              class="input input-bordered input-accent w-full"
            />
          </div>

          <div class="form-control mt-3">
            <label class="label" for="fdTenure">
              <span class="label-text font-medium">Tenure (months)</span>
            </label>
            <input
              id="fdTenure"
              v-model.number="tenureMonths"
              type="number"
              min="1"
              max="120"
              step="1"
              placeholder="e.g., 60"
              class="input input-bordered input-accent w-full"
            />
            <label class="label">
              <span class="label-text-alt text-base-content/50">{{ tenureDisplay }}</span>
            </label>
          </div>

          <div class="form-control mt-1">
            <label class="label" for="fdCompounding">
              <span class="label-text font-medium">Compounding Frequency</span>
            </label>
            <select
              id="fdCompounding"
              v-model="compounding"
              class="select select-bordered select-accent w-full"
            >
              <option
                v-for="opt in compoundingOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body justify-center">
          <h2 class="card-title text-primary gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Returns
          </h2>

          <div v-if="result.maturityAmount > 0" class="mt-4 space-y-5">
            <!-- Maturity Highlight -->
            <div class="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl p-6 text-center">
              <div class="text-sm text-base-content/50 uppercase tracking-wider font-semibold mb-1">Maturity Amount</div>
              <div class="text-4xl font-extrabold text-accent">{{ formatCurrency(result.maturityAmount) }}</div>
            </div>

            <!-- Breakdown Stats -->
            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <tbody>
                  <tr>
                    <td class="font-medium">Invested Amount</td>
                    <td class="text-right text-lg">{{ formatCurrency(principal) }}</td>
                  </tr>
                  <tr>
                    <td class="font-medium">Total Interest Earned</td>
                    <td class="text-right text-lg text-success">{{ formatCurrency(result.totalInterest) }}</td>
                  </tr>
                  <tr>
                    <td class="font-medium">Effective Annual Yield</td>
                    <td class="text-right text-lg text-info">{{ result.effectiveYield }}%</td>
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
                  class="bg-accent transition-all duration-500"
                  :style="{ width: `${(principal / result.maturityAmount) * 100}%` }"
                />
                <div
                  class="bg-success transition-all duration-500"
                  :style="{ width: `${(result.totalInterest / result.maturityAmount) * 100}%` }"
                />
              </div>
              <div class="flex justify-between text-xs text-base-content/50 mt-1">
                <span>{{ ((principal / result.maturityAmount) * 100).toFixed(1) }}%</span>
                <span>{{ ((result.totalInterest / result.maturityAmount) * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="flex flex-col items-center justify-center py-10 text-base-content/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p class="text-sm">Enter deposit details to see returns</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Year-by-Year Breakdown -->
    <div v-if="result.maturityAmount > 0" class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <h3 class="card-title text-accent text-lg">Year-by-Year Growth</h3>
          <button
            class="btn btn-sm btn-outline btn-accent"
            @click="showBreakdown = !showBreakdown"
          >
            {{ showBreakdown ? 'Hide' : 'Show' }} Breakdown
          </button>
        </div>
        <div
          v-if="showBreakdown"
          class="overflow-x-auto mt-4 max-h-[28rem] overflow-y-auto"
        >
          <table class="table table-zebra table-pin-rows">
            <thead>
              <tr>
                <th>Year</th>
                <th class="text-right">Opening Balance</th>
                <th class="text-right">Interest Earned</th>
                <th class="text-right">Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in result.yearlyBreakdown" :key="row.year">
                <td>{{ row.year }}</td>
                <td class="text-right">{{ formatCurrency(row.openingBalance) }}</td>
                <td class="text-right text-success">{{ formatCurrency(row.interestEarned) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(row.closingBalance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
