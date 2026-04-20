import React from "react";
import MessageLetter from "./_MessageLetter";

export default function DirectorMessage() {
  return (
    <MessageLetter
      eyebrow="Office of the Director"
      title="Director's Message"
      subtitle="A communication from the Director, National Institute of Technology, Tiruchirappalli, to the worldwide NITT alumni community."
      personImage="/director.jpeg"
      personName="Dr. G. Aghila"
      personRole="Director, National Institute of Technology, Tiruchirappalli"
      letterHeading="Clock Tower Echoes, Legacy Endures"
      salutation="Dear esteemed alumni,"
      paragraphs={[
        "Stepping beneath the iconic clock tower marked the beginning of an enduring bond. You entered a legacy etched in the annals of NITT — an institution consistently ranked among the foremost of the National Institutes of Technology in the country.",
        "Remember the vibrant discussions under the canopy of our shady trees, the late-night study sessions fuelled by shared dreams, and the camaraderie that cemented lifelong friendships. As alumni, you have proven that you carry those memories not just in your hearts, but in the tangible impact you have made on NITT today.",
        "NITT is fortunate to have a unique treasure — its alumni network. Your diverse expertise, global presence, and unwavering commitment to give back are a force like no other. Whether it is through funding cutting-edge laboratories, mentoring budding engineers, collaborating on research at the frontiers of knowledge, greening the campus, or supporting infrastructure and social causes, your contributions continue to resonate within these walls and inspire the next generation to climb even higher.",
      ]}
      pullQuote="The clock tower may mark your entry, but your enduring connection is what truly defines your NITT story."
      paragraphsAfterBullets={[
        "Let us continue to build bridges. As the clock tower does, let your legacy resonate in perpetuity.",
      ]}
      closing="Warmly,"
      signatureName="Dr. G. Aghila"
      signatureRole="Director, NIT Tiruchirappalli"
    />
  );
}
