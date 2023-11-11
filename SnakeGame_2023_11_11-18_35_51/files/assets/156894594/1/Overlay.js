var Overlay = pc.createScript('overlay');

Overlay.attributes.add('coinCountText', { type : 'entity' });
Overlay.prototype.initialize = function() {
    this.coinCount = 0;
    
    this.app.on('Overlay:CoinCount', this.setCoinCount, this);
};

Overlay.prototype.setCoinCount = function() {
    this.coinCount++; 
    this.coinCountText.element.text = this.coinCount;
    
    this.entity.sound.play('Pickup');
};