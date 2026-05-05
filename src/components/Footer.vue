<template>
  <footer>
    <div class="copyright">
      <n-text class="description">今日热榜</n-text>
    </div>
    <n-text
      v-if="icp"
      :depth="3"
      class="icp"
      v-html="icp"
      @click="jumpLink('https://beian.miit.gov.cn/')"
    />
  </footer>
</template>

<script setup>
const icp = ref(import.meta.env.VITE_ICP ? import.meta.env.VITE_ICP : null);
</script>

<style lang="scss" scoped>
footer {
  height: 100px;
  padding: 0 5vw;
  max-width: 1800px;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .copyright {
    margin-bottom: 4px;
    .description {
      font-size: 14px;
    }
  }
  .icp {
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--n-code-text-color);
    }
  }
}
</style>
