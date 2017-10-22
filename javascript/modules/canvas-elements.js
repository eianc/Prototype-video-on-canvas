import * as PIXI from 'pixi.js';

export function createRect(nameRect, colorFill, x, y, w, h, opacity) {
	
	nameRect = new PIXI.Graphics();
	nameRect.beginFill(`0x${colorFill}`);
	nameRect.drawRect(0,0,w,h);
	nameRect.endFill();
	nameRect.position.set(x,y);
	nameRect.alpha = opacity;

	return nameRect;
}

export function createText(nameText, text, fontSize, colorFill, x, y) {
	
	nameText = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: fontSize, fill : `0x${colorFill}`, align : 'center'});
	nameText.x = x;
	nameText.y = y;

	return nameText;
}