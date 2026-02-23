<script setup lang="ts">
import type { MonthlyBreakdown } from '~/composables/useEmiCalculator'

const props = defineProps<{
  currentBreakdown: MonthlyBreakdown[]
  newBreakdown: MonthlyBreakdown[]
  currentTitle?: string
  newTitle?: string
}>()

const { t } = useI18n()

const showSchedule = ref(false)
const viewMode = ref<'yearly' | 'monthly'>('yearly')

interface YearlyRow {
  year: number
  totalEmi: number
  totalPrincipal: number
  totalInterest: number
  closingBalance: number
}

function toYearly(breakdown: MonthlyBreakdown[]): YearlyRow[] {
  const years: YearlyRow[] = []
  let currentYear = 1
  let totalEmi = 0
  let totalPrincipal = 0
  let totalInterest = 0
  let closingBalance = 0

  for (let i = 0; i < breakdown.length; i++) {
    const entry = breakdown[i]!
    totalEmi += entry.emi
    totalPrincipal += entry.principal
    totalInterest += entry.interest
    closingBalance = entry.balance

    if ((i + 1) % 12 === 0 || i === breakdown.length - 1) {
      years.push({
        year: currentYear,
        totalEmi: Math.round(totalEmi),
        totalPrincipal: Math.round(totalPrincipal),
        totalInterest: Math.round(totalInterest),
        closingBalance: Math.round(closingBalance),
      })
      currentYear++
      totalEmi = 0
      totalPrincipal = 0
      totalInterest = 0
    }
  }

  return years
}

interface PairedYearlyRow {
  year: number
  current: YearlyRow | null
  new_: YearlyRow | null
}

interface PairedMonthlyRow {
  month: number
  current: MonthlyBreakdown | null
  new_: MonthlyBreakdown | null
}

const pairedYearly = computed<PairedYearlyRow[]>(() => {
  const currentRows = toYearly(props.currentBreakdown)
  const newRows = toYearly(props.newBreakdown)
  const maxLen = Math.max(currentRows.length, newRows.length)
  const rows: PairedYearlyRow[] = []
  for (let i = 0; i < maxLen; i++) {
    rows.push({
      year: i + 1,
      current: currentRows[i] ?? null,
      new_: newRows[i] ?? null,
    })
  }
  return rows
})

const pairedMonthly = computed<PairedMonthlyRow[]>(() => {
  const maxLen = Math.max(props.currentBreakdown.length, props.newBreakdown.length)
  const rows: PairedMonthlyRow[] = []
  for (let i = 0; i < maxLen; i++) {
    rows.push({
      month: i + 1,
      current: props.currentBreakdown[i] ?? null,
      new_: props.newBreakdown[i] ?? null,
    })
  }
  return rows
})

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h3 class="card-title text-primary text-lg">
          {{ $t('balanceTransfer.combinedSchedule') }}
        </h3>
        <div class="flex items-center gap-2">
          <!-- View mode toggle -->
          <div v-if="showSchedule" class="join">
            <button
              :class="[
                'join-item btn btn-xs',
                viewMode === 'yearly' ? 'btn-active btn-primary' : 'btn-ghost',
              ]"
              @click="viewMode = 'yearly'"
            >
              {{ $t('common.yearly') }}
            </button>
            <button
              :class="[
                'join-item btn btn-xs',
                viewMode === 'monthly' ? 'btn-active btn-primary' : 'btn-ghost',
              ]"
              @click="viewMode = 'monthly'"
            >
              {{ $t('common.monthly') }}
            </button>
          </div>
          <button
            class="btn btn-sm btn-outline btn-primary"
            @click="showSchedule = !showSchedule"
          >
            {{ showSchedule ? $t('common.hideSchedule') : $t('common.showSchedule') }}
          </button>
        </div>
      </div>

      <div
        v-if="showSchedule"
        class="overflow-x-auto mt-4 max-h-[32rem] overflow-y-auto"
      >
        <!-- Yearly View -->
        <table v-if="viewMode === 'yearly'" class="table table-xs table-zebra table-pin-rows">
          <thead>
            <tr>
              <th rowspan="2" class="align-bottom border-r border-base-300">{{ $t('common.year') }}</th>
              <th colspan="4" class="text-center text-error border-b border-base-300">
                {{ currentTitle ?? $t('balanceTransfer.currentBank') }}
              </th>
              <th rowspan="2" class="align-bottom border-l border-r border-base-300 w-px" />
              <th colspan="4" class="text-center text-success border-b border-base-300">
                {{ newTitle ?? $t('balanceTransfer.newBank') }}
              </th>
            </tr>
            <tr>
              <th class="text-right text-error/70">{{ $t('common.principal') }}</th>
              <th class="text-right text-error/70">{{ $t('common.interest') }}</th>
              <th class="text-right text-error/70">{{ $t('common.totalEmi') }}</th>
              <th class="text-right text-error/70 border-r border-base-300">{{ $t('common.closingBalance') }}</th>
              <th class="text-right text-success/70">{{ $t('common.principal') }}</th>
              <th class="text-right text-success/70">{{ $t('common.interest') }}</th>
              <th class="text-right text-success/70">{{ $t('common.totalEmi') }}</th>
              <th class="text-right text-success/70">{{ $t('common.closingBalance') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in pairedYearly" :key="row.year">
              <td class="font-medium border-r border-base-300">{{ row.year }}</td>
              <!-- Current Bank columns -->
              <template v-if="row.current">
                <td class="text-right">{{ formatCurrency(row.current.totalPrincipal) }}</td>
                <td class="text-right">{{ formatCurrency(row.current.totalInterest) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(row.current.totalEmi) }}</td>
                <td class="text-right border-r border-base-300">{{ formatCurrency(row.current.closingBalance) }}</td>
              </template>
              <template v-else>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30 border-r border-base-300">—</td>
              </template>
              <!-- Divider -->
              <td class="border-l border-r border-base-300 w-px p-0" />
              <!-- New Bank columns -->
              <template v-if="row.new_">
                <td class="text-right">{{ formatCurrency(row.new_.totalPrincipal) }}</td>
                <td class="text-right">{{ formatCurrency(row.new_.totalInterest) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(row.new_.totalEmi) }}</td>
                <td class="text-right">{{ formatCurrency(row.new_.closingBalance) }}</td>
              </template>
              <template v-else>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
              </template>
            </tr>
          </tbody>
        </table>

        <!-- Monthly View -->
        <table v-else class="table table-xs table-zebra table-pin-rows">
          <thead>
            <tr>
              <th rowspan="2" class="align-bottom border-r border-base-300">{{ $t('common.month') }}</th>
              <th colspan="4" class="text-center text-error border-b border-base-300">
                {{ currentTitle ?? $t('balanceTransfer.currentBank') }}
              </th>
              <th rowspan="2" class="align-bottom border-l border-r border-base-300 w-px" />
              <th colspan="4" class="text-center text-success border-b border-base-300">
                {{ newTitle ?? $t('balanceTransfer.newBank') }}
              </th>
            </tr>
            <tr>
              <th class="text-right text-error/70">{{ $t('common.principal') }}</th>
              <th class="text-right text-error/70">{{ $t('common.interest') }}</th>
              <th class="text-right text-error/70">{{ $t('common.emi') }}</th>
              <th class="text-right text-error/70 border-r border-base-300">{{ $t('common.balance') }}</th>
              <th class="text-right text-success/70">{{ $t('common.principal') }}</th>
              <th class="text-right text-success/70">{{ $t('common.interest') }}</th>
              <th class="text-right text-success/70">{{ $t('common.emi') }}</th>
              <th class="text-right text-success/70">{{ $t('common.balance') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in pairedMonthly" :key="row.month">
              <td class="font-medium border-r border-base-300">{{ row.month }}</td>
              <!-- Current Bank columns -->
              <template v-if="row.current">
                <td class="text-right">{{ formatCurrency(row.current.principal) }}</td>
                <td class="text-right">{{ formatCurrency(row.current.interest) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(row.current.emi) }}</td>
                <td class="text-right border-r border-base-300">{{ formatCurrency(row.current.balance) }}</td>
              </template>
              <template v-else>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30 border-r border-base-300">—</td>
              </template>
              <!-- Divider -->
              <td class="border-l border-r border-base-300 w-px p-0" />
              <!-- New Bank columns -->
              <template v-if="row.new_">
                <td class="text-right">{{ formatCurrency(row.new_.principal) }}</td>
                <td class="text-right">{{ formatCurrency(row.new_.interest) }}</td>
                <td class="text-right font-semibold">{{ formatCurrency(row.new_.emi) }}</td>
                <td class="text-right">{{ formatCurrency(row.new_.balance) }}</td>
              </template>
              <template v-else>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
                <td class="text-right text-base-content/30">—</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
