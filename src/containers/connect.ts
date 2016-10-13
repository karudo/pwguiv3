import * as React from 'react';

//return React.createElement('div', {}, 'text222' as React.ReactNode);


/*
export function connect<P, S>(props?: any) {
  function wrapWithConnect(WrappedComponent: React.Component<P, S>): React.Component<P, S> {
    class Connector extends React.Component<P, S> {
      render() {
      }
    }

    return Connector;
  }

  return wrapWithConnect;
}
*/


function zzzzz<Z, X>(z: Z, x: X): Z & X {
  return {} as Z & X;
}

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square:Square = {
  color: "blue",
  sideLength: 1,
  penWidth: 77
};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
