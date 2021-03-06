import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IClaim {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export default class Solver3 extends BaseSolver<IClaim[]> {
  protected filePath: string = '3.txt';

  protected solvePart1(input: IClaim[]): number {
    const fabric = new Map<string, number>();
    input.forEach(claim => {
      for (let i = 0; i < claim.width; i++) {
        for (let j = 0; j < claim.height; j++) {
          const key = `${i + claim.left}_${j + claim.top}`;
          fabric.set(key, (fabric.get(key) || 0) + 1);
        }
      }
    });

    return Array.from(fabric.values()).filter(c => c > 1).length;
  }

  protected solvePart2(input: IClaim[]): number {
    const fabric = new Map<string, { count: number; ids: number[] }>();
    input.forEach(claim => {
      for (let i = 0; i < claim.width; i++) {
        for (let j = 0; j < claim.height; j++) {
          const key = `${i + claim.left}_${j + claim.top}`;
          const existingValue = fabric.get(key);
          const value = {
            count: existingValue ? existingValue.count + 1 : 1,
            ids: existingValue ? [...existingValue.ids, claim.id] : [claim.id],
          };

          fabric.set(key, value);
        }
      }
    });

    const overlapingMap = new Map<number, number>();
    fabric.forEach(square => {
      square.ids.forEach(id => {
        const current = overlapingMap.get(id);
        overlapingMap.set(id, Math.max(square.ids.length, current ? current : 1));
      });
    });

    let resultId = 0;
    Array.from(overlapingMap.keys()).forEach(id => {
      if (overlapingMap.get(id) === 1) {
        resultId = id;
      }
    });

    return resultId;
  }

  protected parseInput(textInput: string): IClaim[] {
    return textInput
      .split(EOL)
      .map(lineText =>
        lineText
          .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)!
          .slice(1)
          .map(parseInt)
      )
      .map(([id, left, top, width, height]) => ({
        height,
        id,
        left,
        top,
        width,
      }));
  }
}
