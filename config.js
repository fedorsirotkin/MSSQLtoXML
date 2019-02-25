/**
 * 
 * Конфигурация приложения
 *
 * Обеспечивает совокупность настроек приложения
 *
 */

// Модули NPM
var fs = require('fs');

// Конфигурация
var config = {
    title: 'API Service - Export XML',
    scheme: 'http',
    port: 8082,
    https: {
        privateKey: '/etc/ssl/private/key_name.key',
        certificate: '/etc/ssl/certs/crt_name.crt',
        encoding: 'utf8'
    },
    credentials: {key: null, cert: null},
    basicAuth: false,
    db: {
        user: '<Пользователь>',
        password: '<Пароль>',
        server: '<Сервер_БД>',
        database: '<Имя_БД>',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    },
    loggerconsole: true,
    loggerfile: {
        options: {
            timeZone: 'Europe/Moscow',
            folderPath: './logs/',
            dateBasedFileNaming: true,
            fileNamePrefix: 'ApiLogs_',
            fileNameExtension: '.log',
            dateFormat: 'YYYY_MM_DD',
            timeFormat: 'HH:mm:ss'
        }
    }
};

// Читает файл и возвращает его содержимое
function readFileSync(pathfile, encoding) {
    return fs.readFileSync(pathfile, encoding);
}

// При необходимости получает ключ и сертификат -https
(function () {
    if (config.scheme === 'https') {
        config.credentials.key = readFileSync(config.https.privateKey, config.https.encoding);
        config.credentials.cert = readFileSync(config.https.certificate, config.https.encoding);
    }
})();

module.exports = config;