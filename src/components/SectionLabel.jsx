import { motion } from "framer-motion";

export default function SectionLabel({ index, label, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
    >
      {index && <span className="text-eyebrow-gold">{index}</span>}
      <span className="h-px w-10 bg-gold/60" />
      <span className="text-eyebrow">{label}</span>
    </motion.div>
  );
}
