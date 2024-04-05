/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {           
        cy.get('#username').type('edu.engineersoftware@gmail.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)').should('contain', 'edu.engineersoftware')
    
    })

    it('Deve exibir uma mensagem de erro ao inserir um usuário inválido', () => {
        cy.get('#username').type('edu.engineer@gmail.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        //cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
        cy.get('.woocommerce-error > li').should('exist')
    });


    it('Deve exibir uma mensagem de senha inválida', () => {        
            cy.get('#username').type('edu.engineersoftware@gmail.com')
            cy.get('#password').type('teste123@')
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail edu.engineersoftware@gmail.com está incorreta. Perdeu a senha?')
            //cy.get('.woocommerce-error > li').should('exist')

        
    });

})