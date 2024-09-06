"use strict";
module.exports = class BadgeGenerator {
  constructor(win, opts = {}) {
    const defaultStyle = {
      fontColor: "white",
      font: "24px arial",
      color: "red",
      fit: true,
      decimals: 0,
      radius: 8,
      borderWidth: 0,
      borderColor: "transparent",
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "transparent",
    };
    this.win = win;
    this.style = Object.assign(defaultStyle, opts);
  }

  generate(number) {
    const opts = JSON.stringify({
      ...this.style,
      fit: this.style.fit || number > 99,
    });
    return this.win.webContents.executeJavaScript(
      `window.drawBadge = function ${this.drawBadge}; window.drawBadge(${number}, ${opts});`
    );
  }

  drawBadge(number, style) {
    var radius = style.radius;
    var img = document.createElement("canvas");
    img.width = Math.ceil(
      radius * 2 + style.borderWidth + style.shadowOffsetX + style.shadowBlur
    );
    img.height = Math.ceil(
      radius * 2 + style.borderWidth + style.shadowOffsetY + style.shadowBlur
    );
    img.ctx = img.getContext("2d");
    img.radius = radius;
    img.number = number;
    img.displayStyle = style;

    style.color = style.color ?? "red";
    style.font = style.font ?? "18px arial";
    style.fontColor = style.fontColor ?? "white";
    style.fit = style.fit ?? true;
    style.decimals =
      style.decimals === undefined || isNaN(style.decimals)
        ? 0
        : style.decimals;

    img.draw = function () {
      var fontScale, fontWidth, fontSize, number;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = this.displayStyle.color;
      this.ctx.lineWidth = this.displayStyle.borderWidth;
      this.ctx.strokeStyle = this.displayStyle.borderColor;
      this.ctx.shadowColor = this.displayStyle.shadowColor;
      this.ctx.shadowBlur = this.displayStyle.shadowBlur;
      this.ctx.shadowOffsetX = this.displayStyle.shadowOffsetX;
      this.ctx.shadowOffsetY = this.displayStyle.shadowoffsetY;
      this.ctx.beginPath();
      this.ctx.arc(
        radius + this.displayStyle.borderWidth / 2,
        radius + this.displayStyle.borderWidth / 2,
        radius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.font = this.displayStyle.font;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = this.displayStyle.fontColor;
      number = this.number.toFixed(this.displayStyle.decimals);
      fontSize = Number(/[0-9\.]+/.exec(this.ctx.font)[0]);
      if (!this.displayStyle.fit || isNaN(fontSize)) {
        this.ctx.fillText(
          number,
          radius + this.displayStyle.borderWidth / 2,
          radius + this.displayStyle.borderWidth / 2
        );
      } else {
        fontWidth = this.ctx.measureText(number).width;
        fontScale =
          (Math.cos(Math.atan(fontSize / fontWidth)) * this.radius * 2) /
          fontWidth;
        this.ctx.setTransform(
          fontScale,
          0,
          0,
          fontScale,
          this.radius,
          this.radius
        );
        this.ctx.fillText(number, 0, 0);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      return this;
    };

    img.draw();
    return img.toDataURL();
  }
};
