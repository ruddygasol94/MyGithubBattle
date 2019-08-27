//`https://api.gitub.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
//https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
//https://api.github.com/repositories?since=364`

const id = "aa"
const sec = "bb"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg (message, username) {
	if (message === 'Not Found') {
		return `${username} doesn't exist`
	}

	return message
}

function getProfile (username) {
	//return fetch(`https://api.gitub.com/search/users/${username}`)
	return fetch(`https://api.github.com/search/users?q=user:${username}`)
	  .then((res) => res.json())
	  .then((profile) => {
	    	if (profile.message) {
				throw new Error(getErrorMsg(profile.message, username))
			}

		return profile.items[0]
	  })
}

function getRepos (username) {
	return fetch(`https://api.github.com/search/repositories?q=user:${username}&per_page100`)
	  .then((res) => res.json())
	  .then((repos) => {
	  	if (repos.message) {
	  		throw new Error(getErrorMsg(repos.message, username))
	  	}
	  	return repos.items
	  })
}

function getStarCount(repos) {
	return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
}

function calculateScore (followers, repos) {
	return (followers * 3) + getStarCount(repos)
}

function getUserData (player) {
	return Promise.all([
		getProfile(player),
		getRepos(player)
	]).then(([ profile, repos ]) => ({
		profile,
		score: calculateScore(profile.id, repos)
	}))
}

function sortPlayers (players) {
	return players.sort((a, b) => b.score - a.score)
}

export function battle (players) {
	return Promise.all([
		getUserData(players[0]),
		getUserData(players[1])
	]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos (language) {
	const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=tetris+language:${language}&sort=stars&order=desc`)

	return fetch(endpoint)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (!data) {
				throw new Error(data.message)
			}

			return data;
		})
}