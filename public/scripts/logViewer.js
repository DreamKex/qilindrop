class LogViewer {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.updateLogView();
        // 默认隐藏日志查看器
        this.logViewer.style.display = 'none';
    }

    initElements() {
        this.logHeader = document.getElementById('logHeader');
        this.logContent = document.getElementById('logContent');
        this.logText = document.getElementById('logText');
        this.toggleButton = document.getElementById('toggleLog');
        this.clearButton = document.getElementById('clearLog');
        this.copyButton = document.getElementById('copyLog');
        this.debugButton = document.getElementById('toggleDebug');
        this.toggleLogBtn = document.getElementById('toggleLogBtn');
        this.logViewer = document.getElementById('logViewer');
        this.resizeHandle = document.querySelector('.resize-handle');
        this.isResizing = false;
    }

    bindEvents() {
        // 点击/触摸头部展开/折叠日志
        this.logHeader.addEventListener('click', () => this.toggleLog());
        this.logHeader.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.toggleLog();
        });

        // 拖拽调整宽度
        if (this.resizeHandle) {
            this.resizeHandle.addEventListener('mousedown', (e) => this.startResizing(e));
            document.addEventListener('mousemove', (e) => this.onResizing(e));
            document.addEventListener('mouseup', () => this.stopResizing());
        }

        // 移动端侧边按钮切换日志查看器
        this.toggleLogBtn.addEventListener('click', () => this.toggleLogViewer());
        this.toggleLogBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.toggleLogViewer();
        });

        // 点击/触摸切换按钮展开/折叠日志
        this.toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLog();
        });
        this.toggleButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleLog();
        });

        // 清除日志
        this.clearButton.addEventListener('click', (e) => {
            e.stopPropagation();
            window.logger.clearLogs();
        });
        this.clearButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.logger.clearLogs();
        });

        // 复制日志
        this.copyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.copyLogs();
        });
        this.copyButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.copyLogs();
        });

        // 切换调试模式
        this.debugButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isDebugMode = window.logger.toggleDebugMode();
            this.debugButton.textContent = `调试模式: ${isDebugMode ? '开' : '关'}`;
        });
        this.debugButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isDebugMode = window.logger.toggleDebugMode();
            this.debugButton.textContent = `调试模式: ${isDebugMode ? '开' : '关'}`;
        });

        // 监听日志更新事件
        Events.on('log-updated', () => this.updateLogView());

        // 监听日志清除事件
        Events.on('log-cleared', () => this.updateLogView());
    }

    toggleLog() {
        const isHidden = this.logContent.style.display === 'none';
        if (isHidden) {
            this.logContent.style.display = 'block';
            this.toggleButton.textContent = '折叠';
        } else {
            this.logContent.style.display = 'none';
            this.toggleButton.textContent = '展开';
        }
    }

    // 切换日志查看器的显示状态
    toggleLogViewer() {
        const isHidden = this.logViewer.style.display === 'none';
        if (isHidden) {
            this.logViewer.style.display = 'block';
            this.logContent.style.display = 'block'; // 确保内容也显示
            this.toggleButton.textContent = '折叠';
            this.toggleLogBtn.textContent = '关闭';
        } else {
            this.logViewer.style.display = 'none';
            this.toggleLogBtn.textContent = '日志';
        }
    }

    updateLogView() {
        this.logText.textContent = window.logger.getAllLogs();
        // 滚动到底部
        this.logText.scrollTop = this.logText.scrollHeight;
    }

    copyLogs() {
        const logs = window.logger.getAllLogs();
        navigator.clipboard.writeText(logs).then(() => {
            Events.fire('notify-user', '日志已复制到剪贴板');
            // 移动端复制成功后自动折叠日志
            this.toggleLogViewer();
            if (window.innerWidth <= 768) {
                this.toggleLog();
            }
        }).catch(err => {
            console.error('无法复制日志: ', err);
            Events.fire('notify-user', '复制失败，请手动复制');
        });
    }

    // 开始拖拽调整
    startResizing(e) {
        // 只有在PC端才允许拖拽
        if (window.innerWidth <= 768) return;

        e.preventDefault();
        this.isResizing = true;
        this.initialX = e.clientX;
        this.initialWidth = this.logViewer.offsetWidth;

        // 添加调整中的样式
        document.body.style.cursor = 'ew-resize';
        this.resizeHandle.style.background = 'rgba(0, 0, 0, 0.2)';
    }

    // 拖拽调整中
    onResizing(e) {
        if (!this.isResizing) return;

        const deltaX = this.initialX - e.clientX;
        let newWidth = this.initialWidth + deltaX;

        // 限制最小和最大宽度
        const minWidth = 250;
        const maxWidth = window.innerWidth * 0.8;
        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

        // 设置新宽度
        this.logViewer.style.width = `${newWidth}px`;
    }

    // 停止拖拽调整
    stopResizing() {
        if (!this.isResizing) return;

        this.isResizing = false;
        // 恢复样式
        document.body.style.cursor = '';
        this.resizeHandle.style.background = 'transparent';
    }
}

// 等待DOM加载完成后初始化日志查看器
document.addEventListener('DOMContentLoaded', () => {
    window.logViewer = new LogViewer();
    window.logger.info('日志系统已初始化');
});