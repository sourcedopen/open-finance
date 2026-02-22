<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: computed(() => `${t('emiCalc.pageTitle')} | ${t('app.name')}`),
  meta: [{ name: 'description', content: () => t('emiCalc.pageDescription') }],
})
</script>

<template>
  <div>
    <EmiCalculatorForm />
  </div>
</template>
