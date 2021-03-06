import BaseSolver from './BaseSolver';
import LinkedList from './LinkedList';

interface ILinkedListNode {
  value: number;
  prev: ILinkedListNode;
  next: ILinkedListNode;
}

export default class Solver9 extends BaseSolver<{ playersCount: number; marblesCount: number }> {
  protected filePath: string = '9.txt';

  protected solvePart1({ playersCount, marblesCount }: { playersCount: number; marblesCount: number }): number {
    const scores = new Map<number, number>();
    let currentMarble = new LinkedList();

    let m = 1;
    let p = 0;
    while (m <= marblesCount) {
      if (m % 23 === 0) {
        let playerScore = scores.get(p) || 0;
        playerScore += m;
        currentMarble = currentMarble.moveBack(7);
        playerScore += currentMarble.value;
        currentMarble = currentMarble.removeCurrent();
        scores.set(p, playerScore);
      } else {
        currentMarble = currentMarble.addAfter(m, 1);
      }

      m++;
      p++;
      p %= playersCount;
    }

    return Math.max(...Array.from(scores.values()));
  }

  protected solvePart2({ playersCount, marblesCount }: { playersCount: number; marblesCount: number }): number {
    return this.solvePart1({ playersCount, marblesCount: marblesCount * 100 });
  }

  protected parseInput(textInput: string): { playersCount: number; marblesCount: number } {
    const [playersCount, marblesCount] = textInput
      .match(/(\d+) players; last marble is worth (\d+) points/)!
      .slice(1)
      .map(parseInt);
    return {
      marblesCount,
      playersCount,
    };
  }
}
