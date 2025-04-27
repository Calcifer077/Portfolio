import { motion } from "framer-motion";

// How below component works?
// It uses 'motion' from 'framer-motion' or simply 'motion' which creates a 'div'.
// This 'div' has multiple properties.
// 'variants' are used to basically tell about different classes which will be applied during transition.
// 'inital' is used to tell what will our components intially look like.
// 'whileInView' tells what happens when components come into view.
// 'transition' tells about different properties of the whole thing.
// 'viewport={{once: true}}' means that if transition has been done once, it won't be done again.

// This component accepts a few props which are as follows:
// 'children' react components which are simply rendered.
// 'comeFrom' tells from which direction transition will happen.
// 'className' is used for styling.

function ScrollIntoView({ children, comeFrom, className }) {
  if (comeFrom == "bottom") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (comeFrom == "top") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (comeFrom == "right") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{
        duration: 0.5,
        delay: 0.25,
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollIntoView;
