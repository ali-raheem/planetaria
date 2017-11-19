function setup () {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext("2d");
    bodies = [];
    particles = [];

    bodies.push(new Body([500, 300], 1000));

    G = 10;
    dt = 0.1;
    scrollX = 0;
    scrollY = 0;
    document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
	case 37:
            scrollX -= 10;
            break;
	case 38:
            scrollY -= 10;
            break;
	case 40:
            scrollX += 10;
            break;
	case 39:
            scrollY += 10;
            break;
	}
        ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 1000, 1000);
    });
    document.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", setAim);
    running = true;
    loop();
}
function startDrag (e) {
    x1 = e.pageX;
    y1 = e.pageY;
    // console.log('startDrag');
}

function setAim (e) {
    var x2 = e.pageX;
    var y2 = e.pageY;
    var Dx = x1 - x2;
    var Dy = y1 - y2;
    var particle = new Particle([x1, y1], [-Dx/30, -Dy/30], 100);
    particles.push(particle);
    running = true;
//    document.removeEventListener("mousedown", startDrag);
//    document.removeEventListener("mouseup", setAim);
}


class Body {
    constructor (Pos, M, colour='black') {
	this.x = Pos[0];
	this.y = Pos[1];
	this.M = M;
	this.colour = colour;
	this.shape = new Path2D();
//	this.shape.moveTo(this.x, this.y);
	this.shape.arc(this.x, this.y, Math.sqrt(this.M), 0, 2*Math.PI);
    }
    render () {
	ctx.fillStyle = this.colour;
	ctx.fill(this.shape);
    }
}

class Particle extends Body {
    constructor (Pos, Vel, M, colour='red') {
	super(Pos, M, colour);
	this.Vx = Vel[0];
	this.Vy = Vel[1];
	this.Ax = 0;
	this.Ay = 0;
	this.Ax0 = 0;
	this.Ay0 = 0;
	this.colour = colour;
    }
}

function loop() {
    if(running) {
	physics();
	draw();
    }
    requestAnimationFrame(loop);
}

function physics() {
    for(i = 0; i < particles.length; i++) {
       	particles[i].Ax0 = particles[i].Ax;
	particles[i].Ay0 = particles[i].Ay;
	particles[i].Ax = 0;
	particles[i].Ay = 0;
	for ( j = 0; j < bodies.length; j++) {
	    var A = calcAcc(particles[i], bodies[j]);
	    particles[i].Ax += A[0];
	    particles[i].Ay += A[1];
	}
	for ( j = 0; j < particles.length; j++) {
	    if(i == j) continue;
	    var A = calcAcc(particles[i], particles[j]);
	    particles[i].Ax += A[0];
	    particles[i].Ay += A[1];
	}
       	particles[i].x += particles[i].Vx * dt + 0.5 * particles[i].Ax0 * dt**2;
       	particles[i].Vx += 0.5 * (particles[i].Ax0 + particles[i].Ax) * dt;
        particles[i].y += particles[i].Vy * dt + 0.5 * particles[i].Ay0 * dt**2;
        particles[i].Vy += 0.5 * (particles[i].Ay0 + particles[i].Ay) * dt;
    }
}

function draw() {
    for(i = 0; i < bodies.length; i++) {
	bodies[i].render();
    }
    for ( j = 0; j < particles.length; j++) {
   	ctx.fillStyle = particles[j].colour;
   	ctx.fillRect(particles[j].x - 1 -scrollX, particles[j].y - 1 - scrollY, 2, 2);
    }
}

function calcAcc(particle, body) {
    var Dx = particle.x - body.x;
    var Dy = particle.y - body.y;
    var r = Math.sqrt(Dx**2 + Dy**2);
    var theta = Math.atan(Dy/Dx);
    var F = G * body.M * particle.M/ r**2;
    var a = F / particle.M;
    var ax = Math.abs(a * Math.sin(Math.PI/2 - theta));
    var ay = Math.abs(a * Math.cos(Math.PI/2 - theta));
    if (Dx > 0) ax *= -1;
    if (Dy > 0) ay *= -1;
    return [ax, ay];
}
