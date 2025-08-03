class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 500; // 限制日志数量
        this.isDebugMode = true; // 默认启用调试模式
    }

    // 记录一般信息日志
    info(message) {
        this._log('INFO', message);
    }

    // 记录调试日志
    debug(message) {
        if (this.isDebugMode) {
            this._log('DEBUG', message);
        }
    }

    // 记录警告日志
    warn(message) {
        this._log('WARN', message);
    }

    // 记录错误日志
    error(message) {
        this._log('ERROR', message);
    }

    // 记录文件传输相关日志
    transfer(message) {
        this._log('TRANSFER', message);
    }

    // 核心日志记录方法
    _log(level, message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${level}] ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry); // 同时输出到控制台

        // 如果超出最大日志数量，删除最早的日志
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // 触发日志更新事件
        Events.fire('log-updated', { log: logEntry });
    }

    // 获取所有日志
    getAllLogs() {
        return this.logs.join('\n');
    }

    // 清除所有日志
    clearLogs() {
        this.logs = [];
        Events.fire('log-cleared');
    }

    // 切换调试模式
    toggleDebugMode() {
        this.isDebugMode = !this.isDebugMode;
        this.info(`调试模式 ${this.isDebugMode ? '已启用' : '已禁用'}`);
        return this.isDebugMode;
    }
}

// 初始化日志器
window.logger = new Logger();