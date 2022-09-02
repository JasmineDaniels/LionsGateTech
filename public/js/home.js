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
    // AUTHOR WONT WORK, need user id from sign in 
    const author = btn.parentElement.parentElement.parentElement.parentElement.parentElement.children[3].children[0].children[0].children[0].children[0].children[0].children[0].innerText;
    console.log(author)
    const comment = btn.parentElement.previousElementSibling.children[0].children[0].getElementsByTagName('textarea')[0].value;
    console.log(comment)
    const post_id = btn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('id')
    console.log(post_id)

        const awaitFetch = await fetch(`api/comments`, { 
            method: 'POST',
            body: JSON.stringify({
                author,
                comment,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
    console.log(awaitFetch)
        
    if (awaitFetch.ok){
        document.location.reload()      
    }
 
}))



