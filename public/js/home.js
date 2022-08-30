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
        //Post Comment Button
        // leaveCommentForm.querySelectorAll('.post-comment').forEach(form => form.addEventListener('click', async (event) => {
        //     event.preventDefault()
        //     console.log(leaveCommentBtn)
        //     const author = leaveCommentForm.previousElementSibling.previousElementSibling.children[0].children[0].children[0].children[0].children[0].children[0].innerText;
        //     //const comment = document.getElementsByTagName('textarea')[0].value;
        //     const comment = leaveCommentForm.children[0].children[0].children[1].children[0].children[0].children[1].innerHTML;
        //     const post_id = leaveCommentForm.parentElement.parentElement.children[0].children[0].getAttribute('id');
        //     console.log(author)
        //     console.log(comment)
        //     console.log(post_id)

        //     // const awaitFetch = await fetch(`api/comments`, { 
        //     //     method: 'POST',
        //     //     body: JSON.stringify({
        //     //         author,
        //     //         comment,
        //     //         post_id,
        //     //     }),
        //     //     headers: {
        //     //         'Content-Type': 'application/json',
        //     //     },
        //     // })
        
        //     // console.log(awaitFetch)
        
        //     // if (awaitFetch.ok){
        //     //     document.location.reload()

        //     //     //const commentsDiv = leaveCommentForm.previousElementSibling.previousElementSibling.classList.remove('none')
        //     // }
        // })
    })
})

document.querySelectorAll('.post-comment').forEach(btn => btn.addEventListener('click', async (event) => {
    event.preventDefault();

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

            //const commentsDiv = leaveCommentForm.previousElementSibling.previousElementSibling.classList.remove('none')
        }
        

    
}))



