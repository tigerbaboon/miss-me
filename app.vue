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
    <!-- <a
      :href="`https://idhub.kku.ac.th/api/v1/oauth2/auth/?response_type=code&client_id=7fc7c66f-ef69-4c5d-ae04-1f1696d4defd&redirect_uri=https://eport.zsh.ltd/api/v1/auth/thai-id/callback&scope=pid%20name&state=login`"
      class=""
    >
      <div
        class="flex justify-center items-center gap-2 w-full border border-gray-300 p-2 rounded-lg hover:bg-slate-100 hover:border-transparent"
      >
        <Icon name="logos:google-icon" />
        <div>THAI ID</div>
      </div>
    </a> -->
<br>
<br>
<br>
    <div>
      <button @click="downloadfile()">TEST 2ndSMS</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
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

// const downloadfile = async () => {
// try {
//     const response = await axios.get('http://loyalty-privilege-coupon-api.uat-gcp-trueyou-bn.slp.trueyou.co.th');
//     console.log(response.data);
//   } catch (e) {
//     console.error(e);
//   }
// }
const downloadfile = async () => {
  // try {
    // ใช้ Proxy ผ่าน Nuxt (/api/proxy/...) เพื่อแก้ปัญหา Mixed Content
    // const response = await fetch('http://loyalty-privilege-coupon-api.uat-gcp-trueyou-bn.slp.trueyou.co.th/v1/internal/download/364', {
    //   method: 'GET',
    // })
    const response = await fetch('/api/proxy/v1/internal/download/364', {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Convert response to blob
    const blob = await response.blob()
    
    // Create temporary download link
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    
    // Try to get filename from content-disposition header
    const contentDisposition = response.headers.get('Content-Disposition')
    let fileName = 'downloaded-file.txt'
    // if (contentDisposition) {
    //   const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
    //   if (fileNameMatch && fileNameMatch.length === 2)
    //     fileName = fileNameMatch[1]
    // }
    a.download = fileName
    
    document.body.appendChild(a)
    a.click()
    
    // Cleanup
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error)
  // }
}
</script>

<style scoped></style>
