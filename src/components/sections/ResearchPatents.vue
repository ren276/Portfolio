<template>
  <section id="research-and-patents" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="researchTitle"
        v-html="formattedTitle"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
    </div>

    <div class="relative mt-12 w-full lg:mt-[10%]">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div
          v-for="(item, i) in researchAndPatentsData"
          :key="i"
          class="work-card @container"
        >
          <!-- Card area -->
          <div class="mt-4">
            <p
              class="heading-6 font-title! text-flax-smoke-400 mb-2 leading-none"
            >
              {{ item.category }}
            </p>
            <div class="flex flex-col gap-4">
              <a
                class="group w-fit transition-opacity hover:opacity-80"
                target="_blank"
                :href="item.url || '#'"
              >
                <h3
                  class="heading-3 font-title! text-flax-smoke-100 leading-tight font-bold uppercase"
                >
                  {{ item.name }}
                </h3>
              </a>
              <div class="flex flex-wrap gap-1.5 select-none">
                <div
                  class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 text-flax-smoke-200 cursor-default rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                  v-for="tag in item.tags"
                  :key="tag"
                >
                  <span>{{ tag }}</span>
                </div>
                <div
                  class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 cursor-default rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent"
                >
                  <span>{{ item.year }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- View Details toggle button -->
          <button
            v-if="item.details"
            @click.stop="toggleDetails(i)"
            class="view-details-btn mt-6 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
            :class="
              openCards.has(i)
                ? 'text-flax-smoke-100'
                : 'text-flax-smoke-400 hover:text-flax-smoke-100'
            "
          >
            <span>{{
              openCards.has(i) ? 'Hide Details' : 'View Details'
            }}</span>
            <svg
              class="size-4 transition-transform duration-300"
              :class="openCards.has(i) ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <!-- Expandable details panel -->
          <Transition name="details-slide">
            <div
              v-if="item.details && openCards.has(i)"
              class="details-panel border-flax-smoke-300/20 bg-flax-smoke-900/40 mt-4 rounded-xl border px-5 py-5 backdrop-blur-sm"
            >
              <!-- Overview -->
              <div class="mb-4">
                <p
                  class="heading-6 text-flax-smoke-400 mb-1 tracking-widest uppercase"
                >
                  Overview
                </p>
                <p class="text-flax-smoke-200 text-sm leading-relaxed">
                  {{ item.details.overview }}
                </p>
              </div>

              <!-- Tech Stack -->
              <div v-if="item.details.techStack" class="mb-4">
                <p
                  class="heading-6 text-flax-smoke-400 mb-1 tracking-widest uppercase"
                >
                  Tech Stack
                </p>
                <p class="text-flax-smoke-200 text-sm leading-relaxed">
                  {{ item.details.techStack }}
                </p>
              </div>

              <!-- Achievements -->
              <div
                v-if="
                  item.details.achievements && item.details.achievements.length
                "
                class="mb-4"
              >
                <p
                  class="heading-6 text-flax-smoke-400 mb-2 tracking-widest uppercase"
                >
                  Key Points
                </p>
                <ul class="space-y-1.5">
                  <li
                    v-for="(ach, ai) in item.details.achievements"
                    :key="ai"
                    class="text-flax-smoke-200 flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <span class="text-flax-smoke-400 mt-0.5 shrink-0">•</span>
                    <span>{{ ach }}</span>
                  </li>
                </ul>
              </div>

              <!-- Links -->
              <div
                v-if="item.details.links && item.details.links.length"
                class="flex flex-wrap gap-2 pt-1"
              >
                <a
                  v-for="(link, li) in item.details.links"
                  :key="li"
                  :href="link.url"
                  target="_blank"
                  class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 text-flax-smoke-200 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-[background-color,color] duration-300"
                >
                  {{ link.label }} ↗
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref, reactive, onMounted } from 'vue';
  import { researchAndPatentsData } from '@/data';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';

  const formattedTitle = ref('Research & Patents /');
  const openCards = reactive(new Set<number>());

  const toggleDetails = (i: number) => {
    if (openCards.has(i)) {
      openCards.delete(i);
    } else {
      openCards.add(i);
    }
  };

  onBeforeMount(() => {
    formattedTitle.value = textSplitterIntoChar('Research & Patents /', true);
  });

  onMounted(() => {
    animateSplitText(
      '#researchTitle .letters',
      '#researchTitle', // Using the element itself as trigger since we don't have text below
      0.7,
      0.01,
      0,
    );
  });
</script>

<style scoped>
  /* Smooth expand / collapse transition */
  .details-slide-enter-active,
  .details-slide-leave-active {
    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      max-height 0.4s ease;
    overflow: hidden;
    max-height: 600px;
  }
  .details-slide-enter-from,
  .details-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }

  .view-details-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
  }
</style>
