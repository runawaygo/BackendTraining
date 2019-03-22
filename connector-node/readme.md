### 约定
* 客户端请求数据，服务端返回结果的时候要严格保证seq和cmd是不变的  
* 客户端 - 服务端：10000 ~ 20000  
* 服务端 - 客户端：20000 ~ 30000 
### 消息结构
```
seq: uint16         // 序列号，由客户端以及服务端各自递增实现，从连接开始每发送一条后+1
cmd: uint16         // 指令号，决定了消息的类型，参加指令集
length: uint16      // 正文长度
content: byte[]     // 消息正文
```

### 消息指令集 
```
HB      :10001    // 心跳 
  input： []  
  output：[]

Login   :11001    // 登录  
  input:  {username: "superwolf"} 
  output: {username: "superwolf"}

NewMsg  :12001    // 发送消息  
  input:  {from: "superwolf", to: "superwolf2", type: 2, content: "好hi哦！！", datetime: 1553160592899}
  output: {id:123, from: "superwolf", to: "superwolf2", type: 2, content: "好hi哦！！", datetime: 1553160592899} // 此id为数据库中的自增id

PollMsg :12002    // 拉取数据信息  
  input:  {username: "superwolf", lastMessageId: 123}
  output: [msg, msg, msg...]

Kicked  :21001    // 被踢  
  input:  {username: "superwolf", content: "有其他用户使用你的身份登录！！"}
  推送消息无output

PushMsg :20001    // 推送数据
  input:  {id:123, from: "superwolf", to: "superwolf2", type: 2, content: "好hi哦！！", datetime: 1553160592899}
```

![avatar](http://baidu.com/pic/doge.png)