/**
 *
 * Реализация REST API
 *
 */

// Модули NPM
var sql = require('mssql');
var js2xmlparser = require('js2xmlparser');
var uuidv4 = require('uuid/v4');

// Пользовательские модули
var config = require('../../config');
var helper = require('../helper/helper');

// Логирование
var logger = require('node-file-logger');
logger.SetUserOptions(config.loggerfile.options);

// Выполняет SQL-запрос к MS SQL и выводит результат в формате XML
function test(req, res) {
    
    // Чтение GET-параметра
    var name = req.query.name;
    helper.logger(name);
    
    // Формирорвание уникального идентификатора
    var uuid = uuidv4();
    
    // Логирование вспомогательной информации
    helper.logger(uuid);
    logger.Info(uuid);
    
    // SQL-запрос
    // var sqlquery = 'SELECT * FROM <имя_таблицы>';
    new sql.ConnectionPool(config.db).connect().then(pool => {
        
        // Выполнение обычных SQL-запросов
        // return pool.request().query(sqlquery);
        
        // Выполнение хранимых процедур
        var param_1_val = '<Значение_параметра>';
        return pool.request()
                .input('<Тип_параметра>', sql.VarChar, param_1_val)
                .execute('<Имя_процедуры>');
    }).then(result => {
        var rows = result.recordset;  
        res.set('Content-Type', 'text/xml');
        res.status(200).send(js2xmlparser.parse('RootElement', {Row: rows}));
        sql.close();
    }).catch(err => {
        logger.Fatal('ConnectionPool has failed!', 'Api service', 'Test', err);
        res.set('Content-Type', 'text/xml');
        res.status(500).send(js2xmlparser.parse('Errors', {Error: err}));
        sql.close();
    });
   
    sql.on('error', err => {
        helper.logger(err);
        logger.Fatal('SQL has failed!', 'Api service', 'Error', err);
        sql.close();
    });
    
}

exports.test = test;