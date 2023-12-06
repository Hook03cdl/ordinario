var contenain = document.querySelector('.contenain-canvas');
var canvas = document.getElementById('my-canvas');
var options = document.querySelectorAll('li');
var color = '';

canvas.width = contenain.offsetWidth;
canvas.height = contenain.offsetHeight;

options.forEach((option) => {
	option.addEventListener('click', () => {
		if ((r = document.querySelector('.active'))) r.classList.remove('active');
		option.classList.add('active');
		console.log(option.getAttribute('data-type'));
	});
});

var ctx = canvas.getContext('2d');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var isDrawing = false;
var x = 0;
var y = 0;

canvas.addEventListener('mousedown', (e) => {
	color = document.querySelector('input:checked').value;

	isDrawing = true;
	x = e.offsetX;
	y = e.offsetY;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(x, y);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	x = e.offsetX;
	y = e.offsetY;
}

function update() {
	if (!isDrawing) return;
	requestAnimationFrame(update);
}

update();
