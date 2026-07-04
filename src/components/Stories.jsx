const placeholders = [
  { haul: '11 lbs · assorted pork', who: '"Deb from Anoka" · won 3 weeks running', quote: 'The chest freezer was a gift from my son. Now it\'s a responsibility.' },
  { haul: 'Two ribeyes + bacon bundle', who: 'First-time winner · Duluth', quote: 'I only came for the pull tabs. Left with dinner for a week and a new Friday routine.' },
  { haul: 'Whole turkey (Thanksgiving special)', who: 'Retired plow driver · Chippewa Falls', quote: "You don't buy the turkey. You earn the turkey." },
  { haul: 'Nothing yet · 6 years of Fridays', who: '"The Unluckiest Man in Stearns County"', quote: 'Never won a single spin. Wouldn\'t miss a week. It was never about the meat.' },
  { haul: 'Brat 10-pack · donated it back', who: "Caller's wife · Eau Claire", quote: "You can't win when your husband runs the wheel. Bad optics. I re-raffled it on the spot." },
  { haul: 'Holiday ham · first Christmas alone', who: 'Widower · Grand Rapids', quote: "The whole bar cheered when my number came up. Ate that ham for a week and didn't feel alone once." },
]

export default function Stories() {
  return (
    <section id="winners">
      <div className="sec-head">
        <span className="eyebrow">Chapter one · The heart of the site</span>
        <h2>Faces of the Freezer</h2>
        <p>Behind every bacon bundle is a person, a barstool, and a reason they keep coming back. These are the regulars, the lucky first-timers, and the legends of the wheel — told in their own words. (Placeholder profiles below — the live version features real submitted stories and photos.)</p>
      </div>
      <div className="winners">
        {placeholders.map(s => (
          <div className="winner-card" key={s.who}>
            <div className="haul">{s.haul}</div>
            <div className="who">{s.who}</div>
            <blockquote>"{s.quote}"</blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}
