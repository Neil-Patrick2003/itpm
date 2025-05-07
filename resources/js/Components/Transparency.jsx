import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut"
        }
    })
};

const Transparency = ({ data }) => {
    const { topSponsors, programCount, totalBeneficiaries, programs } = data;

    return (
        <section id="transparency" className="min-h-screen w-full flex items-center justify-center bg-[#F9FCFA] px-4">
            <motion.div
                className="w-full max-w-[1400px] bg-white rounded-2xl border border-green-200 p-8 md:p-12 mb-12 shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <motion.div custom={1} variants={fadeUp} className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-green-800 mb-4">📊 Transparency & Impact</h2>
                    <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg">
                        At the heart of our mission is transparency. We're proud to share our progress and show how every
                        partnership helps drive positive change. Here's what we’ve accomplished so far — and we’re just getting started.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[{
                        value: `${programCount}+`,
                        label: "Ongoing & Upcoming Programs"
                    }, {
                        value: `${totalBeneficiaries}+`,
                        label: "Beneficiaries Reached"
                    }, {
                        value: `${topSponsors.length}`,
                        label: "Top Active Sponsors"
                    }].map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i + 2}
                            variants={fadeUp}
                            className="bg-[#E6F4EA] p-6 rounded-xl border border-green-200 shadow-sm"
                        >
                            <h3 className="text-2xl font-bold text-green-800">{item.value}</h3>
                            <p className="text-gray-600 mt-2">{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div custom={5} variants={fadeUp} className="mt-12">
                    <h4 className="text-xl font-semibold text-green-800 mb-3">🌟 Top Sponsors</h4>
                    <motion.ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-green-700 font-medium">
                        {topSponsors.map((sponsor, i) => (
                            <motion.li
                                key={sponsor.id}
                                className="bg-[#F2FBF6] py-2 px-4 rounded-lg border border-green-100 shadow-sm text-center"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                {sponsor.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Transparency;
