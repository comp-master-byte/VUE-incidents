import { computed, type Ref } from 'vue';
import type { IncidentPriority, IncidentStatus, IncidentType } from '@/shared/domain';
import { PRIORITIES, STATUSES } from '@/shared/consts';
import { appDates } from '@/shared/utils';

const STATUS_ORDER: IncidentStatus[] = [
  'new',
  'investigating',
  'in-progress',
  'monitoring',
  'solved',
];

const PRIORITY_ORDER: IncidentPriority[] = ['critical', 'high', 'medium', 'low'];

const STATUS_CHART_COLORS: Record<IncidentStatus, string> = {
  new: '#0e7490',
  investigating: '#4338ca',
  'in-progress': '#7e22ce',
  monitoring: '#0369a1',
  solved: '#15803d',
};

const PRIORITY_CHART_COLORS: Record<IncidentPriority, string> = {
  critical: '#b91c1c',
  high: '#c2410c',
  medium: '#a16207',
  low: '#1d4ed8',
};

export function useIncidentsAnalytics(incidents: Ref<IncidentType[]>) {
  const summary = computed(() => {
    const list = incidents.value;
    const open = list.filter((incident) => incident.status !== 'solved');
    const critical = list.filter((incident) => incident.priority === 'critical');
    const solved = list.filter((incident) => incident.status === 'solved');

    return {
      total: list.length,
      open: open.length,
      critical: critical.length,
      solved: solved.length,
    };
  });

  const statusDistribution = computed(() => {
    const counts = Object.fromEntries(STATUS_ORDER.map((status) => [status, 0])) as Record<
      IncidentStatus,
      number
    >;

    for (const incident of incidents.value) {
      counts[incident.status] += 1;
    }

    return STATUS_ORDER.map((status) => ({
      name: STATUSES[status],
      value: counts[status],
      itemStyle: { color: STATUS_CHART_COLORS[status] },
    }));
  });

  const priorityDistribution = computed(() => {
    const counts = Object.fromEntries(PRIORITY_ORDER.map((priority) => [priority, 0])) as Record<
      IncidentPriority,
      number
    >;

    for (const incident of incidents.value) {
      counts[incident.priority] += 1;
    }

    return PRIORITY_ORDER.map((priority) => ({
      name: PRIORITIES[priority],
      value: counts[priority],
      itemStyle: { color: PRIORITY_CHART_COLORS[priority] },
    }));
  });

  const servicesRanking = computed(() => {
    const counts = new Map<string, number>();

    for (const incident of incidents.value) {
      counts.set(incident.service, (counts.get(incident.service) || 0) + 1);
    }

    return [...counts.entries()]
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  });

  const recentCriticalHigh = computed(() => {
    return [...incidents.value]
      .filter((incident) => incident.priority === 'critical' || incident.priority === 'high')
      .sort((a, b) => appDates.toTimestamp(b.updatedAt) - appDates.toTimestamp(a.updatedAt))
      .slice(0, 5);
  });

  const statusChartOption = computed(() => ({
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: { color: '#475467', fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        data: statusDistribution.value,
      },
    ],
    media: [
      {
        query: { maxWidth: 640 },
        option: {
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: 0,
            textStyle: { fontSize: 11 },
          },
          series: [
            {
              radius: ['36%', '58%'],
              center: ['50%', '42%'],
            },
          ],
        },
      },
    ],
  }));

  const priorityChartOption = computed(() => ({
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: { color: '#475467', fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: '68%',
        center: ['50%', '45%'],
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        data: priorityDistribution.value,
      },
    ],
    media: [
      {
        query: { maxWidth: 640 },
        option: {
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: 0,
            textStyle: { fontSize: 11 },
          },
          series: [
            {
              radius: '58%',
              center: ['50%', '42%'],
            },
          ],
        },
      },
    ],
  }));

  const servicesChartOption = computed(() => {
    const ranking = [...servicesRanking.value].reverse();

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: {
        left: 8,
        right: 24,
        top: 8,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { color: '#667085' },
        splitLine: { lineStyle: { color: '#e2e8f0' } },
      },
      yAxis: {
        type: 'category',
        data: ranking.map((item) => item.service),
        axisLabel: { color: '#1d2939', fontSize: 12 },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          type: 'bar',
          data: ranking.map((item) => item.count),
          barWidth: 18,
          itemStyle: {
            color: '#5d5fef',
            borderRadius: [0, 8, 8, 0],
          },
        },
      ],
      media: [
        {
          query: { maxWidth: 640 },
          option: {
            grid: {
              left: 4,
              right: 12,
              top: 4,
              bottom: 4,
            },
            yAxis: {
              axisLabel: {
                fontSize: 11,
                width: 80,
                overflow: 'truncate',
              },
            },
            series: [{ barWidth: 14 }],
          },
        },
      ],
    };
  });

  return {
    summary,
    statusDistribution,
    priorityDistribution,
    servicesRanking,
    recentCriticalHigh,
    statusChartOption,
    priorityChartOption,
    servicesChartOption,
  };
}
