import run from "aocrunner";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split('\n');
  return lines;
};

enum Opponent {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum Player {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

enum Move {
  Rock,
  Paper,
  Scissors,
}

const getMoves = (opponent: Opponent, player: Player): Move[] => {
  let opponentMove: Move;
  let playerMove: Move;

  switch(opponent) {
    case Opponent.Rock: {
      opponentMove = Move.Rock;
      break;
    }
    case Opponent.Paper: {
      opponentMove = Move.Paper;
      break;
    }
    default: {
      opponentMove = Move.Scissors;
      break;
    }
  }
  switch(player) {
    case Player.Rock: {
      playerMove = Move.Rock;
      break;
    }
    case Player.Paper: {
      playerMove = Move.Paper;
      break;
    }
    default: {
      playerMove = Move.Scissors;
    }
  }

  return [opponentMove, playerMove];
};

const getMovePoints = (move: Move): number => {
  switch(move) {
    case Move.Rock: {
      return 1;
    }
    case Move.Paper: {
      return 2;
    }
    default: {
      return 3;
    }
  }
};

const getResultsPoints = (opponent: Move, player: Move): number => {
    if (opponent === player) {
        return 3;
    } else if (player === Move.Rock && opponent === Move.Scissors) {
        return 6;
    } else if (player === Move.Paper && opponent === Move.Rock) {
        return 6;
    } else if (player === Move.Scissors && opponent === Move.Paper) {
        return 6;
    } else {
        return 0;
    }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const score = input.reduce((acc: number, rawMoves: string): number => {
    const [opponentRound, playerRound] = rawMoves.split(' ');

    const opponentMove = opponentRound as Opponent;
    const playerMove = playerRound as Player;
    const moves = getMoves(opponentMove, playerMove);
    const [opponent, player] = moves;

    const movePoints = getMovePoints(player);
    const resultsPoints = getResultsPoints(opponent, player);

    return acc + movePoints + resultsPoints;
  }, 0);

  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
