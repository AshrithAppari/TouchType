// The result screen shown when a session ends
function Result({
  time,
  total,
  correct,
  incorrect,
  accuracy,
  cpm,
  onTryAgain,
  onGoHome,
}) {
  let message = `You typed ${total} characters`

  if (total === 0) {
    message = 'No keys typed this time. Press Try Again to try.'
  }

  return (
    <section className="result">
      <div className="card result-card">
        <h2 className="result-title">Practice Finished</h2>

        {/* Accuracy is the main element of this screen */}
        <div className="result-accuracy">
          <div className="result-percent">{accuracy}%</div>
          <div className="result-accuracy-label">Accuracy</div>
        </div>

        <p className="result-message">{message}</p>

        <div className="result-stats">
          <div className="result-row">
            <span>Correct</span>
            <span>{correct}</span>
          </div>
          <div className="result-row">
            <span>Incorrect</span>
            <span>{incorrect}</span>
          </div>
          <div className="result-row">
            <span>Speed</span>
            <span>{cpm} CPM</span>
          </div>
          <div className="result-row">
            <span>Time</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="result-buttons">
          <button className="btn btn-primary" onClick={onTryAgain}>
            Try Again
          </button>
          <button className="btn btn-secondary" onClick={onGoHome}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  )
}

export default Result
