class Shape {
    constructor(options) {
        // never deliberately called
        this.options = options;
    }
    draw(ctx) {
        throw new Error("draw method must be implemented");
    }
}
