const searchPost = () => {
  toggleSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchValue = searchField.value;
  categoryByName(searchValue);
};

const categoryByName = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );
  const data = await res.json();

  const showDocs = document.getElementById("show-docs");
  showDocs.innerText = "";

  data.posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList = "flex gap-3 bg-[#797DFC1A] p-4";

    div.innerHTML = `
            <img class="w-20 h-20" src="${post.image}" alt="Post Image">

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

                <p class="font-bold">${post.title}</p>
                <p class="font-semibold">${post.description}</p>

                <hr class="my-5 border-black border-dashed">

                <div class="grid grid-cols-4">
                    <div class="flex text-gray-600 font-semibold items-center gap-2">
                        <i class="fa-solid fa-comment"></i>
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex text-gray-600 font-semibold items-center gap-2">
                        <i class="fa-solid fa-eye"></i>
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex text-gray-600 font-semibold items-center gap-2">
                        <i class="fa-regular fa-clock"></i>
                        <p>${post.posted_time}</p>
                    </div>
                    <button 
                        onclick="showDeTails('${post.title}', ${post.view_count})" 
                        class="flex bg-green-300 p-3 rounded-full text-white items-center gap-2 ms-auto">
                        <i class="fa-solid btn btn-primary fa-envelope"></i>
                    </button>
                </div>
            </div>
        `;

    showDocs.appendChild(div);
  });
};
