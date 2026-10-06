import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Practice from './components/Practice'
import Result from './components/Result'
import Footer from './components/Footer'
import './App.css'

const KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
const TOTAL_TIME = 300 // 5 minutes in seconds

// Generates a long sequence of random home-row keys, grouped into little words
function generateText() {
  const words = []

  for (let i = 0; i < 80; i++) {
    let word = ''
    for (let j = 0; j < 4; j++) {
      const randomIndex = Math.floor(Math.random() * KEYS.length)
      word = word + KEYS[randomIndex]
    }
    words.push(word)
  }

  return words.join(' ')
}

// Turns seconds into mm:ss (example: 300 -> "05:00")
function formatTime(seconds) {
  if (seconds < 0) {
    seconds = 0
  }
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const rest = (seconds % 60).toString().padStart(2, '0')
  return minutes + ':' + rest
}

// Reads the saved results from the browser (no backend needed)
function loadHistory() {
  try {
    const saved = localStorage.getItem('touchtype-history')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    // If something is broken, just start with an empty list
  }
  return []
}

function App() {
  // 'home' shows the start page, 'practice' shows the typing test
  const [page, setPage] = useState('home')
  const [text, setText] = useState(() => generateText())
  const [input, setInput] = useState('')
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState(loadHistory)

  const inputRef = useRef(null)
  const textRef = useRef(null)

  const total = correct + incorrect
  const elapsed = TOTAL_TIME - timeLeft // seconds already practiced

  // Accuracy in percent, never NaN (shows 100.0% before the first key)
  let accuracy = '100.0'
  if (total > 0) {
    accuracy = ((correct / total) * 100).toFixed(1)
  }

  // CPM = characters typed divided by the minutes already practiced
  let cpm = 0
  if (elapsed > 0) {
    cpm = Math.round((total * 60) / elapsed)
  }

  // How much of the generated text has been typed (0 - 100)
  let progress = Math.round((input.length / text.length) * 100)
  if (progress > 100) {
    progress = 100
  }

  // Timer: one interval while the session is running
  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((previous) => (previous > 0 ? previous - 1 : 0))
    }, 1000)

    return () => clearInterval(timerId)
  }, [isRunning])

  // When the 5 minutes are over, stop the session and show the result
  useEffect(() => {
    if (isRunning && timeLeft <= 0) {
      setIsRunning(false)
      setFinished(true)
    }
  }, [isRunning, timeLeft])

  // Focus the input box when a session starts or restarts
  useEffect(() => {
    if (page === 'practice' && isRunning && inputRef.current) {
      inputRef.current.focus()
    }
  }, [page, isRunning, text])

  // Keep the next character visible inside the scrolling text box
  useEffect(() => {
    if (textRef.current) {
      const current = textRef.current.querySelector('.char-current')
      if (current) {
        current.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [input, page])

  // Save the result when a session finishes
  useEffect(() => {
    if (finished && total > 0) {
      const record = {
        when: new Date().toLocaleString(),
        total: total,
        correct: correct,
        incorrect: incorrect,
        accuracy: accuracy,
      }
      setHistory((previous) => [record, ...previous].slice(0, 10))
    }
  }, [finished])

  // Keep the results saved in the browser
  useEffect(() => {
    try {
      localStorage.setItem('touchtype-history', JSON.stringify(history))
    } catch (error) {
      // Ignore storage errors (for example private browsing)
    }
  }, [history])

  function handleChange(event) {
    // Ignore typing when no session is running (start/reset/finished)
    if (!isRunning) {
      return
    }

    const value = event.target.value
    setInput(value)

    // Compare every typed character with the generated text
    let correctCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) {
        correctCount = correctCount + 1
      }
    }

    setCorrect(correctCount)
    setIncorrect(value.length - correctCount)

    // If the user caught up with the text, add more characters
    if (value.length >= text.length) {
      setText((previous) => previous + ' ' + generateText())
    }
  }

  // Starts a fresh 5-minute session with new text
  function startPractice() {
    setText(generateText())
    setInput('')
    setCorrect(0)
    setIncorrect(0)
    setTimeLeft(TOTAL_TIME)
    setFinished(false)
    setIsRunning(true)
  }

  // Ends the session early and shows the result (it gets saved)
  function finishPractice() {
    setIsRunning(false)
    setFinished(true)
  }

  // Home button: stops the current session and goes back
  function goHome() {
    setIsRunning(false)
    setFinished(false)
    setPage('home')
  }

  // Home page "Start Practice": go to the test page and start
  function startFromHome() {
    startPractice()
    setPage('practice')
  }

  // The character the user should type next
  const nextKey = text[input.length]

  return (
    <div className="app">
      <Header />

      <main className="container">
        {page === 'home' ? (
          <Home history={history} onStart={startFromHome} />
        ) : finished ? (
          <Result
            time={formatTime(elapsed)}
            total={total}
            correct={correct}
            incorrect={incorrect}
            accuracy={accuracy}
            cpm={cpm}
            onTryAgain={startPractice}
            onGoHome={goHome}
          />
        ) : (
          <Practice
            time={formatTime(timeLeft)}
            total={total}
            correct={correct}
            incorrect={incorrect}
            accuracy={accuracy}
            cpm={cpm}
            progress={progress}
            text={text}
            input={input}
            nextKey={nextKey}
            inputRef={inputRef}
            textRef={textRef}
            onInputChange={handleChange}
            onFinish={finishPractice}
            onReset={startPractice}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
