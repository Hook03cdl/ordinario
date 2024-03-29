var contenain = document.querySelector('.contenain-canvas');
var canvas = document.getElementById('my-canvas');
var options = document.querySelectorAll('.option');
var colors = document.querySelectorAll('.selectColor');
var action = document.querySelector('.active').id;
var fill = document.getElementById('fill');
var size = document.getElementById('size');
var textSize = document.querySelector('.textSize');
var cleanButton = document.querySelector('.clean');
var saveButton = document.querySelector('.save');

canvas.width = contenain.offsetWidth;
canvas.height = contenain.offsetHeight;

var ctx = canvas.getContext('2d', { willReadFrequently: true });
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var isDrawing = false;
var brushwidth = 5;
var x, y, snapShot;
var colorSelect;
var isResize = false;

options.forEach((option) => {
	option.addEventListener('click', () => {
		if ((r = document.querySelector('.active'))) r.classList.remove('active');
		option.classList.add('active');
		action = option.id;
		console.log(action);
	});
});

var drawStart = (e) => {
	isDrawing = true;
	x = e.touches ? e.touches[0].clientX : e.offsetX;
	y = e.touches ? e.touches[0].clientY : e.offsetY;
	ctx.beginPath();
	ctx.lineWidth = brushwidth;
	ctx.strokeStyle = colorSelect;
	ctx.fillStyle = colorSelect;
	snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

var rectangle = (e) => {
	ctx.fillStyle = colorSelect;
	if (!fill.checked) {
		return ctx.strokeRect(e.offsetX, e.offsetY, 100, 100);
	}
	ctx.fillRect(e.offsetX, e.offsetY, 100, 100);
};

var circle = () => {
	ctx.arc(x, y, 50, 0, 2 * Math.PI);
	fill.checked ? ctx.fill() : ctx.stroke();
};

const triangle = (e) => {
	var height = (100 * Math.sqrt(3)) / 2;

	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
	ctx.lineTo(e.offsetX - 100 / 2, e.offsetY + height);
	ctx.lineTo(e.offsetX + 100 / 2, e.offsetY + height);
	ctx.closePath();

	fill.checked ? ctx.fill() : ctx.stroke();
};

const draw = (e) => {
	if (!isDrawing) return;
	ctx.putImageData(snapShot, 0, 0);
	switch (action) {
		case 'brush':
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
			break;
		case 'eraser':
			ctx.strokeStyle = '#fff';
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
			break;

		default:
			break;
	}
};

const figure = (e) => {
	switch (action) {
		case 'rectangle':
			rectangle(e);
			break;
		case 'circle':
			circle(e);
			break;
		case 'triangle':
			triangle(e);
			break;

		default:
			break;
	}
};

size.addEventListener('change', () => {
	brushwidth = size.value;
});
size.addEventListener('mousemove', () => {
	textSize.innerText = size.value;
});

colors.forEach((color) => {
	color.addEventListener('click', () => {
		colorSelect = color.value;
	});
});

canvas.addEventListener('mousedown', drawStart);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('click', figure);

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	drawStart(e);
});
canvas.addEventListener('touchcancel', () => (isDrawing = false));
canvas.addEventListener('touchmove', (e) => {
	e.preventDefault();
	draw(e);
});

cleanButton.addEventListener('click', () => {
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
});
saveButton.addEventListener('click', (e) => {
	e.preventDefault();
	var image = canvas.toDataURL('image/png');
	var link = document.createElement('a');
	link.href = image;
	link.download = 'my-art.png';
	link.click();
});
