export const state = () => ({
  videoId: null,
  content: [],
  comments: [],
})

export const mutations = {
  SET_VIDEO_ID(state, data) {
    state.videoId = data
  },
  SET_CONTENT(state, data) {
    state.content = data
  },
  SET_COMMENTS(state, data) {
    state.comments = data
  },
  UPDATE_VIDEO_PROGRESS(state, data) {
    const index = state.content.findIndex((e) => e.id === data.id)

    if (index) {
      state.content[index].progress = data.progress
    }
  },
}

export const getters = {
  video: (state) => {
    return state.content.find((e) => e.id === state.videoId)
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
            commit('SET_VIDEO_ID', videos[0].id)

            resolve(videos)
          }
        })
        .catch((error) => reject(error))
    })
  },
  getComments({ commit }, videoId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/api/content/${videoId}/comments`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.comments)
            commit('SET_COMMENTS', response.data.comments)
            resolve(response.data.comments)
          }
        })
        .catch((error) => reject(error))
    })
  },
  setVideoId({ commit }, data) {
    commit('SET_VIDEO_ID', data)
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
