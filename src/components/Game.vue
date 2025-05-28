<template>
  <div v-if="gameStore.game && scores">
    <v-card :height="mobile ? '100vh' : undefined" :width="mobile ? '100vw' : undefined" class="d-flex flex-column">
      <v-window v-model="currentHole" class="flex-grow-1" >
        <v-window-item v-for="(hole) in gameStore.game.course.holes" :key="hole.hole_number">
          <v-card-title class="d-flex justify-center">
            <span>{{ currentTitle }} ({{ currentDistance }})</span>
          </v-card-title>
          <v-card-subtitle class="d-flex justify-space-around">           
            <span>{{ currentSubTitle }}</span>
          </v-card-subtitle>

          <v-card-text>
            <v-container fluid>
              <v-row v-for="(game_player, playerIndex) in gameStore.game.players" :key="playerIndex">
                <v-col>
                  <v-text-field v-model="scores[playerIndex][hole.id]" :label="game_player.player.name" variant="outlined" type="number"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-window-item>   
      </v-window>

      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-space-between">
        <v-btn :disabled="currentHole == 0" variant="text" @click="currentHole--" icon="mdi-arrow-left"></v-btn>
        <v-btn icon="mdi-map" @click="mapOpen = true"></v-btn>
        <v-btn icon="mdi-view-list" @click="mapOpen = true"></v-btn>
        <v-btn v-if="currentHole < gameStore.game.course.holes.length-1" @click="currentHole++" icon="mdi-arrow-right"></v-btn>
        <v-btn v-else icon="mdi-check" @click="submitGame"></v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="mapOpen" fullscreen>
      <v-card >
        <v-card-title class="d-flex justify-center">Klambratún</v-card-title>
        <v-card-text class="d-flex justify-center flex-column" >
          <v-img :src="gameStore.game.course.map_url"></v-img>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-spacer />
          <v-btn @click="mapOpen=false" icon="mdi-close"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useGameStore } from '@/stores/game';
  import { useRoute } from 'vue-router';
  import { useDisplay } from 'vuetify';
import { useScoreStore } from '@/stores/score';

  const { mobile } = useDisplay()
  const gameStore = useGameStore();
  const scoreStore =useScoreStore();
  const route = useRoute()
  const gameId = route.params.id

  const mapOpen = ref(false)

  const currentHole = ref(0)

  const currentTitle = computed(() => {
    if (!gameStore.game) return ''
    return `Hola ${gameStore.game.course.holes[currentHole.value].hole_number}`
  })

  const currentSubTitle = computed(() => {
    if (!gameStore.game) return ''
    return `Par ${gameStore.game.course.holes[currentHole.value].par}`
  })

  const currentDistance = computed(() => {
    if (!gameStore.game) return ''
    return `${gameStore.game.course.holes[currentHole.value].distance}m`
  })

  const scores = ref(null)
  
  const submitGame = async () => {
    console.log("HERE", scores.value)
    await scoreStore.assignScores(gameId, gameStore.game.players, scores.value)
  }

  onMounted(async() => {
    await gameStore.getGameById(gameId)
    console.log("PLAYERS", gameStore.game.players)
    scores.value = gameStore.game.players.map(() => {
      const scoreByHole = {}
      for (const hole of gameStore.game.course.holes) {
        scoreByHole[hole.id] = null
      }
      console.log("SCORES", scoreByHole)
      return scoreByHole;
    })
  })
</script>