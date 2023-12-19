const wait: (seconds: number) => Promise<void> = (seconds: number) =>
  new Promise((res, rej) =>
    setTimeout(() => {
      res()
    }, seconds * 1000)
  )

const countDown = async (till: number) => {
  console.log()

  for (let i = 0; i < till; ++i) {
    console.log(`${i + 1}...`)

    await wait(1)
  }

  console.log()
}

export { countDown }
