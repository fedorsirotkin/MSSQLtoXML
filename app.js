/**
 *
 * Точка входа в приложение
 *
 * API Service - Export XML
 * 
 * Приложение обращается к базе данных MS SQL,
 * получает данные из таблицы и возвращает им
 * в формате XML
 *
 * Используемые NPM-пакеты (npm install <пакет>):
 * - express
 * - binary-extensions
 * - mssql
 * - js2xmlparser
 * - passport
 * - passport-http
 * - request
 * - uuid
 * - node-file-logger
 * - node-rest-client
 * 
 * Автор: Ф.А.Сироткин
 * Дата:  22.02.2019
 *
 */

// Стандартные модули
var http = require('http');
var https = require('https');

// Модули NPM
var express = require('express');
var request = require('request');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

// Приложение
var app = express();

// Пользовательские модули
var config = require('./config');
var api = require('./modules/api/api');
var helper = require('./modules/helper/helper');

// Заголовок
app.locals.title = config.title;

// Базовая аутентификация
if (config.basicAuth) {
    passport.use(new BasicStrategy(
            function (username, password, done) {
                if (username.valueOf() === 'admin' &&
                        password.valueOf() === '1')
                    return done(null, true);
                else
                    return done(null, false);
            }
    ));
    var basicAuth = passport.authenticate('basic', {session: false});
    // REST API
    // app.get('/api', basicAuth, api.test);
} else {
    // REST API
    app.get('/api', api.test);
}

// Запуск сервера
var credentials = config.credentials;
var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);
if (config.scheme === 'https') {
    httpsServer.listen(config.port, helper.listen);
} else if (config.scheme === 'http') {
    httpServer.listen(config.port, helper.listen);
}