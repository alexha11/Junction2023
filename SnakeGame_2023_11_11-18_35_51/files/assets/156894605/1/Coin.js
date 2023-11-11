var Coin = pc.createScript('coin');

Coin.attributes.add('boxEntity', { type: 'entity' });

Coin.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onCollision, this);
};

Coin.prototype.onCollision = function(event) {
    // console.log(event)
    this.app.fire('Overlay:CoinCount');
    this.entity.destroy();
};