/* eslint-disable no-undef */

describe("Blog app", function() {

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Admin",
      username: "admin",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  describe("login", function() {
    it("page is opened", function() {
      cy.contains("log in to application")
    })

    it("login is successful", function() {
      cy.get("#username")
        .type("admin")
      cy.get("#password")
        .type("salainen")
      cy.contains("login")
        .click()

      cy.contains("Admin logged in")
    })
  })

  describe("blog creation", function() {
    beforeEach(function() {
      cy.get("#username")
        .type("admin")
      cy.get("#password")
        .type("salainen")
      cy.contains("login")
        .click()
    })

    it("creates a new blog", function() {
      cy.contains("new blog")
        .click()
      cy.get("#title")
        .type("Canyon run")
      cy.get("#author")
        .type("Admin")
      cy.get("#url")
        .type("www.canyon.run")
      cy.contains("create")
        .click()

      cy.contains("Canyon run - Admin")
    })
    it("created blog is saved to server", function() {
      cy.contains("new blog")
        .click()
      cy.get("#title")
        .type("Canyon run")
      cy.get("#author")
        .type("Admin")
      cy.get("#url")
        .type("www.canyon.run")
      cy.contains("create")
        .click()

      cy.reload()
      cy.contains("Canyon run - Admin")
    })
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.get("#username")
        .type("admin")
      cy.get("#password")
        .type("salainen")
      cy.contains("login")
        .click()

      cy.contains("new blog")
        .click()
      cy.get("#title")
        .type("Canyon run")
      cy.get("#author")
        .type("Admin")
      cy.get("#url")
        .type("www.canyon.run")
      cy.contains("create")
        .click()
      cy.contains("Canyon run - Admin")
    })

    it("opens a blog page by clicking a blog on front page", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.contains("www.canyon.run")
      cy.contains("0 likes")
      cy.contains("added by Admin")
    })

    it("opens a blog page directly after page reload", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.reload()
      cy.contains("www.canyon.run")
      cy.contains("0 likes")
      cy.contains("added by Admin")
    })

    it("can like a blog", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.get("#like")
        .click()
      cy.contains("1 likes")
    })

    it("liking a blog is saved to server", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.get("#like")
        .click()

      cy.reload()
      cy.contains("1 likes")
    })

    it("can add a new comment to a blog", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.get("#comment_input")
        .type("This is a test comment. Woo!")
      cy.get("#add_comment")
        .click()
      cy.contains("This is a test comment. Woo!")
    })

    it("added comment is saved to server", function() {
      cy.contains("Canyon run - Admin")
        .click()
      cy.get("#comment_input")
        .type("This is a test comment. Woo!")
      cy.get("#add_comment")
        .click()

      cy.reload()
      cy.contains("This is a test comment. Woo!")
    })

    it("users page can be accessed through navigation bar", function() {
      cy.contains("users")
        .click()
      cy.contains("Users")
      cy.contains("blogs created")
    })

    it("users page can be accessed directly", function() {
      cy.visit("http://localhost:3000/users")
      cy.contains("Users")
      cy.contains("blogs created")
    })

    it("can open a user page", function() {
      cy.contains("users")
        .click()
      cy.get(".user-link")
        .contains("Admin")
        .click()

      cy.contains("added blogs")
      cy.contains("Canyon run")
    })

    it("can open a blog from user page", function() {
      cy.contains("users")
        .click()
      cy.get(".user-link")
        .contains("Admin")
        .click()
      cy.get("#user-blog-list")
        .contains("Canyon run")
        .click()

      cy.contains("www.canyon.run")
      cy.contains("0 likes")
      cy.contains("added by Admin")
    })

    it("blogs page can be accessed through navigation bar", function() {
      cy.visit("http://localhost:3000/users")
      cy.contains("blogs")
        .click()
      cy.contains("new blog")
    })

    it("blogs page can be accessed directly", function() {
      cy.visit("http://localhost:3000/blogs")
      cy.contains("new blog")
      // And
      cy.visit("http://localhost:3000")
      cy.contains("new blog")
    })

    it("can log out", function() {
      cy.contains("logout")
        .click()
      cy.contains("log in to application")
    })
  })
})