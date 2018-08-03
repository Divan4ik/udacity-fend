const params = {
			client_id: 'OORGXYHYYTE2MFERSMU1A4Y33A2MSK5XOUUJXYKUHY2MECLY',
			client_secret: 'BCWDH2MPR2TYMXTUW3X4S12JSHYAXBBPNUIDGGOBOB1RUTGD',
			limit: 30,
      ll:  '40.6226616,-74.0095427',
			v: '20180803',
			radius: 10000,
			query: 'burrito'
		};

const url = new URL('https://api.foursquare.com/v2/venues/search');

Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

/*
'https://api.foursquare.com/v2/venues/explore' \
    -d client_id="CLIENT_ID" \
    -d client_secret="CLIENT_SECRET" \
    -d v="20180323" \
    -d ll="40.7243,-74.0018" \
    -d query="coffee" \
    -d limit=1

*/
const headers = {}

export const getAll = () => {
  return new Promise( (res, rej) => {

    let venues = localStorage.venues

    if(!venues) {
      fetch(url, { headers })
        .then(res => res.json())
        .then(data => {
          localStorage.venues = JSON.stringify(data.response)
					res(data.response)
        })
        .catch(error => { rej(error)})
    } else {
				res(JSON.parse(venues))
		}
  })
}
