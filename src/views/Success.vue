<script setup>
import router from '../router';

const { data } = router.options.history.state;
</script>

<template>
  <main
    class="p-5 !pt-24 lg:p-16 h-full w-full flex flex-col max-w-5xl mx-auto flex-1"
  >
    <div
      class="min-h-full w-full flex flex-1 flex-col items-center text-center"
    >
      <span class="uppercase font-bold text-5xl">Successfully booked!</span>
      <span class="uppercase font-bold text-xl mb-5 mt-10">Ticket info</span>
      <div class="flex flex-col gap-y-2 w-96 text-justify">
        <span v-if="data.movieName" class="flex">
          <span>Movie:</span>
          <div class="dots flex-grow"></div>
          <span>{{ data.movieName }}</span>
        </span>
        <span class="flex break-all">
          <span>Ticket:</span>
          <div class="dots flex-grow"></div>
          <span>{{ data.ticketkey }}</span>
        </span>
        <span class="flex">
          <span>Showdate:</span>
          <div class="dots flex-grow"></div>
          <span>{{ data.showdate }}</span>
        </span>
        <span class="flex">
          <span>Daytime:</span>
          <div class="dots flex-grow"></div>
          <span>{{ data.daytime }}</span>
        </span>
        <span class="flex">
          <span>Seat:</span>
          <div class="dots flex-grow"></div>
          <span>{{ `row ${data.row}, seat ${data.seat} ` }}</span>
        </span>
      </div>
      <RouterLink to="/" class="btn btn-lg mt-16"> home </RouterLink>
    </div>
  </main>
</template>
