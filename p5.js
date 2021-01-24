    function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;

	// used as input for the piecewise function of parametric curves to animate the ghost
	var moveCounter = 0;

    function draw() {
	canvas.width = canvas.width;

	// use the slider to get the angle
	var viewAngle = slider1.value*0.02*Math.PI;

	// used as input for the piecewise function of parametric curves to animate the ghost
	moveCounter = (moveCounter + 0.01) % 4;

	// function from the week 8 demos to use moveTo with glmatrix
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	// function from the week 8 demos to use lineTo with glmatrix
	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}

	// creates rectangular/cube 3d shapes and determines which sides of 
	// the shape should be drawn
	function drawObject(Tx, x, y, z, xT, yT, zT, Color) {

		context.fillStyle = Color;
		context.strokeStyle = 'black';

		var normal = vec3.fromValues(0, 0, -1);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([-x + xT,-y + yT,-z + zT],Tx);
			lineToTx([-x + xT,y + yT,-z + zT],Tx);
			lineToTx([x + xT,y + yT,-z + zT],Tx);
			lineToTx([x + xT,-y + yT,-z + zT],Tx);
			lineToTx([-x + xT,-y + yT,-z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
		
		normal = vec3.fromValues(0, 0, 1);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([-x + xT,-y + yT,z + zT],Tx);
			lineToTx([-x + xT,y + yT,z + zT],Tx);
			lineToTx([x + xT,y + yT,z + zT],Tx);
			lineToTx([x + xT,-y + yT,z + zT],Tx);
			lineToTx([-x + xT,-y + yT,z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
		
		normal = vec3.fromValues(1, 0, 0);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([x + xT,-y + yT,-z + zT],Tx);
			lineToTx([x + xT,y + yT,-z + zT],Tx);
			lineToTx([x + xT,y + yT,z + zT],Tx);
			lineToTx([x + xT,-y + yT,z + zT],Tx);
			lineToTx([x + xT,-y + yT,-z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
		
		normal = vec3.fromValues(0, 1, 0);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([-x + xT,y + yT,z + zT],Tx);
			lineToTx([-x + xT,y + yT,-z + zT],Tx);
			lineToTx([x + xT,y + yT,-z + zT],Tx);
			lineToTx([x + xT,y + yT,z + zT],Tx);
			lineToTx([-x + xT,y + yT,z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
		
		normal = vec3.fromValues(0, -1, 0);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([-x + xT,-y + yT, + zT],Tx);
			lineToTx([-x + xT,-y + yT,-z + zT],Tx);
			lineToTx([x + xT,-y + yT,-z + zT],Tx);
			lineToTx([x + xT,-y + yT,z + zT],Tx);
			lineToTx([-x + xT,-y + yT,z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
		
		normal = vec3.fromValues(-1, 0, 0);

		if (vec3.dot(normal, locCamera) >= 0) {
			context.beginPath();
			moveToTx([-x + xT,-y + yT,-z + zT],Tx);
			lineToTx([-x + xT,y + yT,-z + zT],Tx);
			lineToTx([-x + xT,y + yT,z + zT],Tx);
			lineToTx([-x + xT,-y + yT,z + zT],Tx);
			lineToTx([-x + xT,-y + yT,-z + zT],Tx);
			context.fill();
			context.stroke();
			context.closePath();
		}
	}

	// draws the body and arms and decides the order to draw the arms and torso
	function drawBodyNArms(Tx) {
		var normal = vec3.fromValues(-1,0,0);	

		if(vec3.dot(normal, locCamera) >= 0) {
			drawObject(Tx, 0.2, 0.2, 0.2, 0.7, 0, 0, 'rgb(211,211,211)');

			drawObject(Tx, 0.5, 0.5, 0.5, 0, 0, 0, 'rgb(211,211,211)');

			drawObject(Tx, 0.2, 0.2, 0.2, -0.7, 0, 0, 'rgb(211,211,211)');
		} else {
			drawObject(Tx, 0.2, 0.2, 0.2, -0.7, 0, 0, 'rgb(211,211,211)');

			drawObject(Tx, 0.5, 0.5, 0.5, 0, 0, 0, 'rgb(211,211,211)');

			drawObject(Tx, 0.2, 0.2, 0.2, 0.7, 0, 0, 'rgb(211,211,211)');
		}
	}

	// draws the face and decides whether to draw the left or right eye first
	function drawFace(Tx) {
		var normal = vec3.fromValues(-1,0,0);	

		drawObject(Tx, 0.3, 0.2, 0.05, 0, -0.2, 0.55, 'green');

		if(vec3.dot(normal, locCamera) >= 0) {
			drawObject(Tx, 0.1, 0.1, 0.05, 0.3, 0.25, 0.55, 'green');

			drawObject(Tx, 0.1, 0.1, 0.05, -0.3, 0.25, 0.55, 'green');
		} else {
			drawObject(Tx, 0.1, 0.1, 0.05, -0.3, 0.25, 0.55, 'green');

			drawObject(Tx, 0.1, 0.1, 0.05, 0.3, 0.25, 0.55, 'green');
		}
	}

	// draws the ghost and decides whether to draw either the body/arms
	// first before the face or vice versa
	function drawGhost(Tx) {
	normal = vec3.fromValues(1,0,0);

	if (vec3.dot(normal, Tx) >= 0) {
		drawBodyNArms(Tx);
	
		drawFace(Tx);
	} else {
		drawFace(Tx);

		drawBodyNArms(Tx);
	}
	}

	// creates upwards spiral
	function spiral(t) {;
		t = t * 2 * Math.PI;

		cost = Math.cos(t + 1.575);
		sint = Math.sin(t + 1.575);

		return [sint, t / 5, cost];
	}

	// creates downward spiral
	function spiral2(t) {
		t = 4 - t;
		t = t * 2 * Math.PI;

		cost = Math.cos(t);
		sint = Math.sin(t);

		return [cost, t / 5, sint];
	}

	// piecewise function to determine which of the spiral functions above to use at the time
	function piecewise(t) {
		if(t <= 2) {
			return spiral(t);
		} else if(t > 2 && t <= 4){
			return spiral2(t);
		}
	}

	// drawTrajectory function used in the demos from week 8 demos to display curves
	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
		    var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		    lineToTx(C(t),Tx);
        }
        context.stroke();
    }
	
	// Code used to create the camera below uses the code used to create the cameras in
	// week 8 demo 2 and week 8 demo 4
	
	// Create ViewPort transform
	var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
        // "lookAt" transform (where
        // the camera points) to the
        // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[15000,-15000,0]); // Flip the Y-axis,
        // scale everything by 100x

	// Create Camera (lookAt) transform
	var locCamera = vec3.create();
	var distCamera = 400.0;
	locCamera[0] = distCamera*Math.sin(viewAngle);
	locCamera[1] = 100;
	locCamera[2] = distCamera*Math.cos(viewAngle);
	var locTarget = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
	var vecUp = vec3.fromValues(0,1,0);
	var TlookAt = mat4.create();
	mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);
	
	var TprojectionCamera = mat4.create();
	mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1);
	
	// Create transform t_VP_CAM that incorporates
	// Viewport and Camera transformations
	var tVP_CAM = mat4.create();
	mat4.multiply(tVP_CAM,Tviewport,TprojectionCamera);
	mat4.multiply(tVP_CAM, tVP_CAM, TlookAt);
	
	// draws the 2 spiral paths/lines that the ghost moves along
	drawTrajectory(0.0,2.0,50,spiral,tVP_CAM,"black");
	drawTrajectory(2.0,4.0,50,spiral2,tVP_CAM,"black");

	// Create model(ing) transform
	// (from moving object to world)
	var Tmodel = mat4.create();

	// moves the models based on the vector returned by the piecewise function
	mover = piecewise(moveCounter);
	mat4.fromTranslation(Tmodel,mover);
	
	// Create transform t_VP_CAM_MOD that incorporates
	// Viewport, camera, and modeling transform
	var tVP_CAM_MOD = mat4.create();
	mat4.multiply(tVP_CAM_MOD, tVP_CAM, Tmodel);

	// draws the ghost model
	drawGhost(tVP_CAM_MOD);
	
	window.requestAnimationFrame(draw);
	}
	
	window.requestAnimationFrame(draw);
}
window.onload = setup;


