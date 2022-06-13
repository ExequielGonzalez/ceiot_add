<template>
  <section class="page">
    <h3>Logs device: {{ this.deviceId }}</h3>

    <table class="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Data</th>
          <th>Battery</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in this.logs" :key="log.id">
          <td>{{ this.parseDate(log.timestamp) }}</td>
          <td>{{ this.parseNumber(log.data) }}</td>
          <td>{{ this.parseNumber(log.battery) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'LogsPage',
  components: {},
  data() {
    return {
      deviceId: '',
      logs: [],
    };
  },
  async mounted() {
    this.deviceId = this.$route.params.deviceId;
    await this.getLogs();
  },
  methods: {
    async getLogs() {
      const response = await fetch(
        `http://localhost:3001/logs/${this.deviceId}`,
        {
          method: 'get',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }
      this.logs = await response.json();
    },
    //parse date and time from utc date
    parseDate(date) {
      const d = new Date(date);
      return `${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    },
    //convert string to real number with 2 decimal
    parseNumber(number) {
      return parseFloat(number).toFixed(2);
    },
  },
});
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
.page {
  width: 90%;
  margin: 0 auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
}

.table thead {
  background-color: #f5f5f5;
}

.table thead th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
