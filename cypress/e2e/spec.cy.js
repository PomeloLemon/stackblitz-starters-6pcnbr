describe('DataPro端到端测试', () => {
  it('访问首页', () => {
    cy.visit('http://localhost:8081') // 访问你的本地开发服务器
    cy.contains('欢迎来到DataPro') // 检查页面内容
  })
})
