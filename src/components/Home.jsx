// Landing section: intro + Start Practice on the left, key preview on the right
function Home({ history, onStart }) {
  return (
    <section className="home">
      <div className="home-hero">
        <div className="home-intro">
          <p className="home-eyebrow">TOUCHTYPE</p>
          <h2 className="home-heading">
            Build your typing speed one key at a time.
          </h2>

          <button className="btn btn-primary" onClick={onStart}>
            Start Practice
          </button>

          <ul className="home-features">
            <li>5 minute practice session</li>
            <li>Accuracy tracking</li>
            <li>Live keyboard guidance</li>
          </ul>
        </div>

        <div className="home-keys-panel">
          <p className="home-keys-label">Practice:</p>
          <div className="home-key-groups">
            <div className="home-key-group">
              {['A', 'S', 'D', 'F'].map((key) => (
                <span className="key" key={key}>
                  {key}
                </span>
              ))}
            </div>
            <div className="home-key-group">
              {['J', 'K', 'L', ';'].map((key) => (
                <span className="key" key={key}>
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Previous results saved in this browser (only when there are some) */}
      {history.length > 0 && (
        <div className="history">
          <h3>Recent tests</h3>

          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Keys</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.when}</td>
                  <td>{item.total}</td>
                  <td>{item.correct}</td>
                  <td>{item.incorrect}</td>
                  <td>{item.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Home
