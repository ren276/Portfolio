<template>
  <section id="works" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="selectedWorks"
        v-html="selectedWorks"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ selectedWorksProps.length }} )
      </p>

      <div
        id="selected-works-text"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ selectedWorksProps.length }} </span>
          PROJECTS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          Personal projects built with passion and purpose — exploring ideas at
          the intersection of mobile, AI, and full-stack engineering.
        </p>
      </div>
    </div>

    <div
      class="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]"
    >
      <div
        class="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex"
      >
        <span class="font-title! relative -tracking-wider">0</span>
        <span
          id="index"
          class="font-title! relative -tracking-wider will-change-transform"
          >{{ index + 1 }}.</span
        >
      </div>
      <aside
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
        class="relative col-span-full flex flex-col space-y-10 md:col-span-7"
      >
        <div
          v-for="(work, i) in selectedWorksProps"
          :key="i"
          class="work-card @container"
        >
          <!-- Clickable card area -->
          <a class="group" target="_blank" :href="work.url">
            <div
              class="flex-center relative aspect-square overflow-clip rounded-lg"
            >
              <img
                alt="work-background"
                loading="lazy"
                class="absolute size-full object-cover select-none"
                :src="work.imageBg"
              />
              <div
                class="flex-center z-10 aspect-4/3 size-full overflow-clip rounded-lg object-cover"
              >
                <video
                  ref="videoRefs"
                  :src="work.videoSrc"
                  muted
                  :autoplay="false"
                  type="video/webm"
                  class="size-[80%] rounded-md object-contain blur transition-all duration-500 ease-in-out"
                ></video>
              </div>
            </div>
            <div class="mt-4">
              <p class="heading-6 font-title! mb-2 leading-none">
                {{ work.category }}
              </p>
              <div class="flex flex-col gap-4">
                <h3
                  class="heading-3 font-title! leading-tight font-bold uppercase"
                >
                  {{ work.name }}
                </h3>
                <div class="flex flex-wrap gap-1.5 select-none" @click.prevent>
                  <div
                    class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 cursor-default rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                    v-for="tag in work.tags"
                    :key="tag"
                  >
                    <span>{{ tag }}</span>
                  </div>
                  <div
                    class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 cursor-default rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent"
                  >
                    <span>{{ work.year }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- View Details toggle button -->
          <button
            v-if="work.details"
            @click.stop="toggleDetails(i)"
            class="view-details-btn mt-3 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
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
              v-if="work.details && openCards.has(i)"
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
                  {{ work.details.overview }}
                </p>
              </div>

              <!-- Tech Stack -->
              <div v-if="work.details.techStack" class="mb-4">
                <p
                  class="heading-6 text-flax-smoke-400 mb-1 tracking-widest uppercase"
                >
                  Tech Stack
                </p>
                <p class="text-flax-smoke-200 text-sm leading-relaxed">
                  {{ work.details.techStack }}
                </p>
              </div>

              <!-- Achievements -->
              <div
                v-if="
                  work.details.achievements && work.details.achievements.length
                "
                class="mb-4"
              >
                <p
                  class="heading-6 text-flax-smoke-400 mb-2 tracking-widest uppercase"
                >
                  Key Achievements
                </p>
                <ul class="space-y-1.5">
                  <li
                    v-for="(ach, ai) in work.details.achievements"
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
                v-if="work.details.links && work.details.links.length"
                class="flex flex-wrap gap-2 pt-1"
              >
                <a
                  v-for="(link, li) in work.details.links"
                  :key="li"
                  :href="link.url"
                  target="_blank"
                  class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-[background-color,color] duration-300"
                >
                  {{ link.label }} ↗
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import {
    computed,
    onBeforeMount,
    onMounted,
    ref,
    reactive,
    useTemplateRef,
  } from 'vue';
  import gsap from 'gsap';
  import { useWindowSize } from '@vueuse/core';
  import { work1, work2 } from '@/assets/videos';
  import { workBg1, workBg2 } from '@/assets/images';
  const videoRefs = useTemplateRef<HTMLVideoElement[]>('videoRefs');

  const isSmallScreen = computed(() => {
    return useWindowSize().width.value < 768;
  });
  const index = ref(0);
  const selectedWorks = ref('Selected Projects /');

  // Track which cards have their details panel open
  const openCards = reactive(new Set<number>());

  const toggleDetails = (i: number) => {
    if (openCards.has(i)) {
      openCards.delete(i);
    } else {
      openCards.add(i);
    }
  };

  const tl = gsap
    .timeline({ defaults: { duration: 0.25 } })
    .to(['#cursor', '#inner'], {
      scale: 1,
      opacity: 1,
    })
    .paused(true);

  const showCursor = () => {
    tl.play();
  };
  const hideCursor = () => {
    tl.reverse();
  };

  const selectedWorksProps = [
    {
      name: 'Strata – Visual Stories for Strava',
      category: 'Android & Full-Stack',
      tags: ['Kotlin', 'Jetpack Compose', 'Supabase', 'Ktor', 'Timber'],
      videoSrc: work1,
      imageBg: workBg1,
      url: 'https://github.com/sandeshverma0311/strata',
      year: '2024',
      details: {
        overview:
          'An Android app that lets Strava athletes generate and share beautiful visual stories from their workout data, complete with a custom image editor.',
        techStack:
          'Kotlin · Jetpack Compose · MVVM · Supabase · Ktor · Room DB · REST API · Timber',
        achievements: [
          'Reduced redundant API calls by 40% with offline-first Room DB architecture',
          'Zero client-side secret exposure via Supabase Edge Functions OAuth 2.0',
          '60fps Compose UI with R8/ProGuard obfuscation and Coil image loading',
          '3+ security layers: Android Keystore + EncryptedSharedPreferences + HTTPS Network Security Config',
          'Targeted 10,000+ Strava athletes',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/sandeshverma0311/strata',
          },
        ],
      },
    },
    {
      name: 'Sentinel — ML Observability Platform',
      category: 'AI/ML & Full-Stack',
      tags: ['FastAPI', 'Kafka', 'Llama 3.2', 'Next.js 15'],
      videoSrc: work2,
      imageBg: workBg2,
      url: 'https://github.com/ren276/Sentinels',
      year: '2025 - 2026',
      details: {
        overview:
          'An ML Observability Platform that scales real-time telemetry ingestion to enterprise-level infrastructure and eliminates third-party API costs using localized Llama 3.2.',
        techStack: 'FastAPI · Kafka · Llama 3.2 · Next.js 15 · PostgreSQL',
        achievements: [
          'Scaled real-time telemetry ingestion pipeline to process 10,000+ metrics/sec',
          'Reduced database IOPS overhead by 85% with a PostgreSQL batch-insert strategy over FastAPI and Kafka',
          'Eliminated third-party API costs and latency by integrating a localized Llama 3.2 engine with Isolation Forest and LSTM Autoencoder',
          'Achieved 1.8s RCA generation while maintaining full telemetry privacy compliance',
        ],
        links: [
          { label: 'GitHub', url: 'https://github.com/ren276/Sentinels' },
        ],
      },
    },
  ];

  // Reusable function to handle forward scroll animation
  const createForwardTimeline = (
    index: any,
    i: any,
    selectedWorksProps: any[],
  ) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3 },
    });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        index.value = Math.min(i, selectedWorksProps.length - 1);
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });

    return tl;
  };

  // Reusable function to handle backward scroll animation
  const createBackwardTimeline = (index: any, i: any) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        index.value = Math.max(i, 0);
      },
    }).to('#index', {
      yPercent: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });

    return tl;
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
        video.classList.remove('blur');
      }
    });
  };

  const stopAllVideos = () => {
    videoRefs.value?.map((video: HTMLVideoElement) => {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0; // Reset video to the start
      }
    });
  };
  onBeforeMount(() => {
    selectedWorks.value = textSplitterIntoChar('Selected Works / ', true);
  });

  onMounted(() => {
    stopAllVideos();

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.75, // Trigger when 75% of the video is visible
    });

    // Observe each video element
    videoRefs.value?.forEach((video) => {
      observer.observe(video);
    });

    animateSplitText(
      '#selectedWorks .letters',
      '#selected-works-text',
      0.7,
      0.01,
      0,
    );

    // Apply GSAP animations to each div
    if (!isSmallScreen.value)
      gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
        gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
          scrollTrigger: {
            trigger: div,
            start: 'top 25%',
            end: 'bottom 25%',
            scrub: 0.01,
            onLeaveBack: () => {
              // Backward scroll animation
              if (index.value !== 0) {
                gsap.to('#index', {
                  yPercent: 100,
                  duration: 0.3,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    createBackwardTimeline(index, i - 1);
                  },
                });
              }
            },
          },
          ease: 'power1.inOut',
          onComplete: () => {
            // Forward scroll animation
            if (index.value !== selectedWorksProps.length - 1) {
              gsap.to('#index', {
                yPercent: -100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  createForwardTimeline(index, i + 1, selectedWorksProps);
                },
              });
            }
          },
        });
      });
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
