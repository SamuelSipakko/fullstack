import React from "react"
import "jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

describe("SimpleBlog tests", () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: "Somewhere in the forest",
      author: "Test Author",
      likes: 31
    }
    mockHandler = jest.fn()
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test("renders title, author and likes", () => {
    expect(component.container).toHaveTextContent("Somewhere in the forest")
    expect(component.container).toHaveTextContent("Test Author")
    expect(component.container).toHaveTextContent(31)
  })

  test("clicking the 'like' button twice calls event handler twice", () => {
    const button = component.container.querySelector("button")
    expect(button).not.toBe(null)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})