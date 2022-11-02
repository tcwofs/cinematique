<script setup>
import { onMounted, reactive, computed } from 'vue';
import Loader from '../components/common/Loader.vue';
import http from '../utils/http';
import NoData from '../components/common/NoData.vue';
import router from '../router';

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const { movie_id, showdate, daytime } = router.currentRoute.value.query;
const state = reactive({
  available: true,
  loading: true,
  places: null,
  selected: { row: null, seat: null },
  info: { name: '', email: '' },
  movie: router.options.history.state.movie,
  submitting: false,
});

const errors = computed(() => {
  const errors = [];

  if (!state.selected.row && !state.selected.seat)
    errors.push('Please select seat');
  if (!state.info.name) errors.push('Please enter your name');
  if (!validateEmail(state.info.email)) errors.push('Please enter valid email');

  return errors;
});

onMounted(async () => {
  try {
    state.loading = true;
    if (!state.movie)
      await http
        .get('/movies', { params: { movie_id } })
        .then(({ data }) => (state.movie = data.data[0]));

    const { data } = await http.get('/showPlaces', {
      params: { movie_id, showdate, daytime },
    });
    state.places = data.data;
  } catch (error) {
  } finally {
    state.loading = false;
  }
});

const bookSession = async () => {
  try {
    if (errors.value.length) return;

    state.submitting = true;
    const { data } = await http.post('/bookPlace', {
      movie_id,
      ...state.selected,
      showdate,
      daytime,
    });

    data.data.movieName = state.movie.name;
    data.data.name = state.info.name;
    data.data.email = state.info.email;

    console.log;
    router.push({
      name: 'success',
      params: { id: data.data.ticketkey },
      state: { ...data },
    });
  } catch (error) {
  } finally {
    state.submitting = false;
  }
};
</script>

<template>
  <main
    class="p-5 !pt-24 lg:p-16 h-full w-full flex flex-col max-w-5xl mx-auto flex-1"
  >
    <div class="min-h-full w-full flex flex-1">
      <Loader v-if="state.loading" size="32" class="m-auto" />
      <NoData v-else-if="!state.places" size="32" class="m-auto" />
      <div v-else class="flex flex-col w-full">
        <div class="flex w-full gap-x-5 justify-center">
          <img class="h-32 lg:h-64 w-auto mt-0" :src="state.movie.image" />
          <div class="flex flex-col font-bold w-64">
            <h2 class="text-lg lg:text-2xl uppercase">
              {{ state.movie.name }}
            </h2>
            <span class="flex w-full justify-between">
              <span>Showdate:</span>
              <div class="dots flex-grow"></div>
              <span>{{ showdate }}</span>
            </span>
            <span class="flex w-full justify-between">
              <span>Daytime:</span>
              <div class="dots flex-grow"></div>
              <span>{{ daytime }}</span>
            </span>
            <div class="h-20 flex flex-col text-error my-5">
              <TransitionGroup>
                <span v-for="error in errors" :key="error">{{ error }}</span>
              </TransitionGroup>
            </div>
            <form class="flex flex-col gap-5" @submit.prevent="bookSession">
              <input
                v-model="state.info.name"
                type="text"
                placeholder="Your name"
                class="input input-bordered input-primary w-full input-sm max-w-xs"
              />
              <input
                v-model="state.info.email"
                type="text"
                placeholder="Your email"
                class="input input-bordered input-primary w-full input-sm max-w-xs"
              />
              <button
                :disabled="errors.length"
                class="btn mr-0 ml-auto"
                :class="{ loading: state.submitting }"
                type="submit"
              >
                book
              </button>
            </form>
          </div>
        </div>
        <div class="flex flex-col mt-16 gap-3 w-full">
          <template v-for="[{ row }, seats] in state.places" :key="row">
            <span class="flex gap-2 font-bold text-xl">
              <span>Row</span>
              <span>{{ row }}</span>
            </span>
            <div class="places-grid mx-auto">
              <button
                v-for="seat in seats"
                :key="seat.seat"
                :disabled="!seat.is_free"
                :title="
                  !seat.is_free
                    ? 'Not available'
                    : `Select seat ${seat.seat} at row ${row}`
                "
                :class="{
                  'btn-link':
                    state.selected.row === row &&
                    state.selected.seat === seat.seat,
                }"
                class="btn"
                @click="
                  (state.selected.row = row), (state.selected.seat = seat.seat)
                "
              >
                {{ seat.seat }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="postcss">
.places-grid {
  @apply grid gap-5 w-full;

  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  grid-auto-rows: max-content;
}
</style>
