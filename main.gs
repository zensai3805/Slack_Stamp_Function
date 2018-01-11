function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty("SLACK_ACCESS_TOKEN");
  var userName = e.parameter.user_name;
  var bot_name = "スタンプ by "+userName;
  var bot_icon = "https://2.bp.blogspot.com/-Dv-U5scRHQc/WM9YNb1CiCI/AAAAAAABCwk/Pl2UujvNpnwr5RlJ9PPXe84GgZSOcSCBwCLcB/s400/sick_rougan_smartphone.png"
  var channelId = e.parameter.channel_id;
  var text = e.parameter.text;
  var slackApp = SlackApp.create(token);
  
  if(text != null){
    var message = getGoogleCustomSearchImage(text);
    slackApp.postMessage(channelId, "["+text+"] "+message, {username: bot_name, icon_url: bot_icon, link_names: 1});
    var text = "スタンプ成功";
  }else{
    var text = "探すキーワードを入力してください";
  }
      
  var res = {
    "text": text
  };
  
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

function getGoogleCustomSearchImage(keyword){
  var API_KEY = "AIzaSyCdSoqMbk_YXr16JnYXKbpw3v149iplX68"
  var CSE_ID = "017523893900893021997:fzxbxcm7sus"
  var uri = "https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=" + CSE_ID + "&q=" + keyword + "&searchType=image"
  
  var response = UrlFetchApp.fetch(uri);
  var json = JSON.parse(response);
  var random_params = Math.floor(Math.random() * json["items"].length);
  
  var result = json["items"][random_params]["link"]
  return result
}