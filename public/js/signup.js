console.log(`I am listening`)

document.querySelector('#register').addEventListener('click', async (event) => {
    event.preventDefault()

    const username = document.getElementsByTagName('input')[0].value;
    const password = document.getElementsByTagName('input')[1].value;

    const awaitFetch = await fetch(`api/users/signup`, {
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
        alert(`Welcome to TechHub ${username}! \n Please Sign In..`)
        document.location.replace(`/login`) 
    } else {
        alert(`Failed to signup`)
    }
})
