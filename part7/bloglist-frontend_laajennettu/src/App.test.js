import React from "react"
import {
  render, waitForElement
} from "@testing-library/react"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
  test("if no user logged, notes are not rendered", async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("login")
    )

    expect(component.container.querySelector(".login")).not.toBe(null)
    expect(component.container).toHaveTextContent("log in to application")
  })

  test("if user logged, notes are rendered", async () => {
    const user = {
      username: "tester",
      token: "123123123",
      name: "Tester's name"
    }
    localStorage.setItem("loggedUser", JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("logout")
    )

    const blogs = component.container.querySelectorAll(".blog")
    expect(blogs.length).toBe(4)
    expect(component.container).toHaveTextContent("testblog_4")
    expect(component.container).toHaveTextContent("testblog_1")

  })
})