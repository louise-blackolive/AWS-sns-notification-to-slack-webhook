var url = require("url");
var https = require("https");

// TODO: !!! Must be changed following Slack WebHook URL !!!
var hookUrl = "<Paste Your Webhook URL";

var processEvent = function(event, context) {
  var message = JSON.parse(event.Records[0].Sns.Message);

  // Format Slack posting message
  var text =
    "<!channel> *" +
    message.AlarmDescription +
    "* state is now `" +
    message.NewStateValue +
    "`\n" +
    "```" +
    "reason: " +
    message.NewStateReason +
    "\n" +
    "alarm: " +
    message.AlarmName +
    "\n" +
    "time: " +
    message.StateChangeTime +
    "```";
  var slackMessage = {
    text: text
  };

  postMessage(slackMessage, function(response) {
    if (response.statusCode < 400) {
      console.info("Message posted!");
      context.succeed();
    } else if (response.statusCode < 500) {
      console.error(
        "4xx error occured when processing message: " +
          response.statusCode +
          " - " +
          response.statusMessage
      );
      context.succeed(); // Don't retry when got 4xx cuz its request error
    } else {
      // Retry Lambda func when got 5xx errors
      context.fail(
        "Server error when processing message: " +
          response.statusCode +
          " - " +
          response.statusMessage
      );
    }
  });
};

var postMessage = function(message, callback) {
  var body = JSON.stringify(message);
  var options = url.parse(hookUrl);
  options.method = "POST";
  options.headers = {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  };

  var postReq = https.request(options, function(res) {
    var chunks = [];
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      return chunks.push(chunk);
    });
    res.on("end", function() {
      var body = chunks.join("");
      if (callback) {
        callback({
          body: body,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage
        });
      }
    });
    return res;
  });

  postReq.write(body);
  postReq.end();
};

exports.handler = function(event, context) {
  if (hookUrl) {
    processEvent(event, context);
  } else {
    context.fail("Missing Slack Hook URL.");
  }
};
