<template>
  <section id="services" class="padding-x mb-20 overflow-hidden">
    <div class="flex w-full flex-col">
      <h3
        id="what-i-do"
        v-html="whatIDo"
        class="heading-1 font-extrabold uppercase"
      ></h3>

      <div
        id="services-text"
        class="grid-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 col-start-0 text-center text-nowrap md:col-start-4"
        >
          ( TECH STACK )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold md:col-span-5"
        >
          A selection of modern technologies and frameworks I use to build scalable, high-performance applications.
        </p>
      </div>
    </div>

    <!-- Tech Stack Grid -->
    <div class="relative mt-12 w-full lg:mt-[10%]">
      <div 
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="bento-grid"
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
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
  import { ServicesCard } from '..';
  import { servicesData } from '@/data';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const whatIDo = ref('Tech Stack /');
  const servicesCardProps = servicesData;

  onBeforeMount(() => {
    whatIDo.value = textSplitterIntoChar('Tech Stack /', true);
  });

  onMounted(() => {
    animateSplitText('#what-i-do .letters', '#services-text', 0.7, 0.01, 0);

    // Bento Grid Stagger Animation
    let ctx = gsap.context(() => {
      gsap.to('.bento-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#bento-grid',
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
