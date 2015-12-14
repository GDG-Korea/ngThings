'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

const fs = require("fs");
const moment = require('moment');

const ipcMain = require('electron').ipcMain;

/*
  * 제목
  * 프로젝트
  * 내용
  * 작성일 또는 수정일
  * due date
*/

/*
  * Data 읽기
*/
ipcMain.on('read', function(event, arg) {

    // arg 는 없이 받고
    // data 를 send
 
    event.sender.send('read', JSON.parse(fs.readFileSync("./data.json")));

});

/*
  * Data 추가
*/
ipcMain.on('add', function(event, arg) {

  // args 는 글 데이타, 작성 시간 추가 필요
  var data = JSON.parse(fs.readFileSync("./data.json"));
  
  var obj = {
    
    title:arg.title,
    project:arg.project,
    contents:arg.contents,
    reg_date:Number(moment())
    
  }
  
  data.push(obj);
  
  fs.writeFileSync("./data.json", JSON.stringify(data));
  
  // 다시 읽어서 보내기
  event.sender.send('read', JSON.parse(fs.readFileSync("./data.json")));

});

/*
  * Data 수정
*/
ipcMain.on('edit', function(event, arg) {

  // 글을 읽어서
  var data = JSON.parse(fs.readFileSync("./data.json"));
  
  // 시간이 같은 글 찾아서 나머지 항목 바꾸기
  for (var i = 0; i < data.length; i++) {
    
      if (data[i].reg_date = arg.reg_date) {
        
        data[i].title = arg.title;
        data[i].project = arg.project;
        data[i].contents = arg.contents;
        data[i].reg_date = Number(moment()); // 시간 수정
        
      }
    
  }
  
  // 수정하기
  fs.writeFileSync("./data.json", JSON.stringify(data));
  
  // 다시 읽어서 보내기
  event.sender.send('read', JSON.parse(fs.readFileSync("./data.json")));

});

/*
  * Data 삭제
*/
ipcMain.on('delete', function(event, arg) {
   
  // 글을 읽어서
  var data = JSON.parse(fs.readFileSync("./data.json"));
  
  // 시간이 같은 글 찾아서 지우기
  var new_data = [];
  
  for (var i = 0; i < data.length; i++) {
    
      if (data[i].reg_date = arg.reg_date) continue;
      
      new_data.push(data[i]);
    
  }
  
  // 수정하기
  fs.writeFileSync("./data.json", JSON.stringify(new_data));
  
  // 다시 읽기
  event.sender.send('read', JSON.parse(fs.readFileSync("./data.json")));

});

ipcMain.on('', function(event, arg) {
  console.log(arg);  // "ping" 출력
  event.sender.send('asynchronous-reply', 'pong');
});

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
