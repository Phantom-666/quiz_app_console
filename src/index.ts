import { Game } from "./Game"

const run = async () => {
  const q = await Game.readQuestions()

  const g = new Game(q)

  await g.startGame()
}

run()
