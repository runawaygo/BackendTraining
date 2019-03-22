### 聊天应用则料

### 任务
* 产品需求探索
  * 确定用户故事
  * 确定必要范围
  * 确定可能范围
* 进行架构设计
  * 查找技术盲区
  * 设定基础框架
  * 完成架构雏形
* 详细设计
  * 通信协议设计
  * 完成后续时序图设计
  * 分组接口设计
  * 数据结构设计
* 性能测试及规划
  * 真实情况预估
  * 压力测试设计
  * 快速找到瓶颈点
* 跑起来
  * 连通，将各个服务打通，在不连通数据库的情况，简单模拟数据返回
  * 实现数据部分完成功能
* 性能测试以及优化
  * 填充数据
  * 根据之前预估的情况对完成后的系统进行压力测试
  * 找到系统瓶颈阈值
  * 优化后，重复第一个动作

### 用户故事
* 用户可以发送消息
* 用户可以接受别人给他发的消息
* 用户可以查询自己的聊天记录
* 用户在新设备上可以获取之前的聊天
* 用户在新设备上登录将会踢掉之前的通身份登录者

### 架构图
![avatar](https://github.com/runawaygo/BackendTraining/blob/master/connector-node/Business%20Architect.png?raw=true)

### 约定
* 客户端请求数据，服务端返回结果的时候要严格保证seq和cmd是不变的  
* 客户端 - 服务端 指令集范围：10000 ~ 20000  
* 服务端 - 客户端 指令集范围：20000 ~ 30000 
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
### 用户登录时序图
![avatar](https://github.com/runawaygo/BackendTraining/blob/master/connector-node/User%20Login%20Timing%20Diagram.png?raw=true)

### 用户发送消息时序图（假设已经登录成功）
待补充

### 用户被踢时序图
待补充

### 用户拉取消息时序图
待补充

