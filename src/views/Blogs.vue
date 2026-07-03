<template>
  <!-- Noise overlay -->
  <div class="pointer-events-none fixed inset-0 z-50">
    <svg
      class="h-[150vh] w-full object-cover object-center"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise-blog">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="1"
          stitchTiles="stitch"
        />
        <feBlend mode="screen" />
      </filter>
      <rect class="size-full" filter="url(#noise-blog)" opacity="0.1" />
    </svg>
  </div>

  <!-- Back button navbar -->
  <header class="padding-x fixed top-0 left-0 right-0 z-40 pt-6">
    <nav class="flex items-center justify-between">
      <!-- Back to portfolio -->
      <RouterLink
        to="/"
        id="back-btn"
        class="blog-back-btn group flex items-center gap-3 cursor-pointer"
      >
        <div class="back-arrow-circle flex-center size-10 rounded-full border border-flax-smoke-400/40 transition-all duration-500 group-hover:bg-flax-smoke-950 group-hover:border-flax-smoke-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="size-4 text-flax-smoke-300 transition-transform duration-500 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
        <span class="font-fancy text-flax-smoke-400 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 group-hover:text-flax-smoke-100">
          sandesh<span class="text-flax-smoke-600 group-hover:text-flax-smoke-400 transition-colors duration-300">©</span>
        </span>
      </RouterLink>

      <p class="font-fancy text-flax-smoke-600 text-sm font-medium uppercase tracking-widest hidden sm:block">
        Writing / {{ blogs.length }} articles
      </p>
    </nav>
  </header>

  <!-- Main content -->
  <main class="bg-flax-smoke-50 min-h-svh">

    <!-- Hero section -->
    <section class="padding-x relative overflow-hidden pt-32 pb-20 bg-[#0B0B0A]">
      <!-- Background glow -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style="background: radial-gradient(circle, #9b9c7f 0%, transparent 70%);"
        ></div>
      </div>

      <div id="blog-hero" class="relative max-w-5xl mx-auto">
        <div class="overflow-hidden mb-4">
          <p
            id="blog-label"
            class="blog-label-anim font-fancy text-flax-smoke-500 text-sm font-bold uppercase tracking-[0.3em] -translate-y-full"
          >
            By Sandesh Verma · Substack
          </p>
        </div>

        <div class="overflow-hidden">
          <h1
            id="blog-title"
            class="blog-title-anim heading-1 font-fancy font-bold leading-none uppercase text-flax-smoke-50 -translate-y-full"
          >
            Writing <span class="text-flax-smoke-500">/</span>
          </h1>
        </div>

        <div class="overflow-hidden mt-6">
          <p
            id="blog-desc"
            class="blog-desc-anim heading-4 font-fancy text-flax-smoke-400 max-w-[50ch] leading-snug font-medium text-balance -translate-y-full"
          >
            Technical essays on building AI systems, mobile apps, and engineering at scale. Real projects, real lessons.
          </p>
        </div>

        <!-- Horizontal rule -->
        <div
          id="blog-rule"
          class="blog-rule-anim mt-12 h-px bg-flax-smoke-800 origin-left scale-x-0"
        ></div>
      </div>
    </section>

    <!-- Blog cards section -->
    <section class="padding-x bg-[#0B0B0A] pb-32">
      <div class="max-w-5xl mx-auto">
        <!-- Count row -->
        <div
          id="blog-count-row"
          class="blog-content-anim flex items-center justify-between mb-12 opacity-0"
        >
          <p class="font-fancy text-flax-smoke-600 text-sm uppercase tracking-widest">
            Articles
          </p>
          <p class="font-fancy text-flax-smoke-600 text-sm uppercase tracking-widest">
            {{ new Date().getFullYear() }}
          </p>
        </div>

        <!-- Blog cards -->
        <div class="space-y-8">
          <article
            v-for="(blog, i) in blogs"
            :key="i"
            :id="`blog-card-${i}`"
            class="blog-card-anim opacity-0"
          >
            <a
              :href="blog.url"
              target="_blank"
              rel="noopener noreferrer"
              class="blog-card group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-flax-smoke-800/50 bg-flax-smoke-950/60 backdrop-blur-sm cursor-pointer transition-all duration-700 hover:border-flax-smoke-600/50 hover:bg-flax-smoke-900/60"
            >
              <!-- Hover shimmer -->
              <div class="blog-card-shimmer absolute inset-0 rounded-xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
                style="background: linear-gradient(135deg, transparent 0%, rgba(155,156,127,0.04) 50%, transparent 100%);">
              </div>

              <!-- Image -->
              <div class="shrink-0 w-full sm:w-32 md:w-36">
                <div class="relative overflow-hidden rounded-lg bg-flax-smoke-950 aspect-[3/4]">
                  <img
                    :src="blog.image"
                    :alt="blog.title"
                    loading="lazy"
                    class="absolute inset-0 size-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <!-- Content -->
              <div class="flex flex-col justify-between flex-1 min-w-0">
                <!-- Top section -->
                <div>
                  <!-- Meta row -->
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <span class="font-fancy text-xs font-bold uppercase tracking-[0.2em] text-flax-smoke-500 border border-flax-smoke-700 rounded-full px-3 py-1">
                      {{ blog.platform }}
                    </span>
                    <span class="font-fancy text-xs text-flax-smoke-600 tracking-wider">
                      {{ blog.date }}
                    </span>
                    <span class="text-flax-smoke-700">·</span>
                    <span class="font-fancy text-xs text-flax-smoke-600 tracking-wider">
                      {{ blog.readTime }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h2 class="heading-4 font-fancy font-bold uppercase leading-tight text-flax-smoke-100 group-hover:text-flax-smoke-50 transition-colors duration-300">
                    {{ blog.title }}
                  </h2>
                </div>

                <!-- Bottom: CTA -->
                <div class="flex items-center justify-end gap-4 mt-6 pt-5 border-t border-flax-smoke-800/40">

                  <!-- Read CTA -->
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="font-fancy text-sm font-semibold uppercase tracking-widest text-flax-smoke-400 group-hover:text-flax-smoke-200 transition-colors duration-300">
                      Read on Substack
                    </span>
                    <div class="cta-arrow flex-center size-7 rounded-full border border-flax-smoke-700 transition-all duration-500 group-hover:bg-flax-smoke-400 group-hover:border-flax-smoke-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-3.5 text-flax-smoke-400 transition-all duration-500 group-hover:text-flax-smoke-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>

        <!-- More coming soon -->
        <div
          id="blog-more"
          class="blog-more-anim mt-20 flex flex-col items-center gap-4 opacity-0"
        >
          <div class="w-px h-16 bg-gradient-to-b from-flax-smoke-700 to-transparent"></div>
          <p class="font-fancy text-flax-smoke-600 text-sm uppercase tracking-[0.25em] text-center">
            More essays coming soon
          </p>
          <a
            href="https://substack.com/@sandeshverma"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 mt-2"
          >
            <span class="font-fancy text-sm font-semibold uppercase tracking-widest text-flax-smoke-500 group-hover:text-flax-smoke-200 transition-colors duration-500">
              Follow on Substack
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4 text-flax-smoke-500 group-hover:text-flax-smoke-200 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Light footer strip -->
    <div class="padding-x bg-[#0B0B0A] border-t border-flax-smoke-800/30 py-8">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="font-fancy text-flax-smoke-700 text-sm">
          © {{ new Date().getFullYear() }} Sandesh Verma
        </p>
        <RouterLink
          to="/"
          class="font-fancy text-flax-smoke-600 hover:text-flax-smoke-300 text-sm uppercase tracking-widest transition-colors duration-300"
        >
          ← Back to Portfolio
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Blog images — imported as static assets for Vite bundling
import sentinelsImg from '@/assets/images/blog_assests/sentinels.webp';
import examImg from '@/assets/images/blog_assests/exam.webp';

const blogs = ref([
  {
    title: 'I Built a Production-Grade AI Monitoring Platform from Scratch — Here\'s Everything I Learned',
    description:
      'A deep dive into building Sentinels: an ML observability platform that processes 10,000+ metrics/sec using FastAPI, Kafka, Llama 3.2, and a custom anomaly detection pipeline. Real architecture decisions, real trade-offs.',
    platform: 'Substack',
    date: '2025',
    readTime: '12 min read',
    tags: ['AI/ML', 'FastAPI', 'Kafka', 'System Design'],
    image: sentinelsImg,
    url: 'https://sandeshverma.substack.com/p/i-built-a-production-grade-ai-monitoring?r=1hokwd',
  },
  {
    title: 'I Built an AI Study Companion for India\'s Most Competitive Exams — Here\'s How',
    description:
      'How I built a personalized AI study companion tailored for JEE, NEET, and UPSC. The product decisions, the LLM fine-tuning challenges, and why Indian exam prep is uniquely hard to crack with generic AI tools.',
    platform: 'Substack',
    date: '2025',
    readTime: '10 min read',
    tags: ['LLM', 'EdTech', 'Product', 'AI'],
    image: examImg,
    url: 'https://sandeshverma.substack.com/p/i-built-an-ai-study-companion-for?r=1hokwd',
  },
]);

onMounted(() => {
  // Entry animations with GSAP
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('#blog-hero .blog-label-anim', {
    y: 0,
    duration: 1,
    delay: 0.1,
  })
    .to(
      '#blog-hero .blog-title-anim',
      {
        y: 0,
        duration: 1.2,
      },
      '-=0.8',
    )
    .to(
      '#blog-hero .blog-desc-anim',
      {
        y: 0,
        duration: 1,
      },
      '-=0.9',
    )
    .to(
      '#blog-hero .blog-rule-anim',
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '-=0.6',
    );

  // Scroll-triggered animations
  gsap.to('.blog-content-anim', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.blog-content-anim',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  // Cards staggered
  gsap.to('.blog-card-anim', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.18,
    scrollTrigger: {
      trigger: '.blog-card-anim',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  // Initial state for card anims
  gsap.set('.blog-card-anim', { y: 40 });

  // More section
  gsap.to('.blog-more-anim', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.blog-more-anim',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  });
  gsap.set('.blog-more-anim', { y: 20 });
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card {
  will-change: transform, opacity;
}

/* Smooth transition for the card shimmer */
.blog-card-shimmer {
  will-change: opacity;
}
</style>
