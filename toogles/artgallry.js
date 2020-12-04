function fridgePage(fridge) {
  return `
<h1>${fridge.data.attributes.name} Art Gallary</h1>
<div class="artgallary-display"id="artgallary-display">
    <img id="artgallary-show" src='https://c1.wallpaperflare.com/preview/245/955/743/watercolor-watercolour-texture-run.jpg'>
</div>

<div id='comment-box'>
<div class="image-container" id="comment-area" hidden='true'>
      <div class="image-card">
        <h2 class="title">Title of image goes here</h2>
        <img  class="image2" />
        <h3 id='description' class="like-section title"></h3>
        <ul class="comments">
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <input
            class="image-id"
            type="hidden"
            name="image_id"
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
      </div>
    </div>
</div>
`;
}
