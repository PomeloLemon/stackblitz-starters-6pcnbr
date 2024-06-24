describe('My Data Tests', () => {
  
    beforeEach(() => {
      // 访问登录页面并登录
      cy.visit('/login');
      cy.get('input#username').type('LL');
      cy.get('input#password').type('1234567');
      cy.get('button.button').contains('登录').click();
      cy.url().should('include', '/mydata');
    });
  
    // 测试访问“我的数据”页面
    it('should visit My Data page', () => {
      cy.visit('/mydata');
      cy.contains('h1', '我的数据');
      cy.get('button.create-button').contains('上传数据');
    });
  
    // 测试显示数据列表
    it('should display data list', () => {
      cy.visit('/mydata');
      cy.get('table.process-table').should('exist');
      cy.get('table.process-table tbody tr').should('have.length.at.least', 1);
    });
  
    // 测试分页功能
    it('should paginate data list', () => {
      cy.visit('/mydata');
      cy.wait(1000); // 增加等待时间确保页面完全加载
      cy.get('button').contains('下一页').click();
      cy.get('span').contains('第 2 页').should('exist');
      cy.get('button').contains('上一页').click();
      cy.get('span').contains('第 1 页').should('exist');
    });
  
    // 测试上传数据功能
    it('should upload a data file', () => {
      cy.visit('/mydata');
      cy.get('button.create-button').contains('上传数据').click();
    //   cy.get('input[type="file"]').attachFile('sample.csv');
    //   cy.get('button').contains('上传').click();
    //   cy.contains('文件上传成功并分析');
    });
  
    // 测试取消上传
    it('should cancel upload', () => {
      cy.visit('/mydata');
      cy.get('button.create-button').contains('上传数据').click();
      cy.get('button').contains('取消').click();
      cy.get('.dialog').should('not.exist');
    });
  });
  