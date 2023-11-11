// clone coins
var CoinManager = pc.createScript('coinManager');

CoinManager.attributes.add('coinEntity', { type : 'entity' });
CoinManager.attributes.add('count', { type : 'number' });

CoinManager.prototype.initialize = function() {
    this.coins = [];

    for (var i = 0; i < this.count; i++) {
        this.createRandomCoin();
    }

    // Create a new coin every second
    setInterval(this.createRandomCoin.bind(this), 1000);
};

CoinManager.prototype.createRandomCoin = function() {
    var posX = Math.random() * 20 - Math.random() * 20;
    var posY = 1;
    var posZ = Math.random() * 20 - Math.random() * 20;

    var coin = this.coinEntity.clone();
    coin.enabled = true;
    coin.setPosition(posX, posY, posZ);

    this.coins.push(coin);
    this.entity.addChild(coin);
};

CoinManager.prototype.update = function() {
    // Add your update logic here if needed
};

    
