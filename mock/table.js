import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|10': [{
        id: '@id',
        title: '@ctitle',
        // 'status|1': ['published', 'draft', 'deleted'],
        address: '农林大学北区田径场',
        school:'计算机与信息学院',
        date: '@date(yyyy-MM-dd)',
        time: '@time("A HH:mm:ss")',
        score:'@time()',
        character: '@character("upper")',//一个随机字符
        string: '@string("lower", 5, 20)', //一串随机字符串
        integer: '@integer(0)', //随机整数
        float: '@float(1, 100, 3, 6)', //随机浮点数,
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
