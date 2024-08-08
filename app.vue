<template>
  <div class="flex justify-center items-center h-screen px-4">
    <div class="w-[500px] max-w-[500px]">
      <p class="text-2xl font-bold text-center bg-red-200 rounded-lg py-6">
        {{ text }}
      </p>
      <div class="mt-4 flex gap-4">
        <button class="btn btn-success" @click="sayYes()">Yes</button>
        <button class="btn btn-danger" @click="sayNo()">No</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const yes = ref<number>(0);
const no = ref<number>(0);

const sayYes = () => {
  no.value = 0;
  yes.value++;
};

const sayNo = () => {
  yes.value = 0;
  no.value++;
};

const text = computed(() => {
  if (yes.value === 0 && no.value === 0) {
    return "Do you miss me ?";
  } else if (yes.value >= 1 && no.value === 0) {
    let emg = yes.value === 1 ? "🥰" : "😍";
    return yes.value === 1
      ? "I miss you too " + emg
      : "I miss you more" + "e".repeat(yes.value - 2) + " " + emg;
  } else {
    switch (no.value) {
      case 1:
        return "Why ? 🙁";
      case 2:
        return "I'm sad 😩";
      default:
        return "I'm " + "very ".repeat(no.value - 2) + " sad 😭";
    }
  }
});
</script>

<style scoped></style>
