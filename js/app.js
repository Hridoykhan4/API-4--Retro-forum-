const toggleSpinner = (isLoading) => {
  const toggleSpinner = document.getElementById("spinnerToggle");
  if (isLoading) {
    toggleSpinner.classList.remove("hidden");
  } else {
    toggleSpinner.classList.add("hidden");
  }
};

const allPosts = async () => {
  toggleSpinner(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const postInfo = data.posts;
  showAllPosts(postInfo);
};

const showAllPosts = (postInfo) => {
  const showDocs = document.getElementById("show-docs");
  showDocs.innerText = "";

  postInfo.forEach((post) => {
    const div = document.createElement("div");
    div.classList = "flex gap-3 bg-[#797DFC1A] p-4";

    div.innerHTML = `
          <div class="relative">
           <i class="fa-solid fa-circle absolute -left-2 -top-1 ${
             post.isActive ? "text-green-500" : "text-red-500"
           }">
           </i>
           <img class="w-16 h-16 object-cover rounded-lg" src="${post.image}">
       </div>

            <div class="space-y-3">
                <div class="flex gap-4">
                    <div class="flex gap-1">
                        <span class="text-gray-800 font-semibold">#</span>
                        <span class="text-gray-800 font-semibold">${
                          post.category
                        }</span>
                    </div>
        
                    <div class="flex gap-1">
                        <h2 class="text-gray-800 font-semibold">Author:</h2>
                        <span class="text-gray-800 font-semibold">${
                          post.author.name
                        }</span>
                    </div>
                </div>

                <p class="font-bold">${post.title}</p>
                <p class="font-semibold ">${post.description}</p>

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
                    <button id="btn-${post.id}" class="btn btn-primary"
                        onclick="showDeTails('${post.title}', ${
      post.view_count
    }, ${post.id})" 
                        class="flex bg-green-300 p-3 rounded-full text-white items-center gap-2 ms-auto">
                        <i class="fa-solid fa-envelope"></i>
                    </button>
                </div>
            </div>
        `;

    showDocs.appendChild(div);
  });
  toggleSpinner(false);
};

const showDeTails = (title, viewCount, id) => {
  let countView = document.getElementById("mark-count");
  const countParse = parseInt(countView.innerText);
  countView.innerText = countParse + 1;

  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.setAttribute("disabled", true);

  const showSelected = document.getElementById("show-selected");
  const div = document.createElement("div");
  div.classList =
    "flex bg-white my-3 text-black shadow-lg gap-3 py-3 font-semibold justify-between";
  div.innerHTML = `
    <p>Title: ${title}</p>
    <p><strong>View Count:</strong> <i class="fa-solid fa-eye"></i> ${viewCount}</p>
  `;

  showSelected.appendChild(div);
};

allPosts();

const latestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  showLatestPosts(data);
};

const showLatestPosts = (posts) => {
  const latestCardContainer = document.getElementById("latestCardContainer");
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList = `card bg-base-100  shadow-xl`;
    div.innerHTML = `
        <figure>
              <img
                src="${post.cover_image}"
                alt="Shoes" />
            </figure>

            <div class="card-body">
              <h2 class="card-title"><i class="fa-regular fa-calendar"></i><span>${
                post?.author?.posted_date
                  ? post.author.posted_date
                  : "Not Published Yet"
              }</span></h2>
              <p class="font-semibold">${post.title}</p>

              <p>${post.description}</p>

              <div class="flex gap-2">
                <div class="w-12 rounded-full">
                  <img class="w-full rounded-full" src="${
                    post.profile_image
                  }" alt="">
                </div>
                <div>
                    <h3 class="font-bold tracking-wide">${post.author.name}</h3>
                    <small>${
                      post?.author?.designation
                        ? post?.author?.designation
                        : "Not Given"
                    }</small>
                </div>
              </div>
            </div>
        
        `;
    latestCardContainer.appendChild(div);
  });
};

latestPosts();
