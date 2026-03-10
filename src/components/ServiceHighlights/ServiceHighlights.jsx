import React from "react"
import { motion } from "framer-motion"
import services from "@/data/serviceHighlights.json"

const ServiceHighlights = () => {
  return (
    <section className="bg-white dark:bg-[#0b0b0b] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white ">
            Why Choose Us
          </h2>
          <p className="text-gray-400 mt-3 text-sm text-black dark:text-white">
            Premium cake services crafted for your special moments
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10, scale: 1.1 }} // <-- card increase on hover
              className="group relative cursor-pointer
                         rounded-2xl p-6 text-center
                         bg-white/5 backdrop-blur-md border border-white/10
                         transition-all duration-300
                         hover:border-purple-400/40 hover:bg-white/10
                         shadow-lg hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <motion.div
                  whileHover={{ scale: 1.2 }} // icon also increases
                  className="
                    w-16 h-16 flex items-center justify-center rounded-full
                    bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400
                    shadow-lg
                    transition-transform duration-300
                  "
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-7 h-7"
                  />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className=" font-semibold text-sm text-black dark:text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs mt-2 leading-relaxed  dark:text-white">
                {service.description}
              </p>

              {/* Subtle hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r
                           from-purple-500 via-pink-500 to-orange-400 opacity-0
                           blur-2xl group-hover:opacity-20 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceHighlights