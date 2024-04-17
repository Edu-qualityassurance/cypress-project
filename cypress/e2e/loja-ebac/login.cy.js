/// <reference types="cypress"/>

const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {           
        cy.get('#username').type('edu.engineersoftware@gmail.com')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'edu.engineersoftware')
    
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

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'edu.engineersoftware')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario , { log: false})
            cy.get('#password').type(dados.senha , { log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'edu.engineersoftware')
            


        })
    });

    it('Deve fazer login com sucesso - usando comandos customizados', () => {
        cy.login('edu.engineersoftware@gmail.com', 'teste123')  
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'edu.engineersoftware')  
        
    });

})