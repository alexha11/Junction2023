var MoveLookAt = pc.createScript('moveLookAt');

MoveLookAt.attributes.add('power', {
    type: 'number',
    default: 2500,
    description: 'Adjusts the speed of player movement'
});

MoveLookAt.attributes.add('modelEntity', {
    type: 'entity'
});

MoveLookAt.attributes.add('cameraEntity', {
    type: 'entity'
});


// initialize code called once per entity
MoveLookAt.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onCollision, this);
    this.force = new pc.Vec3();

    this.collectedCoins = 0
    this.snakeBody = []

    this.lookAtPosition = new pc.Vec3().copy(this.modelEntity.getPosition()).add(this.modelEntity.forward);

    var app = this.app;
    
    // Create a plane this level with model entity to cast against so we know
    // where too look at
    this.lookAtPlane = new pc.Plane(this.modelEntity.getPosition(), pc.Vec3.UP);

    // Listen for mouse move events
    app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);
    
    this.on('destroy', function() {
        app.mouse.off(pc.EVENT_MOUSEMOVE, this._onMouseMove, this);
    }, this);
};

MoveLookAt.prototype.onCollision = function(event){
    if (event.other.tag.has("snakeBody"))
    {
        console.log("Collision with snake! Game over.");
        this.app.root.findByName("snakeBody").destroy();
    }
}

// update code called every frame
MoveLookAt.prototype.update = function(dt) {
    var force = this.force;
    var app = this.app;

    this.modelEntity.lookAt(this.lookAtPosition);
    
    // Get model entity directions to determine movement directions
    var forward = this.modelEntity.forward;
    var right = this.modelEntity.right;

    // movement
    var x = 0;
    var z = 0;

    // Use W-A-S-D keys to move player
    // Check for key presses
    // if (app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_Q)) {
    //     x -= right.x;
    //     z -= right.z;
    // }

    // if (app.keyboard.isPressed(pc.KEY_D)) {
    //     x += right.x;
    //     z += right.z;
    // }

    
    x += forward.x;
    z += forward.z;
    

    // if (app.keyboard.isPressed(pc.KEY_S)) {
    //     x -= forward.x;
    //     z -= forward.z;
    // }

    // use direction from keypresses to apply a force to the character
    if (x !== 0 && z !== 0) {
        force.set(x, 0, z).normalize().scale(this.power);
        this.entity.rigidbody.applyForce(force);
    }
};


MoveLookAt.__ray = new pc.Ray();
MoveLookAt.__hitPosition = new pc.Vec3();
MoveLookAt.prototype._onMouseMove = function (e) {
    // Initialise the ray and work out the direction of the ray from the a screen position
    var ray = MoveLookAt.__ray;
    var hitPosition = MoveLookAt.__hitPosition;

    this.lookAtPlane.setFromPointNormal(this.modelEntity.getPosition(), pc.Vec3.UP);
    
    this.cameraEntity.camera.screenToWorld(e.x, e.y, this.cameraEntity.camera.farClip, ray.direction); 
    ray.origin.copy(this.cameraEntity.getPosition());
    ray.direction.sub(ray.origin).normalize();
    
    // Test the ray against the ground
    var result = this.lookAtPlane.intersectsRay(ray, hitPosition);  
    if (result) {
        this.lookAtPosition.copy(hitPosition);
    }  
};

MoveLookAt.prototype.onCollision = function(event) {
    console.log('working collision');
    this.entity.destroy();
};