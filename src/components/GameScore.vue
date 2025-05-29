<template>
  <v-card>
    <v-card-title class="d-flex justify-center">Score</v-card-title>
    <v-card-text class="d-flex flex-column" >
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-row v-for="(_, key) in scores[0]" :key="key" class="border text-end pr-1">
              <v-spacer></v-spacer>
              <span class="text-h6">{{key}}</span>
            </v-row>      
          </v-col>
          <v-col :cols="cols" v-for="(score, playerIndex) in scores" :key="playerIndex" class="text-end" >
            <v-row v-for="(value, key) in score" :key="key" class="border ">
              <v-spacer></v-spacer>
              <span class="text-h6">{{value ? value : '-'}}</span>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed } from 'vue';
  const props = defineProps({
    scores: {
      type: Array,
      required: true
    }
  });
  const cols = computed(() => {
    return Math.floor(10 / props.scores.length);
  });
</script>