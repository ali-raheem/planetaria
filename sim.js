function setup () {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext("2d");
    bodies = [];
    particles = [];

    bodies.push(Body ([500, 500], 1000));
    bodies.push(Body ([100, 600], 1000, 'orange'));

    particles.push(Particle ([100, 800], [1, 0], 1, 'yellow'));
    particles.push(Particle ([900, 300], [1, 0], 100, 'green'));
    particles.push(Particle ([500, 900], [-1, 0], 1));
    particles.push(Particle ([100, 400], [1, 0], 1, 'blue'));
    particles.push(Particle ([500, 600], [-1, 0], 1000, '#FF00FF'));

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
    running = true;
    loop();
}

function Body(Pos, M, colour='black') {
	var body = {};
	body.x = Pos[0];
	body.y = Pos[1];
	body.M = M;
	body.colour = colour;
	return body;
}

function Particle(Pos, Vel, M, colour='red') {
	var body = {};
	body.x = Pos[0];
	body.y = Pos[1];
	body.M = M;
	body.Vx = Vel[0];
	body.Vy = Vel[1];
	body.Ax = 0;
	body.Ay = 0;
	body.Ax0 = 0;
	body.Ay0 = 0;
	body.colour = colour;
	return body;
}

function loop() {
	physics();
    draw();
    if(running)
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
   		ctx.fillStyle = bodies[i].colour;
   		ctx.fillRect(bodies[i].x - 2 - scrollX, bodies[i].y - 2 - scrollY, 4, 4);
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
