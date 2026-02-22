<script setup lang="ts">
import type { MonthlyBreakdown } from '~/composables/useEmiCalculator'

const props = defineProps<{
  breakdown: MonthlyBreakdown[]
  color?: 'secondary' | 'error' | 'success' | 'primary'
  title?: string
}>()

const color = props.color ?? 'secondary'

const showSchedule = ref(false)
const viewMode = ref<'yearly' | 'monthly'>('yearly')

interface YearlyRow {
  year: number
  totalEmi: number
  totalPrincipal: number
  totalInterest: number
  closingBalance: number
}

const yearlyBreakdown = computed<YearlyRow[]>(() => {
  const years: YearlyRow[] = []
  let currentYear = 1
  let totalEmi = 0
  let totalPrincipal = 0
  let totalInterest = 0
  let closingBalance = 0

  for (let i = 0; i < props.breakdown.length; i++) {
    const row = props.breakdown[i]
    totalEmi += row.emi
    totalPrincipal += row.principal
    totalInterest += row.interest
    closingBalance = row.balance

    // Every 12 months or last row → push a yearly summary
    if ((i + 1) % 12 === 0 || i === props.breakdown.length - 1) {
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
})

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const { t } = useI18n()

const btnClass = computed(() => `btn btn-sm btn-outline btn-${color}`)
const titleClass = computed(() => `card-title text-${color} text-lg`)
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h3 :class="titleClass">{{ title ?? 'Amortization Schedule' }}</h3>
        <div class="flex items-center gap-2">
          <!-- View mode toggle -->
          <div
            v-if="showSchedule"
            class="join"
          >
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
            :class="btnClass"
            @click="showSchedule = !showSchedule"
          >
            {{ showSchedule ? $t('common.hideSchedule') : $t('common.showSchedule') }}
          </button>
        </div>
      </div>

      <div
        v-if="showSchedule"
        class="overflow-x-auto mt-4 max-h-[28rem] overflow-y-auto"
      >
        <!-- Yearly View -->
        <table v-if="viewMode === 'yearly'" class="table table-xs table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>{{ $t('common.year') }}</th>
              <th class="text-right">{{ $t('common.totalEmi') }}</th>
              <th class="text-right">{{ $t('common.principal') }}</th>
              <th class="text-right">{{ $t('common.interest') }}</th>
              <th class="text-right">{{ $t('common.closingBalance') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in yearlyBreakdown" :key="row.year">
              <td>{{ row.year }}</td>
              <td class="text-right">{{ formatCurrency(row.totalEmi) }}</td>
              <td class="text-right">{{ formatCurrency(row.totalPrincipal) }}</td>
              <td class="text-right">{{ formatCurrency(row.totalInterest) }}</td>
              <td class="text-right">{{ formatCurrency(row.closingBalance) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Monthly View -->
        <table v-else class="table table-xs table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>{{ $t('common.month') }}</th>
              <th class="text-right">{{ $t('common.emi') }}</th>
              <th class="text-right">{{ $t('common.principal') }}</th>
              <th class="text-right">{{ $t('common.interest') }}</th>
              <th class="text-right">{{ $t('common.balance') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in breakdown" :key="row.month">
              <td>{{ row.month }}</td>
              <td class="text-right">{{ formatCurrency(row.emi) }}</td>
              <td class="text-right">{{ formatCurrency(row.principal) }}</td>
              <td class="text-right">{{ formatCurrency(row.interest) }}</td>
              <td class="text-right">{{ formatCurrency(row.balance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
