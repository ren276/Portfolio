<template>
  <div
    class="w-fit max-w-full"
    :class="className"
    :aria-busy="resource.status === 'loading'"
  >
    <p v-if="showAccount" class="mb-5 text-lg font-medium tracking-tight text-white">
      @{{ normalizedAccount ?? account }}
    </p>

    <!-- Loading Skeleton -->
    <div
      v-if="resource.status === 'loading'"
      class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        class="flex min-w-max"
        :style="{ gap: cellGap + 'px' }"
        aria-label="Loading contributions"
      >
        <div
          v-for="week in weekCountLoading"
          :key="week"
          class="grid grid-rows-7"
          :style="{ gap: cellGap + 'px' }"
        >
          <span
            v-for="day in 7"
            :key="day"
            class="animate-pulse bg-[#1c1c1c]"
            :style="{
              width: cellSize + 'px',
              height: cellSize + 'px',
              borderRadius: resolvedCellRadius + 'px',
              animationDelay: `${(week + day) * 12}ms`,
            }"
          />
        </div>
      </div>
    </div>

    <p v-if="resource.status === 'error'" class="text-sm text-[#888888]">
      {{ resource.message }}
    </p>

    <!-- Graph Grid -->
    <div
      v-if="resource.status === 'ready' && weeks.length > 0"
      class="overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        ref="graphContainer"
        class="relative flex min-w-max"
        :style="{ gap: cellGap + 'px' }"
        role="grid"
        :aria-label="`GitHub contributions for ${normalizedAccount ?? account}`"
        @mouseleave="clearTooltip"
      >
        <div
          v-for="(week, weekIndex) in weeks"
          :key="`${animationKey}-${weekIndex}`"
          class="grid grid-rows-7"
          :style="{ gap: cellGap + 'px' }"
          role="row"
        >
          <button
            v-for="(contribution, dayIndex) in week"
            :key="`${animationKey}-${contribution.date}`"
            type="button"
            role="gridcell"
            :aria-label="formatContributionLabel(contribution)"
            class="relative outline-none transition-shadow hover:z-10 cell-btn focus-visible:ring-2 focus-visible:ring-white/60"
            :style="{
              width: cellSize + 'px',
              height: cellSize + 'px',
              borderRadius: resolvedCellRadius + 'px',
              willChange: 'transform, opacity, filter'
            }"
            @mouseenter="showTooltip($event.currentTarget, contribution, weekIndex, dayIndex, $event)"
            @focus="showTooltip($event.currentTarget, contribution, weekIndex, dayIndex)"
            @blur="clearTooltip"
            :data-week="weekIndex"
            :data-day="dayIndex"
            :data-level="contribution.level"
          >
            <!-- Cell content with GSAP animation targets -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 cell-bg"
              :style="{
                backgroundColor: colors[contribution.level],
                borderRadius: resolvedCellRadius + 'px',
                willChange: 'transform, opacity'
              }"
            ></span>
          </button>
        </div>

        <!-- Tooltip -->
        <Transition name="fade-spring">
          <span
            v-if="hoveredContribution"
            role="tooltip"
            class="pointer-events-none fixed z-50 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black ring-1 ring-white/15"
            :style="{
              left: hoveredContribution.left + 'px',
              top: hoveredContribution.top + 'px',
              transform: `translate(-50%, ${
                hoveredContribution.placement === 'above' ? '-100%' : '0%'
              })`,
            }"
          >
            {{ formatContributionLabel(hoveredContribution.contribution) }}
          </span>
        </Transition>
      </div>
    </div>

    <!-- Legend -->
    <div
      v-if="showLegend && resource.status === 'ready'"
      class="mt-4 flex gap-1.5"
      aria-label="Contribution activity legend"
    >
      <span
        v-for="(color, level) in colors"
        :key="color"
        :style="{
          width: cellSize + 'px',
          height: cellSize + 'px',
          backgroundColor: color,
          borderRadius: resolvedCellRadius + 'px',
        }"
        :aria-label="`Level ${level}`"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";
import gsap from "gsap";

export type GithubGraphVariant = "github" | "graphite" | "ocean" | "violet";
export type GithubGraphAnimation = "wave" | "scan" | "cascade";
export type GithubGraphAmbientEffect = "none" | "tide" | "drift" | "twinkle";

export type GithubContribution = {
  date: string;
  count: number;
  level?: number;
};

export type GithubContributionCell = GithubContribution & {
  level: number;
};

type ResourceState =
  | { status: "loading" }
  | { status: "ready"; contributions: GithubContribution[] }
  | { status: "error"; message: string };

const props = withDefaults(
  defineProps<{
    account?: string;
    months?: number;
    variant?: GithubGraphVariant;
    animation?: GithubGraphAnimation;
    animationSpeed?: number;
    cellSize?: number;
    cellGap?: number;
    cellRadius?: number;
    showLegend?: boolean;
    showAccount?: boolean;
    ambientEffect?: GithubGraphAmbientEffect;
    ambientIntensity?: number;
    data?: GithubContribution[];
    className?: string;
  }>(),
  {
    account: "shadcn",
    months: 6,
    variant: "github",
    animation: "wave",
    animationSpeed: 1,
    cellSize: 18,
    cellGap: 4,
    cellRadius: 3,
    showLegend: false,
    showAccount: true,
    ambientEffect: "twinkle",
    ambientIntensity: 0.65,
  }
);

const VARIANTS: Record<
  GithubGraphVariant,
  [string, string, string, string, string]
> = {
  github: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  graphite: ["#171717", "#5f5f5f", "#969696", "#cccccc", "#eeeeee"],
  ocean: ["#124e93", "#2585d8", "#62bdf5", "#b4e2ff", "#e6f5ff"],
  violet: ["#3b1178", "#52269c", "#8355df", "#b486ff", "#dcc5ff"],
};

const CONTRIBUTIONS_ENDPOINT = "https://github-contributions-api.jogruber.de/v4";

// Utilities
function dateFromISO(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function fallbackLevel(count: number, maxCount: number): number {
  if (!Number.isFinite(count) || count <= 0 || maxCount <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
}

function normalizeGithubAccount(account: string): string | null {
  const normalized = account.trim().replace(/^@+/, "");
  return /^(?!-)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(normalized)
    ? normalized
    : null;
}

function buildContributionWeeks(
  contributions: GithubContribution[]
): GithubContributionCell[][] {
  const valid = contributions
    .map((item) => ({ ...item, parsedDate: dateFromISO(item.date) }))
    .filter(
      (item): item is GithubContribution & { parsedDate: Date } =>
        item.parsedDate !== null && Number.isFinite(item.count)
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  if (valid.length === 0) return [];

  const maxCount = Math.max(0, ...valid.map((item) => item.count));
  const byDate = new Map(valid.map((item) => [item.date, item]));
  const firstDate = valid[0]!.parsedDate;
  const lastDate = valid[valid.length - 1]!.parsedDate;
  const startDate = addDays(firstDate, -firstDate.getUTCDay());
  const endDate = addDays(lastDate, 6 - lastDate.getUTCDay());
  const cells: GithubContributionCell[] = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const key = isoDate(date);
    const contribution = byDate.get(key);
    const count = Math.max(0, contribution?.count ?? 0);
    const explicitLevel = contribution?.level;
    const level =
      Number.isInteger(explicitLevel) &&
      explicitLevel! >= 0 &&
      explicitLevel! <= 4
        ? count === 0
          ? 0
          : explicitLevel!
        : fallbackLevel(count, maxCount);

    cells.push({ date: key, count, level });
  }

  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7)
  );
}

function selectRecentContributions(
  contributions: GithubContribution[],
  months: number
): GithubContribution[] {
  const parsed = contributions
    .map((contribution) => ({
      contribution,
      date: dateFromISO(contribution.date),
    }))
    .filter(
      (item): item is { contribution: GithubContribution; date: Date } =>
        item.date !== null
    );
  const latest = parsed.reduce<Date | null>(
    (current, item) => (!current || item.date > current ? item.date : current),
    null
  );

  if (!latest) return [];

  const start = new Date(latest);
  start.setUTCMonth(
    start.getUTCMonth() - Math.max(1, Math.min(12, Math.round(months)))
  );
  return parsed
    .filter((item) => item.date >= start)
    .map((item) => item.contribution);
}

// State
const reducedMotion = usePreferredReducedMotion();
const normalizedAccount = computed(() => normalizeGithubAccount(props.account));
const resource = ref<ResourceState>({ status: "loading" });

const hoveredContribution = ref<{
  contribution: GithubContributionCell;
  left: number;
  top: number;
  originLeft: number;
  originTop: number;
  placement: "above" | "below";
  weekIndex: number;
  dayIndex: number;
} | null>(null);

const colors = computed(() => VARIANTS[props.variant]);
const resolvedCellRadius = computed(() =>
  Math.max(0, Math.min(props.cellRadius, Math.max(0, props.cellSize) / 2))
);

const weekCountLoading = computed(() =>
  Math.ceil((Math.max(1, props.months ?? 3) * 31 + 6) / 7)
);

const abortController = ref<AbortController | null>(null);

function fetchData() {
  if (props.data) {
    resource.value = { status: "ready", contributions: props.data };
    return;
  }

  if (!normalizedAccount.value) {
    resource.value = {
      status: "error",
      message: "Enter a valid GitHub username.",
    };
    return;
  }

  if (abortController.value) {
    abortController.value.abort();
  }
  abortController.value = new AbortController();
  
  resource.value = { status: "loading" };

  fetch(`${CONTRIBUTIONS_ENDPOINT}/${normalizedAccount.value}?y=last`, {
    signal: abortController.value.signal,
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("GitHub account not found.");
      const payload = (await response.json()) as {
        contributions?: GithubContribution[];
      };
      if (!Array.isArray(payload.contributions)) {
        throw new Error("No public contributions were returned.");
      }
      return payload.contributions;
    })
    .then((contributions) => {
      if (!abortController.value?.signal.aborted) {
        resource.value = { status: "ready", contributions };
      }
    })
    .catch((error: unknown) => {
      if (abortController.value?.signal.aborted) return;
      resource.value = {
        status: "error",
        message:
          error instanceof Error ? error.message : "Could not load contributions.",
      };
    });
}

onMounted(() => {
  fetchData();
});

watch([() => props.account, () => props.data], () => {
  fetchData();
});

const weeks = computed(() => {
  if (resource.value.status !== "ready") return [];
  return buildContributionWeeks(
    selectRecentContributions(resource.value.contributions, props.months)
  );
});

const animationKey = computed(
  () =>
    `${normalizedAccount.value ?? props.account}-${props.months}-${
      props.variant
    }-${props.animation}-${props.cellSize}-${props.cellGap}`
);

// Tooltip logic
function formatContributionLabel(contribution: GithubContributionCell): string {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(dateFromISO(contribution.date) ?? new Date());
  const label = contribution.count === 1 ? "contribution" : "contributions";
  return `${contribution.count} ${label} on ${date}`;
}

function showTooltip(
  element: EventTarget | null,
  contribution: GithubContributionCell,
  weekIndex: number,
  dayIndex: number,
  pointer?: MouseEvent
) {
  if (!element) return;
  const el = element as HTMLElement;
  const cellRect = el.getBoundingClientRect();
  const placement = cellRect.top > 56 ? "above" : "below";
  const left = Math.min(
    Math.max(cellRect.left + cellRect.width / 2, 96),
    window.innerWidth - 96
  );
  hoveredContribution.value = {
    contribution,
    left,
    top: placement === "above" ? cellRect.top - 9 : cellRect.bottom + 9,
    originLeft: pointer?.clientX ?? left,
    originTop: pointer?.clientY ?? cellRect.top + cellRect.height / 2,
    placement,
    weekIndex,
    dayIndex,
  };
  
  // Update wave effect
  if (graphContainer.value) {
    const cells = graphContainer.value.querySelectorAll(".cell-btn");
    cells.forEach((c) => {
      const htmlCell = c as HTMLElement;
      const wIdx = parseInt(htmlCell.dataset.week || "0", 10);
      const dIdx = parseInt(htmlCell.dataset.day || "0", 10);
      const distance = Math.hypot(wIdx - weekIndex, dIdx - dayIndex);
      const waveStrength = Math.max(0, 1 - distance / 3);
      const filter = `brightness(${1 + waveStrength * 0.45}) saturate(${1 + waveStrength * 0.2})`;
      gsap.to(htmlCell, { filter: filter, duration: 0.1, ease: "power1.out" });
    });
  }
}

function clearTooltip() {
  hoveredContribution.value = null;
  // Reset wave effect
  if (graphContainer.value) {
    const cells = graphContainer.value.querySelectorAll(".cell-btn");
    gsap.to(cells, { filter: "brightness(1) saturate(1)", duration: 0.2, ease: "power1.out" });
  }
}

// GSAP Animations
const graphContainer = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

function getCellDelay(
  animation: GithubGraphAnimation,
  weekIndex: number,
  dayIndex: number,
  speed: number
): number {
  const step =
    animation === "wave"
      ? weekIndex * 0.026 + dayIndex * 0.016
      : animation === "scan"
      ? weekIndex * 0.03
      : (weekIndex + dayIndex * 2) * 0.018;
  return step / Math.max(speed, 0.1);
}

watch([weeks, graphContainer], async () => {
  if (weeks.value.length > 0 && graphContainer.value) {
    await nextTick();
    
    if (ctx.value) {
      ctx.value.revert();
    }
    
    ctx.value = gsap.context(() => {
      const cells = graphContainer.value!.querySelectorAll(".cell-btn");
      const isReducedMotion = reducedMotion.value === 'reduce';

      cells.forEach((cell: Element) => {
        const htmlCell = cell as HTMLElement;
        const weekIndex = parseInt(htmlCell.dataset.week || "0", 10);
        const dayIndex = parseInt(htmlCell.dataset.day || "0", 10);
        const entranceDelay = isReducedMotion
          ? 0
          : getCellDelay(props.animation, weekIndex, dayIndex, props.animationSpeed);

        // Entrance Animation
        if (!isReducedMotion) {
          gsap.set(htmlCell, { opacity: 0, scale: 0.35, y: 4 });
          gsap.to(htmlCell, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            delay: entranceDelay,
            ease: "back.out(1.7)",
          });
        } else {
          gsap.set(htmlCell, { opacity: 1, scale: 1, y: 0 });
        }

        // Ambient Animation
        if (!isReducedMotion && props.ambientEffect !== "none") {
          const bg = htmlCell.querySelector(".cell-bg");
          if (bg) {
            const intensity = props.ambientIntensity;
            const strength = Math.min(1, Math.max(0, intensity));
            const seed = ((weekIndex * 17 + dayIndex * 31) % 11) / 10;
            const effect = props.ambientEffect;

            const isTide = effect === "tide";
            const isDrift = effect === "drift";
            const duration = isTide ? 3.2 : isDrift ? 3.8 + seed : 2 + seed * 1.4;
            const delay =
              entranceDelay +
              (isTide ? (weekIndex + dayIndex * 1.8) * 0.055 : seed * 0.85);

            const lowOpacity =
              1 - (isTide ? 0.24 : isDrift ? 0.16 : 0.34) * strength;
            const smallScale =
              1 - (isTide ? 0.07 : isDrift ? 0.04 : 0.08) * strength;

            const opacityKeyframes = isDrift
              ? [1, lowOpacity, 1 - 0.06 * strength, 1]
              : [1, lowOpacity, 1];
            
            const scaleKeyframes = isDrift
              ? [1, smallScale, 1 + 0.025 * strength, 1]
              : [1, smallScale, 1];
              
            const kfs = opacityKeyframes.map((o, i) => ({
              opacity: o,
              scale: scaleKeyframes[i],
            }));

            gsap.to(bg, {
              keyframes: kfs,
              duration: duration,
              delay: delay,
              ease: "sine.inOut",
              repeat: -1,
            });
          }
        }
      });
    }, graphContainer.value);
  }
});
</script>

<style scoped>
.fade-spring-enter-active,
.fade-spring-leave-active {
  transition: opacity 0.12s ease, transform 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-spring-enter-from,
.fade-spring-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(var(--y-offset, 0%) + 8px)) scale(0.92) !important;
}
</style>
