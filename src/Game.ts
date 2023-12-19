import { questionPath } from "./config"
import { countDown } from "./utils"
import { readFile } from "fs/promises"
import { createInterface } from "readline/promises"

interface Questions {
  categories: {
    name: string
    questions: { question: string; answer: string }[]
  }[]
}

class Game {
  static readQuestions = async () => {
    const txt = await readFile(questionPath, "utf-8")

    const jsonObject: Questions = JSON.parse(txt)

    return jsonObject
  }

  private questions: Questions
  private score: number = 0
  constructor(questions: Questions) {
    this.questions = questions
  }

  private askInput = async (question: string) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout })

    const a = await rl.question(question)

    rl.close()

    return a
  }

  public startGame = async () => {
    console.log("Game is starting")

    await countDown(3)

    while (true) {
      //check if question exists
      let qExists = false

      for (let i = 0; i < this.questions.categories.length; ++i) {
        if (this.questions.categories[i].questions.length > 0) {
          qExists = true
          break
        }
      }

      if (!qExists) {
        console.log("No question")
        break
      }
      ///

      //select category
      console.log("Choose category")
      for (let i = 0; i < this.questions.categories.length; ++i) {
        console.log(`${i + 1}. ${this.questions.categories[i].name}`)
      }

      const c = Number(await this.askInput(""))

      if (!c) throw new Error("Not valid")

      console.log()

      console.log(`You chose ${this.questions.categories[c - 1].name}`)
      console.log()

      console.log(
        `Question: ${this.questions.categories[c - 1].questions[0].question}`
      )

      const answer = await this.askInput("")

      if (
        answer.toLowerCase() ===
        this.questions.categories[c - 1].questions[0].answer.toLowerCase()
      ) {
        this.score += 1
        console.log("That's write\n")
      } else {
        console.log("That's wrong\n")
        break
      }

      // if true delete
      this.questions.categories[c - 1].questions.splice(0, 1)
    }

    console.log("Game over")

    console.log(`Your score : ${this.score}`)
  }
}

export { Game }
