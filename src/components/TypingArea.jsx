// The typing section: heading, progress, generated text, input and buttons
function TypingArea({
  text,
  input,
  progress,
  inputRef,
  textRef,
  onChange,
  onReset,
  onFinish,
}) {
  // Class for each character of the generated text
  function getCharClass(index) {
    if (index === input.length) {
      return 'char char-current'
    }
    if (index < input.length) {
      if (input[index] === text[index]) {
        return 'char char-correct'
      }
      return 'char char-wrong'
    }
    return 'char'
  }

  return (
    <section className="card typing-section">
      <div className="typing-head">
        <h2 className="section-title">Type the following</h2>

        <div className="progress">
          <div className="progress-labels">
            <span>Practice progress</span>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: progress + '%' }} />
          </div>
        </div>
      </div>

      <div className="text-display" ref={textRef}>
        {text.split('').map((char, index) => (
          <span key={index} className={getCharClass(index)}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        className="typing-input"
        type="text"
        placeholder="Type here..."
        value={input}
        onChange={onChange}
      />

      <div className="typing-actions">
        <button className="btn btn-secondary" onClick={onReset}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={onFinish}>
          Finish
        </button>
      </div>
    </section>
  )
}

export default TypingArea
