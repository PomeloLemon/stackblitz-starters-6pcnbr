describe('Authentication Tests', () => {

  // 测试访问首页
  it('should visit the home page', () => {
    cy.visit('/home');
    cy.contains('欢迎来到DataPro');
    cy.contains('让数据处理更简单');
    cy.get('a.button').contains('注册');
    cy.get('a.button').contains('登录');
  });

  // 测试注册流程
  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('input#username').type('newuser');
    cy.get('input#password').type('newpassword');
    cy.get('button.button').contains('注册').click();
    cy.url().should('include', '/login');
  });

  // 测试登录流程
  it('should login an existing user', () => {
    cy.visit('/login');
    cy.get('input#username').type('LL');
    cy.get('input#password').type('1234567');
    cy.get('button.button').contains('登录').click();
    cy.url().should('include', '/mydata');
  });

  // 测试未登录状态下访问需要登录权限的页面
  it('should redirect to /login if not logged in when accessing /mydata', () => {
    cy.clearCookies();
    cy.visit('/mydata');
    cy.url().should('include', '/home');
  });

  // 测试登录后访问受保护页面
  it('should visit /mydata after login', () => {
    cy.visit('/login');
    cy.get('input#username').type('LL');
    cy.get('input#password').type('1234567');
    cy.get('button.button').contains('登录').click();
    cy.url().should('include', '/mydata');
  });
});
