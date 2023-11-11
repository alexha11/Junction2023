var BoxManager = pc.createScript('boxManager');

BoxManager.attributes.add('boxEntity', { type: 'entity' });

// initialize code called once per entity
BoxManager.prototype.initialize = function () {
    this.entity.collision.on('triggerenter', this.onCollision, this);
    this.totalBoxes = 0; // Initialize the total box count
};

// update code called every frame
BoxManager.prototype.update = function (dt) {
    // Add any update logic if needed
};

BoxManager.prototype.onCollision = function (event) {
    console.log(event);

    // Get the current position of the entity that triggered the collision
    var currentPosition = this.entity.getPosition();

    // Clone the box entity
    this.box = this.boxEntity.clone();

    // Set the position of the cloned box entity to the current position plus an offset
    var offset = this.totalBoxes * 2; // Adjust the offset as needed
    this.box.setPosition(currentPosition.x - offset, currentPosition.y, currentPosition.z - offset);

    // Enable the cloned box entity and add it to the root
    this.box.enabled = true;
    this.app.root.addChild(this.box);

    // Increment the total box count
    this.totalBoxes++;
};

// swap method called for script hot-reloading
// inherit your script state here
// BoxManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/
