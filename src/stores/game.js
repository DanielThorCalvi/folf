import { supabase } from '@/plugins/supabase';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    loading: false,
    game: null,
  }),
  actions: {
    async createGame(courseId, playerIds) {
      console.log('Creating game with courseId:', courseId, 'and playerIds:', playerIds);
      this.loading = true;
      const { data: game, error: gameError } = await supabase.from('games')
        .insert([{
          course_id: courseId,
        }])
        .select()
        .single();

      if (gameError) {
        this.error = gameError
        this.loading = false
        return null
      }

      if (playerIds && playerIds.length > 0) {
        const gamePlayersToInsert = playerIds.map(playerId => ({
          game_id: game.id,
          player_id: playerId
        }))

        const { error: gamePlayersError } = await supabase.from('game_players')
          .insert(gamePlayersToInsert)

        if (gamePlayersError) {
          this.error = gamePlayersError
          this.loading = false
          return null
        }
      }

      this.loading = false
      return game
    },
    async getGameById(gameId) {
      this.loading = true;
      const { data: game, error: gameError } = await supabase
        .from('games')
        .select(`
          *,
          course: courses (
            id,
            name,
            map_url,
            holes (
              id,
              hole_number,
              par,
              distance
            )
          ),
          players: game_players (
            id,
            player_id,
            player: players (
              name
            )
          ),
          scores: scores (
            id,
            game_player_id,
            score,
            hole_id
          )
        `)
        .eq('id', gameId)
        .single();

      if (gameError) {
        console.error('Error fetching game:', gameError);
        this.loading = false;
        return null;
      }

      this.game = game;
      this.loading = false;
    },
  },
});
