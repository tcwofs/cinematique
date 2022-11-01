<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="navbar">
      <div class="flex items-center mx-auto text-xl font-bold gap-7">
        <nav>
          <ul class="menu menu-horizontal">
            <li>
              <RouterLink to="/movies" class="hover:underline p-2">
                movies
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/sessions" class="hover:underline p-2">
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
