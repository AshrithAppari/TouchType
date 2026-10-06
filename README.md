# TouchType – Typing Practice

A simple touch typing practice app built with **React + JavaScript + CSS3**.

Practice the 8 home-row keys: **A S D F J K L ;**

## What it does

- Home page with a Start button, a preview of the 8 keys and your recent tests (saved in the browser)
- Generates a long random sequence of home-row keys
- Highlights the next character you need to type (the text box scrolls by itself)
- Shows a visual keyboard and a finger guide with the next key highlighted
- Compact "Next key" indicator with the finger to use
- 5-minute countdown timer
- Live statistics strip: time, characters, correct, incorrect, accuracy, CPM
- Thin progress bar next to the typing text
- Result screen when the time is up (or when you click Finish)

## How to run

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Project structure

```text
src/
  main.jsx              -> renders the app
  App.jsx               -> pages, typing logic, timer, history
  index.css             -> global styles
  App.css               -> styles for the app
  components/
    Header.jsx          -> centered title + tagline
    Home.jsx            -> landing section + recent tests table
    Practice.jsx        -> practice screen layout
    TypingArea.jsx      -> typing text, progress, input, buttons
    Keyboard.jsx        -> next-key indicator + the 8-key keyboard
    FingerGuide.jsx     -> compact finger guide (two rows)
    Stats.jsx           -> horizontal statistics strip
    Result.jsx          -> result screen after a session
    Footer.jsx          -> small footer line
```
