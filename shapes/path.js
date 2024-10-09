class Path extends Shape {
    constructor(startPoint, options) {
        super(options);
        this.points = [startPoint];
    }
    addPoint(point) {
        this.points.push(point);
    }
    drawHitRegion(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        };
        this.applyHitRegionStyles(ctx);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        };
        this.applyStyles(ctx);
        if(this.selected) {
            this.drawGizmo(ctx);
        }
    }
    drawGizmo(ctx) {
        const minX = Math.min(...this.points.map(p=>p.x));
        const minY = Math.min(...this.points.map(p=>p.y));
        const maxX = Math.min(...this.points.map(p=>p.x));
        const maxY = Math.min(...this.points.map(p=>p.y));
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
