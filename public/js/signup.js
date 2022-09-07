console.log(`I am listening`)

async function validatePassword(username, password){

    if (password.length < 10){
        alert(`Password must be 10 characters or more..`)
    } else {
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
    }
    
}

document.querySelector('#register').addEventListener('click', async (event) => {
    event.preventDefault()

    const username = document.getElementsByTagName('input')[0].value;
    const password = document.getElementsByTagName('input')[1].value;

    const checkPasswordLength = await validatePassword(username, password)
    
});
