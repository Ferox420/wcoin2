const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const wheelRadius = canvas.width / 2;
const segments = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"];

let angle = 0;
let isSpinning = false;

function drawWheel() {
    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
        ctx.beginPath();
        ctx.moveTo(wheelRadius, wheelRadius);
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, index * segmentAngle, (index + 1) * segmentAngle);
        ctx.fillStyle = index % 2 === 0 ? '#f09' : '#9cf';
        ctx.fill();
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate((index + 0.5) * segmentAngle);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.fillText(segment, wheelRadius - 10, 10);
        ctx.restore();
    });
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    let spinDuration = 3000; // ms
    let startAngle = angle;
    let endAngle = angle + (Math.random() * 6 + 6) * Math.PI;
    let startTime = null;

    function animateSpin(time) {
        if (!startTime) startTime = time;
        let progress = time - startTime;
        angle = startAngle + (endAngle - startAngle) * (progress / spinDuration);
        drawWheel();
        if (progress < spinDuration) {
            requestAnimationFrame(animateSpin);
        } else {
            isSpinning = false;
        }
    }
    requestAnimationFrame(animateSpin);
}

spinButton.addEventListener('click', spinWheel);
drawWheel();
