<script setup>
import { RouterView } from 'vue-router';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
  <header>
    <div
      v-if="$router.currentRoute.value.name !== 'home'"
      class="navbar fixed bg-base-100 w-full z-50"
    >
      <div class="flex items-center mx-auto text-xl font-bold">
        <nav>
          <ul class="menu-horizontal">
            <li>
              <RouterLink
                to="/movies"
                class="hover:underline p-2"
                @click="scrollToTop"
              >
                movies
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/sessions"
                class="hover:underline p-2"
                @click="scrollToTop"
              >
                sessions
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style lang="postcss">
.router-link-exact-active {
  @apply opacity-50;
}
</style>
