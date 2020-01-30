import React from "react"
import "jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("Blog tests", () => {
  let component
  let titleBtn

  beforeEach(() => {
    const user = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmF" +
              "tZSI6Imtla2UiLCJpZCI6IjVkMWNhMWIzNjNkNDEyNDFhNDY" +
              "4ZThhOSIsImlhdCI6MTU2MjU3NTQwNX0.mhFWnxxNWgbrv1M" +
              "Bzq8AlQL8lji7l01XIImRam36sGg",
      name: "admin",
      username: "Admin"
    }
    const blog = {
      title: "Test blog",
      author: "Test Author",
      url: "www.testblog.com",
      likes: 31,
      user: {
        blogs: ["5d1c9ee7b9e3ab2dc094a517"],
        username: "Admin",
        name: "admin",
        id: "5d1c8efb79da403df81401de"
      }
    }
    component = render(
      <Blog blog={blog} user={user} addLike={() => null} delBlog={() => null} />
    )
    titleBtn = component.container.querySelector("span")
  })


  test("renders its children", () => {
    component.container.querySelector("span")
  })

  test("displays minimal info at start", () => {
    const link = component.queryByText("www.testblog.com")
    expect(link).toBe(null)
  })

  test("displays full info after pressing title", () => {
    fireEvent.click(titleBtn)
    const link = component.queryByText("www.testblog.com")
    expect(link).not.toBe(null)
  })

})