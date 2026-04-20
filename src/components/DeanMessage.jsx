import React from "react";
import MessageLetter from "./_MessageLetter";

export default function DeanMessage() {
  return (
    <MessageLetter
      eyebrow="Office of the Dean · IDAR"
      title="Dean's Message"
      subtitle="A communication from the Dean (Institutional Development & Alumni Relations), NIT Tiruchirappalli, addressed to the global NITT alumni community."
      personImage="/uma.jpeg"
      personName="Dr. G. Uma"
      personRole="Dean (Institutional Development & Alumni Relations), National Institute of Technology, Tiruchirappalli"
      letterHeading="Building Bridges, Shaping Futures — A Message to the NITT Alumni Community"
      salutation="Dear Alumni,"
      paragraphs={[
        "Greetings and warm regards from your Alma Mater. It is a privilege to be a part of your community and to serve as a bridge between you and the Institute, as Dean (Institutional Development & Alumni Relations).",
        "Each of you entered NITT — erstwhile REC Trichy — with different aspirations. During your stay, the Alma Mater helped mould your personality and laid the foundation for a brighter, successful career. Your journey since leaving this Institute is a testament to its transformative power.",
        "NITT continues to remain among the foremost National Institutes of Technology, and we are striving to sustain and elevate this standing. We warmly invite you to add value in the following dimensions:",
      ]}
      bullets={[
        {
          label: "Nurturing a culture of innovation and research",
          text:
            "Supporting research chairs, seed grants, and laboratories that push our students and faculty to pursue original, high-impact work.",
        },
        {
          label: "Expanding global collaborations",
          text:
            "Opening doors to international internships, joint research programmes, and exchange opportunities through your professional networks.",
        },
        {
          label: "Strengthening infrastructure",
          text:
            "Partnering with the Institute on classrooms, hostels, and campus amenities that define the NITT experience for generations to come.",
        },
        {
          label: "Forging the Institute–alumni bond",
          text:
            "Mentoring students, speaking on campus, engaging with chapters, and helping shape policies that keep this community vibrant.",
        },
      ]}
      paragraphsAfterBullets={[
        "Together, we can leverage the collective power of the NITT alumni community to build a brighter future for our Alma Mater and empower the next generation to shape a better world. Stay connected, stay involved, and stay proud of your NITT legacy.",
      ]}
      closing="Warmly,"
      signatureName="Dr. G. Uma"
      signatureRole="Dean (Institutional Development & Alumni Relations), NIT Tiruchirappalli"
    />
  );
}
