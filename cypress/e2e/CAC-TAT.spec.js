///<reference types="Cypress" / >
//Cypress._.times(5, () => {
describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('/src/index.html')
    })
    it('verifica o título da aplicação', function(){
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
       
    })
    it('preenche os campos obrigatórios e envia o formulário',function(){
        const longText = 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Jose').clear()
        cy.get('#lastName').type('Duarte').clear()
        cy.get('#email').type('josepandia42.gmail.com').clear()
        cy.get('#open-text-area').type('text', {delay: 0 }).clear()
        cy.get('#phone').type('abc').should('have.value', '')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Jose').should('have.value','Jose').clear().should('have.value', '')
        cy.get('#lastName').type('Duarte').should('have.value','Duarte').clear().should('have.value', '')
        cy.get('#email').type('josepandia42@gmail.com').should('have.value','josepandia42@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('3198549874').should('have.value','3198549874').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('José')
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing')
    })
    it('Desafio encontre o gato', () => {
        cy.get('#cat').invoke('show').should('be.visible')
    })
    
})
//})