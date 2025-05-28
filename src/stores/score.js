import { defineStore } from 'pinia';
import { supabase } from '@/plugins/supabase'; 

export const useScoreStore = defineStore('score', {
  state: () => ({
    loading: false,
    error: null,
    scores: [],
  }),
  actions: {
    async assignScores(gameId, players, playerScores) {
      let mappedScore = [];
      playerScores.map((score, index) => {
        Object.entries(score).map(([key, value]) => {
          mappedScore.push({
            game_id: gameId,
            game_player_id: players[index].id,
            hole_id: key,
            score: Number(value),
          });
        })
      });
      console.log('Mapped scores:', mappedScore);
      await supabase.from('scores')
        .insert(mappedScore)
    },
    getScoresByGameId(gameId) {
      this.loading = true;
      this.error = null;

      return supabase
        .from('scores')
        .select(`
          *,
          game_player:game_players (
            player:players (
              id,
              name
            )
          ),
          hole:holes (
            hole_number
          )
        `)
        .eq('game_id', gameId)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error getting scores:', error.message);
            this.error = error.message;
            return [];
          } else {
            this.scores = data;
            return data;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
});