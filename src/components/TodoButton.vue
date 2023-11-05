<script setup>
defineProps({
  type: () => ['submit', 'button'],
  default: () => 'submit'
})
</script>

<template>
  <button :type="type">
    <slot>Create</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 8px 16px;
  border: none;
}
</style>
