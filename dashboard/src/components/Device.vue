<template>
  <div class="device">
    <div class="device__row">
      <p class="device__row-item"><b>Proyecto:</b> {{ this.device.project }}</p>
      <p class="device__row-item"><b>ID:</b> {{ this.device.id }}</p>
    </div>
    <div class="device__row">
      <p class="device__row-item"><b>Latitud:</b> {{ this.device.latitude }}</p>
      <p class="device__row-item">
        <b>Longitud:</b> {{ this.device.longitude }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'DeviceComponent',
  components: {},
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
//make a card for each device
.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

//   .device {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//     background-color: #f5f5f5;
//     &__row {
//       display: flex;
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//       width: 100%;
//       height: 100%;
//       &-item {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         width: 100%;
//         height: 100%;
//         &:first-child {
//           margin-right: 10px;
//         }
//       }
//     }
// }
</style>
