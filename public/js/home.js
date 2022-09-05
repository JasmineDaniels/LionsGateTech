console.log(`I am listening..`)

//View All Comments
document.querySelectorAll('.view-comments').forEach(btn => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault()

        const commentsDiv = btn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        commentsDiv.classList.toggle('none')
    })
})

//Open Leave Comments Form
document.querySelectorAll('.add-comment').forEach(btn => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault()

        const leaveCommentForm = btn.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        leaveCommentForm.classList.toggle('none')
        
    })
})

// Post Comment Btn 
document.querySelectorAll('.post-comment').forEach(btn => btn.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const comment = btn.parentElement.previousElementSibling.children[0].children[0].getElementsByTagName('textarea')[0].value;
    const post_id = btn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('id');

    const awaitFetch = await fetch(`api/comments`, { 
        method: 'POST',
        body: JSON.stringify({
            
            comment,
            post_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        
    if (awaitFetch.ok){
        document.location.reload()      
    }
 
}))

//If not loggedIn send to login page..
// document.querySelectorAll('.redirect-login').forEach(btn => {
//     btn.addEventListener('click', async (event) => {
//         event.preventDefault();

//         document.location.replace('/login')
//     })
// })

