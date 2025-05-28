import { defineStore } from 'pinia';
import { supabase } from '@/plugins/supabase'; 

export const usePlayerStore = defineStore('player', {
  state: () => ({
    loading: false,
    error: null,
    players: [],
  }),
  actions: {
    async getPlayers() {
      try {
        const { data, error } = await supabase
          .from('players')
          .select('id, name');
          this.players = [];
        if (error) {
          console.error('Error fetching players:', error);
          return;
        }

        this.players = data;
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    },
  },
});