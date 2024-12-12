const allPosts = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const postInfo = data.posts;
    showAllPosts(postInfo)
}

const showAllPosts = (postInfo) => {

    const showDocs = document.getElementById('show-docs');
    showDocs.innerText = '';

    postInfo.forEach((post) => {
        console.log(post)
        const div = document.createElement('div')
        div.classList = 'flex gap-3 bg-[#797DFC1A] p-4'
        const htmlContent = /* html */
        div.innerHTML = `
        
        <img class="w-20 h-20" src = "${post.image}">

          <div class="space-y-3">
        <div class="flex gap-4">
                <div class="flex gap-1">
                    <span class="text-gray-800 font-semibold">#</span>
                    <span class="text-gray-800 font-semibold">${post.category}</span>
                </div>
        
                <div class="flex gap-1">
                <h2 class="text-gray-800 font-semibold">Author:</h2>
                <span class="text-gray-800 font-semibold">${post.author.name}</span>
                </div>

        </div>

            
            <p class="font-bold">${post.title
                }</p>
            
            <p class="font-semibold ">${post.description
                }</p>

        <hr class="my-5  border-black border-dashed">

        <div class="grid grid-cols-4">
        <div class="flex text-gray-600 font-semibold items-center gap-2">
            <i class="fa-solid fa-comment"></i>
            <p>${post.comment_count}</p>
        </div>
        <div class="flex text-gray-600 font-semibold items-center gap-2">
            <i class="fa-solid fa-eye"></i>
                        <p>${post.posted_time}</p>

        </div>
        <div class="flex text-gray-600 font-semibold items-center gap-2">
           <i class="fa-regular fa-clock"></i>
                        <p>${post.posted_time}</p>

        </div>
        <div class="flex bg-green-300 p-3 rounded-full text-white items-center gap-2 ms-auto">
            <i class="fa-solid fa-envelope"></i>
        </div>
    </div>


            </div>

        `

/*  <div class="w-20">
                    <img class="w-full" src="images/joinforum.png" alt="">
                  </div> 
                  <div>
                      <h3>10 Kids Unaware of Their Halloween Costume</h3>
                  </div> */


        showDocs.appendChild(div)
    })

}


allPosts()