// get elements
const postForm = document.getElementById("create_post_form");
const msg = document.getElementById("msg");
const postWrapper = document.getElementById("post-wrapper");

/**
 * show post
 */

const showLatestPost = () => {
  // get data from database
  const posts = getLsData("insta_post");

  // init val
  let content = "";

  // check , post exist or not in database
  if (posts.length > 0) {
    posts.reverse().map((item, index) => {
      content += `
         <div class="post-container">
            <!------- Post Header ------>
            <div class="post-header">
                <div class="author">
                <div class="author-profile-img">
                    <img src="${item.author_photo}" alt="" />
                </div>
                <div class="post-author-name">
                    <a href="#">${item.author_name}</a>
                    <span><i class="fas fa-circle"></i> ${timeAgo(
                      item.post_time
                    )}</span>
                    
                </div>
                </div>
                <div class="three-dot">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            <!------ Post Body ------>
            <div class="post-body">
                <div class="post-img">
                <img src="${item.post_photo}" alt="" />
                </div>
                <div class="post-reaction">
                <div class="p-reaction-left">
                    <div class="post-like post-icon">
                    <span><i class="far fa-heart"></i></span>
                    </div>
                    <div class="post-comment post-icon">
                    <span><i class="far fa-comment"></i></span>
                    </div>
                    <div class="post-share post-icon">
                    <span><i class="far fa-paper-plane"></i></span>
                    </div>
                </div>
                <div class="post-save post-icon">
                    <span><i class="far fa-bookmark"></i></span>
                </div>
                </div>
                <div class="post-like-total">
                <p>20,028,910 likes</p>
                </div>
                <div class="post-content">
                <p>
                ${item.post_content}
                </p>
                </div>
                <div class="write-comment">
                <p>View all 176k comments</p>
                <form action="#">
                    <input type="text" name="" id="" placeholder="Add a comment…" />
                </form>
                <span><i class="far fa-smile"></i></span>
                </div>
            </div>
        </div>
        `;
    });
  } else {
    content = "<h2>No posts found</h2>";
  }
  // display posts
  postWrapper.innerHTML = content;
};

showLatestPost();

/**
 * submit post form
 */

postForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());
  const { author_name, author_photo, post_content, post_photo } = data;

  // form validation
  if (!author_name || !author_photo) {
    msg.innerHTML = createAlert("Author name and Author photo is required");
  } else if (!post_content && !post_photo) {
    msg.innerHTML = createAlert("Post content or post photo is required");
  } else {
    // update data if post_content or post_photo !exist
    data = {
      author_name: author_name,
      author_photo: author_photo,
      post_content: post_content || null,
      post_photo: post_photo || null,
      post_time: Date.now(),
    };
    // send data to database
    createLsData("insta_post", data);

    // reset form
    e.target.reset();
    showLatestPost();
  }
};
