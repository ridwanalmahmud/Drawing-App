class Rect extends Shape {
    constructor(corner1, options) {
        super(options);
        this.corner1 = corner1;
        this.corner2 = corner1;
    }
    setCorner2(corner2) {
        this.corner2 = corner2;
    }
    drawHitRegion(ctx) {
        const minX = Math.min(this.corner1.x, this.corner2.x);
        const minY = Math.min(this.corner1.y, this.corner2.y);
        const width = Math.abs(this.corner1.x - this.corner2.x);
        const height = Math.abs(this.corner1.y - this.corner2.y);
        ctx.beginPath();
        ctx.rect(minX, minY, width, height);
        this.applyHitRegionStyles(ctx);
    }
    draw(ctx) {
        const minX = Math.min(this.corner1.x, this.corner2.x);
        const minY = Math.min(this.corner1.y, this.corner2.y);
        const width = Math.abs(this.corner1.x - this.corner2.x);
        const height = Math.abs(this.corner1.y - this.corner2.y);
        ctx.beginPath();
        ctx.rect(minX, minY, width, height);
        this.applyStyles(ctx);
        if(this.selected) {
            this.drawGizmo(ctx);
        }
    }
    drawGizmo(ctx) {
        const minX = Math.min(this.corner1.x, this.corner2.x);
        const minY = Math.min(this.corner1.y, this.corner2.y);
        const maxX = Math.max(this.corner1.x, this.corner2.x);
        const maxY = Math.max(this.corner1.y, this.corner2.y);
        ctx.save();
        ctx.beginPath();
        ctx.rect(minX, minY, maxX - minX, maxY - minY);
        ctx.strokeStyle = "yellow";
        ctx.linewidth = 3;
        ctx.linedash = ([5,5]);
        ctx.stroke();
        ctx.restore();
    }
}
