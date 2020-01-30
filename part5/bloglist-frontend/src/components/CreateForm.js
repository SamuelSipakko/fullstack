import React from "react"

const CreateForm = ({ handleSubmit, title, author, url }) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={handleSubmit}>
      <div>
        title:&nbsp;
        <input {...title.withoutReset}/>
      </div>
      <div>
        author:&nbsp;
        <input {...author.withoutReset}/>
      </div>
      <div>
        url:&nbsp;
        <input {...url.withoutReset}/>
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
)

export default CreateForm