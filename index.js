const refs = {
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
    clearBtn: document.querySelector('[data-action="clear"]'),
};

class CountdownTimer {
    constructor({targetDate, selector}){
        this.intervalId = null;
        this.isActive = false;
        this.targetDate = targetDate;
        this.selector = selector;
    };

    start() {
        if (this.isActive) {
            return;
        };
        const expectedTime = this.targetDate;
        this.isActive = true;
        
        document.querySelector(this.selector)
            .innerHTML = this.createTimerTemplateEls({ days: this.pad(0), hours: this.pad(0), mins: this.pad(0), secs: this.pad(0) });
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeDifference = expectedTime - currentTime;
            const leftTime = this.getTimeElements(timeDifference);
            if (timeDifference >= 0) {
                this.updateTimerElements(leftTime);
            }
        }, 1000);
    };


    stop() {
        if (this.isActive === false) {
            return;
        }

        clearInterval(this.intervalId);
        this.isActive = false;
        const leftTime = this.getTimeElements(0);
        this.updateTimerElements(leftTime);
    };

    clear() {
        document.querySelector(this.selector)
            .innerHTML = '';
        clearInterval(this.intervalId);
        this.isActive = false;
    }

    getTimeElements (time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    };

    pad(value) {
        return String(value).padStart(2, '0');
    };

    createTimerTemplateEls ({ days, hours, mins, secs }) {
        return `<div class="field">
            <span class="value" data-value="days">${days}</span>
            <span class="label">Days</span>
            </div>
    
             <div class="field">
              <span class="value" data-value="hours">${hours}</span>
              <span class="label">Hours</span>
            </div>
          
            <div class="field">
              <span class="value" data-value="mins">${mins}</span>
              <span class="label">Minutes</span>
            </div>
          
            <div class="field">
              <span class="value" data-value="secs">${secs}</span>
              <span class="label">Seconds</span>
            </div>`;
    };

    updateTimerElements ({ days, hours, mins, secs }) {
        document.querySelector('[data-value="days"]').textContent = `${days}`;
        document.querySelector('[data-value="hours"]').textContent = `${hours}`; 
        document.querySelector('[data-value="mins"]').textContent = `${mins}`;
        document.querySelector('[data-value="secs"]').textContent = `${secs}`;
    };
};

const timer = new CountdownTimer({
    targetDate: new Date('Sep 11 2021 11:19'),
    selector: '#timer-1',
});

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});

refs.clearBtn.addEventListener('click', () => {
    timer.clear();
});