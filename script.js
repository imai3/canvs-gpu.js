const gpu = new GPU();
const [yoko, tate] = [500, 500]
console.log(tate, yoko)

const render = gpu.createKernel(function(x) {
	const tx = this.thread.x;
	const ty = this.thread.y;
	const ae = x[tx][ty];
	this.color(ae * 0.1, Math.sin(ae * 0.5), Math.sin(ae * 0.2), 1);
})
	.setOutput([yoko, tate])
	.setGraphical(true);


const random = gpu.createKernel(function() {
	return 0;
}).setOutput([yoko, tate])

const iterate = gpu.createKernel(function(pre) {
	const tx = this.thread.x;
	const ty = this.thread.y;
	const dx = 1;
	const dy = 1;
	const dt = 1;
	const ar = (pre[ty + dt + dx][tx + dt + dy] + pre[ty + dx][tx + dy] + pre[ty - dt + dx][tx - dt + dy] + pre[ty - dt + dx][tx + dt + dy] + pre[ty + dt + dx][tx - dt + dy]);
	return Math.floor(ar / 5.05);
}).setOutput([yoko, tate])


let now = random();
console.log(now[0][0])

setInterval(() => {
	now = iterate(now);
	render(now);
	for (let i = 0; i < 10; i++) {
		now[Math.floor(Math.random() * tate)][Math.floor(Math.random() * tate)] = Math.floor(-50000 + Math.random() * 100000);
	}
}, 16)


const canvas = render.canvas;
document.getElementsByTagName('body')[0].appendChild(canvas);


