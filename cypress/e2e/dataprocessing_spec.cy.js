describe('Data Processing Tests', () => {
  
    beforeEach(() => {
      // 访问登录页面并登录
      cy.visit('/login');
      cy.get('input#username').type('LL');
      cy.get('input#password').type('1234567');
      cy.get('button.button').contains('登录').click();
      cy.url().should('include', '/mydata');
    });
  
    // 测试访问数据处理首页
    it('should visit Data Processing Home page', () => {
      cy.visit('/DataProcessingHome');
      cy.get('table tbody tr').first().click();
      cy.contains('h3', '通用方法');
      cy.get('button').contains('数据标签');
      cy.get('button').contains('数据编码');
      cy.get('button').contains('异常值处理');
      cy.get('button').contains('生成变量');
    });
  
    // 测试文件列表显示
    it('should display file list', () => {
      cy.visit('/DataProcessingHome');
      cy.get('table').should('exist');
      cy.get('table tbody tr').should('have.length.at.least', 1);
    });
  
    // 测试数据文件处理
    it('should navigate to Data Processing page on file row click', () => {
      cy.visit('/DataProcessingHome');
      cy.get('table tbody tr').first().click();
      cy.url().should('include', '/DataProcessing');
    });
  
  });
  