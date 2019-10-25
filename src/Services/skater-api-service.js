import config from '../config'
import TokenService from '../Services/token-service'

const SkaterAPIService = {
    getSkaters() {
      return fetch(`${config.API_ENDPOINT}/skaters`, {
        headers: {
          'Authorization': `bearer ${TokenService.getAuthToken()}`,
        }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
  getSkater(skaterId) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => 
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
      )
  },
  getComments(skaterId) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}/comments`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postComment(skaterId, comment) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skater_id: skaterId,
        comment,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postSkater(name, location, instagram, bio, img_url) {
    let body;
    if (!img_url) {
      body = JSON.stringify({
        name: name,
        location: location,
        instagram: instagram,
        bio: bio
      })
    }
    else {
      body = JSON.stringify({
        name: name,
        location: location,
        instagram: instagram,
        bio: bio,
        img_url: img_url,
        up_votes: 0
    })
  }
    return fetch(`${config.API_ENDPOINT}/skaters`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: body
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteSkater(skaterId) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      }    
    })
  }, 
  deleteComment(skaterId, commentId) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })   
  },
  editComment(skaterId, commentId, newComment) {
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment: newComment})
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  addVote(skaterId, newUpvoteCount){
    return fetch(`${config.API_ENDPOINT}/skaters/${skaterId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ up_votes: newUpvoteCount })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res
    )
  }
}

export default SkaterAPIService