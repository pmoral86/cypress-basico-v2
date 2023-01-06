// CAC-TAT.spec.js created with Cypress
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function() {
        cy.get("#firstName").type("Paulo"),
        cy.get("#lastName").type("Moral"),
        cy.get("#email").type("paulo@moral.co"),
        cy.get("#open-text-area").type("Lorem-ipsum"),
        cy.get('button[type="submit"]').click(),
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulario com um email invalido', function() {
        const longText = "Lorem ipsum dolor sit amet. Quo quas beatae sit voluptates maxime ut ullam quia aut doloribus dolores eos dolorem cumque. Ad nemo sint quo quasi voluptatum qui eius tempora qui fugiat possimus in omnis molestiae ut corrupti blanditiis? Rem odio architecto qui quae eius et veritatis placeat eum nemo voluptates non omnis magni. Eos deleniti esse qui voluptatem tenetur et amet provident. Sed commodi illo sit assumenda veniam a veniam nostrum ex enim porro. Sit totam possimus vel molestias esse et dolor nostrum ad ratione nihil. Et consequatur animi ex nihil libero ad saepe dolorem quo sequi perspiciatis. Ut impedit doloribus est eaque culpa 33 itaque maxime aut ipsa nihil. 33 officia exercitationem non assumenda rerum et recusandae suscipit qui repudiandae similique? Rem beatae veritatis aut quasi nesciunt ut atque nemo sed quos dolor."
        cy.get("#firstName").type("Paulo"),
        cy.get("#lastName").type("Moral"),
        cy.get("#email").type("paulo.moral.com"),
        cy.get("#open-text-area").type(longText, { delay: 0}),
        cy.get('button[type="submit"]').click(),
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function() {
        cy.get("#phone").type("qwert").should("have.value", "")
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido', function() {
        cy.get("#firstName").type("Paulo"),
        cy.get("#lastName").type("Moral"),
        cy.get("#email").type("paulo@moral.com"),
        cy.get('#phone-checkbox').check(),
        cy.get("#open-text-area").type("Teste"),
        cy.get('button[type="submit"]').click(),
        cy.get('.error').should('be.visible')
    })

    it('preenche a lista com os campos nome, sobrenome, email e telefone', function() {
        cy.get("#firstName").type("Paulo").should('have.value', 'Paulo').clear().should('have.value', '')
    })

    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit(),
        cy.get('.success').should('be.visible')
    })

    it('ações usando cy.contains no comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit(),
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        
    })

    it('marca cada tipo de atendimento e verifica', function() {
        cy.get('input[type="radio"][value="elogio"]').check().should('be.checked', 'elogio'),
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked', 'feedback'),
        cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked', 'ajuda')
    })

    it('marca cada tipo de atendimento e verifica, mas usando EACH e WRAP', function() {
        cy.get('input[type="radio"]').should('have.length', 3).each( function($radio) {
            cy.wrap($radio).check(),
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos os checkboxs e depois desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('upload de um arquivo', function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it("upload de um arquivo, agora simulando um drag n' drop", function() {
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                .should(function($input) {
                    expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('faz upload de um arquivo q foi dado um Alias a ele', function() {
        cy.fixture('example.json').as('sampleFile'),
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica se o link para Politica de Privacidade abre em outra janela (sem precisar ir para ela)', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina Politica de Privacidade removendo o target', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click(),
        cy.contains('Talking About Testing').should('be.visible')
    })



    








    // it('', function() {

    // })
    
})