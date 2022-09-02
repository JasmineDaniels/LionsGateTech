console.log(`I am listening`)

document.querySelector('#register').addEventListener('click', async (event) => {
    event.preventDefault()

    const username = document.getElementsByTagName('input')[0].value;
    console.log(username)
    const password = document.getElementsByTagName('input')[1].value;
    console.log(password)

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
        document.location.replace(`/login`) 
    } else {
        alert(`Failed to signup`)
    }
})
