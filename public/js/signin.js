document.querySelector('#login').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementsByTagName('input')[0].value.trim();
    console.log(username)
    const password = document.getElementsByTagName('input')[1].value.trim();
    console.log(password)

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

    console.log(awaitFetch);
    if (awaitFetch.ok){
        //document.location.replace(`/dash/${username}`) 
        //document.location.redirect(`/dash`) 
        document.location.replace(`/dash`) 

        // await fetch (`/dash`, {
        //     method: 'GET',
        // })
    } else {
        alert(`Failed to login`)
    }
})
