<script setup>
import { onMounted, reactive } from 'vue';
import Loader from '../components/common/Loader.vue';
import Movie from '../components/MoviePoster.vue';
import http from '../utils/http';
import NoData from '../components/common/NoData.vue';

const state = reactive({
  genres: new Set(),
  movies: [],
  input: '',
  loading: true,
});

onMounted(async () => {
  try {
    state.loading = true;
    const { data } = await http.get('/movieShows');
    Object.keys(data.data).map(async (movie_id) =>
      http
        .get('/movies', { params: { movie_id } })
        .then(({ data }) => state.movies.push(data.data[0]))
    );
  } catch (error) {
  } finally {
    state.loading = false;
  }
});
</script>

<template>
  <main
    class="p-5 !pt-20 lg:p-16 h-full w-full flex flex-col max-w-2xl mx-auto flex-1"
  >
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
      <TransitionGroup v-else>
        <Movie v-for="movie in state.movies" :key="movie.id" v-bind="movie" />
      </TransitionGroup>
    </div>
  </main>
</template>
