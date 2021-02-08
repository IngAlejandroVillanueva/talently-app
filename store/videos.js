export const state = () => ({
  currentVideo: null,
  content: [],
})

export const mutations = {
  SET_CURRENT_VIDEO(state, data) {
    state.currentVideo = data
  },
  SET_CONTENT(state, data) {
    state.content = data
  },
  UPDATE_VIDEO_PROGRESS(state, data) {
    const index = state.content.findIndex((e) => e.id === data.id)

    if (index) {
      state.content[index].progress = data.progress
    }
  },
}

export const actions = {
  getContent({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/content')
        .then((response) => {
          if (response.status === 200) {
            const videos = response.data.content.map((video) => {
              return {
                ...video,
                vimeo_id: video.video_url.replace('https://vimeo.com/', ''),
              }
            })

            commit('SET_CONTENT', videos)
            commit('SET_CURRENT_VIDEO', videos[0])

            resolve(videos)
          }
        })
        .catch((error) => reject(error))
    })
  },
  setCurrentVideo({ commit }, data) {
    commit('SET_CURRENT_VIDEO', data)
  },
  updateVideoProgress({ commit }, data) {
    return new Promise((resolve, reject) => {
      const url = `/api/content/${data.id}/progress`
      const payload = { progress: data.progress }

      this.$axios
        .post(url, payload)
        .then((response) => {
          if (response.status === 200) {
            commit('UPDATE_VIDEO_PROGRESS', data)
            resolve(response.data.content)
          }
        })
        .catch((error) => reject(error))
    })
  },
}
