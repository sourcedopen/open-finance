<script setup lang="ts">
useHead({
  title: 'FD Interest Calculator | Open Finance',
  meta: [
    {
      name: 'description',
      content:
        'Calculate your Fixed Deposit maturity amount and interest earned. Supports monthly, quarterly, half-yearly, and yearly compounding with year-by-year growth breakdown.',
    },
  ],
})
</script>

<template>
  <div>
    <FdCalculatorForm />
  </div>
</template>
