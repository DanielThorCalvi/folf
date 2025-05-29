<template>
  <v-card>
    <v-card-title class="d-flex justify-center">Klambratún</v-card-title>
    <v-card-text class="d-flex justify-center flex-column" >
      <v-img :src="gameStore.game.course.map_url"></v-img>
    </v-card-text>
  </v-card>
</template>
<script setup>
  import { useGameStore } from '@/stores/game';
  const gameStore = useGameStore();
</script>