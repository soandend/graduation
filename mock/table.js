import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|7': [{
        id: '@id',
        title: '@ctitle',
        // 'status|1': ['published', 'draft', 'deleted'],
        'school|1':['计算机与信息学院','机电工程学院','动物科学学院','园艺学院','林学院','蜂学学院','公共管理学院','食品科学学院'],
        'profession|1':['计算机科学与技术','数学与应用数学','园林艺术','机电工程','食品科学','蜂学','林学','动物科学'],
        date: '@date(yyyy-MM-dd)',
        time: '@time("A HH:mm:ss")',
        'times|1':['8时','9时','10时','2时','3时','4时',],
        score:'@float(1, 100, 3, 6)',
        phone:/^1[0-9]{10}$/, //用正则匹配1开头的11位数字的手机号
        number:/^3[0-9]{9}$/,
        'unit|1':['分','秒','米'],
        grade:/^201[0-9]{3}$/,
        name: '@cname',//随机姓名
        username:'@string("lower", 5, 20)',
        'sex|1':['女','男'],
        'gamesname|1':['女子五十米短跑','男子五十米短跑','男子跳高','女子跳高','男子跳远','女子跳远','男子一千米','女子一千米'],
        'address|1':['北区田径场','下安田径场','白鹭体育馆','北区篮球场','下安篮球场'],
        email:'@EMAIL',
        'party|1':['超越自己-开幕式','超越自己-闭幕式','放飞梦想-开幕式','放飞梦想-闭幕式','青春-开幕式','青春-闭幕式'],
        'order|+1':1,
        character: '@character("upper")',//一个随机字符
        string: '@string("lower", 5, 20)', //一串随机字符串
        integer: '@integer(0)', //随机整数
        float: '@float(1, 100, 3, 6)', //随机浮点数,
        'status|1':['1','2'],
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
