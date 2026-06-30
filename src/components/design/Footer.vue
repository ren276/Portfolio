<template>
  <footer
    class="relative flex flex-col items-center justify-center gap-20 p-[2%]"
  >
    <div class="grid w-full grid-cols-2 text-base sm:gap-x-6 md:grid-cols-12">
      <div
        v-for="section in footerSections"
        :key="section.title"
        class="flex flex-col md:col-span-3"
        :class="{ 'md:col-span-6': section.title === 'Menu' }"
      >
        <p
          class="heading-5 border-flax-smoke-400 w-full border-b pb-2 font-bold"
        >
          {{ section.title }}
        </p>
        <div class="mt-2 space-y-4 sm:space-y-2">
          <p v-for="link in section.links" :key="link.label" class="heading-6">
            <Link
              class="font-medium tracking-wider lowercase"
              :label="link.label"
              :url="link.url"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-12">
      <div class="col-span-7 place-content-center md:col-span-6">
        <h2 class="heading-4 sm:heading-2 leading-none font-bold">
          © {{ new Date().getFullYear() }} Sandesh Verma <br />
          <span class="text-sm sm:text-lg font-normal">UI Design and Portfolio by Huy | v1.3</span>
        </h2>
      </div>

      <div
        class="col-span-5 place-content-center max-sm:place-content-end md:col-span-3 space-y-2"
      >
        <div>
          <p class="heading-6 font-bold uppercase">Sandesh's Local time</p>
          <p class="heading-6">{{ myLocalTime }}</p>
        </div>
        <div>
          <p class="heading-6 font-bold uppercase">Your Local time</p>
          <p class="heading-6">{{ userLocalTime }}</p>
        </div>
        <div>
          <p class="heading-6 font-bold uppercase">Views</p>
          <p class="heading-6 font-semibold text-flax-smoke-300">
            <span v-if="visitCount !== null">{{ visitCount }}</span>
            <span v-else class="opacity-70">Loading...</span>
          </p>
        </div>
      </div>

      <div
        class="hidden md:col-span-2 md:col-start-11 md:block lg:col-span-1 lg:col-start-12"
      >
        <MagneticEffect divId="scroll-to-top" textId="scroll-to-top-icon">
          <div
            @click="lenis.scrollTo('#app', { duration: 2 })"
            id="scroll-to-top"
            class="flex-center bg-flax-smoke-400 size-20 cursor-pointer flex-col rounded-full"
          >
            <svg
              class="size-1/2"
              id="scroll-to-top-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <title>Scroll to top</title>
              <path
                d="M12 4L12 20"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9998 8.99996C16.9998 8.99996 13.3174 4.00001 11.9998 4C10.6822 3.99999 6.99982 9 6.99982 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </MagneticEffect>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { navbarLinks, resourceLinks, socialLinks } from '@/data';
  import { Link } from '..';
  import { onMounted, ref, computed } from 'vue';
  import { lenis } from '@/main';
  import MagneticEffect from '../MagneticEffect.vue';
  import { resumeUrl } from '@/functions/resumeState';
  import { Counter } from 'counterapi';

  // Make links list computed so it dynamically reacts to resumeUrl change
  const computedResourceLinks = computed(() => {
    return resourceLinks.map(link => {
      if (link.label === 'Resume') {
        return { ...link, url: resumeUrl.value };
      }
      return link;
    });
  });

  // Combine footer sections dynamically
  const footerSections = computed(() => [
    { title: 'Menu', links: navbarLinks },
    { title: 'Socials', links: socialLinks },
    { title: 'Resources', links: computedResourceLinks.value },
  ]);

  const myLocalTime = ref('');
  const userLocalTime = ref('');
  const visitCount = ref<number | null>(null);

  // Format time using native Intl API — replaces moment-timezone (removes 14.7KB from bundle)
  const formatTime = (timeZone: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone,
    }).format(new Date());
  };

  onMounted(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    myLocalTime.value = formatTime('Asia/Kolkata');
    setInterval(() => {
      myLocalTime.value = formatTime('Asia/Kolkata');
    }, 1000);

    userLocalTime.value = formatTime(userTimeZone);
    setInterval(() => {
      userLocalTime.value = formatTime(userTimeZone);
    }, 1000);

    // Visitor Counter implementation using CounterAPI library
    const counter = new Counter({ workspace: 'sandesh-vermas-team-4624' });
    const hasVisited = sessionStorage.getItem('has_visited_sandesh_portfolio');
    
    if (hasVisited) {
      counter.get('sandyport_visits')
        .then((result) => {
          const res = result as any;
          if (res && res.data && typeof res.data.up_count === 'number') {
            visitCount.value = res.data.up_count;
          }
        })
        .catch((err) => console.error('Error fetching visitor counter:', err));
    } else {
      counter.up('sandyport_visits')
        .then((result) => {
          const res = result as any;
          if (res && res.data && typeof res.data.up_count === 'number') {
            visitCount.value = res.data.up_count;
            sessionStorage.setItem('has_visited_sandesh_portfolio', 'true');
          }
        })
        .catch((err) => console.error('Error incrementing visitor counter:', err));
    }
  });
</script>
