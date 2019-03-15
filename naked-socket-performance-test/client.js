var net = require("net")
var host = process.env.host || "127.0.0.1"
var port = process.env.port || 8124

connect = (host, port)=>{
  var client
  client = net.connect({
    port: port,
    host: host
  }, ()=>{
    client.write("HB:01234567890123456789")
    console.log("sent HB:01234567890123456789")

    setInterval(()=>{
      var start = Date.now()
      client.write("RQ:" + start + "-012345678901234567890123456789")
      console.log("sent RQ:" + start + "-012345678901234567890123456789")
    }, 5 * 1000)

  })

  client.on("data", (chunk)=>{
    var diff, result, start
    start = parseInt(chunk.toString("utf8", 3, 16))
    diff = Date.now() - start
    result = chunk.toString("utf8")

    console.log("rece diff:" + diff + " " + result)
  })

  client.on("end", ()=>{
    console.log("end")
  })

  client.on("error", (error)=>{
    console.log("error", error)
  })
}

connect(host, port)
