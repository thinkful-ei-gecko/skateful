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
  getArticle(articleId) {
    return fetch(`${config.API_ENDPOINT}/articles/${articleId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
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
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
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
  }
}

export default SkaterAPIService