describe('Cleverpy Blog E2E', () => {
  const login = () => {
    cy.get('#email').type('Shanna@melissa.tv')
    cy.get('#password').type('Shanna@melissa.tv')
    cy.get('#login-button').click()
  }

  const createTestPost = () => {
    cy.get('#new-post-link').click()
    cy.get('#new-post-title').type('Sample Title')
    cy.get('#new-post-body').type('This is the content of the new post.')
    cy.get('#post-form-button').click()
    cy.get('#new-post-title').should('have.value', '')
    cy.get('#new-post-body').should('have.value', '')
    cy.get('#view-posts-button').click()
    cy.contains('Sample Title')
    cy.contains('This is the content of the new post.')
  }

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('frontpage can be opened', () => {
    cy.contains('Cleverpy Blog')
  })

  it('is able to register and login successfully', () => {
    cy.get('#link-signin-mode').click()
    cy.get('#name').type('Test Name')
    cy.get('#username').type('Test Username')
    cy.get('#email').type('test@email.com')
    cy.get('#password').type('123456')
    cy.get('#password2').type('123456')
    cy.get('#login-button').click()
    cy.get('#new-post-link').click()
  })

  it('is able to login successfully', () => {
    login()
    cy.get('#new-post-link').should('be.visible')
    cy.get('#reset-posts-button').should('be.visible')
  })

  it('is able to logout successfully', () => {
    login()
    cy.get('#logout-button').click()
    cy.get('#signin-button').should('be.visible')
  })

  it('is able to create a new post', () => {
    login()
    createTestPost()
  })

  it('is able to update a post successfully', () => {
    login()
    cy.get('#view-posts-button').click()
    cy.get('[id*=edit-post-button-]').first().click()
    cy.get('#new-post-title').clear().type('Edited Sample Title')
    cy.get('#new-post-body')
      .clear()
      .type('This is the content of the edited post.')
    cy.get('#post-form-button').click()
  })

  it('is able to delete a post successfully', () => {
    login()
    cy.get('#view-posts-button').click()
    cy.get('[id*=delete-post-button-]').first().click()
    cy.get('#posts-list').should('not.contain', 'Sample Title')
  })

  it('is able to reset posts successfully', () => {
    login()
    createTestPost()
    cy.get('#reset-posts-button').click()
    cy.get('#posts-list').should('not.contain', 'Sample Title')
  })
})
