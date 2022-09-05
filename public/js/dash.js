console.log('I am listening')

//Open New Post Form
document.querySelector('#add-new').addEventListener('click', (event) => {
    event.preventDefault();

    document.querySelector('.new-post').classList.toggle("none") ;


})

// Create user Post - Dash
document.querySelector('#submit-post').addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementsByTagName('input')[0].value;
    console.log(title)
    const post_content = document.getElementsByTagName('textarea')[0].value;
    console.log(post_content)
    const user_id = document.getElementsByTagName('h5')[1].getAttribute('id')
    console.log(user_id)

    const awaitFetch = await fetch(`/dash/api/posts`, { 
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content,
            user_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    console.log(awaitFetch)

    if (awaitFetch.ok){
        document.location.reload()
        
    }
})

// Update user Post - Dash
document.querySelectorAll('#update-post').forEach(btn => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault()

        const updateForm = btn.parentElement.nextElementSibling.nextElementSibling
        updateForm.classList.toggle('none')

        const updateBtn = updateForm.querySelector('#submit-update').addEventListener('click', async (event) => {
            event.preventDefault();

            const title = updateForm.getElementsByTagName('input')[0].value;
            const id = btn.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].getAttribute('id')
            const post_content = updateForm.getElementsByTagName('textarea')[0].value;

            console.log(id)
            console.log(title)
            console.log(post_content)  

            const awaitFetch = await fetch(`/dash/api/posts/${id}`, { 
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    post_content,
                    
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        
            if (awaitFetch.ok){
                document.location.reload()
                
            }

        })
    })
})

//Delete User Post
document.querySelectorAll('#delete-post').forEach(btn => btn.addEventListener('click', async (event) => {
    event.preventDefault();

    
    const id = btn.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].getAttribute('id')

    const awaitFetch = await fetch(`/dash/api/posts/${id}`, { 
        method: 'DELETE',
        body: JSON.stringify({
            id, 
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (awaitFetch.ok){
        document.location.reload()   
    }

}))