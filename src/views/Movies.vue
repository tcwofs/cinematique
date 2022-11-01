<script setup>
import { onMounted, reactive, watch } from 'vue';
import Loader from '../components/common/Loader.vue';
import Movie from '../components/Movie.vue';
import http from '../utils/http';
import { genres } from '../utils/constants';
import Icon from '../components/common/Icon.vue';
import { mdiAlertDecagramOutline, mdiCheck } from '@mdi/js';
import { debounce } from 'lodash-es';
import NoData from '../components/common/NoData.vue';

const state = reactive({
  genres: new Set(),
  movies: [],
  input: '',
  loading: true,
});

watch(
  [() => state.genres.size, () => state.input],
  debounce(async () => {
    try {
      state.loading = true;
      const { data } = await http.get('/movies', {
        params: { name: state.input, genres: [...state.genres] },
      });
      state.movies = data.data;
    } catch (error) {
    } finally {
      state.loading = false;
    }
  }, 2000),
  { immediate: true }
);
</script>

<template>
  <main
    class="p-5 !pt-24 lg:p-16 h-full w-full flex flex-col max-w-2xl mx-auto flex-1"
  >
    <div class="mx-auto mb-7 w-full flex items-center justify-center gap-5">
      <input
        v-model="state.input"
        type="text"
        placeholder="Type here"
        class="input input-bordered input-primary w-full input-sm max-w-xs"
      />
      <div class="dropdown dropdown-bottom dropdown-end">
        <label tabindex="0" class="btn btn-sm m-1 lowercase flex gap-2">
          genre
          <Transition>
            <Icon
              v-if="state.genres.size"
              :d="mdiAlertDecagramOutline"
              class="w-4 h-4 mr-0 ml-auto"
            />
          </Transition>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-for="genre in genres" :key="genre.id">
            <button
              class="flex gap-5 items-center"
              @click="
                state.genres[state.genres.has(genre.id) ? 'delete' : 'add'](
                  genre.id
                )
              "
            >
              {{ genre.title }}
              <Icon
                v-if="state.genres.has(genre.id)"
                :d="mdiCheck"
                class="w-6 h-6 mr-0 ml-auto"
              />
            </button>
          </li>
          <Transition>
            <li v-if="state.genres.size">
              <button
                class="flex gap-5 items-center font-bold"
                @click="state.genres.clear"
              >
                reset
              </button>
            </li>
          </Transition>
        </ul>
      </div>
    </div>
    <div
      class="movie-grid"
      :class="[
        !state.loading && state.movies.length
          ? 'grid after:flex'
          : 'flex flex-1',
      ]"
    >
      <Loader v-if="state.loading" size="32" class="m-auto" />
      <NoData v-else-if="!state.movies.length" size="32" class="m-auto" />
      <Movie
        v-else
        v-for="movie in state.movies"
        :key="movie.id"
        v-bind="movie"
      />
    </div>
  </main>
</template>

<style lang="postcss">
.movie-grid {
  @apply gap-10 min-h-full w-full;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: max-content;
}
</style>
