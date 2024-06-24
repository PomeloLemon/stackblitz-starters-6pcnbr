describe('My Processes Tests', () => {
    before(() => {
      // 如果需要，可以在这里添加初始化代码
    });
  
    // 登录功能
    const login = () => {
      cy.visit('/login');
      cy.get('input#username').type('LL');
      cy.get('input#password').type('1234567');
      cy.get('button.button').contains('登录').click();
      cy.url().should('include', '/mydata');
    };
  
    // 测试访问“我的流程”页面
    it('should visit the My Processes page', () => {
      login();
      cy.visit('/my-processes');
      cy.contains('h1', '我的流程');
      cy.get('button').contains('新建流程');
    });
  
    // 测试新建流程
    it('should create a new process', () => {
      login();
      cy.visit('/my-processes');
      cy.get('button.create-button').click();
      cy.get('.create-process-dialog').should('be.visible');
      cy.get('#process-title').type('测试流程');
      cy.get('#process-detail').type('测试流程的详细说明');
      // 选择处理流程和可视流程
      cy.get('.process-list.processing input[type="checkbox"]').first().check();
      cy.get('.process-list.visual input[type="checkbox"]').first().check();
      cy.get('.submit-button').click();
      cy.get('.create-process-dialog').should('not.be.visible');
    });
  
    // 测试查看流程详情
    it('should view process detail', () => {
      login();
      cy.visit('/my-processes');
      cy.intercept('GET', '**/process_list*').as('getProcessList');
      cy.intercept('GET', '**/detail*').as('getProcessDetail');
      cy.get('.process-table .detail-button').first().click();
      cy.wait('@getProcessDetail');
      cy.url().should('include', '/process-detail');
      //cy.contains('h2', '流程详情', { timeout: 10000 }).should('be.visible');
      cy.contains('h3', '子流程', { timeout: 10000 }).should('be.visible');
      cy.contains('h3', '操作历史', { timeout: 10000 }).should('be.visible');
    });

    // 测试使用流程
    it('should use a process', () => {
      login();
      cy.visit('/my-processes');
      cy.intercept('GET', '**/process_list*').as('getProcessList');
      cy.intercept('GET', '**/detail*').as('getProcessDetail');
      cy.intercept('GET', '**/files*').as('getFiles');
      cy.get('.process-table .detail-button').first().click();
      cy.wait('@getProcessDetail').its('response.statusCode').should('eq', 200);
      cy.url().should('include', '/process-detail');
      cy.get('button').contains('使用流程').click();
      cy.wait('@getFiles').its('response.statusCode').should('eq', 200);
      cy.get('.use-process-dialog').should('be.visible');
      cy.get('select').last().select('scenario9', { force: true });
      cy.get('.submit-button').click();
      //cy.get('.use-process-dialog').should('not.be.visible');
    });

    // 测试分页功能
    it('should paginate processes', () => {
      login();
      cy.visit('/my-processes');
      cy.intercept('GET', '**/process_list*').as('getProcessList');
      cy.wait('@getProcessList');
      cy.get('.pagination button').contains('下一页').click();
      //cy.wait('@getProcessList');
      cy.get('.pagination span').contains('第 2 页', { timeout: 10000 }).should('be.visible');
      cy.get('.pagination button').contains('上一页').click();
      //cy.wait('@getProcessList');
      cy.get('.pagination span').contains('第 1 页', { timeout: 10000 }).should('be.visible');
    });
  });
  