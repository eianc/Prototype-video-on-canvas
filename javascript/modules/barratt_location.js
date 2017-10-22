import * as PIXI from 'pixi.js';
import {createRect, createText} from 'modules/canvas-elements';
import {TweenLite, TweenMax, TimelineMax} from 'gsap';

let rectHeadline;
let headline;
let rectItem1;
let rectItem2;
let rectItem3;
let item1;
let item2;
let item3;

export function locationEl(internalStage) {

	rectHeadline = createRect(rectHeadline, 'ce3017', -640, 260, 300, 40, 0.5);
	headline = createText(headline, 'A fantastic location', 24, 'ffffff', -640, 265);

	rectItem1 = createRect(rectItem1, 'ce3017', -640, 320, 640, 40, 0.7);
	rectItem2 = createRect(rectItem2, 'ce3017', -640, 320, 640, 40, 0.7);
	rectItem3 = createRect(rectItem3, 'ce3017', -640, 320, 640, 40, 0.7);

	item1 = createText(item1, '○ Village setting yet close to Maidstone town', 20, 'ffffff', -640, 327);
	item2 = createText(item2, '○ Good primary and secondary schools close by', 20, 'ffffff', -640, 327);
	item3 = createText(item3, '○ Lively Ashford approx 20 mins drive', 20, 'ffffff', -640, 327);

	internalStage.addChild(rectHeadline);
	internalStage.addChild(headline);
	internalStage.addChild(rectItem1);
	internalStage.addChild(item1);
	internalStage.addChild(rectItem2);
	internalStage.addChild(item2);
	internalStage.addChild(rectItem3);
	internalStage.addChild(item3);
}

export function stateInLocation() {
	TweenMax.to(rectHeadline, 0.7, {alpha: 0.8, x: 0});
	TweenMax.to(headline, 0.7, {x: 20});

	TweenMax.to(rectItem1, 0.5, {delay: 1.5, alpha: 0.8, x: 0, onComplete: rectItemOut, onCompleteParams: [rectItem1]});
	TweenMax.to(item1, 0.5, {delay: 1.5, x: 20, onComplete: itemOut, onCompleteParams: [item1]});

	TweenMax.to(rectItem2, 0.5, {delay: 7.5, alpha: 0.8, x: 0, onComplete: rectItemOut, onCompleteParams: [rectItem2]});
	TweenMax.to(item2, 0.5, {delay: 7.5, x: 20, onComplete: itemOut, onCompleteParams: [item2]});

	TweenMax.to(rectItem3, 0.5, {delay: 13.5, alpha: 0.8, x: 0});
	TweenMax.to(item3, 0.5, {delay: 13.5, x: 20, onComplete: stateOutLocation, onCompleteParams: [rectHeadline, headline, rectItem3, item3]});
}

function rectItemOut(rectItem) {
	TweenMax.to(rectItem, 0.5, {delay: 2, x: 640});
}

function itemOut(item) {
	TweenMax.to(item, 0.5, {delay: 2, x: 640});
}

function rectItemOutDelayed(rectItem) {
	TweenMax.to(rectItem, 0.5, {delay: 2.5, x: 640});
}

function itemOutDelayed(item) {
	TweenMax.to(item, 0.5, {delay: 2.5, x: 640});
}

function stateOutLocation(titleContainer, title, subtitleContainer, subtitle) {
	rectItemOut(subtitleContainer);
	itemOut(subtitle);
	rectItemOutDelayed(titleContainer);
	itemOutDelayed(title);
}
