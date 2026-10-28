# Laser Pigeon artwork handoff

The game runs at **480 × 270**, using four grayscale colors: #dedede, #b3b3b3, #797979, #2f2f2f. Art and game rules are separate. No engine or build tools are needed to try replacement art: open `dist/index.html` in a browser.

## Replace pixel art with PNGs

Put transparent PNGs in `dist/assets/`. Edit `dist/overrides.js`:

```js
window.LP_ART = {
  pigeon: {
    src: 'assets/pigeon.png',
    width: 40, height: 32,
    anchorX: 20, anchorY: 16,
    frames: 2, fps: 8,
    eye: { x: 10, y: -7 }
  },
  taxi: {
    src: 'assets/taxi.png',
    width: 44, height: 32,
    anchorX: 22, anchorY: 18
  }
};
```

`width` and `height` are display pixels for one frame. `anchorX/Y` locate the object's origin within a frame. Frames are equal-size cells in one horizontal row; omit `frames/fps` for a still image. `eye` places the actual laser emitter relative to the pigeon origin. Preserve it at the robotic lens. Missing or failed images fall back to the procedural art. Image smoothing is disabled for crisp pixels. With local-only delivery, PNG file references work in the source folder; standalone HTML users can use a `data:image/png;base64,...` string as `src`.

## Sprite inventory

All origins are centered on the object except the three barrier types and scaffolding, which use the top-left corner. Canvas Y increases downward. Keep replacement silhouettes within the supplied sizes because visual changes do not silently change collisions.

| Key | Suggested frame size | Anchor (x,y) | Notes |
| --- | --- | --- | --- |
| pigeon | 40 × 32 | 20,16 | Mechanical eye at origin + (10,-7); flap animation |
| hawk | 36 × 24 | 18,12 | Broad wings |
| plane | 64 × 40 | 32,20 | Single-seat propeller plane; nose left; 10 hits |
| planeShot | 20 × 8 | 10,4 | Slow projectile moving straight left |
| duck | 52 × 64 | 26,46 | Sunglasses and parachute; origin at duck body |
| falcon | 36 × 32 | 18,16 | Diagonal dive bomber; nose lower-left |
| falconWarning | 40 × 26 | 14,13 | Brief warning at upper-right before a dive |
| overpass | 76 × 112 | 38,0 | Hangs from top edge; solid and harmless |
| cat | 48 × 32 | 24,16 | Full body, ground and pounce |
| highCat | 48 × 32 | 24,16 | Striped high-jump cat, visually distinct |
| kid | 44 × 40 | 22,20 | Gun can rotate in built-in renderer |
| paint | 8 × 8 | 4,4 | Straight projectile |
| taxi | 44 × 32 | 22,18 | Baseline 13 pixels below origin |
| motorcycle | 36 × 32 | 18,18 | Fast traffic |
| truck | 80 × 80 | 40,60 | Tall box truck; collider spans origin y−56 through y+14 |
| streetlight | 48 × 108 | 34,104 | Solid, harmless, indestructible; origin at street level |
| icicle | 20 × 32 | 10,16 | Point downward |
| can | 20 × 32 | 10,16 | Metal garbage can |
| banana | 28 × 28 | 14,14 | Indestructible peel |
| tv | 30 × 36 | 15,20 | Antenna and feet |
| flowerpot | 28 × 36 | 14,20 | Splits into three shards when shot or landing on a scaffold |
| shard | 10 × 12 | 5,6 | Falling terracotta fragment |
| drone | 44 × 20 | 22,10 | Side-to-side patrol; two hits |
| target | 20 × 20 | 10,10 | Bank shield is drawn separately |
| scaffold | variable | 0,0 | Built-in width 270, plank 10 + braces 23 high |
| wall | variable | 0,0 | Solid reflective barrier |
| mover | variable | 0,0 | Moving reflective barrier |
| crate | variable | 0,0 | Destructible barrier |

## Change vector-style pixel renderers

`dist/art.js` is the art registry: `Art.renderers.KEY(context, options)`. Drawing starts at the object's origin. No positions, health, collisions, or level rules live here. For variable-size barriers, use `options.width/height` to match collision dimensions; a custom renderer works better than a fixed-size PNG. `options.time`, `options.flap`, `options.firing`, and `options.aim` are supplied where relevant. A PNG replacement uses its own frame animation; if you need a rotating gun or special state animation, implement the renderer instead.

The background keys `skyBackground`, `peakBackground`, and `rooftopBackground` live in `art.js` alongside the sprites. Replace them with full 480 × 270 images with anchor (0,0), or edit the `city()` / `baseScene()` renderers. Preserve the raised street at y=190 and the rooftop bounds at x=20..460, y=20..250 to align with gameplay. `dist/levels.js` contains all ten rooftop layouts, timers, and star thresholds. Gray rings around targets mean a shot must have bounced at least once. Walls and moving barriers reflect lasers; crates absorb hits until destroyed. A laser stops on its fifth bounce. Scaffolding collision includes its 23-pixel braces; widths vary from 105 to 285 pixels, with left, center, and right placement. Use a variable-size renderer for scaffolding.

## Balance settings

`BALANCE`, `skyDifficulty()`, and `peakDifficulty()` near the top of `dist/game.js` hold the tuning settings. Sky Patrol is an **endless survival challenge with no point quotas or automatic finish**. The first difficulty ramp takes 90 seconds instead of 60: enemy intervals drop from 2.8 to 1.35 seconds, traffic from 4.5 to 2.85 seconds. Beyond 90 seconds, difficulty rises gently over a five-minute timescale, with safe minimum intervals so the game remains bounded during long runs. Movement and paintball pressure also increase. The raised road is `BALANCE.sky.roadY`. High scores saved using the earlier small-number point system are multiplied by 100 once; the other games retain their scores and stars.

| Enemy | Points | Laser hits |
| --- | ---: | ---: |
| Hawk / bird of prey | 100 | 2 |
| Normal cat | 200 | 3 |
| Striped high-jump cat | 300 | 4 |
| Parachuting duck | 400 | 5 |
| Kid | 500 | 6 |
| Plane | 500 | 10 |
| Falcon | 800 | 3 |

Paintballs, plane rounds, indestructible traffic, and solid obstacles award no points. Plane rounds move strictly horizontally to the left at 52 pixels/second, independent of the pigeon's position. Planes first shoot four seconds after arrival and wait 5.5 seconds between shots. Ducks drift downward at 23 pixels/second and appear only every 28 seconds. Falcons pause for a 0.8-second visible warning before diving on a fixed diagonal trajectory at 240 pixels/second.

New hazards are introduced during the run: hawks at the start, cats at 9 s, motorcycles at 12 s, streetlights at 15 s, kids and trucks at 21 s, planes at 27 s, striped cats at 30 s, ducks at 36 s, hanging overpass signs at 45 s, and falcons at 54 s. Pool eligibility is controlled by `BALANCE.sky.introduce`; individual special-hazard timers determine recurrence. Ducks and falcons have separate timers rather than the regular random enemy pool.

Streetlights arrive after fifteen seconds, then every roughly 12.5–16 seconds. Their pole, arm, and lamp use separate collision rectangles. Overpass signs hang from two top supports with a 72 × 47 panel between y=61 and y=108, requiring a route below. Both absorb lasers, cannot be destroyed, and block without damage. If pinned against the left edge, a streetlight lifts the pigeon clear and a sign nudges it down. New solid obstacles wait if another solid obstacle is still near the right edge, preventing overlapping sign/light traps.

Peak Pigeon is a climb-only challenge: reach 1,000 m, with no countdown or kill requirement. Score equals elevation, and shooting is optional. Difficulty ramps by elevation, reaching its full setting at 750 m: garbage intervals shrink from 1.65 to 0.55 seconds, fall speeds increase, and scaffold spacing shrinks from 210 to 125 pixels. Scaffolding varies in length with center sections forcing a route around either side. Early garbage is limited to cans and icicles; peels join at 120 m, shattering pots at 250 m, TVs at 300 m, and horizontally patrolling drones at 550 m. Pots release three dangerous falling shards when shot or hitting scaffolding. Drones ignore gravity, bob gently, and turn at screen edges and scaffolds.

Rooftop shot budgets for levels 1–10 are 8, 11, 14, 12, 18, 18, 22, 24, 25, and 30. Every press consumes one attempt; holding Space does not fire repeatedly. Lasers terminate on contact number five, counting both perimeter and barrier reflections. The last shot can finish traveling and win before the game declares an empty-ammo loss. Retrying restores that level's budget. Timers and best-star behavior are unchanged.

## Delivery

`Laser Pigeon.html` is the self-contained playable edition. This source folder is the editable edition. `game.js` owns mechanics, `art.js` owns sprites, `overrides.js` owns image replacements, `levels.js` owns rooftop design, and `style.css` owns the page. Scores and per-level best stars are saved in the browser when local storage is available. Pigeon facts rotate at clock-hour boundaries, rechecking every 15 seconds and when the tab becomes visible; each fact links to its source.

After editing, run `node build-standalone.cjs` from this folder to create a new standalone HTML. It embeds scripts, styles, and quoted `assets/*.png` paths in the override file. This packaging step needs Node.js; playing or editing the folder edition does not.
