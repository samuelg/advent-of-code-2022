import run from "aocrunner";

const parseInput = (rawInput: string): string[] => {
  const lines = rawInput.split("\n");
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

enum Strategy {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

enum Move {
  Rock,
  Paper,
  Scissors,
}

const getOpponentMove = (opponent: Opponent): Move => {
  let opponentMove: Move;

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

  return opponentMove;
};

const getPlayerMove = (player: Player): Move => {
  let playerMove: Move;

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

  return playerMove;
};

const getPlayerMoveFromStrategy = (playerStrategy: Strategy, opponentMove: Move): Move => {
  if (playerStrategy === Strategy.Draw) {
    return opponentMove;
  } else if (playerStrategy === Strategy.Win) {
    switch (opponentMove) {
      case (Move.Rock): {
        return Move.Paper;
      }
      case (Move.Paper): {
        return Move.Scissors;
      }
      default: {
        return Move.Rock;
      }
    }
  } else {
    switch (opponentMove) {
      case (Move.Rock): {
        return Move.Scissors;
      }
      case (Move.Paper): {
        return Move.Rock;
      }
      default: {
        return Move.Paper;
      }
    }
  }
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

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const score = input.reduce((acc: number, rawMoves: string): number => {
    const [opponentRound, playerRound] = rawMoves.split(" ");

    const opponentMove = opponentRound as Opponent;
    const playerMove = playerRound as Player;
    const opponent = getOpponentMove(opponentMove);
    const player = getPlayerMove(playerMove);

    const movePoints = getMovePoints(player);
    const resultsPoints = getResultsPoints(opponent, player);

    return acc + movePoints + resultsPoints;
  }, 0);

  return score;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const score = input.reduce((acc: number, rawStrategy: string): number => {
    const [opponentRound, playerRound] = rawStrategy.split(" ");

    const opponentMove = opponentRound as Opponent;
    const playerStrategy = playerRound as Strategy;
    const opponent = getOpponentMove(opponentMove);
    const player = getPlayerMoveFromStrategy(playerStrategy, opponent);

    const movePoints = getMovePoints(player);
    const resultsPoints = getResultsPoints(opponent, player);

    return acc + movePoints + resultsPoints;
  }, 0);

  return score;
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
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
