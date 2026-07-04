import BedScene from './BedScene.jsx'

export default function Hero() {
  return (
    <header id="top">
      <div>
        <span className="eyebrow">Stories from the wheel · Upper Midwest</span>
        <h1>Let's <span className="red">Meat</span></h1>
        <p className="lede">
          Every Friday night across Minnesota and Wisconsin, a wheel spins, a number is called,
          and somebody walks out of a VFW hall with fourteen pounds of pork. This site is about
          that somebody — the regulars, the first-timers, the three-week streaks, and the freezers
          they fill. The raffle is the setting. The people are the story.
        </p>
        <div className="hero-ctas">
          <a className="btn" href="#winners">Read the stories</a>
          <a className="btn secondary" href="#directory">Find a raffle</a>
        </div>
      </div>
      <div className="bed-scene-wrap">
        <BedScene />
        <div className="scene-caption">Two ribeyes. One good night.</div>
        <div className="stamp-note">Well done · Would raffle again</div>
      </div>
    </header>
  )
}
