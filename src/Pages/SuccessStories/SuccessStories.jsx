const SuccessStories = () => {
  const stories = [
    { name: "Sabbir Ahmed", story: "Emergency O+ needed for my father. Red Avengers found a donor in 15 mins!", location: "Sylhet" },
    { name: "Tahmina Akter", story: "Donating was so easy. The platform kept me updated every step of the way.", location: "Dhaka" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black italic dark:text-white">SAVING <span className="text-rose-600">LIVES</span></h1>
          <p className="text-slate-500 mt-4 font-medium uppercase tracking-[0.3em] text-xs">Real stories from our community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((s, idx) => (
            <div key={idx} className="relative p-10 bg-slate-50 dark:bg-zinc-900 rounded-[3rem] border border-slate-100 dark:border-zinc-800">
              <div className="absolute top-8 right-10 text-6xl text-rose-600/10 font-serif">“</div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 italic mb-8">"{s.story}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-rose-500 to-red-700 flex items-center justify-center text-white font-bold">
                  {s.name[0]}
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">{s.name}</h4>
                  <p className="text-xs text-rose-600 font-bold uppercase tracking-widest">{s.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SuccessStories;