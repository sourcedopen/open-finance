<script setup lang="ts">
useHead({
  title: 'Open Finance — Free Financial Tools',
  meta: [
    {
      name: 'description',
      content:
        'Open Finance is an open-source suite of financial calculators and comparison tools. Compare balance transfers, calculate EMIs, and make smarter money decisions.',
    },
  ],
})

const colorClasses: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
  accent: { bg: 'bg-accent/10', text: 'text-accent' },
  warning: { bg: 'bg-warning/10', text: 'text-warning' },
}

const tools = [
  {
    title: 'Balance Transfer Compare',
    description:
      'Compare your current loan with a new bank\'s offer. See EMI differences, total interest savings, and whether a balance transfer is worth it after exit and processing charges.',
    to: '/balance-transfer',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    color: 'primary',
    badge: 'Live',
  },
  {
    title: 'EMI Calculator',
    description:
      'Calculate your monthly EMI for any loan amount, interest rate and tenure. View detailed month-by-month amortization schedules.',
    to: '/emi-calculator',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'secondary',
    badge: 'Live',
  },
  {
    title: 'FD vs Mutual Fund',
    description:
      'Compare fixed deposit returns against mutual fund SIP returns over different time horizons to pick the best investment strategy.',
    to: '#',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    color: 'accent',
    badge: 'Coming Soon',
  },
  {
    title: 'Loan Eligibility',
    description:
      'Check how much loan you are eligible for based on your income, existing obligations, and desired tenure.',
    to: '#',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    color: 'warning',
    badge: 'Coming Soon',
  },
]

const stats = [
  { label: 'Tools Available', value: '2', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { label: 'Open Source', value: '100%', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { label: 'Cost', value: 'Free', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Decorative gradient blobs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-7xl mx-auto px-4 py-20 lg:py-32 text-center">
        <div class="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Open Source &amp; Free Forever
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
          Smart
          <span class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Financial Tools
          </span>
          <br />
          for Everyone
        </h1>

        <p class="mt-6 text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto">
          Open Finance gives you free, open-source calculators and comparison tools
          to make confident money decisions — no sign-ups, no ads, no nonsense.
        </p>

        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <NuxtLink to="/balance-transfer" class="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Compare Balance Transfer
          </NuxtLink>
          <a
            href="https://github.com/sourcedopen/open-finance"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-lg gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="border-y border-base-content/10 bg-base-200/50">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex items-center gap-4 justify-center"
          >
            <div class="p-3 rounded-xl bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-extrabold">{{ stat.value }}</div>
              <div class="text-sm text-base-content/50">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Grid -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold">Financial Tools</h2>
        <p class="mt-3 text-base-content/60 text-lg">
          Pick a tool to get started — more coming soon.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.title"
          :to="tool.to"
          :class="[
            'card bg-base-200 shadow-xl border border-base-content/5 transition-all duration-300 group',
            tool.to !== '#'
              ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 cursor-pointer'
              : 'opacity-60 cursor-default',
          ]"
        >
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div :class="['p-3 rounded-xl mb-4', colorClasses[tool.color].bg]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :class="['h-7 w-7', colorClasses[tool.color].text]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tool.icon" />
                </svg>
              </div>
              <span
                :class="[
                  'badge badge-sm font-semibold',
                  tool.badge === 'Live' ? 'badge-success' : 'badge-ghost',
                ]"
              >
                {{ tool.badge }}
              </span>
            </div>
            <h3 class="card-title text-xl">{{ tool.title }}</h3>
            <p class="text-base-content/60 mt-1">{{ tool.description }}</p>
            <div
              v-if="tool.to !== '#'"
              class="mt-4 flex items-center gap-1 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Open Tool
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
