import Stats from './Stats'
import TypingArea from './TypingArea'
import Keyboard from './Keyboard'
import FingerGuide from './FingerGuide'

// The practice screen: statistics strip, typing section,
// then keyboard + finger guide in one card
function Practice(props) {
  const {
    time,
    total,
    correct,
    incorrect,
    accuracy,
    cpm,
    progress,
    text,
    input,
    nextKey,
    inputRef,
    textRef,
    onInputChange,
    onReset,
    onFinish,
  } = props

  return (
    <section className="practice">
      {/* One horizontal statistics strip */}
      <Stats
        time={time}
        total={total}
        correct={correct}
        incorrect={incorrect}
        accuracy={accuracy}
        cpm={cpm}
      />

      {/* Typing area with progress, input and buttons */}
      <TypingArea
        text={text}
        input={input}
        progress={progress}
        inputRef={inputRef}
        textRef={textRef}
        onChange={onInputChange}
        onReset={onReset}
        onFinish={onFinish}
      />

      {/* Keyboard + finger guide */}
      <div className="card keyboard-card">
        <Keyboard nextKey={nextKey} />
        <div className="card-divider"></div>
        <FingerGuide nextKey={nextKey} />
      </div>
    </section>
  )
}

export default Practice
