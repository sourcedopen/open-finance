<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const navLinks = computed(() => [
  { label: t('nav.dashboard'), to: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: t('nav.balanceTransfer'), to: '/balance-transfer', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { label: t('nav.emiCalculator'), to: '/emi-calculator', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { label: t('nav.fdCalculator'), to: '/fd-calculator', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
])

const route = useRoute()
const drawerOpen = ref(false)

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).filter(
    (l) => l.code !== locale.value,
  ),
)

function closeMobileDrawer() {
  drawerOpen.value = false
}

function switchLocale(code: string) {
  setLocale(code)
}
</script>

<template>
  <div data-theme="dark" class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-content/10">
      <nav class="navbar max-w-7xl mx-auto px-4">
        <!-- Mobile hamburger -->
        <div class="navbar-start">
          <button
            class="btn btn-ghost btn-square lg:hidden"
            aria-label="Open menu"
            @click="drawerOpen = !drawerOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Brand -->
          <NuxtLink to="/" class="btn btn-ghost text-xl font-extrabold tracking-tight gap-2">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {{ $t('app.name') }}
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop links + lang switcher -->
        <div class="navbar-end hidden lg:flex">
          <ul class="menu menu-horizontal gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                :class="[
                  'flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200',
                  route.path === link.to
                    ? 'bg-primary/15 text-primary'
                    : 'hover:bg-base-content/5 text-base-content/70 hover:text-base-content',
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
                </svg>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <!-- Language Switcher -->
          <div class="dropdown dropdown-end ml-2">
            <label tabindex="0" class="btn btn-ghost btn-sm gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ (locales as Array<{code: string, name: string}>).find(l => l.code === locale)?.name }}
            </label>
            <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box shadow-lg z-[1] w-40 p-2">
              <li v-for="loc in availableLocales" :key="loc.code">
                <button @click="switchLocale(loc.code)" class="text-sm">
                  {{ loc.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile drawer overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="drawerOpen"
          class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          @click="closeMobileDrawer"
        />
      </Transition>
      <Transition name="slide">
        <aside
          v-if="drawerOpen"
          class="fixed top-0 left-0 z-[70] h-full w-72 bg-base-200 shadow-2xl p-6 lg:hidden"
        >
          <div class="flex items-center justify-between mb-8">
            <span class="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {{ $t('app.name') }}
            </span>
            <button class="btn btn-ghost btn-sm btn-square" @click="closeMobileDrawer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul class="menu gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                :class="[
                  'flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-200',
                  route.path === link.to
                    ? 'bg-primary/15 text-primary'
                    : 'hover:bg-base-content/5 text-base-content/70 hover:text-base-content',
                ]"
                @click="closeMobileDrawer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
                </svg>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <!-- Mobile Language Switcher -->
          <div class="mt-6 border-t border-base-content/10 pt-4">
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              class="btn btn-ghost btn-sm w-full justify-start gap-2"
              @click="switchLocale(loc.code); closeMobileDrawer()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ loc.name }}
            </button>
          </div>
        </aside>
      </Transition>
    </Teleport>

    <!-- Page content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-base-content/10 py-6 mt-12">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/50">
        <p>{{ $t('app.copyright', { year: new Date().getFullYear() }) }}</p>
        <div class="flex gap-4">
          <a
            href="https://github.com/sourcedopen/open-finance"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-base-content transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
