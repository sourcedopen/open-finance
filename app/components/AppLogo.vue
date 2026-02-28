<script setup lang="ts">
</script>

<template>
  <div class="flex items-center gap-2.5">
    <div class="relative flex items-center justify-center">
      <!-- Outer glow for premium feel -->
      <div class="absolute inset-0 bg-primary/20 blur-md rounded-full lg:w-8 lg:h-8 w-6 h-6 transform scale-90"></div>
      
      <!-- SVG Logo -->
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative w-6 h-6 lg:w-8 lg:h-8 z-10 transition-transform duration-300 hover:scale-105">
        <!-- Outer Open Circle ('O' for Open) -->
        <path d="M21 12A9 9 0 1 1 12 3" stroke="url(#logoGradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Inner Upward Chart/Arrow breaking out ('F' for Finance/Growth) -->
        <path d="M8 14L12 10L15 13L21 6" stroke="url(#logoGradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 6H21V11" stroke="url(#logoGradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        
        <defs>
          <linearGradient id="logoGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stop-color="oklch(var(--p))" />
            <stop offset="1" stop-color="oklch(var(--s))" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <span class="text-lg lg:text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
      {{ $t('app.name') }}
    </span>
  </div>
</template>
