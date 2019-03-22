/*
	struct:
		seq: uint16
		cmd: uint16
		length: uint16
		content: by length
	
	cmd type:
		10001 heartbeat

		11001 登录
			数据: {username: "superwolf"}

		12001 发送单人消息
			数据：{from: "superwolf", to: "superwolf2", type: 2, content: "好hi哦！！", datetime: 1553160592899}

		12002 拉去数据信息
			数据：{username: "superwolf", lastMessageId: 1234}

		
		21001 被踢
			数据: {content: "有其他用户使用你的身份登录！！"}

		20001 推送数据
			数据：{from: "superwolf", to: "superwolf2", type: 2, content: "好hi哦！！", datetime: 1553160592899}

	
	所有10000-20000之间的cmd都是客户端向服务端的请求，20000-30000的数据是服务器端向客户端推送
	客户端请求数据，服务端返回结果的时候要严格保证seq和cmd是不变的
*/

class Message {
	constructor(){
		
	}
	toChunk(){
		const contentBuf = Buffer.from(this.content, 'utf8')
		const buf = new Buffer(6 + contentBuf.length);

		buf.writeInt16BE(this.seq)
		buf.writeInt16BE(this.cmd, 2)

		buf.writeInt16BE(contentBuf.length, 4)
		contentBuf.copy(buf, 6)

		return buf
	}
}

Message.ReadMessage = (chunk) =>{
	let message = new Message()
	message.seq 		= chunk.readInt16BE(0)
	message.cmd 		= chunk.readInt16BE(2)
	message.length 		= chunk.readInt16BE(4)
	message.content  	= chunk.toString("utf8", 6, chunk.length)
	return message
}

Message.Type = {
	HB: 		10001, // heartbeat
	Login: 		11001, // 登录
	Kick: 		11002, // 被踢
	NewMsg: 	12001, // 发送单人消息
	PollMsg: 	12002, // 拉去数据信息
	PushMsg: 	22001  // 推送数据
}

module.exports = Message