<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: computed(() => `${t('fdCalc.pageTitle')} | ${t('app.name')}`),
  meta: [{ name: 'description', content: () => t('fdCalc.pageDescription') }],
})
</script>

<template>
  <div>
    <FdCalculatorForm />
  </div>
</template>
