<template>
  <div :class="[$attrs.class, 'flex flex-col p-8 rounded-3xl']">
    <div
      class="heading-3 max-sm:heading-4 flex items-center justify-between pb-6 text-left font-semibold border-b border-flax-smoke-500/50 mb-6"
    >
      <div class="flex items-center gap-4">
        <span class="text-flax-smoke-500 font-mono text-xl">
          {{ `0${number}` }}
        </span>
        <h3 class="text-white">{{ title }}</h3>
      </div>
      <div
        v-html="shape"
        class="w-12 h-12 hidden animate-[spin_10s_linear_infinite] fill-flax-smoke-500/50 lg:block"
      />
    </div>

    <div class="flex flex-col gap-y-6 h-full justify-between">
      <p class="text-balance text-base font-medium text-flax-smoke-300/80">
        {{ body }}
      </p>

      <div class="flex flex-wrap gap-3 mt-2">
        <template v-for="heading in headings" :key="heading">
          <span
            class="inline-flex items-center gap-2.5 rounded-full border border-flax-smoke-500/30 bg-[#161616] px-4 py-2 text-sm font-medium text-flax-smoke-200 transition-colors hover:bg-flax-smoke-500/20"
          >
            <img 
              v-if="getIconForTech(heading)" 
              :src="getIconForTech(heading)" 
              class="w-4 h-4 object-contain" 
              :class="{'invert brightness-0 dark:invert-0': heading.toLowerCase().includes('next.js')}"
              alt="Tech logo" 
            />
            {{ heading }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    headings: {
      type: Array as () => string[],
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
  });

  function getIconForTech(heading: string) {
    const lower = heading.toLowerCase();
    if (lower.includes('kotlin')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg';
    if (lower.includes('swift')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg';
    if (lower.includes('flutter')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg';
    if (lower.includes('fastapi')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg';
    if (lower.includes('kafka')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg';
    if (lower.includes('next.js')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg';
    if (lower.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg';
    if (lower.includes('postgresql')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg';
    if (lower.includes('redis')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg';
    if (lower.includes('supabase')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg';
    if (lower.includes('docker')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg';
    if (lower.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg';
    return undefined;
  }
</script>
