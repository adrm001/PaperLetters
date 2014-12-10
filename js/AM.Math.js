AM.Math = AM.Math || {};

AM.Math.ToDeg = function (rad) {
    return rad * (180 / Math.PI);
};
AM.Math.ToRad = function (deg) {
    return deg * (Math.PI / 180);
};
AM.Math.Vec2d = function (x, y) {
    this.x = x;
    this.y = y;
};
AM.Math.Vec2d.lerp = function(v1,v2,t){
	return v1.scale(1-t).add(v2.scale(t));
}
AM.Math.Vec2d.prototype = {
    x: 0,
    y: 0,

    subtract: function (otherVec) {
        return new AM.Math.Vec2d(this.x - otherVec.x, this.y - otherVec.y);
    },
    add: function (otherVec) {
        return new AM.Math.Vec2d(this.x + otherVec.x, this.y + otherVec.y);
    },
    scale: function (num) {
        return new AM.Math.Vec2d(this.x * num, this.y * num);
    },
    dot: function Vec2d$dot(otherVec) {
        return this.x * otherVec.x + this.y * otherVec.y;
    },
    magnitude: function Vec2d$magnitude() {
        return Math.sqrt(this.dot(this));
    },
    norm: function Vec2d$norm() {
        var mag = this.magnitude();
        return new AM.Math.Vec2d(this.x / mag, this.y / mag);
    },
    angle: function Vec2d$angle(other) {
        var dot = this.dot(other)
        var angle = Math.acos(dot);
        if (angle > Math.PI) {
            angle = Math.PI * 2 - angle;
        }
        return angle;
    },
    rotate: function Vec2d$rotate(rads) {
        var cos = Math.cos(rads);
        var sin = Math.sin(rads);

        var x = this.x * cos - this.y * sin;
        var y = this.x * sin + this.y * cos;
        return new AM.Math.Vec2d(x, y);
    },
    cross: function (otherVec) {
        return this.x * otherVec.y - this.y * otherVec.x;
    }
};

AM.Math.Line = function (pointA, pointB) {
    this.N = pointB.subtract(pointA).norm();
    this.A = pointA;
};
AM.Math.Line.Intersection = function(a1,a2,b1,b2){
	var det = (a1.x - a2.x)*(b1.y - b2.y) - (a1.y - a2.y)*(b1.x - b2.x);
	if(Math.abs(det) > .0001){
		var xNum = (a1.x*a2.y - a1.y*a2.x)*(b1.x - b2.x) - (a1.x - a2.x)*(b1.x*b2.y - b1.y*b2.x);
		var yNum = (a1.x*a2.y - a1.y*a2.x)*(b1.y - b2.y) - (a1.y - a2.y)*(b1.x*b2.y - b1.y*b2.x);
		return new AM.Math.Vec2d(xNum/det,yNum/det);
	}
	return null;
};
AM.Math.Line.prototype = {
    N: null,
    A: null,

    vector2LineFromPoint: function (p) {
        var p2A = this.A.subtract(p);
        var compA = p2A.dot(this.N);
        var proj = this.N.scale(compA);
        return p2A.subtract(proj);
    }
};

AM.Math.Mat2d = function (e00, e01, e10, e11) {

    this.mat = [
        [e00, e01],
        [e10, e11]
    ];
};

AM.Math.Mat2d.prototype = {
    mat: [
        [0, 0],
        [0, 0]
    ],

    mult: function (m) {
        var e00 = this.mat[0][0] * m.mat[0][0] + this.mat[0][1] * m.mat[1][0];
        var e01 = this.mat[0][0] * m.mat[0][1] + this.mat[0][1] * m.mat[1][1];
        var e10 = this.mat[1][0] * m.mat[0][0] + this.mat[1][1] * m.mat[1][0];
        var e11 = this.mat[1][0] * m.mat[0][1] + this.mat[1][1] * m.mat[1][1];

        return new AM.Math.Mat2d(e00, e01, e10, e11);
    },
    multVec: function (v) {
        var x = this.mat[0][0] * v.x + this.mat[0][1] * v.y;
        var y = this.mat[1][0] * v.x + this.mat[1][1] * v.y;
        return new AM.Math.Vec2d(x, y);
    }
}