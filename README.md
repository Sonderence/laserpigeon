# Laser Pigeon

**Pigeons deserve lasers.**

A tiny grayscale browser arcade starring a pigeon with a robot eye and questionable respect for traffic. Fly through an increasingly chaotic city, dodge its residents, and turn your laser into a personal best.

**Sky Patrol is the main playable game.** Peak Pigeon and Rooftop Ricochet are playable **works in progress**: expect rough edges, placeholder art, and changing rules and balance.

| Game | Status | The idea |
| --- | --- | --- |
| **Sky Patrol** | Playable prototype · primary focus | An endless side-scrolling survival shooter |
| Peak Pigeon | **Work in progress** | Fly up through an icy city to reach 1,000 m |
| Rooftop Ricochet | **Work in progress** | Clear ten timed laser-bouncing challenges |

## The arcade page

The main page puts the game inside a pocket-console frame, with chunky grayscale pixel art, a flight clock, hearts, and your score visible around the screen. Start with Sky Patrol or use the three game cards to switch modes. Peak Pigeon and Rooftop Ricochet are clearly marked **Work in Progress**.

The controls sit below the console, with on-screen movement and fire buttons on narrow touch screens. Sound effects are optional, personal bests stay in your browser, and **The Hourly Coo** beneath the game serves up a different pigeon fact each hour. Everything needed to play is bundled locally.

## Play locally in a minute

You do **not** need hosting, an account, Node.js, or an installation to play.

1. On [this repository](https://github.com/Sonderence/laserpigeon), choose **Code → Download ZIP**.
2. Extract the ZIP into a folder. Do not play from inside the ZIP viewer.
3. Open **`Laser Pigeon.html`** in a modern browser.
4. Click **Start Flight**, then move and hold **Space** to fire.

The single HTML file includes the game code, styles, and built-in artwork. You can keep it on your computer and play offline. The editable version is also available at [`dist/index.html`](dist/index.html); keep its neighboring files together.

Prefer Git? Clone the repository, then open `Laser Pigeon.html`:

```sh
git clone https://github.com/Sonderence/laserpigeon.git
cd laserpigeon
```

## Sky Patrol

### Your mission: keep flying

You start with **three hearts**. Survive the traffic, pouncing cats, armed kids, and increasingly crowded airspace for as long as you can. There is **no finish line, countdown, or minimum score requirement**. A run ends when you lose your last heart.

Your laser shoots horizontally to the right from the robotic eye. Destroy enemies to earn points. Tougher enemies need multiple hits; the little bars above them show their remaining health. Hits that do not finish an enemy do not award points.

The clock shows how long you have been flying. Difficulty builds over the first **90 seconds**, then keeps increasing gently during longer runs. New hazards join in stages so the opening gives you room to get your wings under you.

### Controls

| Input | Action |
| --- | --- |
| Arrow keys or **W A S D** | Fly up, left, down, and right |
| Hold **Space** | Keep firing the eye laser |
| **P** | Pause or resume |
| **Enter** | Start or retry when the game canvas has focus; resume from pause |
| **↻** button below the screen | Restart the current game |
| **Sound Off / On** button | Toggle sound effects; sound starts off |

Click inside the game if the keys are not responding. Leaving the window or hiding the tab automatically pauses play. On narrow touch screens, use the directional buttons and hold **Fire**.

### Know your neighbors

| Enemy | Points | Hits to defeat | What to watch for |
| --- | ---: | ---: | --- |
| Hawk | 100 | 2 | Drifts across the flight path |
| Normal cat | 200 | 3 | Starts on the street and pounces upward |
| Striped cat | 300 | 4 | Pounces higher than the normal cat |
| Duck with sunglasses | 400 | 5 | A rare, slowly descending parachutist |
| Kid | 500 | 6 | Fires paintballs along a straight line aimed at your position when fired |
| Single-seat propeller plane | 500 | 10 | Crosses the top lane and occasionally fires very slow horizontal shots to the left |
| Falcon | 800 | 3 | Gives a brief upper-right warning, then dives quickly down and left |

Destroying paintballs or plane rounds clears danger but awards no points.

### The city is an obstacle course

- **Taxis** are ordinary traffic. **Motorcycles** move faster. **Trucks** are long and tall. Contact hurts, and lasers cannot destroy them.
- **Streetlights** rise from the road and force a route above the lamp. They are solid and indestructible, but touching one does not cost a heart.
- **Overpass signs** hang from the top and force a route underneath. They also block movement and lasers without causing damage.
- Solid scenery can push you aside as it scrolls. If it pins you against the left edge, it nudges you clear rather than crushing you.

Stay mobile: the top lane eventually gets planes, hanging signs, and diving falcons, while the bottom has traffic and pouncing cats. Watch for the falcon warning and move across lanes rather than settling into one safe-looking corner. Holding fire helps against a durable enemy, but dodging is always an option.

Hawks start the flight. Cats arrive around 9 seconds, kids around 21, planes around 27, striped cats around 30, ducks around 36, signs around 45, and falcons around 54. Traffic and streetlights join along the way. Ducks remain rare rather than filling the regular enemy pool.

### Personal bests and pigeon trivia

The game saves your personal best in your browser when local storage is available. There is no online leaderboard or account, and scores do not sync between devices. Private browsing, browser settings, moving the file, or switching between a file and a local server can affect whether an old best is available.

Below the game, **The Hourly Coo** rotates pigeon facts each clock hour. Facts are bundled with the game; the source links open external reference pages when you have an internet connection.

## Other games — works in progress

### Peak Pigeon · WIP

Fly up to **1,000 m**, weaving around scaffolding of different lengths, including sections in the middle of the flight path. There is no time limit or kill requirement; shooting is optional. Use arrows / WASD to move and hold Space to fire upward. Watch for icicles, bouncing cans, indestructible banana peels, televisions, shattering flowerpots, and patrolling drones as elevation increases. This mode is still being designed and balanced.

### Rooftop Ricochet · WIP

Ten experimental levels challenge you to clear every target before the timer or shot budget runs out. **Left / Right** or **A / D** aim, **Shift** gives finer aim, and each **Space press** fires one shot. Ringed targets require a bank shot. Walls reflect lasers, crates break, and some barriers move. Lasers stop on their **fifth bounce**. Faster clears earn one to three stars; your best stars are saved locally. Layouts and balance are still in progress.

## Editing and development

The game uses plain HTML, CSS, and JavaScript with a Canvas renderer. There are no runtime packages to install.

### Optional local server

If you have Node.js 18 or newer, run this from the repository folder:

```sh
npm start
```

Then open **http://127.0.0.1:4173**. This serves the editable `dist/` version on your own computer. It does not publish the game or enable GitHub Pages. Stop the server with **Ctrl+C**. No `npm install` step is needed.

### Make a new single-file edition

After editing the source, rebuild the root HTML file:

```sh
npm run build
```

This updates `Laser Pigeon.html` with the current source and supported PNG sprite overrides. Commit both the edited source and the rebuilt HTML so download-and-play users receive your changes.

### Project map

```text
Laser Pigeon.html       Download-and-play, self-contained edition
dist/index.html        Editable page and game selector
dist/game.js           Game rules, controls, scoring, and difficulty
dist/art.js            Pixel-art renderers and backgrounds
dist/overrides.js      Artist-supplied PNG sprite replacements
dist/levels.js         Rooftop Ricochet layouts and star thresholds
dist/style.css         Page styling
dist/assets/           Replacement artwork
ARTIST-GUIDE.md         Sprite sizes, origins, and tuning notes
build-standalone.cjs    Single-file builder
scripts/serve.cjs       Optional local server
tests/game-smoke.cjs    Automated gameplay and packaging checks
```

For artwork replacement, start with the [artist guide](ARTIST-GUIDE.md). For gameplay tuning, look for `BALANCE`, `skyDifficulty()`, and `peakDifficulty()` in `dist/game.js`. Artwork can be replaced separately from hit counts and collision rules.

Run the automated checks with:

```sh
npm test
```

These check game rules and a long simulated Sky Patrol run; they do not replace browser playtesting. When reporting a bug, include the game mode, browser, what you were doing, and whether you opened the HTML directly or used the local server.

