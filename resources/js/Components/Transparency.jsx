import {motion} from "framer-motion";


const Transparency = ({ data }) => {

    const { topSponsors, programCount, totalBeneficiaries, programs } = data;

    return (
        <section id='transparency' className="min-h-screen w-full  flex items-center justify-center">
            <motion.div
                className="w-full max-w-[1400px] bg-white rounded-2xl  border border-green-200 p-8 md:p-12 mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-green-800 mb-4">📊 Transparency & Impact</h2>
                    <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg">
                        At the heart of our mission is transparency. We're proud to share our progress and show how every
                        partnership helps drive positive change. Here's what we’ve accomplished so far — and we’re just getting started.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-[#E6F4EA] p-6 rounded-xl border border-green-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-green-800">{programCount}+</h3>
                        <p className="text-gray-600 mt-2">Ongoing & Upcoming Programs</p>
                    </div>

                    <div className="bg-[#E6F4EA] p-6 rounded-xl border border-green-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-green-800">{totalBeneficiaries}+</h3>
                        <p className="text-gray-600 mt-2">Beneficiaries Reached</p>
                    </div>

                    <div className="bg-[#E6F4EA] p-6 rounded-xl border border-green-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-green-800">{topSponsors.length}</h3>
                        <p className="text-gray-600 mt-2">Top Active Sponsors</p>
                    </div>
                </div>

                <div className="mt-12">
                    <h4 className="text-xl font-semibold text-green-800 mb-3">Top Sponsors</h4>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-green-700 font-medium">
                        {topSponsors.map((sponsor) => (
                            <li key={sponsor.id} className="bg-[#F2FBF6] py-2 px-4 rounded-lg border border-green-100 shadow-sm text-center">
                                {sponsor.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/*<div className="mt-12">*/}
                {/*    <h4 className="text-xl font-semibold text-green-800 mb-3">Highlighted Programs</h4>*/}
                {/*    <ul className="space-y-2 text-left text-gray-700">*/}
                {/*        {programs.map((program) => (*/}
                {/*            <li key={program.id} className="border-b border-green-100 pb-2">*/}
                {/*                <strong className="text-green-900">{program.title}</strong> — Starts: {program.start_date}, Duration: {program.duration} days*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </motion.div>
        </section>


    )

}


export default Transparency;
