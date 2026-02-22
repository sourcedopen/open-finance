<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: computed(() => `${t('balanceTransfer.pageTitle')} | ${t('app.name')}`),
  meta: [{ name: 'description', content: () => t('balanceTransfer.pageDescription') }],
})
</script>

<template>
  <div>
    <BalanceTransferForm />
  </div>
</template>
