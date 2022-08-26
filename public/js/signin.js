document.querySelector('#register').addEventListener('click', async (event) => {
    event.target();

    const username = document.getElementsByTagName('input')[0].value;
    console.log(username)
    const password = document.getElementsByTagName('input')[1].value;
    console.log(password)

    const awaitFetch = await fetch(`api/users`, {
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
        document.location.replace(`/dash/${username}`)
    }
})
