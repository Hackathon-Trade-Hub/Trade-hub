<script setup>
  defineEmits(['clique'])
</script>
<template>
  <div>
    <button @click.prevent="clique">
      <slot></slot>
    </button>
  </div>
</template>
