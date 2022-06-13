<template>
  <q-page class="flex flex-center page">
    <h3>Devices</h3>
    <div class="grid">
      <device
        class="device"
        @click="showData(device)"
        v-for="device in this.devices"
        :key="device.id"
        :device="device"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Device from 'components/Device.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Device,
  },
  data() {
    return {
      devices: [],
    };
  },
  async mounted() {
    await this.getDevices();
  },
  methods: {
    showData(device) {
      console.log(device);
      this.$router.push({
        name: 'LogsPage',
        params: {
          deviceId: device.id,
        },
      });
    },
    async getDevices() {
      const response = await fetch('http://localhost:3001/devices', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!response.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }
      this.devices = await response.json();
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  width: 90%;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 20px;
  width: 100%;
  height: 100%;
}

.device:hover {
  cursor: pointer;
}
</style>
