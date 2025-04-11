export const useBehaveDemoStore = defineStore('behave-demo', () => {
  const demoStarted = ref(false);

  return {
    demoStarted,
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBehaveDemoStore, import.meta.hot))
}
