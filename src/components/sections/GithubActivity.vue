<template>
  <section id="github-activity" class="padding-x mb-20 w-full flex flex-col items-center">
    <!-- Outer container styled like a dark glass panel or matching UI -->
    <div class="w-full max-w-6xl rounded-2xl border border-flax-smoke-500/20 bg-transparent p-4 md:p-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div class="flex items-center gap-4">
          <!-- Github Icon box -->
          <div class="flex size-14 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
            <svg class="size-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div>
            <h3 class="heading-4 font-bold text-flax-smoke-50">GitHub Activity</h3>
            <p class="text-sm font-semibold tracking-widest text-flax-smoke-400 uppercase mt-1">Contributions Timeline</p>
          </div>
        </div>

        <a href="https://github.com/ren276" target="_blank" class="flex items-center gap-2 rounded-full border border-flax-smoke-500/50 bg-[#141414] px-4 py-2 text-sm font-medium text-flax-smoke-200 transition-colors hover:bg-[#1a1a1a] hover:text-white">
          @ren276
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      <!-- Graph Container -->
      <div class="w-full overflow-hidden flex justify-center mt-4 pb-2">
        <img 
          src="https://ghchart.rshah.org/39d353/ren276" 
          alt="ren276's Github Activity" 
          class="w-full max-w-5xl opacity-90 transition-opacity duration-300 hover:opacity-100 dark:invert-0" 
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// We use a reliable dynamic SVG for the GitHub activity instead of the fragile scraping library.
</script>
