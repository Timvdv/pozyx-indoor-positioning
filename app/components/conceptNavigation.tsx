import React, { useEffect } from "react";
import p5Types from "p5";
import { IPozyxData } from "~/types/IPozyxData";
import { IBall } from "~/types/IBall";

type personTrackerProps = {
  posState: any
}

type gridPixel = {
  id: string
  x: number
  y: number
  width: number
}

const defaultBallSize = 50;
const maxBallSize = 500;
const tileWidth = 10;

const createBall: () => IBall = () => ({
  x: 0,
  y: 0,
  z: 0,
  width: defaultBallSize,
  height: defaultBallSize
})

export const ConceptNavigation: React.FC<personTrackerProps> = (props: personTrackerProps) => {
  const Sketch = require("react-p5");

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  let posState = props.posState;

  const balls: IBall[] = [];

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    let yellow = p5.color(255, 204, 0);
    let white = p5.color(255, 255, 255);
    let black = p5.color(0, 0, 0);

    p5.background("gray");

    const gridSize = 200;

    p5.background(220);
    p5.noFill();

    const grid: gridPixel[]  = [];

    for (var x = 0; x < canvasWidth - 1; x += gridSize) {
      for (var y = 0; y < canvasWidth - 1; y += gridSize) {
        grid.push({
          id: `${x}${y}`,
          x: x,
          y: y,
          width: gridSize,
        })
      }
    }

    posState.forEach((position: IPozyxData) => {
      if(!position.data) {
        return;
      }

      const ball = createBall();

      ball.x = position.data.coordinates.x;
      ball.y = position.data.coordinates.y;
      ball.z = position.data.coordinates.z;

      balls.push(ball);
    });

    balls.forEach( (ball) => {
      const centerPosX = canvasWidth / 2 + ball.x / 10;
      const centerPosY = canvasHeight / 2 + ball.y / 10;

      grid.forEach((pixel: gridPixel) => {

        if(
          centerPosX > pixel.x &&
          centerPosX < pixel.x + pixel.width &&
          centerPosY > pixel.y && centerPosY < pixel.y + pixel.width) {

          console.log("IM JHRERE");
          p5.fill(black);
        } else {

          console.log("nope");
          p5.fill(white);
        }

        p5.rect(pixel.x, pixel.y, pixel.width, pixel.width);
      })

      p5.fill(yellow);
      p5.ellipse(centerPosX, centerPosY, defaultBallSize, defaultBallSize);

      ball.width++;
      ball.height++;

      if(ball.width > maxBallSize) {
        ball.width = defaultBallSize
        ball.height = defaultBallSize
      }
    })
  };

  return <Sketch setup={setup} draw={draw} />;
};
