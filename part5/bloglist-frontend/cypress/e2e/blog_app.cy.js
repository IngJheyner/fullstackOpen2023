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

    describe('When logged in', function() {

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

        it('A blog can be liked', function() {

            cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'www.cypress.com' })

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('A blog can be deleted', function() {

            cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'www.cypress.com' })

            cy.contains('view').click()
            cy.contains('remove').click()
            cy.get('html').should('not.contain', 'a blog created by cypress')
        })

        it('Only the creator of a blog can delete it', function() {

            cy.createBlog({ title: 'a blog created by cypress', author: 'author', url: 'www.cypress.com' })

            cy.contains('logout').click()

            const user = {
                name: 'Luis Angel',
                username: 'luisangel',
                password: '123456'
            }

            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.login({ username: 'luisangel', password: '123456' })

            cy.contains('view').click()
            cy.contains('remove').should('not.exist')
        })

        it('Blogs are ordered according to likes', function() {

            cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'www.cypress.com' })
            cy.createBlog({ title: 'a blog created by cypress2', author: 'cypress2', url: 'www.cypress2.com' })
            cy.createBlog({ title: 'a blog created by cypress3', author: 'cypress3', url: 'www.cypress3.com' })

            cy.contains('a blog created by cypress')
                .parent()
                .contains('view')
                .eq(0)
                .click()
                .parent()
                .contains('like')
                .as('btnLike1')

            cy.get('@btnLike1').click()
            cy.contains('likes 1').should('be.visible') // Espera hasta que el texto 'likes: 1' sea visible
            cy.get('@btnLike1').click()
            cy.contains('likes 2').should('be.visible') // Espera hasta que el texto 'likes: 2' sea visible
            cy.get('@btnLike1').click()
            cy.contains('likes 3').should('be.visible') // Espera hasta que el texto 'likes: 1' sea visible

            cy.contains('a blog created by cypress2')
                .parent()
                .contains('view')
                .eq(0)
                .click()
                .parent()
                .contains('like')
                .as('btnLike2')

            cy.get('@btnLike2').click()
            cy.contains('likes 1').should('be.visible') // Espera hasta que el texto 'likes: 1' sea visible
            cy.get('@btnLike2').click()
            cy.contains('likes 2').should('be.visible') // Espera hasta que el texto 'likes: 2' sea visible

            cy.contains('a blog created by cypress3')
                .parent()
                .contains('view')
                .eq(0)
                .click()
                .parent()
                .contains('like')
                .as('btnLike3')

            cy.get('@btnLike3').click()
            cy.contains('likes 1').should('be.visible') // Espera hasta que el texto 'likes: 1' sea visible

            cy.get('.blog').then(blogs => {
                cy.wrap(blogs[0]).contains('likes 3')
                cy.wrap(blogs[1]).contains('likes 2')
                cy.wrap(blogs[2]).contains('likes 1')
            })

        })

    })

})