const chapters = [
  { year: '1800s', title: 'Pub roots abroad', body: "Meat tray raffles emerge in British and Australian pubs as working-class fundraisers — a butcher's tray, a book of tickets, a Friday crowd. The formula barely changes for a century." },
  { year: 'Mid-1900s', title: 'Crossing the Atlantic', body: 'The tradition takes hold in immigrant-heavy tavern towns of the Midwest, where fraternal halls — VFWs, American Legions, Eagles clubs — need steady fundraisers and bars need a Friday draw.' },
  { year: '1980s', title: 'Minnesota makes it legal(ish)', body: 'Minnesota formalizes charitable gambling under state law, with licensed nonprofits running raffles in bars. The paddlewheel gets its own statute. The meat raffle now has paperwork.' },
  { year: 'Today', title: 'A Friday institution', body: 'Hundreds of weekly raffles fund youth hockey, honor guards, and fire relief funds across MN and WI. A dollar a spin, meat every round, and the proceeds stay in town.' },
]

export default function History() {
  return (
    <section id="history">
      <div className="sec-head">
        <span className="eyebrow">Chapter two</span>
        <h2>How the meat got on the wheel</h2>
        <p>The meat raffle didn't start here — but nowhere else has embraced it like the Upper Midwest, where charitable gambling law, tavern culture, and a deep respect for a good pork chop converged.</p>
      </div>
      <div className="history-grid">
        {chapters.map(c => (
          <div className="card" key={c.year}>
            <div className="year">{c.year}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
