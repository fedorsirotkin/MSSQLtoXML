/**
 *
 * Вспомогательные функции
 *
 */

// Пользовательские модули
var config = require('../../config');

// Логирование сообщений в консоли
function logger(data) {
    if (config.loggerconsole) {
        console.log(data);
    }
}

// Подсказка, что сервер запущен и на каком порту
function listen() {
    console.log('Приложение запущено и прослушивает порт ' + config.port + '...');
}

exports.listen = listen;
exports.logger = logger;