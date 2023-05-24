export const getAllPosts = (page, limit = 10) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(response => response.json()) // распарсиваем ответ в формат JSON
        .then(data => {
            setTimeout(() => {

            }, 500)
            if(data.length === 0) {
                return 'Loading....'
            } else {
                return data;
            }
        })
        .catch(error => console.error('Error:', error));
}

