import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: null,
    courses: [],
    loading: false,
    error: null
  }),

  actions: {
    async getCourses() {
      this.loading = true
      this.error = null
      this.course = null

      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          name
        `)

      if (error) {
        console.error('Error getting courses:', error.message)
        this.error = error.message
      } else {
        this.courses = data
      }
      this.loading = false
    },
    async getCourseById(courseId) {
      this.loading = true
      this.error = null
      this.course = null

      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          holes (
            id,
            hole_number,
            par,
            distance
          )
        `)
        .eq('id', courseId)
        .single()

      if (error) {
        console.error('Error getting course:', error.message)
        this.error = error.message
      } else {
        this.course = data
      }

      this.loading = false
    }
  }
})
