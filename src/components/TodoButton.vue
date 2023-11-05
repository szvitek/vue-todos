<script lang="ts" setup>
export interface TodoButtonProps {
  type?: 'submit' | 'button'
}

withDefaults(defineProps<TodoButtonProps>(), {
  type: 'submit'
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
