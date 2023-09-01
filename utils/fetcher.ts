import axios from 'axios'

export const fetcher = async (url: string) => {
    // console.log('url = ' + url)
    return await axios
        .get(url)
        .then((res) => res.data)
        .catch((error) => {
            throw error
        })
}
