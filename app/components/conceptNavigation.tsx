import React, { useEffect } from "react";
import p5Types from "p5";
import { IPozyxData } from "~/types/IPozyxData";
import { IBall } from "~/types/IBall";

type personTrackerProps = {
  posState: any
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

export const PersonTracker: React.FC<personTrackerProps> = (props: personTrackerProps) => {
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

    p5.background("gray");


    const amountOftiles = canvasWidth / tileWidth;

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
      p5.noStroke();
      p5.fill(yellow);
      p5.ellipse(ball.x, ball.y, defaultBallSize, defaultBallSize);

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
