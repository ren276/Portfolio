<template>
  <section class="padding-x mb-[-100svh] py-0">
    <div
      id="hero"
      class="sticky top-0 flex min-h-svh w-full items-end pb-[clamp(2.25rem,2.1786rem_+_0.3571vi,2.5rem)]"
    >
      <div class="relative flex w-full flex-col items-center">
        <div class="w-full items-end overflow-clip">
          <div class="flex w-full items-start gap-10">
            <MyName />
            <Star id="star" class="hide-on-mobile translate-x-full" />
          </div>
        </div>

        <div class="lg:column-gap spacing-t grid w-full grid-cols-12">
          <div
            class="col-span-full flex flex-col items-start gap-14 sm:col-span-4"
          >
            <div class="overflow-hidden">
              <svg
                id="down-arrow"
                stroke="currentColor"
                fill="none"
                stroke-width="1.25"
                viewBox="6 6 12 12"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="hide-on-mobile m-0 size-4 -translate-x-full p-0 md:size-6"
                color="#8C8C73"
                style="color: #8c8c73"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <polyline points="17 7 17 17 7 17"></polyline>
              </svg>
            </div>

            <p class="sr-only">
              A hireable Software Development Engineer specializing in Android, iOS, Flutter, Kotlin, React, and Machine Learning. Open to new opportunities to deliver privacy-first, cutting-edge solutions for your business.
            </p>
            <p
              v-html="whoAmI"
              id="whoAmI"
              class="who-am-i heading-5 w-full max-w-[30ch] overflow-clip leading-snug font-medium text-balance sm:max-w-[37ch] lg:text-start"
            ></p>

            <div class="relative origin-left overflow-hidden sm:scale-150">
              <div
                id="contact-btn"
                class="flex -translate-y-full items-center gap-4"
              >
                <!-- <Button
                  :data-cal-namespace="dataCalNamespace"
                  :data-cal-link="dataCalLink"
                  :data-cal-config="dataCalConfig"
                  class="contact"
                  label="Get in touch"
                /> -->
                <Button
                  label="Get in touch"
                  url="mailto:sandeshverma0311@gmail.com"
                />
                <Button
                  label="Resume"
                  :url="resumeUrl"
                  target="_blank"
                />
              </div>
            </div>
          </div>

          <div
            id="profile-container"
            class="relative col-span-4 mt-10 h-[20vh] max-w-lg flex-col rounded-lg select-none sm:mt-0 sm:h-full md:flex md:h-[50vh]"
          >
            <div class="overlay bg-flax-smoke-50 absolute inset-0 z-2"></div>
            <img
              id="profile-img"
              :src="profile"
              :srcset="`${profileSmall} 400w, ${profile} 1000w`"
              sizes="(max-width: 768px) 400px, 336px"
              alt="Sandesh Verma — Android Engineer & Full Stack Developer"
              width="336"
              height="420"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              class="size-full scale-90 rounded-lg object-cover object-top brightness-110 grayscale"
            />
          </div>

          <!-- content-end justify-self-end  -->
          <div
            class="relative col-span-8 size-full overflow-clip text-end sm:col-span-4"
          >
            <div
              id="available-for-work"
              class="absolute right-0 bottom-0 flex translate-y-full flex-col items-end"
            >
              <p
                class="3xl:text-base block leading-snug font-medium -tracking-tight uppercase animate-float-3d"
              >
                Available for new opportunities
              </p>
              <h3
                class="3xl:heading-1 heading-1-alt font-fancy block leading-none font-bold -tracking-tight animate-glow"
              >
                {{ AvailableForWorkDate }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-svh"></div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { MyName, Star } from '../design';
  import { Button } from '@/components/common';
  import { profile2 as profile, profile2Small as profileSmall } from '@/assets/images';
  import { getAvailableForWorkDate, textSplitterIntoChar } from '@/functions';
  import { resumeUrl } from '@/functions/resumeState';

  const whoAmI = ref(
    'Mobile & Full-Stack Developer | Android · iOS · Flutter · AI/ML',
  );
  const AvailableForWorkDate = ref('');

  onBeforeMount(() => {
    whoAmI.value = textSplitterIntoChar(whoAmI.value);
    AvailableForWorkDate.value = getAvailableForWorkDate();
  });
</script>

<style scoped>
.animate-float-3d {
  animation: float3d 6s ease-in-out infinite;
  display: inline-block;
  transform-style: preserve-3d;
  perspective: 1000px;
}

@keyframes float3d {
  0%, 100% {
    transform: translateY(0) rotateX(0) rotateY(0);
  }
  50% {
    transform: translateY(-8px) rotateX(15deg) rotateY(-10deg);
  }
}

.animate-glow {
  position: relative;
  display: inline-block;
  color: #8c8c73;
  overflow: hidden;
}

/* Composited shimmer using ::after with transform + opacity only (GPU-accelerated, no CLS) */
.animate-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(229, 229, 203, 0.6) 50%,
    transparent 60%
  );
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine-composited 3s ease-in-out infinite;
  will-change: transform;
  transform: translateX(-100%);
}

@keyframes shine-composited {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
