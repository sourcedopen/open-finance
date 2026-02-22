<script setup lang="ts">
useHead({
  title: 'EMI Calculator | Open Finance',
  meta: [
    {
      name: 'description',
      content:
        'Calculate your monthly EMI for any loan amount, interest rate and tenure. View a detailed month-by-month amortization schedule with principal and interest breakdown.',
    },
  ],
})
</script>

<template>
  <div>
    <EmiCalculatorForm />
  </div>
</template>
