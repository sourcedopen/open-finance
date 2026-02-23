<script setup lang="ts">
const { t } = useI18n()
const { compareBalanceTransfer } = useEmiCalculator()

// Form state
const loanAmount = ref<number>(1500000)
const currentRoi = ref<number>(10.5)
const currentTenure = ref<number>(360)
const newRoi = ref<number>(8.0)
const newTenure = ref<number>(240)
const exitCharge = ref<number>(5000)
const processingCharge = ref<number>(20000)

// Computed comparison result
const result = computed(() => {
  return compareBalanceTransfer(
    loanAmount.value,
    currentRoi.value,
    currentTenure.value,
    newRoi.value,
    newTenure.value,
    exitCharge.value,
    processingCharge.value,
  )
})

// Format currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function printPage() {
  window.print()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {{ $t('balanceTransfer.pageTitle') }}
      </h1>
      <p class="text-base-content/60 mt-2 text-lg">
        {{ $t('balanceTransfer.pageDescription') }}
      </p>
      <button
        class="btn btn-sm btn-ghost gap-2 mt-4 no-print"
        @click="printPage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        {{ $t('common.print') }}
      </button>
    </div>

    <!-- Input Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

      <!-- Loan Details Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-primary gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ $t('balanceTransfer.loanDetails') }}
          </h2>
          <div class="form-control mt-4">
            <label class="label" for="loanAmount">
              <span class="label-text font-medium">{{ $t('balanceTransfer.outstandingAmount') }}</span>
            </label>
            <input id="loanAmount" v-model.number="loanAmount" type="number" min="0" step="10000" class="input input-bordered input-primary w-full" />
          </div>
        </div>
      </div>

      <!-- Current Bank Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-error gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            {{ $t('balanceTransfer.currentBank') }}
          </h2>
          <div class="form-control mt-4">
            <label class="label" for="currentRoi"><span class="label-text font-medium">{{ $t('balanceTransfer.roi') }}</span></label>
            <input id="currentRoi" v-model.number="currentRoi" type="number" min="0" max="50" step="0.1" class="input input-bordered input-error w-full" />
          </div>
          <div class="form-control mt-2">
            <label class="label" for="currentTenure"><span class="label-text font-medium">{{ $t('balanceTransfer.tenure') }}</span></label>
            <input id="currentTenure" v-model.number="currentTenure" type="number" min="1" max="360" step="1" class="input input-bordered input-error w-full" />
          </div>
          <div class="form-control mt-2">
            <label class="label" for="exitCharge"><span class="label-text font-medium">{{ $t('balanceTransfer.exitCharge') }}</span></label>
            <input id="exitCharge" v-model.number="exitCharge" type="number" min="0" step="500" class="input input-bordered input-error w-full" />
          </div>
        </div>
      </div>

      <!-- New Bank Card -->
      <div class="card bg-base-200 shadow-xl border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-success gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            {{ $t('balanceTransfer.newBank') }}
          </h2>
          <div class="form-control mt-4">
            <label class="label" for="newRoi"><span class="label-text font-medium">{{ $t('balanceTransfer.roi') }}</span></label>
            <input id="newRoi" v-model.number="newRoi" type="number" min="0" max="50" step="0.1" class="input input-bordered input-success w-full" />
          </div>
          <div class="form-control mt-2">
            <label class="label" for="newTenure"><span class="label-text font-medium">{{ $t('balanceTransfer.newTenure') }}</span></label>
            <input id="newTenure" v-model.number="newTenure" type="number" min="1" max="360" step="1" class="input input-bordered input-success w-full" />
          </div>
          <div class="form-control mt-2">
            <label class="label" for="processingCharge"><span class="label-text font-medium">{{ $t('balanceTransfer.processingCharge') }}</span></label>
            <input id="processingCharge" v-model.number="processingCharge" type="number" min="0" step="500" class="input input-bordered input-success w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Verdict Banner -->
    <div v-if="result.current.emi > 0 && result.newLoan.emi > 0" class="mb-10 transition-all duration-500">
      <div :class="['alert shadow-lg text-lg font-semibold', result.isTransferBeneficial ? 'alert-success' : 'alert-error']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="result.isTransferBeneficial" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <span v-if="result.isTransferBeneficial">
            ✅ {{ $t('balanceTransfer.beneficial') }}
            <span class="font-extrabold">{{ formatCurrency(result.savings) }}</span>
          </span>
          <span v-else>
            ❌ {{ $t('balanceTransfer.notBeneficial') }}
            <span class="font-extrabold">{{ formatCurrency(Math.abs(result.savings)) }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Comparison Cards -->
    <div v-if="result.current.emi > 0 && result.newLoan.emi > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="card bg-base-200 shadow-xl border-t-4 border-error">
        <div class="card-body">
          <h3 class="card-title text-error text-xl">{{ $t('balanceTransfer.currentSummary') }}</h3>
          <div class="overflow-x-auto mt-4">
            <table class="table table-zebra">
              <tbody>
                <tr><td class="font-medium">{{ $t('balanceTransfer.monthlyEmi') }}</td><td class="text-right text-lg font-bold">{{ formatCurrency(result.current.emi) }}</td></tr>
                <tr><td class="font-medium">{{ $t('common.principal') }}</td><td class="text-right">{{ formatCurrency(loanAmount) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.totalInterest') }}</td><td class="text-right">{{ formatCurrency(result.current.totalInterest) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.totalPayment') }}</td><td class="text-right text-lg font-bold text-error">{{ formatCurrency(result.currentTotalCost) }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl border-t-4 border-success">
        <div class="card-body">
          <h3 class="card-title text-success text-xl">{{ $t('balanceTransfer.newSummary') }}</h3>
          <div class="overflow-x-auto mt-4">
            <table class="table table-zebra">
              <tbody>
                <tr><td class="font-medium">{{ $t('balanceTransfer.monthlyEmi') }}</td><td class="text-right text-lg font-bold">{{ formatCurrency(result.newLoan.emi) }}</td></tr>
                <tr><td class="font-medium">{{ $t('common.principal') }}</td><td class="text-right">{{ formatCurrency(loanAmount) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.totalInterest') }}</td><td class="text-right">{{ formatCurrency(result.newLoan.totalInterest) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.exitCharge') }}</td><td class="text-right text-warning">{{ formatCurrency(exitCharge) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.processingCharge') }}</td><td class="text-right text-warning">{{ formatCurrency(processingCharge) }}</td></tr>
                <tr><td class="font-medium">{{ $t('balanceTransfer.totalCost') }}</td><td class="text-right text-lg font-bold text-success">{{ formatCurrency(result.newTotalCost) }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Cost Breakdown -->
    <div v-if="result.current.emi > 0 && result.newLoan.emi > 0" class="card bg-base-200 shadow-xl mb-10">
      <div class="card-body">
        <h3 class="card-title text-primary text-xl mb-4">{{ $t('balanceTransfer.costBreakdown') }}</h3>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>{{ $t('balanceTransfer.particulars') }}</th>
                <th class="text-right text-error">{{ $t('balanceTransfer.currentBank') }}</th>
                <th class="text-right text-success">{{ $t('balanceTransfer.newBank') }}</th>
                <th class="text-right text-primary">{{ $t('balanceTransfer.difference') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-medium">{{ $t('balanceTransfer.monthlyEmi') }}</td>
                <td class="text-right">{{ formatCurrency(result.current.emi) }}</td>
                <td class="text-right">{{ formatCurrency(result.newLoan.emi) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(result.current.emi - result.newLoan.emi) }}</td>
              </tr>
              <tr>
                <td class="font-medium">{{ $t('balanceTransfer.totalInterestPayable') }}</td>
                <td class="text-right">{{ formatCurrency(result.current.totalInterest) }}</td>
                <td class="text-right">{{ formatCurrency(result.newLoan.totalInterest) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(result.current.totalInterest - result.newLoan.totalInterest) }}</td>
              </tr>
              <tr>
                <td class="font-medium">{{ $t('balanceTransfer.totalLoanPayment') }}</td>
                <td class="text-right">{{ formatCurrency(result.current.totalPayment) }}</td>
                <td class="text-right">{{ formatCurrency(result.newLoan.totalPayment) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(result.current.totalPayment - result.newLoan.totalPayment) }}</td>
              </tr>
              <tr>
                <td class="font-medium">{{ $t('balanceTransfer.exitCharge') }}</td>
                <td class="text-right">—</td>
                <td class="text-right text-warning">{{ formatCurrency(exitCharge) }}</td>
                <td class="text-right">{{ formatCurrency(-exitCharge) }}</td>
              </tr>
              <tr>
                <td class="font-medium">{{ $t('balanceTransfer.processingCharge') }}</td>
                <td class="text-right">—</td>
                <td class="text-right text-warning">{{ formatCurrency(processingCharge) }}</td>
                <td class="text-right">{{ formatCurrency(-processingCharge) }}</td>
              </tr>
              <tr class="font-bold text-lg">
                <td>{{ $t('balanceTransfer.netTotalCost') }}</td>
                <td class="text-right text-error">{{ formatCurrency(result.currentTotalCost) }}</td>
                <td class="text-right text-success">{{ formatCurrency(result.newTotalCost) }}</td>
                <td class="text-right" :class="result.isTransferBeneficial ? 'text-success' : 'text-error'">{{ formatCurrency(result.savings) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Combined Amortization Schedule -->
    <div v-if="result.current.emi > 0 && result.newLoan.emi > 0">
      <BalanceTransferAmortization
        :current-breakdown="result.current.monthlyBreakdown"
        :new-breakdown="result.newLoan.monthlyBreakdown"
        :current-title="$t('balanceTransfer.currentBank')"
        :new-title="$t('balanceTransfer.newBank')"
      />
    </div>
  </div>
</template>
