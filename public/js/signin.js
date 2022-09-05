document.querySelector('#login').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementsByTagName('input')[0].value.trim();
    const password = document.getElementsByTagName('input')[1].value.trim();

    const awaitFetch = await fetch(`api/users/login`, { 
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (awaitFetch.ok){
        document.location.replace(`/dash`) 
        // await fetch (`/dash`, {
        //     method: 'GET',
        // })
    } else {
        alert(`Failed to login`)
    }
})
