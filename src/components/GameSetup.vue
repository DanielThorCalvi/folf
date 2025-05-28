<template>
    <v-card height="100vh" width="100vw" class="d-flex flex-column">
      <v-card-title>Stilla leik</v-card-title>
      <v-card-text class="flex-grow-1">
        <v-form ref="form" v-model="valid">  
          <v-select
            v-model="formData.courseId"
            :items="courseStore.courses"
            item-title="name"
            item-value="id"
            label="Braut"
            clearable
            :rules="[rules.required]"
            required
            variant="solo"
          ></v-select>
          <v-select 
            v-model="formData.player1"
            label="Player 1"
            :items="playerStore.players"
            item-title="name"
            item-value="id"
            variant="solo"/>
          <v-select 
            v-model="formData.player2"
            label="Player 2"
            :items="playerStore.players"
            item-title="name"
            item-value="id"
            variant="solo"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" icon="mdi-play" :disabled="!valid" @click="submitForm"></v-btn>
      </v-card-actions>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCourseStore } from '@/stores/course';
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import { useGameStore } from '@/stores/game';
  const courseStore = useCourseStore();
  const playerStore = usePlayerStore();
  const gameStore = useGameStore();
  const router = useRouter();
  const valid = ref(false);
  const formData = ref({
    courseId: null,
    player1: null,
    player2: null,
  });

  const rules = {
    required: v => !!v || 'Svæði má ekki vera autt!',
  };

  const submitForm = async () => {
    if (valid.value) {
      const game = await gameStore.createGame(
        formData.value.courseId, [
          formData.value.player1,
          formData.value.player2,
        ].filter(player => player !== null)
      );
      if (!game) {
        console.error('Error creating game');
        return;
      }

      router.push('/game/' + game.id);
    }
  };
  onMounted(() => {
    courseStore.getCourses();
    playerStore.getPlayers();
  });
</script>