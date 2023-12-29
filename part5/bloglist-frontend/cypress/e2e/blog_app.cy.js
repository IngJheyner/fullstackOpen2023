describe('Blog app', () => {

    beforeEach(function() {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: '123456'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('123456')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged-in')
        })

        it('fails with wrong credentials', function() {

            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')

            cy.get('.error').should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe.only('When logged in', function() {

        beforeEach(function() {

            cy.login({ username: 'mluukkai', password: '123456' })

        })

        it('A blog can be created', function() {

            cy.contains('new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cypress.com')
            cy.get('#create-button').click()

            cy.contains('a blog created by cypress')
        })

    })

})