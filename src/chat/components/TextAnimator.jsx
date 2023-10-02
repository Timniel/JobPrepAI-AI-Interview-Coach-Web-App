import { AnimatePresence, motion } from "framer-motion";
import { ScrollShadow } from "@nextui-org/react";

export function TextAnimator({ assistantMessage, isDone, handleSpeech }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={assistantMessage}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: 0 }}
        className="mt-[2rem] text-md font-normal text-gray-700"
      >
        <ScrollShadow
          hideScrollBar
          size={60}
          className={` flex ${!isDone ? "h-[180px]" : "h-[300px]"}`}
        >
          <div className="my-auto">
            {assistantMessage.replace("(done)", "")}
            <button onClick={handleSpeech}></button>
          </div>
        </ScrollShadow>
      </motion.p>
    </AnimatePresence>
  );
}
