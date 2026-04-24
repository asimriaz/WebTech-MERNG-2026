ajax.get({
    url: '/api/list',
    success(response) {
        document.querySelector('#list').innerHTML = response;
    },
    error() {
        document.body.innerHTML = '<p>Unable to load content.</p>';
    }
});
