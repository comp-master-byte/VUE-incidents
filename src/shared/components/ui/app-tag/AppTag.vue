<script setup lang="ts">
type AppTagProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

defineProps<AppTagProps>();
</script>

<template>
  <span
    class="app-tag"
    :style="{
      backgroundColor,
      color: textColor,
    }"
  >
    {{ label }}
  </span>
</template>

<style scoped>
.app-tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
}
</style>
