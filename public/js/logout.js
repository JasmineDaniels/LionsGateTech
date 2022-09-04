document.querySelector('#logout').addEventListener('click', async (event) => {
    event.preventDefault();

    const awaitFetch = await fetch (`/api/users/logout`, {
        method: 'POST',
        headers:  { 
            'Content-Type': 'application/json' 
        },
    })

    if (awaitFetch.ok){
        alert(`You have been logged out`)
        document.location.replace('/')
    } else {
        alert('Failed to logout')
    }
});