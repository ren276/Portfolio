<template>
  <section id="services" class="padding-x mb-20 overflow-hidden">
    <div class="flex w-full flex-col">
      <h3
        id="what-i-do"
        v-html="whatIDo"
        class="heading-1 font-extrabold uppercase"
      ></h3>

      <!-- <div
        id="services-text"
        class="grid-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 col-start-0 text-center text-nowrap md:col-start-4"
        >
          ( SKILLS & EXPERIENCE )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold md:col-span-5"
        >
          A selection of modern technologies and frameworks I use, alongside my professional journey.
        </p>
      </div> -->
    </div>

    <!-- 2 Column Layout -->
    <div id="content-grid" class="relative mt-12 w-full lg:mt-[10%] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
      
      <!-- Tech Stack Column -->
      <div class="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
        <h4 class="text-3xl font-bold text-white mb-2">Tech Stack</h4>
        <div 
          class="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <ServicesCard
            v-for="(card, index) in servicesCardProps"
            :key="index"
            :number="index + 1"
            :title="card.title"
            :body="card.body"
            :headings="card.headings"
            :shape="card.shape"
            class="bento-card bg-[#111111] border border-flax-smoke-500/20 hover:border-flax-smoke-500/60 transition-colors shadow-2xl shadow-black/50 opacity-0 translate-y-12"
          />
        </div>
      </div>

      <!-- Experience Column -->
      <div class="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
        <h4 class="text-3xl font-bold text-white mb-2">Experience</h4>
        <div class="flex flex-col gap-8">
          <div 
            v-for="(exp, index) in experienceProps" 
            :key="index" 
            class="bento-card opacity-0 translate-y-12 relative border-l border-flax-smoke-500/30 pl-8 py-2"
          >
            <div class="absolute w-3 h-3 bg-[#0B0B0A] border-2 border-flax-smoke-500 rounded-full -left-[7px] top-4"></div>
            <p class="text-flax-smoke-500 text-sm font-mono mb-2">{{ exp.duration }}</p>
            <h5 class="text-xl font-bold text-white mb-1">{{ exp.role }}</h5>
            <p class="text-flax-smoke-300 font-semibold mb-3">{{ exp.company }}</p>
            <p class="text-flax-smoke-300/80 text-base leading-relaxed">{{ exp.description }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
  import { ServicesCard } from '..';
  import { servicesData, experienceData } from '@/data';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const whatIDo = ref('Tech Stack & Experience /');
  const servicesCardProps = servicesData;
  const experienceProps = experienceData;

  onBeforeMount(() => {
    whatIDo.value = textSplitterIntoChar('Tech Stack & Experience /', true);
  });

  onMounted(() => {
    animateSplitText('#what-i-do .letters', '#services-text', 0.7, 0.01, 0);

    // Bento Grid Stagger Animation
    let ctx = gsap.context(() => {
      gsap.to('.bento-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#content-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    onUnmounted(() => {
      ctx.revert();
    });
  });
</script>
