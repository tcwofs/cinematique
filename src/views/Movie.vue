<script setup>
import { onMounted, reactive } from 'vue';
import Loader from '../components/common/Loader.vue';
import http from '../utils/http';
import NoData from '../components/common/NoData.vue';
import router from '../router';

const movie_id = router.currentRoute.value.params.id;
const state = reactive({ movie: null, sessions: null, loading: true });

onMounted(async () => {
  try {
    state.loading = true;
    http
      .get('/movieShows', { params: { movie_id } })
      .then(({ data }) => (state.sessions = data.data[movie_id]));
    const { data } = await http.get('/movies', { params: { movie_id } });
    state.movie = data.data[0];
  } catch (error) {
  } finally {
    state.loading = false;
  }
});
</script>

<template>
  <main
    class="p-5 !pt-24 lg:p-16 h-full w-full flex flex-col max-w-5xl mx-auto flex-1"
  >
    <div class="min-h-full w-full flex flex-1">
      <Loader v-if="state.loading" size="32" class="m-auto" />
      <NoData v-else-if="!state.movie" size="32" class="m-auto" />
      <div v-else class="flex flex-col mx-auto w-full gap-10">
        <h2 class="font-bold text-3xl mx-auto uppercase text-center">
          {{ state.movie.name }}
        </h2>
        <div class="flex flex-col lg:flex-row w-full gap-x-10 gap-y-5">
          <img
            class="h-96 w-auto ml-auto lg:ml-0 mr-auto self-start"
            :src="state.movie.image"
          />
          <div class="flex flex-col w-full">
            <div
              class="first-letter:text-3xl first-letter:font-bold first-letter:mr-0.5"
              v-html="state.movie.description"
            ></div>
            <div
              class="additional-info mt-10"
              v-html="state.movie.additional"
            ></div>
            <div class="flex flex-col mt-16 gap-3">
              <template
                v-for="session in state.sessions"
                :key="session.showdate"
              >
                <span class="text-lg font-bold">{{ session.showdate }}</span>
                <div class="sessions-grid">
                  <RouterLink
                    :to="{
                      name: 'checkout',
                      query: {
                        movie_id,
                        daytime,
                        showdate: session.showdate,
                      },
                      state: {
                        movie: {
                          name: state.movie.name,
                          image: state.movie.image,
                        },
                      },
                    }"
                    v-for="daytime in session.daytime.split(';')"
                    :key="daytime"
                    class="btn"
                  >
                    {{ daytime }}
                  </RouterLink>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="postcss">
.additional-info {
  ul {
    @apply flex flex-col font-bold gap-1 uppercase text-sm;
    li {
      @apply grid grid-cols-2;
      & > :first-child {
        @apply flex;
        &:after {
          @apply flex flex-1 mt-3.5 mx-0.5 border-base-content border-dotted;
          border-top-width: 3px;
          content: '';
        }
      }
      .age_hint {
        @apply hidden;
      }
    }
  }
}

.sessions-grid {
  @apply grid gap-5;

  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  grid-auto-rows: max-content;
}
</style>
