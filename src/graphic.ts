import { Facing } from './entity';
import { V2 } from './maths';

export class Graphic {
  width: number = 32;
  height: number = 32;

  constructor(public file: string, public x: number, public y: number) {
  }

  draw(ctx: CanvasRenderingContext2D, pos: V2, dim: V2, facing: Facing) {
    // TODO: Debug draw for now
    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, dim[0] / 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    if (facing === Facing.Left) {
      ctx.fillRect(-(5 * dim[0] / 8), -dim[0] / 4, dim[0] / 8, dim[0] / 2);
    } else {
      ctx.fillRect(dim[0] / 2, -dim[0] / 4, dim[0] / 8, dim[0] / 2);
    }
    ctx.restore();
  }
}
